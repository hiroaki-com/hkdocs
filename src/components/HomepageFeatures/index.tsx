// hkdocs/src/components/HomepageFeatures/index.tsx

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link'; // DocusaurusのLinkコンポーネント（内部リンク用）
import styles from './styles.module.css';

type FeatureItem = {
  title: string;
  Svg: React.ComponentType<React.ComponentProps<'svg'>>;
  description: ReactNode;
  link: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'Tech',
    // TODO: Techセクションに適したSVGに置き換えてください
    Svg: require('@site/static/img/undraw_docusaurus_mountain.svg').default,
    description: (
      <>
        ブログ記事や日常の学びを整理する場所です。 {/* 「学無」を「学ぶ」に修正しました */}
      </>
    ),
    link: '/docs/intro',
  },
  {
    title: 'Blog',
    // TODO: ブログセクションに適したSVGに置き換えてください
    Svg: require('@site/static/img/undraw_docusaurus_tree.svg').default,
    description: (
      <>
        技術的な学びに関するフランクなブログ記事です。
      </>
    ),
    link: '/blog',
  },
  {
    title: 'Diary',
    // TODO: ダイアリーセクションに適したSVGに置き換えてください
    Svg: require('@site/static/img/undraw_docusaurus_react.svg').default,
    description: (
      <>
        日々の記録や個人的な雑記メモです。
      </>
    ),
    link: '/diary',
  },
];

// Featureコンポーネントを修正し、SVG画像のみをLinkでラップ
function Feature({title, Svg, description, link}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      {/* SVG画像部分のみをLinkで囲む */}
      <div className="text--center">
        <Link to={link} aria-label={title}> {/* titleをaria-labelに指定 */}
          <Svg className={styles.featureSvg} role="img" />
        </Link>
      </div>
      <div className="text--center padding-horiz--md">
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p>{description}</p>
        {/* 必要であれば、ここにもテキストリンクを追加できます */}
        {/*
        <div style={{ marginTop: '1rem' }}>
          <Link className="button button--secondary button--sm" to={link}>
            {title} へ
          </Link>
        </div>
        */}
      </div>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>

        {/* --- 作業用ドキュメントリンク (一時的) - 開始 --- */}
        {/* このセクションは作業完了後に削除してください。 */}
        <div
          className="row"
          style={{
            marginTop: '3rem',
            padding: '1.5rem',
            border: '2px dashed #e0e0e0',
            backgroundColor: '#f9f9f9',
            borderRadius: '8px',
          }}
          id="temp-work-links" // 削除時に特定しやすくするためのID
        >
          <div className="col col--12 text--center">
            <Heading as="h3" style={{ marginBottom: '1.5rem', color: '#555' }}>
              作業用ドキュメントリンク (一時利用)
            </Heading>
            <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="https://docusaurus.io/docs" target="_blank" rel="noopener noreferrer">
                  Docusaurus Docs
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="https://docusaurus.io/showcase" target="_blank" rel="noopener noreferrer">
                  Docusaurus Showcase
                </a>
              </li>
              <li style={{ marginBottom: '0.75rem' }}>
                <a href="https://docusaurus.io/community/support" target="_blank" rel="noopener noreferrer">
                  Docusaurus Community Support
                </a>
              </li>
            </ul>
            <p style={{ fontSize: '0.9em', color: '#888', marginTop: '1rem' }}>
              <strong>注意:</strong> これらのリンクは一時的なもので、作業完了後に削除されます。
            </p>
          </div>
        </div>
        {/* --- 作業用ドキュメントリンク (一時的) - 終了 --- */}

      </div>
    </section>
  );
}
