import React from 'react';
import type { JSX } from 'react';
import clsx from 'clsx';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';
import Heading from '@theme/Heading';
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
        <p className={styles.heroSubtitle}>{siteConfig.tagline}</p>
      </div>
    </header>
  );
}

export default function Home(): JSX.Element {
  const {siteConfig} = useDocusaurusContext();

  // 検索エンジンやSNS向けの紹介文（メタディスクリプション）
  const metaDescription = translate({
    id: 'homepage.meta.description',
    message: '技術情報、日々の学びをまとめた技術ブログです。ブラウザメモ帳、ニュースサイト一覧、技術・論文のリンク集なども提供しています。',
    description: 'The meta description for the homepage',
  });

  return (
    <Layout
      title={siteConfig.title}
      description={metaDescription}
    >
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
