import React, { useState, useEffect, useCallback, ReactElement, useRef } from 'react';
import Layout from '@theme/Layout';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';

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

export default function BrowserMemoPage(): ReactElement {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [copiedStates, setCopiedStates] = useState<boolean[]>(Array(MEMO_COUNT).fill(false));
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);
  const copyTimeoutRefs = useRef<(NodeJS.Timeout | null)[]>(Array(MEMO_COUNT).fill(null));

  const formatDate = useCallback((timestamp: number | null): string => {
    if (!timestamp) return translate({
      id: 'page.browser-memo.footer.noData',
      message: '保存データなし'
    });
    const date = new Date(timestamp);
    return date.toLocaleString(currentLocale, {
      year: 'numeric', month: '2-digit', day: '2-digit',
      hour: '2-digit', minute: '2-digit',
    });
  }, [currentLocale]);

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
    if (window.confirm(translate({
      id: 'page.browser-memo.confirm.clearAll',
      message: 'すべてのメモをクリアしますか？この操作は元に戻せません。'
    }))) {
      setMemoItems(createInitialMemoItems());
    }
  }, []);

  const handleCopy = useCallback(async (index: number, textToCopy: string) => {
    if (!navigator.clipboard) {
      alert(translate({
        id: 'page.browser-memo.alert.clipboardUnavailable',
        message: 'クリップボード機能はこの環境では利用できません。'
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
        id: 'page.browser-memo.alert.copyFailed',
        message: 'テキストのコピーに失敗しました。'
      }));
    }
  }, []);

  return (
    <Layout
      title={translate({
        id: 'page.browser-memo.title',
        message: 'ブラウザメモ'
      })}
      description={translate({
        id: 'page.browser-memo.description',
        message: 'ブラウザ内に一時的にテキストを保存できるシンプルなメモ帳。'
      })}>
      <div style={{ padding: '2rem' }}>
        <h1>
          <Translate id="page.browser-memo.h1">ブラウザ メモ</Translate>
        </h1>
        <p>
          <Translate id="page.browser-memo.intro1">
            ご自由にお使いください。入力内容は自動で保存され、次回もすぐに使えます。
          </Translate>
        </p>
        <p style={{ fontSize: '0.9em', color: 'var(--ifm-color-secondary-darkest)' }}>
          <strong>
            <Translate id="page.browser-memo.intro2">※ 安全性について：</Translate>
          </strong>
          <Translate id="page.browser-memo.intro3">
            このメモの内容は、お使いのブラウザのローカルストレージにのみ保存されます。データが外部のサーバーに送信されることは一切ありません。
          </Translate>
        </p>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="button button--warning button--sm"
            onClick={handleClearAllMemos}
          >
            <Translate id="page.browser-memo.button.clearAll">全てクリア</Translate>
          </button>
        </div>
        <hr style={{ margin: '2rem 0' }} />

        {memoItems.map((item, index) => {
          const titleText = item.isManuallyMinimized
            ? translate({
                id: 'page.browser-memo.footer.toggle.expand',
                message: 'クリックして自動高さ調整に戻す'
              })
            : translate(
                {
                  id: 'page.browser-memo.footer.toggle.minimize',
                  message: 'クリックして最小化 ({height}px)',
                },
                { height: DEFAULT_TEXTAREA_MIN_HEIGHT }
              );

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
                aria-label={copiedStates[index]
                  ? translate({ id: 'page.browser-memo.copyButton.ariaLabel.copied', message: 'コピーしました' })
                  : translate(
                      { 
                        id: 'page.browser-memo.copyButton.ariaLabel.copy', 
                        message: 'メモ {number} をコピー'
                      },
                      { number: index + 1 }
                    )
                }
              >
                {copiedStates[index]
                  ? <Translate id="page.browser-memo.copyButton.copied">Copied!</Translate>
                  : <Translate id="page.browser-memo.copyButton.copy">Copy</Translate>}
              </button>
              <textarea
                ref={el => textareaRefs.current[index] = el}
                value={item.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate(index, e.target.value)}
                placeholder={translate(
                  {
                    id: 'page.browser-memo.textarea.placeholder',
                    message: 'メモ {number}',
                  },
                  { number: index + 1 }
                )}
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
                <Translate id="page.browser-memo.footer.lastUpdated">最終更新: </Translate>
                {formatDate(item.lastUpdated)}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
