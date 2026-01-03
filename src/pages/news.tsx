import React, { JSX, ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import LinksCard from '@site/src/components/LinksCard';
import styles from './news.module.css';
import Translate, { translate } from '@docusaurus/Translate';
import { Download } from 'lucide-react';
import ShareButtons from '@site/src/components/ShareButtons';

type NewsSiteData = {
  href: string;
  title: { id: string; message: string };
  description: { id: string; message: string };
};

type NewsCategoryData = {
  id: string;
  title: { id: string; message: string };
  sites: NewsSiteData[];
};

type MajorCategoryData = {
  id: string;
  title: { id: string; message: string };
  subCategories: NewsCategoryData[];
};

const newsData: MajorCategoryData[] = [
  {
    id: 'japan',
    title: { id: 'news.majorCategory.japan', message: '日本' },
    subCategories: [
      {
        id: 'japan-general-economy',
        title: { id: 'news.category.general-economy-jp', message: '総合・経済' },
        sites: [
          { href: 'https://news.yahoo.co.jp/', title: { id: 'news.site.jp.ge.yahoo.title', message: 'Yahoo! JAPANニュース' }, description: { id: 'news.site.jp.ge.yahoo.desc', message: '1996年サービス開始。LINEヤフー株式会社が運営。ジェリー・ヤンらが設立したYahoo! Inc.がルーツ。多数のコンテンツプロバイダーからのニュースを配信する、日本最大級のニュースアグリゲーター。' } },
          { href: 'https://www.nikkei.com/', title: { id: 'news.site.jp.ge.nikkei.title', message: '日本経済新聞' }, description: { id: 'news.site.jp.ge.nikkei.desc', message: '1876年、益田孝（三井物産創業者）により創刊。株式会社日本経済新聞社が運営。経済に特化した報道で知られ、日経平均株価の算出元でもある。2015年に英フィナンシャル・タイムズを買収。' } },
          { href: 'https://www.bloomberg.co.jp/', title: { id: 'news.site.jp.ge.bloomberg.title', message: 'Bloomberg Japan' }, description: { id: 'news.site.jp.ge.bloomberg.desc', message: '1981年にマイケル・ブルームバーグが米国で設立したBloomberg L.P.の日本語版。金融情報端末「ブルームバーグ・ターミナル」を中核事業とし、金融・経済へ大きな影響力を持つ。' } },
          { href: 'https://www.businessinsider.jp/', title: { id: 'news.site.jp.ge.bi.title', message: 'Business Insider Japan' }, description: { id: 'news.site.jp.ge.bi.desc', message: '2007年にヘンリー・ブロジェットが米国で設立した経済メディアの日本版で、株式会社メディアジーンが運営。ミレニアル世代を主なターゲットとし、ビジネス、金融、テクノロジーニュースを配信する。' } },
          { href: 'https://jp.reuters.com/', title: { id: 'news.site.jp.ge.reuters.title', message: 'ロイター' }, description: { id: 'news.site.jp.ge.reuters.desc', message: '1851年にポール・ジュリアス・ロイターが英国で設立した国際通信社の日本語版。トムソン・ロイターが運営。速報性の高いグローバルな取材網を持つ世界三大通信社の一つ。' } },
          { href: 'https://minkabu.jp/', title: { id: 'news.site.jp.ge.minkabu.title', message: 'みんかぶ' }, description: { id: 'news.site.jp.ge.minkabu.desc', message: '2006年に瓜生憲が設立。株式会社MINKABU THE INFONOIDが運営。AIとクラウドインプットを活用した株価予想など、個人投資家向けの金融情報に特化した独自コンテンツを提供。' } },
          { href: 'https://shikiho.toyokeizai.net/news?id=sokuho', title: { id: 'news.site.jp.ge.shikiho.title', message: '四季報オンライン' }, description: { id: 'news.site.jp.ge.shikiho.desc', message: '1895年創業の東洋経済新報社が運営。1936年創刊の投資家のバイブル『会社四季報』のWeb版。独自の取材網による企業分析や速報ニュース、詳細な財務データなどを提供する。' } },
          { href: 'https://sekai-kabuka.com/pc-index.html', title: { id: 'news.site.jp.ge.sekaikabuka.title', message: '世界の株価' }, description: { id: 'news.site.jp.ge.sekaikabuka.desc', message: '世界の主要な株価指数、為替、商品先物、仮想通貨などのマーケットデータを一覧表示することに特化したサイト。' } },
          { href: 'https://finviz.com/futures.ashx', title: { id: 'news.site.jp.ge.finviz.title', message: 'finviz' }, description: { id: 'news.site.jp.ge.finviz.desc', message: '2007年にJuraj Durisが設立。Financial Visualizationsの略。株式や先物などの市場データを、ヒートマップ（ツリーマップ）やスクリーナーを用いて視覚的・直感的に提供する。' } },
        ],
      },
      {
        id: 'japan-general-politics',
        title: { id: 'news.category.general-politics-jp', message: '総合・政治' },
        sites: [
          { href: 'https://mainichi.jp/', title: { id: 'news.site.jp.gp.mainichi.title', message: '毎日新聞' }, description: { id: 'news.site.jp.gp.mainichi.desc', message: '1872年、『東京日日新聞』として創刊。株式会社毎日新聞社が運営。日本の主要な全国紙の一つ。一面にコラム『余録』を掲載しているほか、選抜高等学校野球大会や毎日映画コンクールなどを主催している。' } },
          { href: 'https://www.yomiuri.co.jp/', title: { id: 'news.site.jp.gp.yomiuri.title', message: '読売新聞' }, description: { id: 'news.site.jp.gp.yomiuri.desc', message: '1874年、子安峻らにより日就社から創刊。読売新聞グループ本社が運営。日本の主要な全国紙の一つ。一面にコラム『編集手帳』を掲載しているほか、プロ野球球団の読売巨人軍を保有している。' } },
          { href: 'https://www.asahi.com/', title: { id: 'news.site.jp.gp.asahi.title', message: '朝日新聞' }, description: { id: 'news.site.jp.gp.asahi.desc', message: '1879年、村山龍平、上野理一らにより大阪で創刊。株式会社朝日新聞社が運営。日本の主要な全国紙の一つ。一面に1904年から続くコラム『天声人語』を掲載しているほか、全国高等学校野球選手権大会などを主催している。' } },
          { href: 'https://www.sankei.com/', title: { id: 'news.site.jp.gp.sankei.title', message: '産経新聞' }, description: { id: 'news.site.jp.gp.sankei.desc', message: '1933年、前田久吉が大阪で『日本工業新聞』を創刊したのが前身。株式会社産業経済新聞社が運営。正式名称は『産業経済新聞』。全国紙の一つで、一面にコラム『産経抄』を掲載している。' } },
          { href: 'https://www.jiji.com/', title: { id: 'news.site.jp.gp.jiji.title', message: '時事通信' }, description: { id: 'news.site.jp.gp.jiji.desc', message: '1945年設立。株式会社時事通信社が運営。国内外のニュースを新聞社や放送局などの報道機関へ配信する通信社。 ウェブサイト「時事ドットコムニュース」を通じて、一般読者にもニュースを提供している。' } },
          { href: 'https://www.47news.jp/', title: { id: 'news.site.jp.gp.47news.title', message: '47NEWS' }, description: { id: 'news.site.jp.gp.47news.desc', message: '2006年設立。株式会社全国新聞ネットが運営。共同通信と全国の地方新聞52社が参加し、中央と地方双方の視点からニュースを提供する。' } },
          { href: 'https://www.seikyoonline.com/', title: { id: 'news.site.jp.gp.seikyo.title', message: '聖教新聞' }, description: { id: 'news.site.jp.gp.seikyo.desc', message: '1951年創刊。聖教新聞社が運営する宗教法人・創価学会の機関紙。同会の活動や理念、会員の体験談、仏法に関する解説などを掲載している。' } },
          { href: 'https://www.jcp.or.jp/akahata/', title: { id: 'news.site.jp.gp.akahata.title', message: 'しんぶん赤旗' }, description: { id: 'news.site.jp.gp.akahata.desc', message: '1928年創刊。日本共産党中央委員会が運営する機関紙。党の政策や見解のほか、独自の調査に基づく告発記事などを掲載。日刊紙と週１回発行の「日曜版」がある。' } },
        ],
      },
      {
        id: 'japan-tech-science',
        title: { id: 'news.category.tech-science-jp', message: 'テクノロジー・科学' },
        sites: [
          { href: 'https://www.technologyreview.jp/', title: { id: 'news.site.jp.ts.mit.title', message: 'MIT Technology Review Japan' }, description: { id: 'news.site.jp.ts.mit.desc', message: '1899年にマサチューセッツ工科大学(MIT)が創刊した世界で最も歴史あるテクノロジー誌の日本版。株式会社角川アスキー総合研究所が運営。新技術の社会的、経済的インパクトを分析する。' } },
          { href: 'https://wired.jp/', title: { id: 'news.site.jp.ts.wired.title', message: 'WIRED Japan' }, description: { id: 'news.site.jp.ts.wired.desc', message: '1993年にルイス・ロゼットらが米国で創刊したテクノロジーカルチャー誌の日本版。コンデナスト・ジャパンが運営。テクノロジーが文化、社会、ライフスタイルに与える影響を探求し、未来志向の洞察で知られる。' } },
          { href: 'https://ascii.jp/', title: { id: 'news.site.jp.ts.ascii.title', message: 'ASCII.jp' }, description: { id: 'news.site.jp.ts.ascii.desc', message: '1977年に西和彦らが創刊した『月刊アスキー』を源流とするWebメディア。株式会社角川アスキー総合研究所が運営。日本のパソコン黎明期からの歴史を持ち、PC、IT、ガジェット関連のニュースを速報性高く提供する。' } },
          { href: 'https://japan.cnet.com/', title: { id: 'news.site.jp.ts.cnet.title', message: 'CNET Japan' }, description: { id: 'news.site.jp.ts.cnet.desc', message: '1994年にハルシー・マイナーらが米国で設立したテクノロジーニュースサイトの日本語版。朝日インタラクティブ株式会社が運営。IT製品のレビューや法人向けソリューションに関する情報に強みを持つ。' } },
          { href: 'https://gigazine.net/', title: { id: 'news.site.jp.ts.gigazine.title', message: 'GIGAZINE' }, description: { id: 'news.site.jp.ts.gigazine.desc', message: '2000年に山崎恵人が開設し、株式会社OSAが運営。独自の視点と詳細な取材に基づく深掘り記事が特徴。ガジェットレビューから科学、食文化まで幅広いテーマを扱う。' } },
        ],
      },
      {
        id: 'japan-security',
        title: { id: 'news.category.security-jp', message: 'セキュリティ・IT専門' },
        sites: [
          { href: 'https://www.security-next.com/', title: { id: 'news.site.jp.sec.secnext.title', message: 'Security NEXT' }, description: { id: 'news.site.jp.sec.secnext.desc', message: '2004年開設。ニュースガイア株式会社が運営する、サイバーセキュリティと個人情報保護の専門ニュースサイト。インシデントや脆弱性に関する情報を迅速に報道する。' } },
          { href: 'https://www.ipa.go.jp/', title: { id: 'news.site.jp.sec.ipa.title', message: 'IPA 独立行政法人情報処理推進機構' }, description: { id: 'news.site.jp.sec.ipa.desc', message: '2004年に設立された経済産業省所管の公的機関。日本のIT国家戦略を技術面から支え、「情報セキュリティ10大脅威」の発表や情報処理技術者試験などを所管。' } },
        ],
      },
      {
        id: 'japan-tv-news',
        title: { id: 'news.category.tv-news-jp', message: 'テレビ局ニュース' },
        sites: [
          { href: 'https://www3.nhk.or.jp/news/', title: { id: 'news.site.jp.tv.nhk.title', message: 'NHK NEWS WEB' }, description: { id: 'news.site.jp.tv.nhk.desc', message: '日本放送協会の総合ニュースサイト。国内外の幅広いニュースを提供。' } },
          { href: 'https://news.tbs.co.jp/', title: { id: 'news.site.jp.tv.tbs.title', message: 'TBS NEWS' }, description: { id: 'news.site.jp.tv.tbs.desc', message: 'TBSテレビのニュースサイト。時事問題や社会情勢を詳しく報道。' } },
          { href: 'https://www.ntv.co.jp/news/', title: { id: 'news.site.jp.tv.ntv.title', message: '日テレNEWS' }, description: { id: 'news.site.jp.tv.ntv.desc', message: '日本テレビのニュースサイト。速報性の高いニュースを提供。' } },
          { href: 'https://www.fnn.jp/', title: { id: 'news.site.jp.tv.fuji.title', message: 'フジテレビNEWS' }, description: { id: 'news.site.jp.tv.fuji.desc', message: 'フジテレビの報道部門によるニュース配信サイト。' } },
          { href: 'https://news.tv-asahi.co.jp/', title: { id: 'news.site.jp.tv.asahi.title', message: 'テレ朝NEWS' }, description: { id: 'news.site.jp.tv.asahi.desc', message: 'テレビ朝日のニュースサイト。独自の視点で情報を発信。' } },
          { href: 'https://txbiz.tv-tokyo.co.jp/', title: { id: 'news.site.jp.tv.tx.title', message: 'テレ東BIZ' }, description: { id: 'news.site.jp.tv.tx.desc', message: 'テレビ東京の経済・ビジネスニュース専門サイト。' } },
        ],
      },
      {
        id: 'japan-press-release',
        title: { id: 'news.category.press-release-jp', message: 'プレスリリース' },
        sites: [
          { href: 'https://prtimes.jp/', title: { id: 'news.site.jp.pr.prtimes.title', message: 'PR TIMES' }, description: { id: 'news.site.jp.pr.prtimes.desc', message: '国内最大級のプレスリリース配信サービス。企業の最新情報をいち早く入手可能。' } },
          { href: 'https://kyodonewsprwire.jp/', title: { id: 'news.site.jp.pr.kyodo.title', message: '共同通信PRワイヤー' }, description: { id: 'news.site.jp.pr.kyodo.desc', message: '共同通信社が運営するプレスリリース配信サービス。信頼性の高い企業情報を提供。' } },
        ],
      },
      {
        id: 'japan-life-weather',
        title: { id: 'news.category.life-weather-jp', message: '生活・天気' },
        sites: [
          { href: 'https://tenki.jp/', title: { id: 'news.site.jp.lw.tenki.title', message: 'tenki.jp' }, description: { id: 'news.site.jp.lw.tenki.desc', message: '日本気象協会公式の天気予報専門メディア。防災情報も充実。' } },
          { href: 'https://weather.yahoo.co.jp/weather/jp/1b/1400.html', title: { id: 'news.site.jp.lw.yahoo.title', message: 'Yahoo! 天気・災害' }, description: { id: 'news.site.jp.lw.yahoo.desc', message: 'Yahoo! Japanによる天気予報と災害情報。' } },
        ],
      },
      {
        id: 'japan-summary-sites',
        title: { id: 'news.category.summary-sites-jp', message: 'まとめ' },
        sites: [
          { href: 'https://news.ceek.jp/', title: { id: 'news.site.jp.ss.ceek.title', message: 'CEEK.JP News' }, description: { id: 'news.site.jp.ss.ceek.desc', message: '国内の主要ニュースを横断検索できるニュース検索エンジン。' } },
          { href: 'https://news.google.com/home?hl=ja&gl=JP&ceid=JP:ja', title: { id: 'news.site.jp.ss.googlenews.title', message: 'Googleニュース' }, description: { id: 'news.site.jp.ss.googlenews.desc', message: 'AIを活用して世界中のニュースソースから情報を集約し、ユーザーの興味関心に合わせたニュースフィードを提供。' } },
        ],
      },
    ],
  },
  {
    id: 'international',
    title: { id: 'news.majorCategory.international', message: '海外' },
    subCategories: [
      {
        id: 'int-general-economy',
        title: { id: 'news.category.general-economy-int', message: '総合・経済' },
        sites: [
          { href: 'https://apnews.com/', title: { id: 'news.site.int.ge.ap.title', message: 'Associated Press (AP)' }, description: { id: 'news.site.int.ge.ap.desc', message: '1846年にニューヨーク市の新聞社5社によって設立された非営利の協同組合通信社。速報性と客観性で知られ、世界中のメディアに記事を配信する。' } },
          { href: 'https://www.bloomberg.com/', title: { id: 'news.site.int.ge.bloomberg.title', message: 'Bloomberg' }, description: { id: 'news.site.int.ge.bloomberg.desc', message: '1981年にマイケル・ブルームバーグが米国で設立。金融データ・分析ツール「ブルームバーグ・ターミナル」を事業の核とする、世界有数の経済・金融メディア。' } },
          { href: 'https://www.wsj.com/', title: { id: 'news.site.int.ge.wsj.title', message: 'The Wall Street Journal' }, description: { id: 'news.site.int.ge.wsj.desc', message: '1889年にチャールズ・ダウらが米国で創刊。ニューズ・コープ傘下のダウ・ジョーンズ社が運営。ビジネス・金融分野の質の高い調査報道が特徴。' } },
          { href: 'https://www.foxnews.com/', title: { id: 'news.site.int.ge.fox.title', message: 'Fox News' }, description: { id: 'news.site.int.ge.fox.desc', message: '1996年にルパート・マードックが米国で設立。Fox News Mediaが運営。保守的な視点からの報道で知られ、米国内で高い視聴率を記録するケーブルニュースネットワーク。' } },
          { href: 'https://www.businessinsider.com/', title: { id: 'news.site.int.ge.bi.title', message: 'Business Insider' }, description: { id: 'news.site.int.ge.bi.desc', message: '2007年にヘンリー・ブロジェットらが米国で設立。Axel Springer SEが運営。ビジネスとテクノロジーのニュースを速報性高く配信し、世界中に複数の国際版を展開。' } },
          { href: 'https://www.reuters.com/', title: { id: 'news.site.int.ge.reuters.title', message: 'Reuters' }, description: { id: 'news.site.int.ge.reuters.desc', message: '1851年にポール・ジュリアス・ロイターが英国で設立。トムソン・ロイターが運営。事実に基づいた公平・迅速な報道で知られ、190以上の国で取材活動を行う世界的な通信社。' } },
          { href: 'https://www.afp.com/en', title: { id: 'news.site.int.ge.afp.title', message: 'Agence France-Presse (AFP)' }, description: { id: 'news.site.int.ge.afp.desc', message: '1835年にシャルル＝ルイ・アヴァスが設立した組織を前身とするフランスの通信社。世界で最も歴史があり、写真や映像などのビジュアル報道に強みを持つ。' } },
          { href: 'https://www.lemonde.fr/en/', title: { id: 'news.site.int.ge.lemonde.title', message: 'Le Monde (English)' }, description: { id: 'news.site.int.ge.lemonde.desc', message: '1944年にユベール・ブーヴ＝メリーがフランスで創刊。国際情勢の詳細な分析と質の高い調査報道で評価されるフランスを代表する新聞の英語版。' } },
          { href: 'https://www.dw.com/en/', title: { id: 'news.site.int.ge.dw.title', message: 'Deutsche Welle' }, description: { id: 'news.site.int.ge.dw.desc', message: '1953年に設立されたドイツの国際公共放送局。ドイツ連邦政府の資金で運営されるが、編集の独立性は法律で保障されている。30以上の言語で、ドイツと欧州の視点からニュースを発信。' } },
          { href: 'https://asia.nikkei.com/', title: { id: 'news.site.int.ge.nikkei.title', message: 'Nikkei Asia' }, description: { id: 'news.site.int.ge.nikkei.desc', message: '2013年に日本経済新聞社が創刊。アジアのビジネス、経済、政治を日本メディアの視点から英語で報じる。アジアに特化した報道が特徴。' } },
          { href: 'https://www.aljazeera.com/', title: { id: 'news.site.int.ge.aljazeera.title', message: 'Al Jazeera' }, description: { id: 'news.site.int.ge.aljazeera.desc', message: '1996年、カタール政府の出資により設立。Al Jazeera Media Networkが運営。欧米メディアとは異なる中東・アラブ世界の視点からグローバルなニュースを発信する国際報道機関。' } },
          { href: 'https://www.arabnews.com/', title: { id: 'news.site.int.ge.arabnews.title', message: 'Arab News' }, description: { id: 'news.site.int.ge.arabnews.desc', message: '1975年にサウジアラビアで創刊された英字日刊紙。サウジアラビアおよび中東の視点から、ビジネス、政治、文化に関するニュースを国際的に発信する。' } },
          { href: 'https://www.khaleejtimes.com/', title: { id: 'news.site.int.ge.khaleejtimes.title', message: 'Khaleej Times' }, description: { id: 'news.site.int.ge.khaleejtimes.desc', message: '1978年に創刊された、アラブ首長国連邦（UAE）で最も歴史のある英字日刊紙。ドバイを拠点とし、湾岸地域および国際ニュースを幅広く報道する。' } },
          { href: 'http://www.xinhuanet.com/english/', title: { id: 'news.site.int.ge.xinhua.title', message: 'Xinhua (新華社)' }, description: { id: 'news.site.int.ge.xinhua.desc', message: '1931年に設立された中国の国営通信社。中国共産党の公式な見解やニュースを国内外に多言語で配信する、中国最大かつ公式の報道機関。' } },
          { href: 'https://www.chinadaily.com.cn/', title: { id: 'news.site.int.ge.chinadaily.title', message: 'China Daily' }, description: { id: 'news.site.int.ge.chinadaily.desc', message: '中国共産党が発行する唯一の英字日刊紙。中国の公式見解や動向を伝える。' } },
          { href: 'https://www.rt.com/', title: { id: 'news.site.int.ge.rt.title', message: 'RT (Russia Today)' }, description: { id: 'news.site.int.ge.rt.desc', message: '2005年にロシア政府の資金提供により設立された国際ニュースチャンネル。ANO TV-Novostiが運営。ロシアの視点から国際ニュースを多言語で報道。' } },
          { href: 'https://sputniknews.com/', title: { id: 'news.site.int.ge.sputnik.title', message: 'Sputnik' }, description: { id: 'news.site.int.ge.sputnik.desc', message: '2014年にロシア政府が国営通信社再編の一環として設立。国営メディアグループ「ロシア・セゴドニャ」が運営。30以上の言語でニュースやラジオを配信し、ロシアの公式見解を伝達。' } },
          { href: 'https://kyivindependent.com/', title: { id: 'news.site.int.ge.kyivindependent.title', message: 'Kyiv Independent' }, description: { id: 'news.site.int.ge.kyivindependent.desc', message: '2021年にKyiv Postの元ジャーナリストらによって設立されたウクライナの独立系英字ニュースメディア。ロシアのウクライナ侵攻に関する報道で国際的に知られ、調査報道に重点。' } },
          { href: 'https://polymarket.com/', title: { id: 'news.site.int.ge.polymarket.title', message: 'Polymarket' }, description: { id: 'news.site.int.ge.polymarket.desc', message: '2020年にShayne Coplanが設立。ブロックチェーン技術を活用した予測市場プラットフォーム。ユーザーは政治、経済、時事問題など様々なイベントの結果に賭けることで、集合知による未来予測を形成する。' } },
        ],
      },
      {
        id: 'int-tech-science',
        title: { id: 'news.category.tech-science-int', message: 'テクノロジー・科学' },
        sites: [
          { href: 'https://www.technologyreview.com/', title: { id: 'news.site.int.ts.mit.title', message: 'MIT Technology Review' }, description: { id: 'news.site.int.ts.mit.desc', message: '1899年にマサチューセッツ工科大学(MIT)が創刊・運営。新興技術の商業的、政治的、社会的影響を分析する、世界で最も権威ある技術誌の一つ。' } },
          { href: 'https://wired.com/', title: { id: 'news.site.int.ts.wired.title', message: 'WIRED' }, description: { id: 'news.site.int.ts.wired.desc', message: '1993年にルイス・ロゼットらが米国で創刊。コンデナスト社が運営。テクノロジーが文化、経済、政治に与える影響を深く探求し、未来を考察するスタイルで世界に影響を与えてきたメディア。' } },
          { href: 'https://scitechdaily.com/', title: { id: 'news.site.int.ts.scitech.title', message: 'SciTechDaily' }, description: { id: 'news.site.int.ts.scitech.desc', message: '科学技術分野の最新研究やニュースを幅広く紹介するメディア。' } },
          { href: 'https://www.sciencedaily.com/', title: { id: 'news.site.int.ts.sciencedaily.title', message: 'ScienceDaily' }, description: { id: 'news.site.int.ts.sciencedaily.desc', message: '最新の科学研究のプレスリリースを日々配信するニュース。' } },
          { href: 'https://techcrunch.com/', title: { id: 'news.site.int.ts.techcrunch.title', message: 'TechCrunch' }, description: { id: 'news.site.int.ts.techcrunch.desc', message: '2005年にマイケル・アーリントンが米国で設立。Yahoo Inc.が運営。スタートアップとテクノロジー業界の動向を報じる代表的メディアで、大規模カンファレンス「Disrupt」を主催。' } },
          { href: 'https://www.geekwire.com/', title: { id: 'news.site.int.ts.geekwire.title', message: 'GeekWire' }, description: { id: 'news.site.int.ts.geekwire.desc', message: 'シアトルと太平洋岸北西部を中心に、テクノロジー、スタートアップ、イノベーションのニュースを報道。' } },
          { href: 'https://digiday.com/', title: { id: 'news.site.int.ge.digiday.title', message: 'Digiday' }, description: { id: 'news.site.int.ge.digiday.desc', message: 'デジタルメディア、マーケティング、広告、リテールの変革を掘り下げる専門メディアの国際版。' } },
          { href: 'https://www.techmeme.com/', title: { id: 'news.site.int.ts.techmeme.title', message: 'Techmeme' }, description: { id: 'news.site.int.ts.techmeme.desc', message: 'テクノロジー業界のニュースを人間とアルゴリズムを組み合わせて集約するアグリゲーター。' } }
        ],
      },
      {
        id: 'int-audio-podcast',
        title: { id: 'news.category.audio-podcast-int', message: '音声・ポッドキャスト' },
        sites: [
          { href: 'https://edition.cnn.com/audio', title: { id: 'news.site.int.ap.cnn.title', message: 'CNN Audio' }, description: { id: 'news.site.int.ap.cnn.desc', message: 'CNNが提供するニュース、ドキュメンタリー等の音声コンテンツ。' } },
          { href: 'https://www.npr.org/programs/weekend-edition-saturday/', title: { id: 'news.site.int.ap.npr.title', message: 'NPR Weekend Edition' }, description: { id: 'news.site.int.ap.npr.desc', message: '米国公共ラジオNPRの週末ニュース・情報番組。' } },
          { href: 'https://www.bbc.co.uk/worldservice', title: { id: 'news.site.int.ap.bbc.title', message: 'BBC World Service' }, description: { id: 'news.site.int.ap.bbc.desc', message: '1932年に英国放送協会(BBC)が設立した国際放送部門。ニュースやドキュメンタリーを40以上の言語でラジオ、オンライン、ポッドキャストを通じて世界に配信する。' } },
          { href: 'https://www.economist.com/podcasts', title: { id: 'news.site.int.ap.economist.title', message: 'The Economist Podcasts' }, description: { id: 'news.site.int.ap.economist.desc', message: 'エコノミスト誌が配信する政治・経済の深掘り分析ポッドキャスト。' } },
          { href: 'https://softwareengineeringdaily.com/', title: { id: 'news.site.int.ap.sed.title', message: 'Software Engineering Daily' }, description: { id: 'news.site.int.ap.sed.desc', message: 'ソフトウェアエンジニアリングに関する日々のニュース、インタビュー、ディスカッションを提供するポッドキャストとブログ。' } },
        ],
      },
      {
        id: 'int-summary-sites',
        title: { id: 'news.category.summary-sites-int', message: 'まとめ・ジャーナリズム' },
        sites: [
          { href: 'https://ground.news/', title: { id: 'news.site.int.ss.ground.title', message: 'Ground News' }, description: { id: 'news.site.int.ss.ground.desc', message: '2017年にハーリーン・カウルら元NASAのエンジニアらによってカナダで設立。一つのニュースに対する各メディアの政治的偏向（左派・中道・右派）を可視化し、多角的な情報比較を可能にするプラットフォーム。' } },
          { href: 'https://alltop.com/', title: { id: 'news.site.int.ss.alltop.title', message: 'AllTop' }, description: { id: 'news.site.int.ss.alltop.desc', message: '様々なトピックのトップニュースやブログ投稿を集約するニュースアグリゲーター。' } },
          { href: 'https://www.newsnow.com/us/', title: { id: 'news.site.int.ss.newsnow.title', message: 'NewsNow' }, description: { id: 'news.site.int.ss.newsnow.desc', message: '世界中のニュースソースから最新のヘッドラインをリアルタイムで集約するニュースアグリゲーター。' } },
          { href: 'https://news.google.com/home?hl=en-US&gl=US&ceid=US:en', title: { id: 'news.site.int.ss.googlenews.title', message: 'Google News (US)' }, description: { id: 'news.site.int.ss.googlenews.desc', message: 'AIを活用して世界中のニュースソースから情報を集約し、ユーザーに合わせた情報を提供。' } },          
          { href: 'https://www.icij.org/', title: { id: 'news.site.int.ss.icij.title', message: 'ICIJ' }, description: { id: 'news.site.int.ss.icij.desc', message: '1997年にチャールズ・ルイスが米国で設立した非営利の調査報道組織。「パナマ文書」「パンドラ文書」などで知られ、国境を越えた協業で不正を追及。' } },
          { href: 'https://www.bellingcat.com/', title: { id: 'news.site.int.ss.bellingcat.title', message: 'Bellingcat' }, description: { id: 'news.site.int.ss.bellingcat.desc', message: '2014年にエリオット・ヒギンズが設立した独立調査報道グループ。公開情報（OSINT）を駆使して紛争や犯罪を調査・分析する手法で知られる。オランダに非営利財団として登記。' } },
          { href: 'https://www.propublica.org', title: { id: 'news.site.int.ss.propublica.title', message: 'ProPublica' }, description: { id: 'news.site.int.ss.propublica.desc', message: '2007年にポール・スタイガーらが米国で設立。権力の乱用や裏切りを暴くことを使命とする非営利の調査報道機関で、サンドラー財団の資金提供を受けている。ピューリッツァー賞を多数受賞。' } },
          { href: 'https://www.themarshallproject.org', title: { id: 'news.site.int.ss.marshall.title', message: 'The Marshall Project' }, description: { id: 'news.site.int.ss.marshall.desc', message: '2014年にニール・バースキーが米国で設立。米国の刑事司法制度に特化した非営利の報道機関で、制度の不平等さに対する国民の意識向上を目指す。' } },
          { href: 'https://theintercept.com', title: { id: 'news.site.int.ss.intercept.title', message: 'The Intercept' }, description: { id: 'news.site.int.ss.intercept.desc', message: '2014年にグレン・グリーンウォルドらが設立。First Look Mediaが運営。エドワード・スノーデン文書の報道を機に、国家監視、戦争、人権問題などについて対立を恐れないジャーナリズムを掲げる。' } },
          { href: 'https://www.occrp.org', title: { id: 'news.site.int.ss.occrp.title', message: 'OCCRP' }, description: { id: 'news.site.int.ss.occrp.desc', message: '2006年にドリュー・サリバンとポール・ラドゥが設立。組織犯罪と汚職に特化した調査報道ジャーナリストの国際的な非営利ネットワーク。世界中のメディアと協力して国境を越えた不正を追及。' } },
        ],
      },
    ],
  },
];

/**
 * ホバー時にアンカーリンク('#')を表示する見出しコンポーネント
 */
const SectionHeading = ({ as: Component, id, className, children }: { as: 'h2' | 'h3'; id: string; className: string; children: ReactNode }) => (
  <Component id={id} className={`${className} ${styles.sectionHeading}`}>
    <span className={styles.anchorContainer}>
      {children}
      <a
        className={styles.anchorLink}
        href={`#${id}`}
        aria-label={translate({
          id: 'theme.common.headingLinkTitle',
          message: 'この見出しへの固定リンク',
        })}>
        #
      </a>
    </span>
  </Component>
);

export default function NewsPage(): JSX.Element {
  const escapeCsvField = (field: string): string => {
    if (/[",\n]/.test(field)) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const handleDownload = () => {
    const header = [
      translate({ id: 'news.download.header.siteName', message: 'SiteName' }),
      'URL',
    ].join(',');

    const allSites = newsData.flatMap((major) =>
      major.subCategories.flatMap((sub) => sub.sites)
    );

    const rows = allSites.map((site) => {
      const siteTitle = translate(site.title);
      return [escapeCsvField(siteTitle), site.href].join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'hkdocs-news-sites.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout
      title={translate({ id: 'news.page.title', message: 'ニュース一覧' })}
      description={translate({
        id: 'news.page.description',
        message: '国内外の情勢や技術トレンドの把握に役立つニュースをまとめています。',
      })}
    >
      <Head children={''} />
      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderTitle}>
            <h1>
              <Translate id="news.page.heading">ニュース</Translate>
            </h1>
            <p>
              <Translate id="news.page.subheading">日々の情報収集のために</Translate>
            </p>
          </div>
          <button
            onClick={handleDownload}
            className={styles.downloadButton}
            aria-label={translate({
              id: 'news.page.downloadButtonAriaLabel',
              message: 'ニュースサイト一覧をダウンロード',
            })}
            title={translate({
              id: 'news.page.downloadButtonTooltip',
              message: 'CSVリストをダウンロード',
            })}
          >
            <Download size={18} />
          </button>
        </div>

        {newsData.map((majorCategory) => (
          <details key={majorCategory.id} open className={styles.majorCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <SectionHeading as="h2" id={majorCategory.id} className={styles.majorCategoryTitle} children={undefined}>
                <Translate id={majorCategory.title.id}>
                  {majorCategory.title.message}
                </Translate>
              </SectionHeading>
            </summary>
            {majorCategory.subCategories.map((subCategory) => (
              <details key={subCategory.id} open className={styles.subCategorySection}>
                <summary style={{ cursor: 'pointer' }}>
                  <SectionHeading as="h3" id={subCategory.id} className={styles.categoryTitle} children={undefined}>
                    <Translate id={subCategory.title.id}>
                      {subCategory.title.message}
                    </Translate>
                  </SectionHeading>
                </summary>
                <div className={styles.cardGrid}>
                  {subCategory.sites.map((site) => (
                    <div key={site.href}>
                      <LinksCard
                        href={site.href}
                        title={translate(site.title)}
                        description={translate(site.description)}
                      />
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </details>
        ))}
        <div style={{ marginBottom: '3rem' }}>
          <ShareButtons />
        </div>
      </main>
    </Layout>
  );
}
