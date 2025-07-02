import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import NewsSiteCard from '@site/src/components/NewsSiteCard';
import styles from './news.module.css';
import Translate, { translate } from '@docusaurus/Translate';

type SiteInfo = {
  href: string;
  title: string;
  description: string;
};
type CategoryData = {
  categoryId: string;
  title: { id: string; message: string };
  sites: SiteInfo[];
};

const newsCategories: CategoryData[] = [
  {
    categoryId: 'general-economy',
    title: { id: 'news.category.general-economy', message: '総合・経済' },
    sites: [
      { href: 'https://www.reuters.com/', title: 'Reuters', description: '国際ニュース、ビジネス、金融を幅広く報道する世界的な通信社。' },
      { href: 'https://www.bloomberg.co.jp/', title: 'Bloomberg Japan', description: 'ブルームバーグの日本語版。金融・経済情報を中心に提供。' },
      { href: 'https://www.wsj.com/', title: 'The Wall Street Journal', description: '米国発、経済・金融に強みを持つ日刊紙の国際版。' },
      { href: 'https://www.nikkei.com/', title: '日本経済新聞', description: '日本の経済を中心に政治や国際、マーケットなどを扱う総合経済紙。' },
      { href: 'https://www.businessinsider.jp/', title: 'Business Insider Japan', description: 'ミレニアル世代向けに経済やテクノロジーのニュースを提供。' },
      { href: 'https://www.47news.jp/', title: '47NEWS', description: '共同通信と全国の地方新聞社が配信するニュースを網羅。' },
    ],
  },
  {
    categoryId: 'tech-science',
    title: { id: 'news.category.tech-science', message: 'テクノロジー・科学' },
    sites: [
      { href: 'https://www.technologyreview.jp/', title: 'MIT Technology Review Japan', description: 'MIT発、テクノロジー専門誌の日本語版。新技術の動向を解説。' },
      { href: 'https://wired.jp/', title: 'WIRED Japan', description: 'テクノロジーが社会や文化に与える影響を探るメディア。' },
      { href: 'https://scitechdaily.com/', title: 'SciTechDaily', description: '科学技術分野の最新研究やニュースを幅広く紹介するメディア。' },
      { href: 'https://www.sciencedaily.com/', title: 'ScienceDaily', description: '最新の科学研究のプレスリリースを日々配信するニュースサイト。' },
    ],
  },
  {
    categoryId: 'life-weather',
    title: { id: 'news.category.life-weather', message: '生活・天気' },
    sites: [
      { href: 'https://tenki.jp/', title: 'tenki.jp', description: '日本気象協会公式の天気予報専門メディア。防災情報も充実。' },
      { href: 'https://www.accuweather.com/', title: 'AccuWeather', description: '世界中の詳細な天気予報を提供するグローバルな気象メディア。' },
    ],
  },
  {
    categoryId: 'audio-podcast',
    title: { id: 'news.category.audio-podcast', message: '音声・ポッドキャスト' },
    sites: [
      { href: 'https://edition.cnn.com/audio', title: 'CNN Audio', description: 'CNNが提供するニュース、ドキュメンタリー等の音声コンテンツ。' },
      { href: 'https://www.npr.org/programs/weekend-edition-saturday/', title: 'NPR Weekend Edition', description: '米国公共ラジオNPRの週末ニュース・情報番組。' },
      { href: 'https://www.bbc.co.uk/sounds/play/live:bbc_world_service', title: 'BBC World Service', description: 'BBCが世界向けに配信する国際ニュースのラジオサービス。' },
      { href: 'https://www.economist.com/podcasts', title: 'The Economist Podcasts', description: 'エコノミスト誌が配信する政治・経済の深掘り分析ポッドキャスト。' },
    ],
  },
  {
    categoryId: 'platform-others',
    title: { id: 'news.category.platform-others', message: 'プラットフォーム・その他' },
    sites: [
      { href: 'https://x.com/', title: 'X (Twitter)', description: '速報性の高い情報や多様な意見が集まるソーシャルプラットフォーム。' },
      { href: 'https://ground.news/', title: 'Ground News', description: 'ニュースの政治的偏向を可視化し、多角的な視点を提供するプラットフォーム。' },
      { href: 'https://news.ceek.jp/', title: 'CEEK.JP News', description: '国内の主要ニュースサイトを横断検索できるニュース検索エンジン。' },
      { href: 'https://wikileaks.org/', title: 'WikiLeaks', description: '匿名情報源から得た機密情報を公開する非営利組織。' },
    ],
  },
];

export default function NewsPage(): JSX.Element {
  return (
    <Layout
      title={translate({ id: 'news.page.title', message: 'ニュースサイト一覧' })}
      description={translate({ id: 'news.page.description', message: '国内外の情勢や技術トレンドの把握に役立つニュースサイトをまとめています。'})}
    >
      <Head children={''}></Head>
      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1><Translate id="news.page.heading">ニュースサイト</Translate></h1>
          <p><Translate id="news.page.subheading">日々の情報収集に活用できるサイトの一覧です。</Translate></p>
        </div>

        <div className={styles.cardGrid}>
          {newsCategories.map((category) => (
            <React.Fragment key={category.categoryId}>
              <h2 className={styles.categoryTitle}>
                <Translate id={category.title.id}>{category.title.message}</Translate>
              </h2>
              {category.sites.map((site, idx) => (
                <React.Fragment key={`${category.categoryId}-${idx}`}>
                  <NewsSiteCard
                    href={site.href}
                    title={
                      <Translate id={`news.site.${category.categoryId}.${idx}.title`} description={`Title for ${site.title}`}>
                        {site.title}
                      </Translate>
                    }
                    description={
                      <Translate id={`news.site.${category.categoryId}.${idx}.description`} description={`Description for ${site.title}`}>
                        {site.description}
                      </Translate>
                    }
                  />
                </React.Fragment>
              ))}
            </React.Fragment>
          ))}
        </div>
      </main>
    </Layout>
  );
}
