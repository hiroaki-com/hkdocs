// hkdocs/src/components/HomepageFeatures/index.tsx

import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import Link from '@docusaurus/Link';
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
        このサイトの基礎的な使い方や主要な機能を学ぶことができます。 {/* 「学無」を「学ぶ」に修正しました */}
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
        技術的な学びの整理場所です。
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
        日々の記録や個人的な雑記メモはこちらから。
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
      </div>
    </section>
  );
}
