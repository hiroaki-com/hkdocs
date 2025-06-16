import React, { useState, useEffect, useCallback, ReactElement, useRef } from 'react';
import Layout from '@theme/Layout';
// --- highlight-start ---
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// --- highlight-end ---

const MEMO_COUNT = 5;
const STORAGE_KEY = 'hkdocs-browser-memo-v8-data';
const DEFAULT_TEXTAREA_MIN_HEIGHT = 150;

interface MemoItem {
  text: string;
  lastUpdated: number | null;
  isManuallyMinimized: boolean;
}

const createInitialMemoItems = (): MemoItem[] =>
  Array(MEMO_COUNT).fill(null).map(() => ({
    text: '',
    lastUpdated: null,
    isManuallyMinimized: false,
  }));

const formatDate = (timestamp: number | null, locale: string): string => {
  // --- highlight-start ---
  if (!timestamp) return translate({
    id: 'browserMemo.noData',
    message: '保存データなし'
  });
  const date = new Date(timestamp);
  // Use the current locale for date formatting
  return date.toLocaleString(locale, {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
  // --- highlight-end ---
};

export default function BrowserMemoPage(): ReactElement {
  // --- highlight-start ---
  const { i18n: { currentLocale } } = useDocusaurusContext();
  // --- highlight-end ---

  const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copiedStates, setCopiedStates] = useState<boolean[]>(Array(MEMO_COUNT).fill(false));
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const copyTimeoutRefs = useRef<(NodeJS.Timeout | null)[]>(Array(MEMO_COUNT).fill(null));

  useEffect(() => {
    textareaRefs.current = textareaRefs.current.slice(0, MEMO_COUNT);
    return () => {
      copyTimeoutRefs.current.forEach(timeoutId => {
        if (timeoutId) clearTimeout(timeoutId);
      });
    };
  }, []);

  const adjustTextareaHeight = useCallback((index: number) => {
    const textarea = textareaRefs.current[index];
    if (textarea) {
      const itemIsManuallyMinimized = memoItems[index].isManuallyMinimized;
      if (itemIsManuallyMinimized) {
        textarea.style.height = `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`;
      } else {
        textarea.style.height = 'auto';
        const scrollHeight = textarea.scrollHeight;
        textarea.style.height = `${Math.max(scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT)}px`;
      }
    }
  }, [memoItems]);

  useEffect(() => {
    memoItems.forEach((_, index) => {
      adjustTextareaHeight(index);
    });
  }, [memoItems, adjustTextareaHeight]);

  useEffect(() => {
    try {
      const savedDataString = localStorage.getItem(STORAGE_KEY);
      if (savedDataString) {
        const parsedData = JSON.parse(savedDataString) as unknown;
        if (
          Array.isArray(parsedData) &&
          parsedData.length === MEMO_COUNT &&
          parsedData.every(item =>
            typeof item === 'object' && item !== null &&
            'text' in item && typeof item.text === 'string' &&
            'lastUpdated' in item && (typeof item.lastUpdated === 'number' || item.lastUpdated === null) &&
            'isManuallyMinimized' in item && typeof item.isManuallyMinimized === 'boolean'
          )
        ) {
          setMemoItems(parsedData as MemoItem[]);
        } else {
          setMemoItems(createInitialMemoItems());
        }
      }
    } catch (e) {
      console.error('Failed to load memos from localStorage.', e);
      setMemoItems(createInitialMemoItems());
    }
  }, []);

  useEffect(() => {
    const isInitialDefaultState = memoItems.every(
      item => item.text === '' && item.lastUpdated === null && !item.isManuallyMinimized
    );
    const isStorageEmpty = !localStorage.getItem(STORAGE_KEY);

    if (!(isInitialDefaultState && isStorageEmpty)) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(memoItems));
      } catch (e) {
        console.error('Failed to save memos to localStorage.', e);
      }
    }
  }, [memoItems]);

  const handleUpdate = useCallback((index: number, value: string) => {
    setMemoItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, text: value, lastUpdated: Date.now(), isManuallyMinimized: false }
          : item
      )
    );
  }, []);

  const handleToggleMinimize = useCallback((index: number) => {
    setMemoItems(prevItems =>
      prevItems.map((item, i) =>
        i === index
          ? { ...item, isManuallyMinimized: !item.isManuallyMinimized }
          : item
      )
    );
  }, []);

  const handleClearAllMemos = useCallback(() => {
    // --- highlight-start ---
    const confirmationMessage = translate({
      id: 'browserMemo.clearAllConfirmation',
      message: 'すべてのメモをクリアしますか？この操作は元に戻せません。'
    });
    if (window.confirm(confirmationMessage)) {
      setMemoItems(createInitialMemoItems());
    }
    // --- highlight-end ---
  }, []);

  const handleCopy = useCallback(async (index: number, textToCopy: string) => {
    if (!navigator.clipboard) {
      // --- highlight-start ---
      const alertMessage = translate({
        id: 'browserMemo.clipboardUnavailable',
        message: 'クリップボード機能はこの環境では利用できません。'
      });
      alert(alertMessage);
      // --- highlight-end ---
      return;
    }
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopiedStates(prev => prev.map((val, i) => i === index ? true : val));

      if (copyTimeoutRefs.current[index]) {
        clearTimeout(copyTimeoutRefs.current[index] as NodeJS.Timeout);
      }

      copyTimeoutRefs.current[index] = setTimeout(() => {
        setCopiedStates(prev => prev.map((val, i) => i === index ? false : val));
        copyTimeoutRefs.current[index] = null;
      }, 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
      // --- highlight-start ---
      const alertMessage = translate({
        id: 'browserMemo.copyFailed',
        message: 'テキストのコピーに失敗しました。'
      });
      alert(alertMessage);
      // --- highlight-end ---
    }
  }, []);

  return (
    // --- highlight-start ---
    <Layout
      title={translate({ id: 'browserMemo.pageTitle', message: 'ブラウザメモ' })}
      description={translate({
        id: 'browserMemo.pageDescription',
        message: 'ブラウザ内に一時的にテキストを保存できるシンプルなメモ帳。'
      })}
    >
      <div style={{ padding: '2rem' }}>
        <h1><Translate id="browserMemo.h1">ブラウザ メモ</Translate></h1>
        <p><Translate id="browserMemo.intro">ご自由にお使いください。入力内容は自動で保存され、次回もすぐに使えます。</Translate></p>
        <p style={{ fontSize: '0.9em', color: 'var(--ifm-color-secondary-darkest)' }}>
          <strong><Translate id="browserMemo.security.title">※ 安全性について：</Translate></strong>
          <Translate id="browserMemo.security.body">
            このメモの内容は、お使いのブラウザのローカルストレージにのみ保存されます。
            データが外部のサーバーに送信されることは一切ありません。
          </Translate>
        </p>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="button button--warning button--sm"
            onClick={handleClearAllMemos}
          >
            <Translate id="browserMemo.clearAllButton">全てクリア</Translate>
          </button>
        </div>
        <hr style={{ margin: '2rem 0' }} />

        {memoItems.map((item, index) => {
          const titleText = item.isManuallyMinimized
            ? translate({
                id: 'browserMemo.tooltip.expand',
                message: 'クリックして自動高さ調整に戻す'
              })
            : translate({
                id: 'browserMemo.tooltip.minimize',
                message: `クリックして最小化 (${DEFAULT_TEXTAREA_MIN_HEIGHT}px)`
              });
          
          const copyButtonAriaLabel = copiedStates[index]
            ? translate({
                id: 'browserMemo.aria.copied',
                message: 'コピーしました'
              })
            : translate({
                id: 'browserMemo.aria.copy',
                message: 'メモ {number} をコピー',
                description: 'The ARIA label for the copy button of a memo'
              }, { number: index + 1 });
            
          const textareaPlaceholder = translate({
            id: 'browserMemo.placeholder',
            message: 'メモ {number}',
            description: 'The placeholder for the memo textarea'
          }, { number: index + 1 });

          return (
            <div key={index} style={{ marginBottom: '1.5rem', position: 'relative' }}>
              <button
                type="button"
                onClick={() => handleCopy(index, item.text)}
                className={`button ${copiedStates[index] ? 'button--success' : 'button--secondary'} button--xs`}
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  zIndex: 1,
                  padding: '2px 6px',
                  fontSize: '0.75em',
                }}
                disabled={!item.text.trim()}
                aria-label={copyButtonAriaLabel}
              >
                {copiedStates[index]
                  ? <Translate id="browserMemo.copyButton.copied">Copied!</Translate>
                  : <Translate id="browserMemo.copyButton.copy">Copy</Translate>}
              </button>
              <textarea
                ref={el => textareaRefs.current[index] = el}
                value={item.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate(index, e.target.value)}
                placeholder={textareaPlaceholder}
                rows={1}
                style={{
                  width: '100%',
                  minHeight: `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`,
                  padding: '10px',
                  paddingTop: '36px',
                  fontSize: '16px',
                  border: '1px solid var(--ifm-color-emphasis-300)',
                  borderBottom: 'none',
                  borderRadius: 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0',
                  backgroundColor: 'var(--ifm-background-color)',
                  color: 'var(--ifm-font-color-base)',
                  resize: 'none',
                  overflowY: 'hidden',
                  display: 'block',
                  boxSizing: 'border-box',
                }}
              />
              <div
                onClick={() => handleToggleMinimize(index)}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
                style={{
                  width: '100%',
                  padding: '8px 10px',
                  borderLeft: '1px solid var(--ifm-color-emphasis-300)',
                  borderRight: '1px solid var(--ifm-color-emphasis-300)',
                  borderBottom: '1px solid var(--ifm-color-emphasis-300)',
                  borderTop: '1px solid var(--ifm-color-emphasis-300)',
                  borderRadius: '0 0 var(--ifm-global-radius) var(--ifm-global-radius)',
                  backgroundColor: hoveredIndex === index
                    ? 'var(--ifm-color-emphasis-200)'
                    : 'var(--ifm-background-secondary)',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'flex-end',
                  alignItems: 'center',
                  fontSize: '0.85em',
                  color: 'var(--ifm-color-emphasis-800)',
                  boxSizing: 'border-box',
                  userSelect: 'none',
                  transition: 'background-color 0.15s ease-in-out',
                }}
                title={titleText}
              >
                <Translate id="browserMemo.lastUpdated">最終更新:</Translate> {formatDate(item.lastUpdated, currentLocale)}
              </div>
            </div>
          );
        })}
        {/* --- highlight-end --- */}
      </div>
    </Layout>
  );
}
