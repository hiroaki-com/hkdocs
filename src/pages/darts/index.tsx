import React, { useEffect, useMemo } from 'react';
import type { JSX } from 'react';
import Head from '@docusaurus/Head';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import Translate, { translate } from '@docusaurus/Translate';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

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

export default function DartsTop(): JSX.Element {
  const { siteConfig, i18n: { currentLocale } } = useDocusaurusContext();

  const pageTitle = translate({ id: 'page.darts-top.title', message: 'ダーツ計算アプリ - 01 & クリケット スコア管理' });
  const pageDescription = translate({ id: 'page.darts-top.description', message: 'インストール不要で使える無料のダーツスコア計算アプリ。01（ゼロワン）やクリケットのスコアをブラウザで簡単に計算・記録できます。' });

  const softwareApplicationSchema = useMemo(() => {
    const pageUrl = `${siteConfig.url}${siteConfig.baseUrl}${currentLocale === 'ja' ? '' : currentLocale + '/'}darts/`;
    return {
      '@context': 'https://schema.org',
      '@type': 'SoftwareApplication',
      'name': translate({ id: 'page.darts-top.h1', message: 'ダーツ計算アプリ' }),
      'operatingSystem': 'Any (Web browser)',
      'applicationCategory': 'SportsApplication, UtilitiesApplication',
      'url': pageUrl,
      'description': pageDescription,
      'offers': { '@type': 'Offer', 'price': '0', 'priceCurrency': currentLocale === 'ja' ? 'JPY' : 'USD' },
    };
  }, [siteConfig.url, siteConfig.baseUrl, currentLocale, pageDescription]);

  useJsonLdSchema(softwareApplicationSchema);

  return (
    <Layout title={pageTitle} description={pageDescription}>
      <Head
        children={
          <meta name="keywords" content={translate({ id: 'page.darts-top.keywords', message: 'ダーツ, 計算, アプリ, スコア, 01, ゼロワン, クリケット, 無料, ブラウザ' })} />
        }
      />

      <main className="container margin-vert--lg text--center">
        <h1>🎯 <Translate id="page.darts-top.h1">ダーツ計算アプリ</Translate></h1>
        
        <div style={{ margin: '0.5rem 0 1.5rem 0' }}>
          <GitHubStarLink repo="hiroaki-com/hkdocs" />
        </div>

        <div className="row" style={{ justifyContent: 'center' }}>
          <div className="col col--8">
            <p className="text--secondary margin-bottom--sm">
              <Translate id="page.darts-top.intro.desc">
                定番ゲーム「01（ゼロワン）」と「クリケット」のスコアを簡単に計算・管理できる無料のWebアプリです。インストール不要で、スマホやPCのブラウザからすぐにご利用いただけます。
              </Translate>
            </p>
            <p className="margin-bottom--lg" style={{ fontWeight: 'bold' }}>
              <Translate id="page.darts-top.intro.action">
                プレイするゲームを選択してください👇
              </Translate>
            </p>
          </div>
        </div>

        <div className="row">
          {/* 01ゲーム のカード */}
          <div className="col col--6 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="card__header">
                <h2><Translate id="page.darts-top.01.title">01 ゲーム</Translate></h2>
              </div>
              <div className="card__body" style={{ flexGrow: 1 }}>
                <div style={{ 
                  backgroundColor: 'var(--ifm-color-emphasis-100)', 
                  borderRadius: 'var(--ifm-global-radius)', 
                  aspectRatio: '16 / 9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <span style={{ color: 'var(--ifm-color-content-secondary)' }}>
                    <Translate id="page.darts-top.01.demo-placeholder">[ ここに 01 のデモ動画/GIF ]</Translate>
                  </span>
                  {/* ▼ 実際の動画を入れる時はここをコメントアウトして使います
                  <video src="/img/darts-01-demo.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                  */}
                </div>
              </div>
              <div className="card__footer">
                <Link to="/darts/darts-01-score-calculator" className="button button--primary button--lg button--block">
                  🎯 <Translate id="page.darts-top.01.button">01 ゲームをプレイ</Translate>
                </Link>
              </div>
            </div>
          </div>

          {/* クリケット のカード */}
          <div className="col col--6 margin-bottom--lg">
            <div className="card shadow--md" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <div className="card__header">
                <h2><Translate id="page.darts-top.cricket.title">クリケット</Translate></h2>
              </div>
              <div className="card__body" style={{ flexGrow: 1 }}>
                <div style={{ 
                  backgroundColor: 'var(--ifm-color-emphasis-100)', 
                  borderRadius: 'var(--ifm-global-radius)', 
                  aspectRatio: '16 / 9', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  overflow: 'hidden'
                }}>
                  <span style={{ color: 'var(--ifm-color-content-secondary)' }}>
                    <Translate id="page.darts-top.cricket.demo-placeholder">[ ここに クリケット のデモ動画/GIF ]</Translate>
                  </span>
                  {/* ▼ 実際の動画を入れる時はここをコメントアウトして使います
                  <video src="/img/darts-cricket-demo.mp4" autoPlay loop muted playsInline style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> 
                  */}
                </div>
              </div>
              <div className="card__footer">
                <Link to="/darts/darts-cricket-score-calculator" className="button button--primary button--lg button--block">
                  🏏 <Translate id="page.darts-top.cricket.button">クリケットをプレイ</Translate>
                </Link>
              </div>
            </div>
          </div>
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
