import React, { useEffect, useMemo } from 'react';
import type { JSX } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

const useJsonLdSchema = (schema: Record<string, unknown> | null) => {
  useEffect(() => {
    if (!schema) return;
    const id = `json-ld-${schema['@type'] ?? 'custom'}`;
    const script = Object.assign(document.createElement('script'), {
      type: 'application/ld+json',
      id,
      innerHTML: JSON.stringify(schema),
    });
    document.head.appendChild(script);
    return () => document.getElementById(id)?.remove();
  }, [schema]);
};

const GAME_CARDS = [
  {
    titleId:    'page.darts-top.01.title',
    titleMsg:   '01 ゲーム',
    buttonId:   'page.darts-top.01.button',
    buttonMsg:  '01 ゲームをプレイ',
    to:         '/darts/darts-01-score-calculator',
  },
  {
    titleId:    'page.darts-top.cricket.title',
    titleMsg:   'クリケット',
    buttonId:   'page.darts-top.cricket.button',
    buttonMsg:  'クリケットをプレイ',
    to:         '/darts/darts-cricket-score-calculator',
  },
] as const;

export default function DartsTop(): JSX.Element {
  const { siteConfig, i18n: { currentLocale } } = useDocusaurusContext();

  const pageTitle = translate({ id: 'page.darts-top.title', message: 'ダーツ計算アプリ - 01 & クリケット スコア管理' });
  const pageDescription = translate({ id: 'page.darts-top.description', message: 'インストール不要で使える無料のダーツスコア計算アプリ。01（ゼロワン）やクリケットのスコアをブラウザで簡単に計算・記録できます。' });

  const schema = useMemo(() => ({
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: translate({ id: 'page.darts-top.h1', message: 'ダーツ計算アプリ' }),
    operatingSystem: 'Any (Web browser)',
    applicationCategory: 'SportsApplication, UtilitiesApplication',
    url: `${siteConfig.url}${siteConfig.baseUrl}${currentLocale === 'ja' ? '' : currentLocale + '/'}darts/`,
    description: pageDescription,
    offers: { '@type': 'Offer', price: '0', priceCurrency: currentLocale === 'ja' ? 'JPY' : 'USD' },
  }), [siteConfig.url, siteConfig.baseUrl, currentLocale, pageDescription]);

  useJsonLdSchema(schema);

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head children={
        <meta name="keywords" content={translate({ id: 'page.darts-top.keywords', message: 'ダーツ, 計算, アプリ, スコア, 01, ゼロワン, クリケット, 無料, ブラウザ' })} />
      } />

      <main className="container margin-vert--lg text--center">
        <h1>
          <Translate id="page.darts-top.h1">無料で使えるダーツ計算用ブラウザアプリ</Translate>
        </h1>

        <div style={{ margin: '0.5rem 0 1.5rem' }}>
          <GitHubStarLink repo="hiroaki-com/hkdocs" />
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          <div className="col col--8">
            <p className="margin-bottom--sm" style={{ color: 'var(--ifm-font-color-secondary)' }}>
              <Translate id="page.darts-top.intro.desc">
                定番「01」と「クリケット」のスコアを簡単に計算・管理して自宅でダーツを楽しもう
              </Translate>
            </p>
            <p className="margin-bottom--lg" style={{ fontWeight: 'bold' }}>
              <Translate id="page.darts-top.intro.action">プレイするゲームを選択</Translate>
            </p>
          </div>
        </div>

        <div className="row">
          {GAME_CARDS.map(({ titleId, titleMsg, buttonId, buttonMsg, to }) => (
            <div key={to} className="col col--6 margin-bottom--lg">
              <div className="card shadow--md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <div className="card__header">
                  <h2><Translate id={titleId}>{titleMsg}</Translate></h2>
                </div>
                <div className="card__body" style={{ flexGrow: 1 }}>
                  <div style={{
                    backgroundColor: 'var(--ifm-color-emphasis-100)',
                    borderRadius: 'var(--ifm-global-radius)',
                    aspectRatio: '16 / 9',
                  }} />
                </div>
                <div className="card__footer">
                  <Link to={to} className="button button--primary button--lg button--block">
                    <Translate id={buttonId}>{buttonMsg}</Translate>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: '3rem', marginBottom: '1rem' }}>
          <GitHubStarLink repo="hiroaki-com/hkdocs" />
        </div>

        <div style={{ marginBottom: '3rem' }}>
          <ShareButtons />
        </div>
      </main>
    </Layout>
  );
}
