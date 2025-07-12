import React, { useState, useEffect, type ReactElement } from 'react';
import { useLocation } from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {
  FacebookShareButton as OriginalFacebookShareButton,
  TwitterShareButton as OriginalTwitterShareButton,
  HatenaShareButton as OriginalHatenaShareButton,
  FacebookIcon,
  XIcon,
  HatenaIcon,
} from 'react-share';
import { Copy, Share2, Check } from 'lucide-react';
import styles from './styles.module.css';

// ライブラリ(react-share)の型定義がReact 19に未対応である問題を安全に回避するため、
// 型をanyとして定義します。これは意図的な措置。
const TwitterShareButton = OriginalTwitterShareButton as any;
const FacebookShareButton = OriginalFacebookShareButton as any;
const HatenaShareButton = OriginalHatenaShareButton as any;

interface Props {
  // titleプロパティはオプションで、指定されなかった場合は自動で取得。
  title?: string;
}

export default function ShareButtons({ title: propTitle }: Props): ReactElement | null {
  const { siteConfig } = useDocusaurusContext();
  const location = useLocation();
  const [pageUrl, setPageUrl] = useState('');
  const [pageTitle, setPageTitle] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [showNativeShare, setShowNativeShare] = useState(false);

  useEffect(() => {
    // URLとページタイトルは、ブラウザ環境でのみ正しく取得できるため、useEffect内で設定。
    setPageUrl(new URL(location.pathname, siteConfig.url).href);

    let title = '';
    if (propTitle) {
      // Propsでタイトルが渡された場合は、それを優先。
      title = propTitle;
    } else if (typeof document !== 'undefined') {
      // Docusaurusが生成する `document.title` (例: "記事タイトル | サイトタイトル") から、
      // サイトタイトル部分を除去して、記事タイトルのみを抽出。
      const siteTitleSuffix = ` | ${siteConfig.title}`;
      title = document.title.endsWith(siteTitleSuffix)
        ? document.title.slice(0, -siteTitleSuffix.length)
        : document.title;
    }
    setPageTitle(title);

    // モバイルなどで利用可能なネイティブのWeb Share APIが存在するかチェック。
    if (typeof navigator !== 'undefined' && navigator.share) {
      setShowNativeShare(true);
    }
  }, [location.pathname, siteConfig.url, siteConfig.title, propTitle]);

  // サーバーサイドレンダリング時や、URL/タイトル取得前は何もレンダリングしない。
  // これにより、不完全な情報での表示を防ぐ。
  if (!pageUrl || !pageTitle) {
    return null;
  }

  // SNSでシェアされる際の引用文を生成。
  const shareQuote = `"${pageTitle}" - ${siteConfig.title}`;

  const handleNativeShare = async () => {
    try {
      await navigator.share({
        title: pageTitle,
        text: shareQuote,
        url: pageUrl,
      });
    } catch (error) {
      // ユーザーが共有をキャンセルした場合などもエラーになるため、コンソールに出力して把握できるように。
      console.error('Error using Web Share API:', error);
    }
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(pageUrl);
    setIsCopied(true);
    // 2秒後に「コピーしました」の表示を元に戻す。
    setTimeout(() => setIsCopied(false), 2000);
  };

  return (
    <div className={styles.shareContainer}>
      <h4 className={styles.shareTitle}>Share</h4>
      <div className={styles.buttonGroup}>
        {showNativeShare && (
          <button
            onClick={handleNativeShare}
            className={`${styles.shareButton} ${styles.nativeShareButton}`}
            aria-label="Share via your device's share dialog"
          >
            <Share2 size={24} />
            <span className={styles.buttonLabel}>Share</span>
          </button>
        )}
        <TwitterShareButton url={pageUrl} title={shareQuote}>
          <XIcon size={40} round />
        </TwitterShareButton>
        <FacebookShareButton url={pageUrl} quote={shareQuote}>
          <FacebookIcon size={40} round />
        </FacebookShareButton>
        <HatenaShareButton url={pageUrl} title={shareQuote}>
          <HatenaIcon size={40} round />
        </HatenaShareButton>
        <button
          onClick={handleCopyLink}
          className={`${styles.shareButton} ${styles.copyButton}`}
          aria-label="Copy to clipboard"
        >
          {isCopied ? <Check size={24} color="green" /> : <Copy size={24} />}
          <span className={styles.buttonLabel}>
            {isCopied ? 'Copied!' : 'Copy'}
          </span>
        </button>
      </div>
    </div>
  );
}
