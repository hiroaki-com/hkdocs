// src/pages/browser-memo.tsx
import React, { useState, useEffect, useCallback, ReactElement, useRef } from 'react';
import Layout from '@theme/Layout';

const MEMO_COUNT = 5;
const STORAGE_KEY = 'hkdocs-browser-memo-v7-data';
const DEFAULT_TEXTAREA_MIN_HEIGHT = 150; // px

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
  if (!timestamp) return '保存データなし';
  const date = new Date(timestamp);
  return date.toLocaleString('ja-JP', {
    year: 'numeric', month: '2-digit', day: '2-digit',
    hour: '2-digit', minute: '2-digit',
  });
};

export default function BrowserMemoPage(): ReactElement {
  const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const textareaRefs = useRef<(HTMLTextAreaElement | null)[]>([]);

  useEffect(() => {
    textareaRefs.current = textareaRefs.current.slice(0, MEMO_COUNT);
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
    if (window.confirm('すべてのメモをクリアしますか？この操作は元に戻せません。')) {
      setMemoItems(createInitialMemoItems());
    }
  }, []);

  return (
    <Layout title="ブラウザメモ" description="ブラウザ内に一時的にテキストを保存できるシンプルなメモページ。">
      <div style={{ padding: '2rem' }}>
        <h1>ブラウザ メモ</h1>
        <p>ご自由にお使いください。入力内容は自動で保存され、次回もすぐに使えます。</p>
        <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button
            type="button"
            className="button button--warning button--sm"
            onClick={handleClearAllMemos}
          >
            全てクリア
          </button>
        </div>
        <hr style={{ margin: '2rem 0' }} />

        {memoItems.map((item, index) => {
          const titleText = item.isManuallyMinimized
            ? "クリックして自動高さ調整に戻す"
            : `クリックして最小化 (${DEFAULT_TEXTAREA_MIN_HEIGHT}px)`;

          return (
            <div key={index} style={{ marginBottom: '1.5rem' }}>
              <textarea
                ref={el => textareaRefs.current[index] = el}
                value={item.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleUpdate(index, e.target.value)}
                placeholder={`メモ ${index + 1}`}
                rows={1}
                style={{
                  width: '100%',
                  minHeight: `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`,
                  padding: '10px',
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
                最終更新: {formatDate(item.lastUpdated)}
              </div>
            </div>
          );
        })}
      </div>
    </Layout>
  );
}
