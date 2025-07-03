import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import NewsSiteCard from '@site/src/components/NewsSiteCard';
import styles from './news.module.css';
import Translate, { translate } from '@docusaurus/Translate';

export default function NewsPage(): JSX.Element {
  return (
    <Layout
      title={translate({ id: 'news.page.title', message: 'ニュース一覧' })}
      description={translate({
        id: 'news.page.description',
        message:
          '国内外の情勢や技術トレンドの把握に役立つニュースをまとめています。',
      })}
    >
      <Head children={''} />
      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>
            <Translate id="news.page.heading">ニュース</Translate>
          </h1>
          <p>
            <Translate id="news.page.subheading">
              日々の情報収集のために
            </Translate>
          </p>
        </div>

        {/* --- 日本 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="japan" className={styles.majorCategoryTitle}>
              <Translate id="news.majorCategory.japan">日本</Translate>
            </h2>
          </summary>

          {/* 日本 > 総合・経済 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3
                id="japan-general-economy"
                className={styles.categoryTitle}
              >
                <Translate id="news.category.general-economy-jp">
                  総合・経済
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www.yahoo.co.jp/"
                title={
                  <Translate id="news.site.jp.ge.yahoo.title">
                    Yahoo! Japan ニュース
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.yahoo.desc">
                    日本最大級のポータルサイト。主要ニュースや速報、独自コンテンツを提供。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.nikkei.com/"
                title={
                  <Translate id="news.site.jp.ge.nikkei.title">
                    日本経済新聞
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.nikkei.desc">
                    日本の経済を中心に政治や国際、マーケットなどを扱う総合経済紙。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.bloomberg.co.jp/"
                title={
                  <Translate id="news.site.jp.ge.bloomberg.title">
                    Bloomberg Japan
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.bloomberg.desc">
                    ブルームバーグの日本語版。金融・経済情報を中心に提供。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.businessinsider.jp/"
                title={
                  <Translate id="news.site.jp.ge.bi.title">
                    Business Insider Japan
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.bi.desc">
                    ミレニアル世代向けに経済やテクノロジーのニュースを提供する日本語版。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.47news.jp/"
                title={
                  <Translate id="news.site.jp.ge.47news.title">
                    47NEWS
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.47news.desc">
                    共同通信と全国の地方新聞社が配信するニュースを網羅。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://jp.reuters.com/"
                title={
                  <Translate id="news.site.jp.ge.reuters.title">ロイター</Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.reuters.desc">
                    国際ニュース通信社ロイターの日本語版。世界のビジネス、金融、株式、政治ニュースを配信。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://minkabu.jp/"
                title={
                  <Translate id="news.site.jp.ge.minkabu.title">
                    みんかぶ
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.minkabu.desc">
                    株式、FX、暗号資産など、投資家向けのニュースや分析ツールを提供する金融情報プラットフォーム。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://sekai-kabuka.com/pc-index.html"
                title={
                  <Translate id="news.site.jp.ge.sekaikabuka.title">
                    世界の株価
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.sekaikabuka.desc">
                    世界各国の株価指数、為替、商品、仮想通貨などの最新マーケット情報を一覧で提供する金融情報サイト。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > テクノロジー・科学 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="japan-tech-science" className={styles.categoryTitle}>
                <Translate id="news.category.tech-science-jp">
                  テクノロジー・科学
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www.technologyreview.jp/"
                title={
                  <Translate id="news.site.jp.ts.mit.title">
                    MIT Technology Review Japan
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ts.mit.desc">
                    MIT発、テクノロジー専門誌の日本語版。新技術の動向を解説。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://wired.jp/"
                title={
                  <Translate id="news.site.jp.ts.wired.title">
                    WIRED Japan
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ts.wired.desc">
                    テクノロジーが社会や文化に与える影響を探るメディアの日本語版。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://ascii.jp/"
                title={
                  <Translate id="news.site.jp.ts.ascii.title">ASCII.jp</Translate>
                }
                description={
                  <Translate id="news.site.jp.ts.ascii.desc">
                    老舗IT雑誌アスキーのWeb版。デジタルガジェットや最新技術情報を配信。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://japan.cnet.com/"
                title={
                  <Translate id="news.site.jp.ts.cnet.title">
                    CNET Japan
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ts.cnet.desc">
                    米国発のテクノロジーメディアの日本版。企業向けIT情報が充実。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://gigazine.net/"
                title={
                  <Translate id="news.site.jp.ts.gigazine.title">
                    GIGAZINE
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ts.gigazine.desc">
                    2000年から続く老舗テクノロジーニュースサイト。ユニークな視点の記事が特徴。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > セキュリティ・IT専門 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="japan-security" className={styles.categoryTitle}>
                <Translate id="news.category.security-jp">
                  セキュリティ・IT専門
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www.security-next.com/"
                title={
                  <Translate id="news.site.jp.sec.secnext.title">
                    Security NEXT
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.sec.secnext.desc">
                    セキュリティ・個人情報関連の専門ニュースサイト。情報漏洩や脆弱性情報を配信。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.ipa.go.jp/"
                title={
                  <Translate id="news.site.jp.sec.ipa.title">
                    IPA 情報処理推進機構
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.sec.ipa.desc">
                    日本のIT政策実施機関。セキュリティ情報や技術動향を公式発信。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > テレビ局ニュース */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="japan-tv-news" className={styles.categoryTitle}>
                <Translate id="news.category.tv-news-jp">テレビ局ニュース</Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www3.nhk.or.jp/news/"
                title={
                  <Translate id="news.site.jp.tv.nhk.title">
                    NHK NEWS WEB
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.nhk.desc">
                    日本放送協会の総合ニュースサイト。国内外の幅広いニュースを提供。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://news.tbs.co.jp/"
                title={
                  <Translate id="news.site.jp.tv.tbs.title">TBS NEWS</Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.tbs.desc">
                    TBSテレビのニュースサイト。時事問題や社会情勢を詳しく報道。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.ntv.co.jp/news/"
                title={
                  <Translate id="news.site.jp.tv.ntv.title">
                    日テレNEWS
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.ntv.desc">
                    日本テレビのニュースサイト。速報性の高いニュースを提供。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.fnn.jp/"
                title={
                  <Translate id="news.site.jp.tv.fuji.title">
                    フジテレビNEWS
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.fuji.desc">
                    フジテレビの報道部門によるニュース配信サイト。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://news.tv-asahi.co.jp/"
                title={
                  <Translate id="news.site.jp.tv.asahi.title">
                    テレ朝NEWS
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.asahi.desc">
                    テレビ朝日のニュースサイト。独自の視点で情報を発信。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://txbiz.tv-tokyo.co.jp/"
                title={
                  <Translate id="news.site.jp.tv.tx.title">
                    テレ東BIZ
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.tv.tx.desc">
                    テレビ東京の経済・ビジネスニュース専門サイト。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > プレスリリース */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="japan-press-release" className={styles.categoryTitle}>
                <Translate id="news.category.press-release-jp">
                  プレスリリース
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://prtimes.jp/"
                title={
                  <Translate id="news.site.jp.pr.prtimes.title">
                    PR TIMES
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.pr.prtimes.desc">
                    国内最大級のプレスリリース配信サービス。企業の最新情報をいち早く入手可能。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://kyodonewsprwire.jp/"
                title={
                  <Translate id="news.site.jp.pr.kyodo.title">
                    共同通信PRワイヤー
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.pr.kyodo.desc">
                    共同通信社が運営するプレスリリース配信サービス。信頼性の高い企業情報を提供。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > 生活・天気 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="japan-life-weather" className={styles.categoryTitle}>
                <Translate id="news.category.life-weather-jp">
                  生活・天気
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://tenki.jp/"
                title={
                  <Translate id="news.site.jp.lw.tenki.title">tenki.jp</Translate>
                }
                description={
                  <Translate id="news.site.jp.lw.tenki.desc">
                    日本気象協会公式の天気予報専門メディア。防災情報も充実。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://weather.yahoo.co.jp/weather/jp/1b/1400.html"
                title={
                  <Translate id="news.site.jp.lw.yahoo.title">
                    Yahoo! 天気・災害
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.lw.yahoo.desc">
                    Yahoo! Japanによる天気予報と災害情報。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 日本 > まとめ */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3
                id="japan-summary-sites"
                className={styles.categoryTitle}
              >
                <Translate id="news.category.summary-sites-jp">
                  まとめ
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://news.ceek.jp/"
                title={
                  <Translate id="news.site.jp.ss.ceek.title">
                    CEEK.JP News
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ss.ceek.desc">
                    国内の主要ニュースを横断検索できるニュース検索エンジン。
                  </Translate>
                }
              />
            </div>
          </details>
        </details>

        {/* --- 海外 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="international" className={styles.majorCategoryTitle}>
              <Translate id="news.majorCategory.international">
                海外
              </Translate>
            </h2>
          </summary>

          {/* 海外 > 総合・経済 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3
                id="int-general-economy"
                className={styles.categoryTitle}
              >
                <Translate id="news.category.general-economy-int">
                  総合・経済
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www.reuters.com/"
                title={
                  <Translate id="news.site.int.ge.reuters.title">
                    Reuters
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.reuters.desc">
                    国際ニュース、ビジネス、金融を幅広く報道する世界的な通信社。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.bloomberg.com/"
                title={
                  <Translate id="news.site.int.ge.bloomberg.title">
                    Bloomberg
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.bloomberg.desc">
                    米国に本社を置く世界的な金融情報サービスおよびメディア企業。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.wsj.com/"
                title={
                  <Translate id="news.site.int.ge.wsj.title">
                    The Wall Street Journal
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.wsj.desc">
                    米国発、経済・金融に強みを持つ日刊紙の国際版。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://asia.nikkei.com/"
                title={
                  <Translate id="news.site.int.ge.nikkei.title">
                    Nikkei Asia
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.nikkei.desc">
                    日本経済新聞社が発行するアジアのビジネス、経済、政治に特化した英語ニュースサイト。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.businessinsider.com/"
                title={
                  <Translate id="news.site.int.ge.bi.title">
                    Business Insider
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.bi.desc">
                    ビジネス、金融、テクノロジー、ライフスタイルなど幅広い分野のニュースと分析を提供するグローバルメディア。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.foxnews.com/"
                title={
                  <Translate id="news.site.int.ge.fox.title">Fox News</Translate>
                }
                description={
                  <Translate id="news.site.int.ge.fox.desc">
                    米国の主要ケーブルニュースネットワーク。保守的な視点から国内外のニュース、政治、エンタメを報道。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://digiday.com/"
                title={
                  <Translate id="news.site.int.ge.digiday.title">
                    Digiday
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.digiday.desc">
                    デジタルメディア、マーケティング、広告、リテールの変革を掘り下げる専門メディアの国際版。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.lemonde.fr/en/"
                title={
                  <Translate id="news.site.int.ge.lemonde.title">
                    Le Monde (English)
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.lemonde.desc">
                    フランスを代表する日刊紙『ル・モンド』の英語版。国際ニュースを深く分析。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.aljazeera.com/"
                title={
                  <Translate id="news.site.int.ge.aljazeera.title">
                    Al Jazeera
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.aljazeera.desc">
                    中東に拠点を置く国際的なニュースネットワーク。グローバルな視点からニュースを報道。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.chinadaily.com.cn/"
                title={
                  <Translate id="news.site.int.ge.chinadaily.title">
                    China Daily
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.chinadaily.desc">
                    中国共産党が発行する唯一の英字日刊紙。中国の公式見解や動向を伝える。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://apnews.com/"
                title={
                  <Translate id="news.site.int.ge.ap.title">
                    Associated Press (AP)
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.ap.desc">
                    世界最大級の独立系通信社。速報性、客観性の高いニュースを世界中に配信。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.afp.com/en"
                title={
                  <Translate id="news.site.int.ge.afp.title">
                    Agence France-Presse (AFP)
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ge.afp.desc">
                    フランスを拠点とする世界的な通信社。多様な視点から国際ニュースを報道。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 海外 > テクノロジー・科学 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="int-tech-science" className={styles.categoryTitle}>
                <Translate id="news.category.tech-science-int">
                  テクノロジー・科学
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://www.technologyreview.com/"
                title={
                  <Translate id="news.site.int.ts.mit.title">
                    MIT Technology Review
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.mit.desc">
                    MIT発、テクノロジー専門誌の国際版。新技術の動向を解説。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://wired.com/"
                title={
                  <Translate id="news.site.int.ts.wired.title">
                    WIRED
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.wired.desc">
                    テクノロジーが社会や文化に与える影響を探るメディアの国際版。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://scitechdaily.com/"
                title={
                  <Translate id="news.site.int.ts.scitech.title">
                    SciTechDaily
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.scitech.desc">
                    科学技術分野の最新研究やニュースを幅広く紹介するメディア。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.sciencedaily.com/"
                title={
                  <Translate id="news.site.int.ts.sciencedaily.title">
                    ScienceDaily
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.sciencedaily.desc">
                    最新の科学研究のプレスリリースを日々配信するニュース。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://techcrunch.com/"
                title={
                  <Translate id="news.site.int.ts.techcrunch.title">
                    TechCrunch
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.techcrunch.desc">
                    スタートアップ、テクノロジー業界のニュース、分析、トレンドを提供する主要メディア。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.geekwire.com/"
                title={
                  <Translate id="news.site.int.ts.geekwire.title">
                    GeekWire
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ts.geekwire.desc">
                    シアトルと太平洋岸北西部を中心に、テクノロジー、スタートアップ、イノベーションのニュースを報道。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 海外 > 音声・ポッドキャスト */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="int-audio-podcast" className={styles.categoryTitle}>
                <Translate id="news.category.audio-podcast-int">
                  音声・ポッドキャスト
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://edition.cnn.com/audio"
                title={
                  <Translate id="news.site.int.ap.cnn.title">
                    CNN Audio
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.cnn.desc">
                    CNNが提供するニュース、ドキュメンタリー等の音声コンテンツ。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.npr.org/programs/weekend-edition-saturday/"
                title={
                  <Translate id="news.site.int.ap.npr.title">
                    NPR Weekend Edition
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.npr.desc">
                    米国公共ラジオNPRの週末ニュース・情報番組。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.bbc.co.uk/sounds/play/live:bbc_world_service"
                title={
                  <Translate id="news.site.int.ap.bbc.title">
                    BBC World Service
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.bbc.desc">
                    BBCが世界向けに配信する国際ニュースのラジオサービス。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.economist.com/podcasts"
                title={
                  <Translate id="news.site.int.ap.economist.title">
                    The Economist Podcasts
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.economist.desc">
                    エコノミスト誌が配信する政治・経済の深掘り分析ポッドキャスト。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://softwareengineeringdaily.com/"
                title={
                  <Translate id="news.site.int.ap.sed.title">
                    Software Engineering Daily
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.sed.desc">
                    ソフトウェアエンジニアリングに関する日々のニュース、インタビュー、ディスカッションを提供するポッドキャストとブログ。
                  </Translate>
                }
              />
            </div>
          </details>

          {/* 海外 > まとめ系 */}
          <details open className={styles.subCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <h3 id="int-summary-sites" className={styles.categoryTitle}>
                <Translate id="news.category.summary-sites-int">
                  まとめ系
                </Translate>
              </h3>
            </summary>
            <div className={styles.cardGrid}>
              <NewsSiteCard
                href="https://ground.news/"
                title={
                  <Translate id="news.site.int.ss.ground.title">
                    Ground News
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.ground.desc">
                    ニュースの政治的偏向を可視化し、多角的な視点を提供するプラットフォーム。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://alltop.com/"
                title={
                  <Translate id="news.site.int.ss.alltop.title">
                    AllTop
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.alltop.desc">
                    様々なトピックのトップニュースやブログ投稿を集約するニュースアグリゲーター。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.newsnow.com/us/"
                title={
                  <Translate id="news.site.int.ss.newsnow.title">
                    NewsNow
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.newsnow.desc">
                    世界中のニュースソースから最新のヘッドラインをリアルタイムで集約するニュースアグリゲーター。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.icij.org/"
                title={
                  <Translate id="news.site.int.ss.icij.title">
                    ICIJ (国際調査報道ジャーナリスト連合)
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.icij.desc">
                    国境を越えた汚職、犯罪、権力濫用などを調査する国際的な非営利報道機関。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.bellingcat.com/"
                title={
                  <Translate id="news.site.int.ss.bellingcat.title">
                    Bellingcat
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.bellingcat.desc">
                    オープンソース情報（OSINT）を駆使し、紛争や不正行為を調査・分析する独立系調査報道グループ。
                  </Translate>
                }
              />
            </div>
          </details>
        </details>
      </main>
    </Layout>
  );
}
