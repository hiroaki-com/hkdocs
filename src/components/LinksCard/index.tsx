import React, { useState, JSX } from 'react';
import styles from './styles.module.css';

// ファビコンが取得できなかった場合に表示するデフォルトアイコン
const DefaultIcon = (): JSX.Element => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1h-2v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.62-1.23 4.96-3.1 6.39z" />
  </svg>
);

type Props = {
  href: string;
  title: React.ReactNode;
  description: React.ReactNode;
};

export default function LinksCard({ href, title, description }: Props): JSX.Element {
  const domain = new URL(href).hostname;

  // 試行するファビコンAPIのURLリスト。Google APIを優先する。
  const faviconSources = [
    `https://www.google.com/s2/favicons?domain=${domain}&sz=128`,
    `https://icons.duckduckgo.com/ip3/${domain}.ico`,
  ];

  const [sourceIndex, setSourceIndex] = useState(0);
  const [useDefaultIcon, setUseDefaultIcon] = useState(false);

  // アイコン取得に失敗した場合、リスト内の次のAPIを試すフォールバック処理
  const handleError = () => {
    if (sourceIndex < faviconSources.length - 1) {
      setSourceIndex(sourceIndex + 1);
    } else {
      setUseDefaultIcon(true); // 全てのAPIで失敗したらデフォルトアイコンを表示
    }
  };

  const altText = typeof title === 'string' ? title : 'ニュースサイト';

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className={styles.cardLink}>
      <div className={styles.card}>
        <div className={styles.imageContainer}>
          {useDefaultIcon ? (
            <DefaultIcon />
          ) : (
            <img
              src={faviconSources[sourceIndex]}
              alt={`${altText} のファビコン`}
              className={styles.image}
              onError={handleError}
              loading="lazy"
            />
          )}
        </div>
        <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <p className={styles.description}>{description}</p>
        </div>
      </div>
    </a>
  );
}
