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
                href="https://news.yahoo.co.jp/"
                title={
                  <Translate id="news.site.jp.ge.yahoo.title">
                    Yahoo! JAPANニュース
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.ge.yahoo.desc">
                    1996年サービス開始。LINEヤフー株式会社が運営。ジェリー・ヤンらが設立したYahoo! Inc.がルーツ。多数のコンテンツプロバイダーからのニュースを配信する、日本最大級のニュースアグリゲーター。
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
                    1876年、益田孝（三井物産創業者）により創刊。株式会社日本経済新聞社が運営。経済に特化した報道で知られ、日経平均株価の算出元でもある。2015年に英フィナンシャル・タイムズを買収。
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
                    1981年にマイケル・ブルームバーグが米国で設立したBloomberg L.P.の日本語版。金融情報端末「ブルームバーグ・ターミナル」を中核事業とし、金融・経済へ大きな影響力を持つ。
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
                    2007年にヘンリー・ブロジェットが米国で設立した経済メディアの日本版で、株式会社メディアジーンが運営。ミレニアル世代を主なターゲットとし、ビジネス、金融、テクノロジーニュースを配信する。
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
                    2006年設立。株式会社全国新聞ネットが運営。共同通信と全国の地方新聞52社が参加し、中央と地方双方の視点からニュースを提供する。
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
                    1851年にポール・ジュリアス・ロイターが英国で設立した国際通信社の日本語版。トムソン・ロイターが運営。速報性の高いグローバルな取材網を持つ世界三大通信社の一つ。
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
                    2006年に瓜生憲が設立。株式会社MINKABU THE INFONOIDが運営。AIとクラウドインプットを活用した株価予想など、個人投資家向けの金融情報に特化した独自コンテンツを提供。
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
                    世界の主要な株価指数、為替、商品先物、仮想通貨などのマーケットデータを一覧表示することに特化したサイト。
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
                    1899年にマサチューセッツ工科大学(MIT)が創刊した世界で最も歴史あるテクノロジー誌の日本版。株式会社角川アスキー総合研究所が運営。新技術の社会的、経済的インパクトを分析する。
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
                    1993年にルイス・ロゼットらが米国で創刊したテクノロジーカルチャー誌の日本版。コンデナスト・ジャパンが運営。テクノロジーが文化、社会、ライフスタイルに与える影響を探求し、未来志向の洞察で知られる。
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
                    1977年に西和彦らが創刊した『月刊アスキー』を源流とするWebメディア。株式会社角川アスキー総合研究所が運営。日本のパソコン黎明期からの歴史を持ち、PC、IT、ガジェット関連のニュースを速報性高く提供する。
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
                    1994年にハルシー・マイナーらが米国で設立したテクノロジーニュースサイトの日本語版。朝日インタラクティブ株式会社が運営。IT製品のレビューや法人向けソリューションに関する情報に強みを持つ。
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
                    2000年に山崎恵人が開設し、株式会社OSAが運営。独自の視点と詳細な取材に基づく深掘り記事が特徴。ガジェットレビューから科学、食文化まで幅広いテーマを扱う。
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
                    2004年開設。ニュースガイア株式会社が運営する、サイバーセキュリティと個人情報保護の専門ニュースサイト。インシデントや脆弱性に関する情報を迅速に報道する。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.ipa.go.jp/"
                title={
                  <Translate id="news.site.jp.sec.ipa.title">
                    IPA 独立行政法人情報処理推進機構
                  </Translate>
                }
                description={
                  <Translate id="news.site.jp.sec.ipa.desc">
                    2004年に日本国政府が設立した経済産業省所管の公的機関。日本のIT国家戦略を技術面から支え、「情報セキュリティ10大脅威」の発表や情報処理技術者試験などを所管する。
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
                    1851年にポール・ジュリアス・ロイターが英国で設立。トムソン・ロイターが運営。事実に基づいた公平・迅速な報道で知られ、190以上の国で取材活動を行う世界的な通信社。
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
                    1981年にマイケル・ブルームバーグが米国で設立。金融データ・分析ツール「ブルームバーグ・ターミナル」を事業の核とする、世界有数の経済・金融メディア。
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
                    1889年にチャールズ・ダウらが米国で創刊。ニューズ・コープ傘下のダウ・ジョーンズ社が運営。ビジネス・金融分野の質の高い調査報道で世界的に評価され、ピューリッツァー賞を多数受賞。
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
                    2013年に日本経済新聞社が創刊。アジアのビジネス、経済、政治を日本メディアの視点から英語で報じる。アジアに特化した報道が特徴。
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
                    2007年にヘンリー・ブロジェットらが米国で設立。Axel Springer SEが運営。ビジネスとテクノロジーのニュースを速報性高く配信し、世界中に複数の国際版を展開している。
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
                    1996年にルパート・マードックが米国で設立。Fox News Mediaが運営。保守的な視点からの報道で知られ、米国内で高い視聴率を記録するケーブルニュースネットワーク。
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
                    1944年にユベール・ブーヴ＝メリーがフランスで創刊。国際情勢の詳細な分析と質の高い調査報道で評価されるフランスを代表する新聞の英語版。
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
                    1996年、カタール政府の出資により設立。Al Jazeera Media Networkが運営。欧米メディアとは異なる中東・アラブ世界の視点からグローバルなニュースを発信する国際報道機関。
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
                    1846年にニューヨーク市の新聞社5社によって設立された非営利の協同組合通信社。速報性と客観性で知られ、世界中のメディアに記事を配信する。
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
                    1835年にシャルル＝ルイ・アヴァスが設立した組織を前身とするフランスの通信社。世界で最も歴史があり、写真や映像などのビジュアル報道に強みを持つ。
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
                    1899年にマサチューセッツ工科大学(MIT)が創刊・運営。新興技術の商業的、政治的、社会的影響を分析する、世界で最も権威ある技術誌の一つ。
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
                    1993年にルイス・ロゼットらが米国で創刊。コンデナスト社が運営。テクノロジーが文化、経済、政治に与える影響を深く探求し、未来を考察するスタイルで世界に影響を与えてきたメディア。
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
                    2005年にマイケル・アーリントンが米国で設立。Yahoo Inc.が運営。スタートアップとテクノロジー業界の動向を報じる代表的メディアで、大規模カンファレンス「Disrupt」を主催。
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
                href="https://www.bbc.co.uk/worldservice"
                title={
                  <Translate id="news.site.int.ap.bbc.title">
                    BBC World Service
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ap.bbc.desc">
                    1932年に英国放送協会(BBC)が設立した国際放送部門。信頼性の高いニュースやドキュメンタリーを40以上の言語でラジオ、オンライン、ポッドキャストを通じて世界に配信する。
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
                  まとめ・ジャーナリズム
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
                    2017年にハーリーン・カウルら元NASAのエンジニアらによってカナダで設立。一つのニュースに対する各メディアの政治的偏向（左派・中道・右派）を可視化し、多角的な情報比較を可能にするプラットフォーム。
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
                    1997年にチャールズ・ルイスが米国で設立した非営利の調査報道組織。「パナマ文書」「パンドラ文書」などで知られ、国境を越えた協業で不正を追及。
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
                    2014年にエリオット・ヒギンズが設立した独立調査報道グループ。公開情報（OSINT）を駆使して紛争や犯罪を調査・分析する手法で知られる。オランダに非営利財団として登記。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.propublica.org"
                title={
                  <Translate id="news.site.int.ss.propublica.title">
                    ProPublica
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.propublica.desc">
                    2007年にポール・スタイガーらが米国で設立。権力の乱用や裏切りを暴くことを使命とする非営利の調査報道機関で、サンドラー財団の資金提供を受けている。ピューリッツァー賞を多数受賞。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.themarshallproject.org"
                title={
                  <Translate id="news.site.int.ss.marshall.title">
                    The Marshall Project
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.marshall.desc">
                    2014年にニール・バースキーが米国で設立。米国の刑事司法制度に特化した非営利の報道機関で、制度の不平等さに対する国民の意識向上を目指す。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://theintercept.com"
                title={
                  <Translate id="news.site.int.ss.intercept.title">
                    The Intercept
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.intercept.desc">
                    2014年にグレン・グリーンウォルドらが設立。First Look Mediaが運営。エドワード・スノーデン文書の報道を機に、国家監視、戦争、人権問題などについて対立を恐れないジャーナリズムを掲げる。
                  </Translate>
                }
              />
              <NewsSiteCard
                href="https://www.occrp.org"
                title={
                  <Translate id="news.site.int.ss.occrp.title">
                    OCCRP
                  </Translate>
                }
                description={
                  <Translate id="news.site.int.ss.occrp.desc">
                    2006年にドリュー・サリバンとポール・ラドゥが設立。組織犯罪と汚職に特化した調査報道ジャーナリストの国際的な非営利ネットワーク。世界中のメディアと協力して国境を越えた不正を追及。
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
