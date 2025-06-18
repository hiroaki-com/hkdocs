import React from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
// Docusaurusの翻訳機能をインポート
import { translate } from '@docusaurus/Translate';

import styles from './index.module.css';

function HomepageHeader(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <Heading as="h1" className={styles.heroTitle}>
          {siteConfig.title}
        </Heading>
        {/* siteConfig.taglineはdocusaurus.config.jsのi18n設定で自動的に翻訳されるのでこのままでOK */}
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      // siteConfig.titleは設定ファイルから取得するため、そのままでOK
      title={siteConfig.title}
      // descriptionをtranslate関数で囲む
      description={translate({
        id: 'homepage.meta.description',
        message: 'My Tech Blog',
        description: 'The meta description for the homepage',
      })}
    >
      <HomepageHeader />
      <main>
        {/* HomepageFeaturesコンポーネント内のテキストも、同様にi18n対応が必要です */}
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
