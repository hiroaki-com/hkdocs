import React, { useState, useEffect, useCallback, useRef } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import { Share2, ClipboardCopy, Check, Trash2, ChevronUp, ChevronDown } from 'lucide-react';
import LZString from 'lz-string';

const MEMO_COUNT = 5;
// A versioned key to prevent conflicts with old data structures in localStorage.
const STORAGE_KEY = 'hkdocs-browser-memo-v8-data';
// Default height for each memo area (150px * 1.4).
const DEFAULT_TEXTAREA_MIN_HEIGHT = 210;
const URL_LENGTH_WARNING_THRESHOLD = 1900;
const DEBOUNCE_SAVE_DELAY = 500;

interface MemoItem {
  text: string;
  lastUpdated: number | null;
  isManuallyMinimized: boolean;
}

type SharedMemo = { i: number; t: string };

const MemoTextarea = React.memo(({ initialText, onSave, isMinimized, hasTopBar, onHeightChange, placeholder, ariaLabel, id }) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (initialText !== text) {
      setText(initialText);
    }
  }, [initialText]);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const newHeight = isMinimized
      ? DEFAULT_TEXTAREA_MIN_HEIGHT
      : Math.max(textarea.scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT);
    textarea.style.height = `${newHeight}px`;
    onHeightChange(newHeight); // Notify parent of height changes.

    textarea.style.overflowY = isMinimized ? 'auto' : 'hidden';
  }, [text, isMinimized, onHeightChange]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);

    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => {
      onSave(newValue);
    }, DEBOUNCE_SAVE_DELAY);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    onSave(e.target.value);
  };

  return (
    <textarea
      id={id}
      ref={textareaRef}
      value={text}
      onChange={handleChange}
      onBlur={handleBlur}
      aria-label={ariaLabel}
      placeholder={placeholder}
      rows={1}
      style={{
        width: '100%',
        minHeight: `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`,
        padding: '10px',
        fontSize: '16px',
        border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: hasTopBar ? 0 : 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0',
        borderTop: hasTopBar ? 'none' : '1px solid var(--ifm-color-emphasis-300)',
        borderBottom: 'none',
        backgroundColor: 'var(--ifm-background-color)',
        color: 'var(--ifm-font-color-base)',
        resize: 'none',
      }}
    />
  );
});

const createInitialMemoItems = (): MemoItem[] =>
  Array(MEMO_COUNT).fill(null).map(() => ({ text: '', lastUpdated: null, isManuallyMinimized: false }));

const loadMemosFromStorage = (): MemoItem[] => {
  try {
    const savedDataString = localStorage.getItem(STORAGE_KEY);
    if (savedDataString) {
      const parsedData = JSON.parse(savedDataString) as MemoItem[];
      if (Array.isArray(parsedData) && parsedData.length === MEMO_COUNT) return parsedData;
    }
  } catch (e) { console.error('Failed to load memos from localStorage.', e); }
  return createInitialMemoItems();
};

function MemoApp() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const [memoItems, setMemoItems] = useState<MemoItem[]>([]);
  const [memoHeights, setMemoHeights] = useState<number[]>(() => Array(MEMO_COUNT).fill(DEFAULT_TEXTAREA_MIN_HEIGHT));
  const [copiedStates, setCopiedStates] = useState<boolean[]>(Array(MEMO_COUNT).fill(false));
  const [isAllShared, setIsAllShared] = useState<boolean>(false);
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    setMemoItems(loadMemosFromStorage());
    const hash = window.location.hash.slice(1);

    if (hash) {
      try {
        const confirmed = window.confirm(translate({ id: 'page.browser-memo.confirm.restoreAll', message: '共有されたメモを復元しますか？現在のメモは上書きされます。' }));
        if (confirmed) {
          const decompressed = LZString.decompressFromEncodedURIComponent(hash);
          const sharedData: SharedMemo[] = JSON.parse(decompressed);
          const newMemos = createInitialMemoItems();
          sharedData.forEach(memo => {
            if (newMemos[memo.i]) {
              newMemos[memo.i] = { text: memo.t, lastUpdated: Date.now(), isManuallyMinimized: false };
            }
          });
          setMemoItems(newMemos);
        }
      } catch (e) {
        console.error('Failed to restore from URL hash.', e);
        alert(translate({ id: 'page.browser-memo.alert.restoreFailed', message: 'メモの復元に失敗しました。リンクが破損している可能性があります。' }));
      } finally {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }
    }
  }, []);

  useEffect(() => {
    if (memoItems.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoItems));
    }
  }, [memoItems]);

  const handleHeightChange = useCallback((index: number, height: number) => {
    setMemoHeights(prev => {
      // Avoid unnecessary re-renders for performance.
      if (prev[index] === height) return prev;
      const newHeights = [...prev];
      newHeights[index] = height;
      return newHeights;
    });
  }, []);

  const createFeedbackTimer = (setter: React.Dispatch<React.SetStateAction<any>>, index?: number) => {
    const applyState = (value: boolean) => {
      if (index !== undefined) {
        setter((prev: boolean[]) => prev.map((v, i) => (i === index ? value : v)));
      } else {
        setter(value);
      }
    };
    applyState(true);
    setTimeout(() => applyState(false), 2000);
  };

  const handleSave = useCallback((index: number, value: string) => {
    setMemoItems(p => {
      if (p[index]?.text !== value) {
        const newItems = [...p];
        newItems[index] = { ...newItems[index], text: value, lastUpdated: Date.now() };
        return newItems;
      }
      return p;
    });
  }, []);

  const handleToggleMinimize = (index: number) => {
    setMemoItems(p => p.map((item, i) => (i === index ? { ...item, isManuallyMinimized: !item.isManuallyMinimized } : item)));
  };

  const handleCopy = async (index: number) => {
    await navigator.clipboard.writeText(memoItems[index].text);
    createFeedbackTimer(setCopiedStates, index);
  };

  const handleShareAll = async () => {
    document.activeElement instanceof HTMLElement && document.activeElement.blur();
    
    // Use a short timeout to ensure the UI updates (e.g., blur) before heavy compression task.
    setTimeout(async () => {
      const memosToShare: SharedMemo[] = memoItems
        .map((item, index) => ({ i: index, t: item.text }))
        .filter(item => item.t.trim() !== '');

      const jsonString = JSON.stringify(memosToShare);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      const shareUrl = `${window.location.origin}${window.location.pathname}#${compressed}`;
    
      if (shareUrl.length > URL_LENGTH_WARNING_THRESHOLD) {
        const confirmed = window.confirm(translate({ id: 'page.browser-memo.alert.urlTooLongConfirm', message: '保存されたテキスト文量が大きいため、生成されたURLが非常に長いです。機能しない場合がある点ご理解願います。\n\n当該URLの活用時には短縮URLサービス等の利用を推奨いたします。' }));
        if (!confirmed) {
          return;
        }
      }

      await navigator.clipboard.writeText(shareUrl);
      createFeedbackTimer(setIsAllShared);
    }, 100);
  };

  const handleClearAll = () => {
    if (window.confirm(translate({ id: 'page.browser-memo.confirm.clearAll', message: 'すべてのメモをクリアしますか？この操作は元に戻せません。'}))) {
      setMemoItems(createInitialMemoItems());
      // Also reset the height tracking state.
      setMemoHeights(Array(MEMO_COUNT).fill(DEFAULT_TEXTAREA_MIN_HEIGHT));
    }
  };

  const hasContent = memoItems.some(item => item.text.trim() !== '');

  return (
    <div style={{ padding: '2rem' }}>
      <h1><Translate id="page.browser-memo.h1">ブラウザ メモ</Translate></h1>
      <p><Translate id="page.browser-memo.intro1">ブラウザだけで使えるシンプルなメモ帳です。入力内容は自動でこのブラウザに保存されます。</Translate></p>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', margin: '2rem 0' }}>
        <button type="button" className={`button button--sm ${isAllShared ? 'button--success' : 'button--primary'}`} onClick={handleShareAll} disabled={!hasContent} style={{ display: 'flex', alignItems: 'center' }}>
          <Share2 size={16} style={{ marginRight: '8px' }} />
          {isAllShared ? <Translate id="page.browser-memo.button.allShared">リンクをコピーしました</Translate> : <Translate id="page.browser-memo.button.shareAll">すべてのメモを共有</Translate>}
        </button>
        <button type="button" className="button button--sm button--warning" onClick={handleClearAll} disabled={!hasContent} style={{ display: 'flex', alignItems: 'center' }}>
          <Trash2 size={16} style={{ marginRight: '8px' }} />
          <Translate id="page.browser-memo.button.clearAll">全てクリア</Translate>
        </button>
      </div>

      {memoItems.map((item, index) => {
        const isExpanded = !item.isManuallyMinimized;
        const textareaId = `memo-textarea-${index}`;
        // Show top bar only when expanded AND taller than the default height.
        const showTopBar = isExpanded && memoHeights[index] > DEFAULT_TEXTAREA_MIN_HEIGHT;
        
        const renderToggleBar = (position: 'top' | 'bottom') => {
          const handleKeyDown = (e: React.KeyboardEvent) => {
            // Accessibility: Allow toggling with Enter or Space key.
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              handleToggleMinimize(index);
            }
          };
          const Icon = isExpanded ? ChevronUp : ChevronDown;

          return (
            <div
              role="button"
              tabIndex={0}
              aria-expanded={isExpanded}
              aria-controls={textareaId}
              onClick={() => handleToggleMinimize(index)}
              onKeyDown={handleKeyDown}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              style={{
                width: '100%',
                padding: '8px 10px',
                border: '1px solid var(--ifm-color-emphasis-300)',
                borderRadius: position === 'top'
                  ? 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0'
                  : '0 0 var(--ifm-global-radius) var(--ifm-global-radius)',
                borderBottom: position === 'top' ? 'none' : '1px solid var(--ifm-color-emphasis-300)',
                backgroundColor: hoveredIndex === index ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-background-secondary)',
                cursor: 'pointer',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                fontSize: '0.85em',
                color: 'var(--ifm-color-emphasis-800)',
                boxSizing: 'border-box',
                userSelect: 'none',
                transition: 'background-color 0.2s ease-in-out',
              }}
              title={translate({ id: 'page.browser-memo.footer.toggle.minimize', message: 'クリックで高さ切替' })}
            >
              <Icon size={18} aria-hidden="true" />
              {item.lastUpdated && (
                <span>
                  {translate({ id: 'page.browser-memo.footer.lastUpdated', message: '最終更新: '})}
                  {new Date(item.lastUpdated).toLocaleString(currentLocale, {
                    year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit',
                  })}
                </span>
              )}
            </div>
          );
        };
        
        return (
          <div key={index} style={{ marginBottom: '1.5rem' }}>
            {showTopBar && renderToggleBar('top')}
            
            <div style={{ position: 'relative' }}>
              <div style={{
                position: 'absolute',
                top: 0,
                right: 0,
                zIndex: 1,
                padding: '6px',
                borderTopRightRadius: showTopBar ? 0 : 'var(--ifm-global-radius)',
                borderBottomLeftRadius: 'var(--ifm-global-radius)',
                background: 'rgba(0, 0, 0, 0.1)',
              }}>
                <button type="button" onClick={() => handleCopy(index)} className={`button ${copiedStates[index] ? 'button--success' : 'button--secondary'} button--xs`} style={{ padding: '4px', lineHeight: 1 }} disabled={!item.text.trim()} title={translate({ id: 'page.browser-memo.copyButton.title', message: 'テキストをコピー' })}>
                  {copiedStates[index] ? <Check size={16} /> : <ClipboardCopy size={16} />}
                </button>
              </div>
              <MemoTextarea
                id={textareaId}
                initialText={item.text}
                onSave={(value) => handleSave(index, value)}
                isMinimized={!isExpanded}
                hasTopBar={showTopBar}
                onHeightChange={(height) => handleHeightChange(index, height)}
                ariaLabel={translate({ id: 'page.browser-memo.textarea.ariaLabel', message: 'メモ {number}'}, { number: index + 1})}
                placeholder={translate({ id: 'page.browser-memo.textarea.placeholder', message: 'メモ {number}' }, { number: index + 1 })}
              />
            </div>

            {renderToggleBar('bottom')}
          </div>
        );
      })}

      <div style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--ifm-color-emphasis-300)', fontSize: '0.9em', color: 'var(--ifm-color-secondary-darkest)' }}>
        <h3 style={{fontSize: '1.1rem'}}><Translate id="page.browser-memo.notes.title">ご利用上の注意</Translate></h3>
        <ul>
          <li><Translate id="page.browser-memo.notes.storage">メモの内容は、入力が少し止まるか、フォーカスが外れたタイミングで自動的に保存されます。</Translate></li>
          <li><Translate id="page.browser-memo.notes.urlLengthWarning">メモの内容が非常に長い場合、生成されるURLも長くなります。共有機能を使用する際は、短縮URLサービスの利用を推奨します。</Translate></li>
          <li><Translate id="page.browser-memo.notes.backup">この機能は簡易的なものです。重要なデータは別途バックアップを取ることを強く推奨します。</Translate></li>
        </ul>
      </div>
    </div>
  );
}

export default function MemoPageWrapper() {
  return (
    <BrowserOnly fallback={<div>Loading...</div>}>
      {() => (
        <Layout
          title={translate({ id: 'page.browser-memo.title', message: 'ブラウザメモ' })}
          description={translate({ id: 'page.browser-memo.description', message: 'ブラウザ内に一時的にテキストを保存できるシンプルなメモ帳。' })}
        >
          <MemoApp />
        </Layout>
      )}
    </BrowserOnly>
  );
}
