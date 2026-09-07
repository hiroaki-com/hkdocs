import React, { useEffect, useRef, useState } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './styles.module.css';

const WIDGETS_SRC = 'https://platform.twitter.com/widgets.js';

type CreateTweetOptions = { theme?: string; lang?: string; dnt?: boolean; align?: string };

declare global {
  interface Window {
    twttr?: {
      widgets?: {
        createTweet?: (
          id: string,
          target: HTMLElement,
          options?: CreateTweetOptions,
        ) => Promise<HTMLElement | undefined>;
      };
    };
  }
}

// widgets.js は多重読み込みで描画が壊れるため、ページ内で一度だけ挿入する。
function ensureWidgetsScript(): Promise<void> {
  if (window.twttr?.widgets?.createTweet) {
    return Promise.resolve();
  }
  const existing = document.querySelector<HTMLScriptElement>(`script[src="${WIDGETS_SRC}"]`);
  if (existing) {
    return new Promise((resolve) => existing.addEventListener('load', () => resolve(), { once: true }));
  }
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = WIDGETS_SRC;
    script.async = true;
    script.addEventListener('load', () => resolve(), { once: true });
    document.head.appendChild(script);
  });
}

/**
 * Docusaurus のカラーモードは <html data-theme="..."> に載る。
 * theme-common は本サイトの依存構成では解決できないため、属性を直接監視する。
 */
function useHtmlColorMode(): 'light' | 'dark' {
  const [mode, setMode] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const html = document.documentElement;
    const read = () => setMode(html.dataset.theme === 'dark' ? 'dark' : 'light');
    read();
    const observer = new MutationObserver(read);
    observer.observe(html, { attributes: true, attributeFilter: ['data-theme'] });
    return () => observer.disconnect();
  }, []);

  return mode;
}

type Props = {
  /** 投稿の URL（例: https://x.com/chesny/status/2077344214493319484） */
  url: string;
  /** 埋め込みが表示できない場合に残すリンク文言 */
  children?: React.ReactNode;
};

export default function XPost({ url, children }: Props): React.JSX.Element {
  const colorMode = useHtmlColorMode();
  const { i18n: { currentLocale } } = useDocusaurusContext();
  // widgets.js は描画先の要素自体を差し替えるため、React が管理するノードは直接渡さず、
  // ホストの下に使い捨ての slot を作ってそこへ描画させる
  const hostRef = useRef<HTMLDivElement>(null);
  const [embedded, setEmbedded] = useState(false);

  const statusId = url.match(/status\/(\d+)/)?.[1];

  useEffect(() => {
    if (!statusId) {
      return undefined;
    }
    let cancelled = false;
    const host = hostRef.current;

    ensureWidgetsScript().then(() => {
      if (cancelled || !host) {
        return;
      }
      // テーマ切替時は作り直しになるため、前回のカードごと slot を差し替える
      const slot = document.createElement('div');
      host.replaceChildren(slot);
      window.twttr?.widgets
        ?.createTweet?.(statusId, slot, {
          theme: colorMode,
          lang: currentLocale,
          dnt: true,
          align: 'left',
        })
        .then((element) => {
          if (!cancelled) {
            setEmbedded(Boolean(element));
          }
        });
    });

    return () => {
      cancelled = true;
    };
  }, [statusId, colorMode, currentLocale]);

  return (
    <div className={styles.container}>
      <div ref={hostRef} />
      {/* 埋め込み成功後も unmount せず hidden で隠す（React が widgets.js の DOM 操作と衝突するため） */}
      <p className={styles.fallback} hidden={embedded}>
        <a href={url} target="_blank" rel="noopener noreferrer">
          {children ?? url}
        </a>
      </p>
    </div>
  );
}
