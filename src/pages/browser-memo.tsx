// src/pages/browser-memo.tsx
import React, { useState, useEffect, useCallback, ReactElement, useRef } from 'react';
import Layout from '@theme/Layout';
import Translate, { translate } from '@docusaurus/Translate'; // Import Docusaurus i18n components

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

const formatDate = (timestamp: number | null): string => {
  if (!timestamp) return translate({
    message: '保存データなし',
    id: 'browserMemo.formatDate.noData',
    description: 'Text displayed when there is no saved data for a memo item',
  });
  const date = new Date(timestamp);
  // Consider locale for date formatting if you want it to change with language
  return date.toLocaleString('ja-JP', { // For now, keeping ja-JP, can be made dynamic later if needed
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
};

export default function BrowserMemoPage(): ReactElement {
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
    const confirmMessage = translate({
      message: 'すべてのメモをクリアしますか？この操作は元に戻せません。',
      id: 'browserMemo.clearAll.confirmMessage',
      description: 'Confirmation message before clearing all memos',
    });
    if (window.confirm(confirmMessage)) {
      setMemoItems(createInitialMemoItems());
    }
  }, []);

  const handleCopy = useCallback(async (index: number, textToCopy: string) => {
    if (!navigator.clipboard) {
      alert(translate({
        message: 'クリップボード機能はこの環境では利用できません。',
        id: 'browserMemo.copy.clipboardUnavailable',
        description: 'Alert message when clipboard API is not available',
      }));
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
      alert(translate({
        message: 'テキストのコピーに失敗しました。',
        id: 'browserMemo.copy.failure',
        description: 'Alert message when text copy fails',
      }));
    }
  }, []);

  return (
    <Layout
      title={translate({
        message: 'ブラウザメモ',
        id: 'browserMemo.layout.title',
        description: 'Title for the Browser Memo page layout',
      })}
      description={translate({
        message: 'ブラウザ内に一時的にテキストを保存できるシンプルなメモ帳。',
        id: 'browserMemo.layout.description',
        description: 'Description for the Browser Memo page layout',
      })}
    >
      <div style={{ padding: '2rem' }}>
        <h1>
          <Translate id="browserMemo.pageTitle" description="Main title of the Browser Memo page">
            ブラウザ メモ
          </Translate>
        </h1>
        <p>
          <Translate id="browserMemo.pageSubtitle" description="Subtitle/instruction for the Browser Memo page">
            ご自由にお使いください。入力内容は自動で保存され、次回もすぐに使えます。
          </Translate>
        </p>
        <p style={{ fontSize: '0.9em', color: 'var(--ifm-color-secondary-darkest)' }}>
          <strong>
            <Translate id="browserMemo.safetyNote.title" description="Title for the safety note (e.g., ※ 安全性について：)">
              ※ 安全性について：
            </Translate>
          </strong>{' '}
          <Translate id="browserMemo.safetyNote.content" description="Content of the safety note about local storage">
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
            <Translate id="browserMemo.clearAllButton" description="Label for the 'Clear All' button">
              全てクリア
            </Translate>
          </button>
        </div>
        <hr style={{ margin: '2rem 0' }} />

        {memoItems.map((item, index) => {
          const titleText = item.isManuallyMinimized
            ? translate({
                message: "クリックして自動高さ調整に戻す",
                id: 'browserMemo.minimizeToggle.expand',
                description: 'Tooltip text for expanding a minimized memo area',
              })
            : translate({
                message: `クリックして最小化 (${DEFAULT_TEXTAREA_MIN_HEIGHT}px)`,
                id: 'browserMemo.minimizeToggle.minimize',
                description: 'Tooltip text for minimizing a memo area',
              }, { height: DEFAULT_TEXTAREA_MIN_HEIGHT }); // Example of passing a variable

          const copyButtonAriaLabel = copiedStates[index]
            ? translate({
                message: "コピーしました",
                id: 'browserMemo.copyButton.ariaLabel.copied',
                description: 'ARIA label for copy button when text is copied',
              })
            : translate({
                message: `メモ ${index + 1} をコピー`,
                id: 'browserMemo.copyButton.ariaLabel.copy',
                description: 'ARIA label for copy button for a specific memo item',
              }, { index: index + 1 });

          const copyButtonText = copiedStates[index]
            ? translate({
                message: "Copied!",
                id: 'browserMemo.copyButton.text.copied',
                description: 'Text for copy button when text is copied',
              })
            : translate({
                message: "Copy",
                id: 'browserMemo.copyButton.text.copy',
                description: 'Text for copy button',
              });

          const placeholderText = translate({
            message: `メモ ${index + 1}`,
            id: 'browserMemo.textarea.placeholder',
            description: 'Placeholder text for a memo textarea',
          }, { index: index + 1 });


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
                {copyButtonText}
              </button>
              <textarea
                ref={el => textareaRefs.current[index] = el}
                value={item.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate(index, e.target.value)}
                placeholder={placeholderText}
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
                <Translate
                  id="browserMemo.lastUpdatedPrefix"
                  description="Prefix text for the last updated timestamp"
                >
                  最終更新:
                </Translate>
                {' '}{formatDate(item.lastUpdated)}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
