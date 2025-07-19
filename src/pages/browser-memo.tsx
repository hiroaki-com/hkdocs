import React, { useState, useEffect, useCallback, useRef, useMemo } from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Translate, { translate } from '@docusaurus/Translate';
import { Share2, ClipboardCopy, Check, Trash2, ChevronUp, ChevronDown, Eye } from 'lucide-react';
import LZString from 'lz-string';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

// --- 定数定義 ---
const MEMO_COUNT = 5;
const STORAGE_KEY = 'hkdocs-browser-memo-v8-data'; // ローカルストレージのキー。バージョン変更時はこの値を更新する
const DEFAULT_TEXTAREA_MIN_HEIGHT = 210; // テキストエリアの最小の高さ (px)
const URL_LENGTH_WARNING_THRESHOLD = 1900; // URL共有時の文字数警告閾値
const DEBOUNCE_SAVE_DELAY = 500; // 自動保存の遅延時間 (ms)
const RESIZE_MIN_WIDTH_PERCENT = 20; // 左右リサイズ時の最小幅パーセント
const RESIZE_MAX_WIDTH_PERCENT = 80; // 左右リサイズ時の最大幅パーセント

// --- 型定義 ---
interface MemoItem {
  text: string;
  lastUpdated: number | null;
  isManuallyMinimized: boolean;
}
type SharedMemo = { i: number; t: string }; // URL共有用のコンパクトなメモデータ型

// --- ヘルパー関数 ---
/** 空のメモ配列を生成する */
const createInitialMemoItems = (): MemoItem[] => Array(MEMO_COUNT).fill(null).map(() => ({ text: '', lastUpdated: null, isManuallyMinimized: false }));

// --- カスタムフック ---

/** CSSメディアクエリ文字列にマッチするかどうかを返すフック */
const useMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mediaQueryList = window.matchMedia(query);
    const listener = () => setMatches(mediaQueryList.matches);
    listener();
    mediaQueryList.addEventListener('change', listener);
    return () => mediaQueryList.removeEventListener('change', listener);
  }, [query]);
  return matches;
};

/** 左右パネルのリサイズ機能を管理するフック */
const useResizablePanels = (initialPosition: number) => {
  const [dividerPosition, setDividerPosition] = useState(initialPosition);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || !containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const newPos = ((e.clientX - rect.left) / rect.width) * 100;
      const clampedPos = Math.max(RESIZE_MIN_WIDTH_PERCENT, Math.min(RESIZE_MAX_WIDTH_PERCENT, newPos));
      setDividerPosition(clampedPos);
    };

    const handleMouseUp = () => setIsDragging(false);

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = 'none';
      document.body.style.cursor = 'col-resize';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.body.style.userSelect = '';
      document.body.style.cursor = '';
    };
  }, [isDragging]);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  return { containerRef, dividerPosition, handleMouseDown };
};

// --- UIコンポーネント ---

const MemoTextarea: React.FC<{
  id: string; initialText: string; onSave: (value: string) => void; isMinimized: boolean;
  onHeightChange: (height: number) => void; placeholder: string; ariaLabel: string;
  isInSideBySide?: boolean; hasTopBar: boolean;
}> = React.memo(({ initialText, onSave, isMinimized, onHeightChange, placeholder, ariaLabel, id, isInSideBySide, hasTopBar }) => {
  const [text, setText] = useState(initialText);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => { setText(initialText); }, [initialText]);

  // テキストの量に応じてテキストエリアの高さを動的に調整
  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;
    const newHeight = isMinimized ? DEFAULT_TEXTAREA_MIN_HEIGHT : Math.max(textarea.scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT);
    textarea.style.height = `${newHeight}px`;
    onHeightChange(newHeight);
    textarea.style.overflowY = isMinimized ? 'auto' : 'hidden';
  }, [text, isMinimized, onHeightChange]);

  // 入力後、少し時間が経ってから保存処理を発火 (デバウンス)
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    setText(newValue);
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(() => onSave(newValue), DEBOUNCE_SAVE_DELAY);
  };

  const handleBlur = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (debounceTimeout.current) clearTimeout(debounceTimeout.current);
    onSave(e.target.value);
  };

  const style: React.CSSProperties = {
    width: '100%', minHeight: `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`, padding: '10px', fontSize: '16px',
    border: 'none', borderRadius: 0, backgroundColor: 'var(--ifm-background-color)',
    color: 'var(--ifm-font-color-base)', resize: 'none',
  };
  
  if (!isInSideBySide) {
    style.border = '1px solid var(--ifm-color-emphasis-300)';
    style.borderRadius = hasTopBar ? 0 : 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0';
    style.borderTop = hasTopBar ? 'none' : '1px solid var(--ifm-color-emphasis-300)';
    style.borderBottom = 'none';
  }

  return <textarea id={id} ref={textareaRef} value={text} onChange={handleChange} onBlur={handleBlur} aria-label={ariaLabel} placeholder={placeholder} rows={1} style={style} />;
});

const MarkdownPreview: React.FC<{
  text: string; isMinimized: boolean; isInSideBySide?: boolean; hasTopBar: boolean;
}> = React.memo(({ text, isMinimized, isInSideBySide, hasTopBar }) => {
  const previewText = text || translate({ id: 'page.browser-memo.preview.empty', message: 'プレビューする内容がありません。'});
  const style: React.CSSProperties = {
    width: '100%', minHeight: `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`, overflowY: 'auto', padding: '10px 15px',
    height: isMinimized ? `${DEFAULT_TEXTAREA_MIN_HEIGHT}px` : 'auto',
    maxHeight: isMinimized ? `${DEFAULT_TEXTAREA_MIN_HEIGHT}px` : 'none',
    backgroundColor: 'var(--ifm-background-color)', color: 'var(--ifm-font-color-base)',
    fontSize: '0.9em', lineHeight: 1.6,
  };

  if (!isInSideBySide) {
    style.border = '1px solid var(--ifm-color-emphasis-300)';
    style.borderRadius = hasTopBar ? 0 : 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0';
    style.borderTop = hasTopBar ? 'none' : '1px solid var(--ifm-color-emphasis-300)';
    style.borderBottom = 'none';
  }

  return <div className="markdown" style={style}><ReactMarkdown remarkPlugins={[remarkGfm]}>{previewText}</ReactMarkdown></div>;
});

/** 各メモ帳のUIとロジックをまとめたコンポーネント */
const MemoItemComponent: React.FC<{
  memo: MemoItem; index: number; onSave: (index: number, value: string) => void;
  currentLocale: string;
}> = ({ memo, index, onSave, currentLocale }) => {
  const [isPreview, setIsPreview] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [isMinimized, setIsMinimized] = useState(memo.isManuallyMinimized);
  const [height, setHeight] = useState(DEFAULT_TEXTAREA_MIN_HEIGHT);
  const [isHovered, setIsHovered] = useState(false);
  const { containerRef, dividerPosition, handleMouseDown } = useResizablePanels(50);
  
  const isDesktop = useMediaQuery('(min-width: 997px)');
  const isExpanded = !isMinimized;
  const textareaId = `memo-textarea-${index}`;
  const showSideBySidePreview = isDesktop && isPreview;
  const showTopBar = isExpanded && (isPreview || height > DEFAULT_TEXTAREA_MIN_HEIGHT);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(memo.text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };
  
  const renderToggleBar = (position: 'top' | 'bottom') => (
    <div
      role="button" tabIndex={0} aria-expanded={isExpanded} aria-controls={textareaId}
      onClick={() => setIsMinimized(p => !p)}
      onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') setIsMinimized(p => !p); }}
      onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}
      style={{
        width: '100%', padding: '8px 10px', border: '1px solid var(--ifm-color-emphasis-300)',
        borderRadius: position === 'top' ? 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0' : '0 0 var(--ifm-global-radius) var(--ifm-global-radius)',
        borderBottom: position === 'top' ? 'none' : '1px solid var(--ifm-color-emphasis-300)',
        backgroundColor: isHovered ? 'var(--ifm-color-emphasis-200)' : 'var(--ifm-background-secondary)',
        cursor: 'pointer', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        fontSize: '0.85em', color: 'var(--ifm-color-emphasis-800)', userSelect: 'none', transition: 'background-color 0.2s ease-in-out',
      }}
      title={translate({ id: 'page.browser-memo.footer.toggle.minimize', message: 'クリックで高さ切替' })}
    >
      {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      {memo.lastUpdated && <span>{translate({ id: 'page.browser-memo.footer.lastUpdated', message: '最終更新: '})}{new Date(memo.lastUpdated).toLocaleString(currentLocale, { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' })}</span>}
    </div>
  );

  // パフォーマンス最適化: スタイルオブジェクトをメモ化
  const wrapperStyle = useMemo((): React.CSSProperties => {
    const style: React.CSSProperties = { position: 'relative' };
    if (showSideBySidePreview) {
      style.border = '1px solid var(--ifm-color-emphasis-300)';
      style.borderBottom = 'none';
      style.borderRadius = showTopBar ? 0 : 'var(--ifm-global-radius) var(--ifm-global-radius) 0 0';
      style.borderTop = showTopBar ? 'none' : '1px solid var(--ifm-color-emphasis-300)';
    }
    return style;
  }, [showSideBySidePreview, showTopBar]);

  return (
    <section style={{ marginBottom: '1.5rem' }} aria-label={translate({ id: 'page.browser-memo.memoItem.section.ariaLabel', message: 'メモ {number}' }, { number: index + 1 })}>
      {showTopBar && renderToggleBar('top')}
      <div style={wrapperStyle}>
        <div style={{
          position: 'absolute', top: 0, right: 0, zIndex: 10, padding: '6px',
          borderTopRightRadius: showTopBar ? 0 : 'var(--ifm-global-radius)',
          borderBottomLeftRadius: 'var(--ifm-global-radius)',
          background: 'rgba(0,0,0,0.1)', display: 'flex', gap: '4px',
        }}>
          <button type="button" onClick={() => setIsPreview(p => !p)} className={`button ${isPreview ? 'button--primary' : 'button--secondary'} button--xs`} style={{ padding: '4px', lineHeight: 1 }} disabled={!memo.text.trim()} title={translate({ id: 'page.browser-memo.previewButton.title', message: 'プレビューを切り替え' })}>
            <Eye size={16} />
          </button>
          <button type="button" onClick={handleCopy} className={`button ${isCopied ? 'button--success' : 'button--secondary'} button--xs`} style={{ padding: '4px', lineHeight: 1 }} disabled={!memo.text.trim()} title={translate({ id: 'page.browser-memo.copyButton.title', message: 'テキストをコピー' })}>
            {isCopied ? <Check size={16} /> : <ClipboardCopy size={16} />}
          </button>
        </div>
        <div ref={containerRef} style={{ display: showSideBySidePreview ? 'flex' : 'block' }}>
          {showSideBySidePreview ? (
            <>
              <div style={{ width: `${dividerPosition}%` }}>
                <MemoTextarea id={textareaId} initialText={memo.text} onSave={(v) => onSave(index, v)} isMinimized={!isExpanded} hasTopBar={showTopBar} onHeightChange={setHeight} ariaLabel={translate({ id: 'page.browser-memo.textarea.ariaLabel', message: 'メモ {number}'}, { number: index + 1})} placeholder={translate({ id: 'page.browser-memo.textarea.placeholder', message: 'メモ {number} (Markdown対応)' }, { number: index + 1 })} isInSideBySide />
              </div>
              <div onMouseDown={handleMouseDown} style={{ width: '10px', cursor: 'col-resize', flexShrink: 0, position: 'relative' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '50%', width: '1px', backgroundColor: 'var(--ifm-color-emphasis-300)', transform: 'translateX(-50%)' }} />
              </div>
              <div style={{ width: `calc(${100 - dividerPosition}% - 10px)` }}>
                <MarkdownPreview text={memo.text} isMinimized={!isExpanded} hasTopBar={showTopBar} isInSideBySide />
              </div>
            </>
          ) : (
            isPreview ? <MarkdownPreview text={memo.text} isMinimized={!isExpanded} hasTopBar={showTopBar} />
            : <MemoTextarea id={textareaId} initialText={memo.text} onSave={(v) => onSave(index, v)} isMinimized={!isExpanded} hasTopBar={showTopBar} onHeightChange={setHeight} ariaLabel={translate({ id: 'page.browser-memo.textarea.ariaLabel', message: 'メモ {number}'}, { number: index + 1})} placeholder={translate({ id: 'page.browser-memo.textarea.placeholder', message: 'メモ {number} (Markdown対応)' }, { number: index + 1 })} />
          )}
        </div>
      </div>
      {renderToggleBar('bottom')}
    </section>
  );
};

/** アプリケーションのメインコンポーネント。状態管理と主要なロジックを担う */
function MemoApp() {
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const [memoItems, setMemoItems] = useState<MemoItem[]>([]);
  const [isAllShared, setIsAllShared] = useState<boolean>(false);

  /** URLハッシュからメモを復元する */
  const restoreFromUrlHash = useCallback((hash: string): MemoItem[] | null => {
    if (!hash) return null;

    if (window.confirm(translate({ id: 'page.browser-memo.confirm.restoreAll', message: '共有されたメモを復元しますか？現在のメモは上書きされます。' }))) {
      try {
        const decompressed = LZString.decompressFromEncodedURIComponent(hash);
        const sharedData: SharedMemo[] = JSON.parse(decompressed);
        const newMemos = createInitialMemoItems();
        sharedData.forEach(memo => {
          if (newMemos[memo.i]) {
            newMemos[memo.i] = { text: memo.t, lastUpdated: Date.now(), isManuallyMinimized: false };
          }
        });
        return newMemos;
      } catch (e) {
        console.error('Failed to restore from URL hash.', e);
        alert(translate({ id: 'page.browser-memo.alert.restoreFailed', message: 'メモの復元に失敗しました。リンクが破損している可能性があります。' }));
      } finally {
        window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
      }
    }
    return null;
  }, []);

  /** 初回マウント時にローカルストレージまたはURLハッシュからメモを復元 */
  useEffect(() => {
    const hash = window.location.hash.slice(1);
    const restoredFromHash = restoreFromUrlHash(hash);
    
    let initialMemos: MemoItem[];
    if (restoredFromHash) {
      initialMemos = restoredFromHash;
    } else {
      try {
        const savedData = localStorage.getItem(STORAGE_KEY);
        initialMemos = savedData ? JSON.parse(savedData) : createInitialMemoItems();
      } catch (e) {
        console.error('Failed to load memos from localStorage.', e);
        initialMemos = createInitialMemoItems();
      }
    }
    setMemoItems(initialMemos);
  }, [restoreFromUrlHash]);

  /** メモの状態が変化したらローカルストレージに自動保存 */
  useEffect(() => {
    if (memoItems.length > 0) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(memoItems));
    }
  }, [memoItems]);

  const handleSave = useCallback((index: number, value: string) => {
    setMemoItems(prevItems => {
      const newItems = [...prevItems];
      if (newItems[index].text !== value) {
        newItems[index] = { ...newItems[index], text: value, lastUpdated: Date.now() };
        return newItems;
      }
      return prevItems;
    });
  }, []);
  
  const handleShareAll = async () => {
    const memosToShare: SharedMemo[] = memoItems.map((item, index) => ({ i: index, t: item.text })).filter(item => item.t.trim() !== '');
    const compressed = LZString.compressToEncodedURIComponent(JSON.stringify(memosToShare));
    const shareUrl = `${window.location.origin}${window.location.pathname}#${compressed}`;

    if (shareUrl.length > URL_LENGTH_WARNING_THRESHOLD && !window.confirm(translate({ id: 'page.browser-memo.alert.urlTooLongConfirm', message: '生成されたURLが非常に長いため、環境によっては機能しない場合があります。続行しますか？\n(短縮URLサービスの利用を推奨します)' }))) {
      return;
    }
    await navigator.clipboard.writeText(shareUrl);
    setIsAllShared(true);
    setTimeout(() => setIsAllShared(false), 2000);
  };

  const handleClearAll = () => {
    if (window.confirm(translate({ id: 'page.browser-memo.confirm.clearAll', message: 'すべてのメモをクリアしますか？この操作は元に戻せません。'}))) {
      setMemoItems(createInitialMemoItems());
    }
  };

  const hasContent = memoItems.some(item => item.text.trim() !== '');

  return (
    <main style={{ padding: '1.5rem' }}>
      <h1 style={{ fontSize: '1.5rem' }}><Translate id="page.browser-memo.h1">ブラウザメモ帳</Translate></h1>
      <p><Translate id="page.browser-memo.intro">すぐに使える高機能でシンプルなブラウザメモ帳です。MarkdownプレビューやURL共有にも対応。入力内容はすべてお使いのブラウザにのみ自動保存されるため、安全にご利用いただけます。</Translate></p>

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

      {memoItems.map((item, index) => (
        <MemoItemComponent key={index} index={index} memo={item} onSave={handleSave} currentLocale={currentLocale} />
      ))}
      
      <section style={{ marginTop: '3rem', paddingTop: '1.5rem', borderTop: '1px solid var(--ifm-color-emphasis-300)', fontSize: '0.9em', color: 'var(--ifm-color-secondary-darkest)' }} aria-labelledby="notes-title">
        <h3 id="notes-title" style={{fontSize: '1.1rem'}}><Translate id="page.browser-memo.notes.title">ご利用上の注意</Translate></h3>
        <ul>
          <li><Translate id="page.browser-memo.notes.markdown">メモはMarkdown形式に対応しています。プレビューボタンで表示を切り替えられます。</Translate></li>
          <li><Translate id="page.browser-memo.notes.storage">メモの内容は、入力が少し止まるか、フォーカスが外れたタイミングで自動的に保存されます。</Translate></li>
          <li><Translate id="page.browser-memo.notes.urlLengthWarning">メモの内容が非常に長い場合、生成されるURLも長くなります。共有機能を使用する際は、短縮URLサービスの利用を推奨します。</Translate></li>
          <li><Translate id="page.browser-memo.notes.backup">この機能は簡易的なものです。重要なデータは別途バックアップを取ることを強く推奨します。</Translate></li>
        </ul>
      </section>
    </main>
  );
}

/** JSON-LDスキーマを動的に<head>に追加・削除するフック */
const useJsonLdSchema = (schema: object | null) => {
  useEffect(() => {
    if (!schema) return;
    
    const script = document.createElement('script');
    script.type = 'application/ld+json';
    const id = `json-ld-${schema['@type'] || 'custom'}`;
    script.id = id;
    script.innerHTML = JSON.stringify(schema);
    
    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById(id);
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, [schema]);
};

function MemoPageContent() {
  const { siteConfig, i18n: { currentLocale } } = useDocusaurusContext();
  
  const pageTitle = translate({ id: 'page.browser-memo.title', message: '高機能ブラウザメモ帳 - Markdown・URL共有対応・インストール不要' });
  const pageDescription = translate({ id: 'page.browser-memo.description', message: 'ログイン・インストール不要ですぐに使える高機能なブラウザメモ帳。Markdownプレビュー、URLでの簡単共有に対応。データはあなたのブラウザ内だけに保存されるため、安全でプライベートなメモ環境を提供します。' });

  // パフォーマンス最適化: JSON-LDスキーマオブジェクトをメモ化
  const softwareApplicationSchema = useMemo(() => {
    const pageUrl = `${siteConfig.url}${siteConfig.baseUrl}${currentLocale === 'ja' ? '' : currentLocale + '/'}browser-memo/`;
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': translate({ id: 'page.browser-memo.h1', message: 'ブラウザメモ帳' }),
      'operatingSystem': 'Any (Web browser)',
      'applicationCategory': 'BrowserApplication',
      'url': pageUrl,
      'description': pageDescription,
      'featureList': [
        translate({id: 'page.browser-memo.feature.markdown', message: 'Markdownプレビュー'}),
        translate({id: 'page.browser-memo.feature.sharing', message: 'URLでのデータ共有'}),
        translate({id: 'page.browser-memo.feature.autosave', message: 'ブラウザへの自動保存'}),
      ],
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': currentLocale === 'ja' ? 'JPY' : 'USD' },
    }
  }, [siteConfig.url, siteConfig.baseUrl, currentLocale, pageDescription]);

  const faqSchema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    'mainEntity': [
      {
        '@type': 'Question', 'name': translate({id: 'page.browser-memo.faq.q1', message: 'メモはどの形式で書けますか？'}),
        'acceptedAnswer': { '@type': 'Answer', 'text': translate({id: 'page.browser-memo.notes.markdown', message: 'メモはMarkdown形式に対応しています。プレビューボタンで表示を切り替えられます。'}) }
      },
      {
        '@type': 'Question', 'name': translate({id: 'page.browser-memo.faq.q2', message: 'いつ保存されますか？'}),
        'acceptedAnswer': { '@type': 'Answer', 'text': translate({id: 'page.browser-memo.notes.storage', message: 'メモの内容は、入力が少し止まるか、フォーカスが外れたタイミングで自動的に保存されます。'}) }
      },
      {
        '@type': 'Question', 'name': translate({id: 'page.browser-memo.faq.q4', message: 'データのバックアップは必要ですか？'}),
        'acceptedAnswer': { '@type': 'Answer', 'text': translate({id: 'page.browser-memo.notes.backup', message: 'この機能は簡易的なものです。重要なデータは別途バックアップを取ることを強く推奨します。'}) }
      }
    ]
  }), [currentLocale]);
  
  useJsonLdSchema(softwareApplicationSchema);
  useJsonLdSchema(faqSchema);
  
  return (
    <Layout title={pageTitle} description={pageDescription}>
      <MemoApp />
    </Layout>
  );
}

/** Docusaurusの<BrowserOnly>でラップし、ブラウザ環境でのみコンテンツを描画するエントリーポイント */
export default function MemoPageWrapper() {
  return (
    <>
      {/* JavaScriptが無効な環境向けのフォールバックメッセージ */}
      <noscript>
        <div style={{ padding: '20px', margin: '20px auto', maxWidth: '800px', textAlign: 'center', backgroundColor: '#fffbe5', color: '#5c4800', border: '1px solid #f0c400', borderRadius: '8px' }}>
          このブラウザメモ帳のすべての機能を利用するには、お使いのブラウザでJavaScriptを有効にしてください。
        </div>
      </noscript>
      <BrowserOnly fallback={<div style={{padding: '2rem', textAlign: 'center'}}>Loading...</div>}>
        {() => <MemoPageContent />}
      </BrowserOnly>
    </>
  );
}

