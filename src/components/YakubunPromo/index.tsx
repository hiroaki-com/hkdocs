import React, { useEffect, useRef, useState } from 'react';
import type { JSX } from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// 訳文は英語→日本語の iPhone・iPad アプリなので、日本語ページの Mac には QR、iPhone・iPad には App Store バッジで案内する
type Campaign =
  | 'darts-result'
  | 'blog-apple-dev'
  | 'blog-colab-ollama'
  | 'docs-colab-llm-server'
  | 'docs-colab-private-chat'
  | 'blog-obsidian';
type Device = 'mac' | 'ios';

const DISMISS_KEY = 'yakubun-promo-dismissed-at';
const SHOWN_KEY = 'yakubun-promo-shown';
const DISMISS_DAYS = 14;

const appStoreUrl = (ct: string) =>
  `https://apps.apple.com/jp/app/apple-store/id6827465815?pt=129688386&mt=8&ct=${ct}`;

// iPadOS の Safari は既定で Macintosh の UA を名乗るため、タッチ点数で Mac と iPad を見分ける
function detectDevice(): Device | null {
  const ua = navigator.userAgent;
  if (/iPhone|iPad|iPod/.test(ua)) return 'ios';
  const uaData = (navigator as Navigator & { userAgentData?: { platform?: string } }).userAgentData;
  const isMacUa = uaData?.platform ? uaData.platform === 'macOS' : /Macintosh/.test(ua);
  if (!isMacUa) return null;
  return navigator.maxTouchPoints > 1 ? 'ios' : 'mac';
}

function isDismissed(): boolean {
  try {
    const at = Number(localStorage.getItem(DISMISS_KEY));
    return at > 0 && Date.now() - at < DISMISS_DAYS * 24 * 60 * 60 * 1000;
  } catch {
    return false;
  }
}

// 置き場所ごとに 1 回の訪問（タブのセッション）で 1 度だけ出す。対戦を繰り返すたびに出ると煩わしいため
function claimShowThisVisit(slotKey: string): boolean {
  const key = `${SHOWN_KEY}:${slotKey}`;
  try {
    if (sessionStorage.getItem(key)) return false;
    sessionStorage.setItem(key, '1');
  } catch {
    // ストレージが使えない環境では毎回表示する
  }
  return true;
}

// 同じページの別の置き場所も一緒に閉じるための通知
const DISMISS_EVENT = 'yakubun-promo-dismiss';

export default function YakubunPromo({
  campaign,
  placement,
}: {
  campaign: Campaign;
  placement?: 'mid';
}): JSX.Element | null {
  const slotKey = placement ? `${campaign}-${placement}` : campaign;
  const { i18n: { currentLocale } } = useDocusaurusContext();
  const qrSrc = useBaseUrl(`/img/yakubun-qr-${campaign}.svg`);
  const badgeSrc = useBaseUrl('/img/yakubun-app-store-badge-ja.svg');
  const iconSrc = useBaseUrl('/img/yakubun-app-icon.png');
  const [device, setDevice] = useState<Device | null>(null);
  // StrictMode の再実行で 2 回目が「表示済み」と判定して消えないよう、判定は 1 度だけ行う
  const decided = useRef(false);

  useEffect(() => {
    if (decided.current) return;
    decided.current = true;
    const detected = detectDevice();
    if (currentLocale !== 'ja' || !detected || isDismissed()) return;
    if (claimShowThisVisit(slotKey)) setDevice(detected);
  }, [currentLocale, slotKey]);

  useEffect(() => {
    const hide = () => setDevice(null);
    window.addEventListener(DISMISS_EVENT, hide);
    return () => window.removeEventListener(DISMISS_EVENT, hide);
  }, []);

  if (!device) return null;

  const dismiss = () => {
    try {
      localStorage.setItem(DISMISS_KEY, String(Date.now()));
    } catch {
      // 保存できなくても、このページ内では閉じる
    }
    window.dispatchEvent(new Event(DISMISS_EVENT));
  };

  return (
    <aside className={styles.card} aria-label="訳文のご案内">
      <div className={styles.copy}>
        <div className={styles.app}>
          <img className={styles.icon} src={iconSrc} alt="" width={40} height={40} />
          <div className={styles.appText}>
            <span className={styles.appName}>訳文</span>
            <span className={styles.appMeta}>Safari 機能拡張・iPhone / iPad</span>
          </div>
        </div>
        <strong className={styles.title}>英語のページを日本語で。セキュリティファーストの翻訳機。</strong>
        <span className={styles.desc}>
          翻訳は端末で完結し、個人情報を取得しないプライベート設計。英語の情報収集や学習にも。iPhone・iPad 向けに無料配信中です。
        </span>
        {device === 'mac' ? (
          <a className={styles.link} href={appStoreUrl(`hkdocs-${slotKey}`)} target="_blank" rel="noopener noreferrer">
            App Store で見る →
          </a>
        ) : (
          <a className={styles.badge} href={appStoreUrl(`hkdocs-${slotKey}-ios`)} target="_blank" rel="noopener noreferrer">
            <img src={badgeSrc} alt="App Store からダウンロード" height={40} />
          </a>
        )}
      </div>
      {device === 'mac' && (
        <img className={styles.qr} src={qrSrc} alt="App Store の「訳文」ページの QR コード" width={84} height={84} />
      )}
      <button type="button" className={styles.close} onClick={dismiss} aria-label="閉じる">
        ×
      </button>
    </aside>
  );
}
