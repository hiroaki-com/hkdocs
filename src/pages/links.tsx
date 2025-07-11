import React, { JSX, ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import NewsSiteCard from '@site/src/components/NewsSiteCard';
import styles from './links.module.css';
import Translate, { translate } from '@docusaurus/Translate';

// Propsの型を定義
interface SectionHeadingProps {
  id: string;
  children: ReactNode;
}

/**
 * ホバー時に左側にアンカーリンク('#')を表示する見出しコンポーネント
 */
const SectionHeading = ({ id, children }: SectionHeadingProps) => {
  return (
    // CSSでホバーを検知するための親要素
    <h2 id={id} className={`${styles.majorCategoryTitle} ${styles.sectionHeading}`}>
      {/* アンカーリンク(#) */}
      <a
        className={styles.anchorLink}
        href={`#${id}`}
        aria-label={translate({
          id: 'theme.common.headingLinkTitle',
          message: 'この見出しへの固定リンク',
        })}>
        #
      </a>
      {/* 見出しのテキスト */}
      {children}
    </h2>
  );
};


export default function LinksPage(): JSX.Element {
  return (
    <Layout
      title={translate({ id: 'links.page.title', message: '資料集' })}
      description={translate({
        id: 'links.page.description',
        message: '開発や学習に役立つ技術ドキュメントやツールへのリンク集です。',
      })}
    >

      <Head children={''} />
      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <h1>
            <Translate id="links.page.heading">資料集</Translate>
          </h1>
          <p>
            <Translate id="links.page.subheading">
              開発・学習のためのリファレンス
            </Translate>
          </p>
        </div>

        {/* --- クラウド & インフラ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="cloud-infra"
              children={<Translate id="links.majorCategory.cloudInfra">クラウド & インフラ</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://cloud.google.com/docs" title="Google Cloud Docs" description={<Translate id="links.site.cloud.gcp.desc">クイックスタート、チュートリアル、包括的なガイドを含む完全なGCPドキュメント。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/architecture" title="Cloud Architecture Center" description={<Translate id="links.site.cloud.gcpArch.desc">参照アーキテクチャ、設計ガイダンス、ベストプラクティスを提供するクラウドアーキテクチャセンター。</Translate>} />
            <NewsSiteCard href="https://docs.docker.com/" title="Docker Docs" description={<Translate id="links.site.cloud.docker.desc">コンテナ仮想化技術のデファクトスタンダード。公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://www.terraform.io/docs" title="Terraform Docs" description={<Translate id="links.site.cloud.terraform.desc">Infrastructure as Codeを実現する代表的なツールの公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/build/docs" title="Google Cloud Build" description={<Translate id="links.site.cloud.gcb.desc">GCP上でCI/CDパイプラインを実行するためのマネージドサービス。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/actions" title="GitHub Actions" description={<Translate id="links.site.cloud.ghactions.desc">GitHubに統合されたCI/CDプラットフォーム。ワークフローを自動化。</Translate>} />
          </div>
        </details>

        {/* --- バックエンド --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="backend"
              children={<Translate id="links.majorCategory.backend">バックエンド</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://docs.python.org/3/" title="Python 3 Docs" description={<Translate id="links.site.backend.python.desc">公式Python 3ドキュメント。言語仕様から標準ライブラリまで。</Translate>} />
            <NewsSiteCard href="https://docs.djangoproject.com/" title="Django Docs" description={<Translate id="links.site.backend.django.desc">堅牢でスケーラブルなWebアプリを迅速に開発するためのPythonフレームワーク。</Translate>} />
            <NewsSiteCard href="https://www.django-rest-framework.org/" title="Django REST Framework" description={<Translate id="links.site.backend.drf.desc">Djangoで強力かつ柔軟なWeb APIを構築するためのツールキット。</Translate>} />
            <NewsSiteCard href="https://fastapi.tiangolo.com/" title="FastAPI" description={<Translate id="links.site.backend.fastapi.desc">Python 3.6+の型ヒントをベースにした、モダンで高速なWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://flask.palletsprojects.com/" title="Flask" description={<Translate id="links.site.backend.flask.desc">軽量で拡張性の高いPythonマイクロWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://nodejs.org/docs/" title="Node.js Docs" description={<Translate id="links.site.backend.node.desc">非同期イベント駆動型のJavaScript実行環境の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://nestjs.com/" title="NestJS" description={<Translate id="links.site.backend.nestjs.desc">効率的でスケーラブルなサーバーサイドアプリケーションを構築するためのNode.jsフレームワーク。</Translate>} />
            <NewsSiteCard href="https://www.openapis.org/" title="OpenAPI Specification" description={<Translate id="links.site.backend.openapi.desc">RESTful APIを記述するための標準仕様。エコシステムが豊富。</Translate>} />
          </div>
        </details>

        {/* --- フロントエンド --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="frontend"
              children={<Translate id="links.majorCategory.frontend">フロントエンド</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://developer.mozilla.org/" title="MDN Web Docs" description={<Translate id="links.site.frontend.mdn.desc">Web技術のデファクトスタンダード。HTML, CSS, JavaScript等の公式リファレンス。</Translate>} />
            <NewsSiteCard href="https://web.dev/" title="web.dev" description={<Translate id="links.site.frontend.webdev.desc">GoogleによるモダンなWeb開発のベストプラクティス集。パフォーマンス、アクセシビリティなど。</Translate>} />
            <NewsSiteCard href="https://react.dev/" title="React" description={<Translate id="links.site.frontend.react.desc">コンポーネントベースUIを構築するための宣言的JavaScriptライブラリ。</Translate>} />
            <NewsSiteCard href="https://nextjs.org/docs" title="Next.js Docs" description={<Translate id="links.site.frontend.nextjs.desc">Reactをベースにしたプロダクションフレームワーク。多彩なレンダリング戦略を提供。</Translate>} />
            <NewsSiteCard href="https://www.typescriptlang.org/docs/" title="TypeScript Docs" description={<Translate id="links.site.frontend.ts.desc">静的型付けを導入し、大規模開発の堅牢性を高めるJavaScriptのスーパーセット。</Translate>} />
            <NewsSiteCard href="https://vitejs.dev/guide/" title="Vite" description={<Translate id="links.site.frontend.vite.desc">高速な開発サーバーとビルドが特徴の次世代フロントエンドツール。</Translate>} />
            <NewsSiteCard href="https://tailwindcss.com/docs" title="Tailwind CSS" description={<Translate id="links.site.frontend.tailwind.desc">ユーティリティファーストのCSSフレームワーク。HTML内で迅速にカスタムデザインを構築。</Translate>} />
            <NewsSiteCard href="https://playwright.dev/" title="Playwright" description={<Translate id="links.site.frontend.playwright.desc">信頼性の高いエンドツーエンドテストを自動化するためのフレームワーク。</Translate>} />
            <NewsSiteCard href="https://caniuse.com/" title="Can I use..." description={<Translate id="links.site.frontend.caniuse.desc">フロントエンド技術のブラウザ対応状況を確認できる必須ツール。</Translate>} />
          </div>
        </details>

        {/* --- データ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="data"
              children={<Translate id="links.majorCategory.data">データ</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://cloud.google.com/bigquery/docs" title="BigQuery Docs" description={<Translate id="links.site.data.bigquery.desc">ペタバイト級のデータを分析できるサーバーレスなデータウェアハウス。</Translate>} />
            <NewsSiteCard href="https://dbt.getdbt.com/docs/" title="dbt Docs" description={<Translate id="links.site.data.dbt.desc">データウェアハウスでのデータ変換を支援する「T」 in ELTツール。</Translate>} />
            <NewsSiteCard href="https://sqlzoo.net/" title="SQLZoo" description={<Translate id="links.site.data.sqlzoo.desc">インタラクティブなチュートリアルと演習を通じてSQLを実践的に学べるサイト。</Translate>} />
            <NewsSiteCard href="https://www.kubeflow.org/docs/" title="Kubeflow Docs" description={<Translate id="links.site.ai.kubeflow.desc">Kubernetes上でMLワークフローをデプロイ、管理するためのプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://www.kaggle.com/learn" title="Kaggle Learn" description={<Translate id="links.site.ai.kaggle.desc">データサイエンスのコンペ、公開データセット、学習リソースが集まる世界最大のコミュニティ。</Translate>} />
          </div>
        </details>

        {/* --- バージョン管理 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="version-control"
              children={<Translate id="links.majorCategory.versionControl">バージョン管理</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://git-scm.com/docs" title="Git Official Docs" description={<Translate id="links.site.devtools.git.desc">分散バージョン管理システムGitの公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/" title="GitHub Docs" description={<Translate id="links.site.devtools.github.desc">コードホスティング、共同開発、ActionsなどGitHub機能の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://learngitbranching.js.org/" title="Learn Git Branching" description={<Translate id="links.site.devtools.learngit.desc">Gitのブランチ操作を視覚的かつインタラクティブに学べる、非常に優れた学習ツール。</Translate>} />
          </div>
        </details>

        {/* --- ドキュメント & 作図 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="documentation"
              children={<Translate id="links.majorCategory.documentation">ドキュメント & 作図</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://docusaurus.io/" title="Docusaurus" description={<Translate id="links.site.docs.docusaurus.desc">React製の静的サイトジェネレーター。ドキュメントサイト構築に最適。</Translate>} />
            <NewsSiteCard href="https://obsidian.md/" title="Obsidian" description={<Translate id="links.site.docs.obsidian.desc">ローカルのMarkdownファイルで動作する、強力な第二の脳としてのナレッジベースツール。</Translate>} />
            <NewsSiteCard href="https://www.markdownguide.org" title="Markdown Guide" description={<Translate id="links.site.docs.markdown.desc">Markdown記法の基本から拡張機能までを網羅した包括的なガイド。</Translate>} />
            <NewsSiteCard href="https://mermaid-js.github.io/" title="Mermaid" description={<Translate id="links.site.docs.mermaid.desc">Markdownのようなテキストから図やチャートを生成するライブラリ。</Translate>} />
            <NewsSiteCard href="https://plantuml.com/" title="PlantUML" description={<Translate id="links.site.docs.plantuml.desc">シンプルなテキスト記述言語からUML図を迅速に作成できるツール。</Translate>} />
            <NewsSiteCard href="https://app.diagrams.net/" title="draw.io" description={<Translate id="links.site.docs.drawio.desc">ブラウザで使える高機能な無料作図ツール。フローチャート、UML、ネットワーク構成図など、あらゆる図の作成に対応。</Translate>} />
            <NewsSiteCard href="https://excalidraw.com/" title="Excalidraw" description={<Translate id="links.site.docs.excalidraw.desc">手書き風の図を素早く作成できるオンラインホワイトボード。共同編集機能が強力で、チームでのブレインストーミングや設計議論に最適。</Translate>} />
            <NewsSiteCard href="https://www.figma.com/" title="Figma" description={<Translate id="links.site.docs.figma.desc">UIデザインから図表作成までこなす共同作業プラットフォーム。エンジニアリングの設計プロセスでも広く活用されるオンラインツール。</Translate>} />
          </div>
        </details>

        {/* --- 学習 & コミュニティ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="learning-community"
              children={<Translate id="links.majorCategory.learningCommunity">学習 & コミュニティ</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://roadmap.sh/" title="roadmap.sh" description={<Translate id="links.site.devtools.roadmap.desc">開発者向けの様々な技術領域の学習ロードマップ。次に何を学ぶべきかを示してくれる。</Translate>} />
            <NewsSiteCard href="https://news.ycombinator.com/" title="Hacker News" description={<Translate id="links.site.devtools.hackernews.desc">Y Combinatorが運営する技術系ニュースサイト。世界中のGeekな議論が集まる場所。</Translate>} />
            <NewsSiteCard href="https://stackoverflow.com/" title="Stack Overflow" description={<Translate id="links.site.devtools.stackoverflow.desc">世界中の開発者が質問し、知識を共有するQ&Aコミュニティ。</Translate>} />
            <NewsSiteCard href="https://www.geeksforgeeks.org/" title="GeeksforGeeks" description={<Translate id="links.site.devtools.geeksforgeeks.desc">コンピュータサイエンスのトピックに関する記事、チュートリアル、問題集が豊富なサイト。</Translate>} />
            <NewsSiteCard href="https://leetcode.com/" title="LeetCode" description={<Translate id="links.site.devtools.leetcode.desc">技術面接の準備に最適な、アルゴリズムとデータ構造の問題集。</Translate>} />
          </div>
        </details>

        {/* --- セキュリティ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="security"
              children={<Translate id="links.majorCategory.security">セキュリティ</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://owasp.org/" title="OWASP" description={<Translate id="links.site.security.owasp.desc">Webアプリケーションのセキュリティを向上させることを目的としたオープンコミュニティ。</Translate>} />
            <NewsSiteCard href="https://www.nist.gov/" title="NIST" description={<Translate id="links.site.security.nist.desc">米国の国立標準技術研究所。サイバーセキュリティフレームワークなどが有名。</Translate>} />
            <NewsSiteCard href="https://www.cisa.gov/" title="CISA" description={<Translate id="links.site.security.cisa.desc">米国のサイバーセキュリティ・社会基盤安全保障庁。脅威情報やアラートを提供。</Translate>} />
            <NewsSiteCard href="https://portswigger.net/web-security" title="Web Security Academy" description={<Translate id="links.site.security.portswigger.desc">PortSwiggerによる、Webセキュリティの脆弱性に関する無料のオンライン学習リソース。</Translate>} />
            <NewsSiteCard href="https://ocw.mit.edu/" title="MIT OpenCourseWare" description={<Translate id="links.site.security.mitocw.desc">MITの講義資料を無償で公開。サイバーセキュリティ関連コースも豊富。</Translate>} />
            <NewsSiteCard href="https://www.hacksplaining.com/owasp" title="Hacksplaining" description={<Translate id="links.site.security.hacksplaining.desc">インタラクティブなレッスンを通じてセキュリティ脆弱性を学べるサイト。</Translate>} />
            <NewsSiteCard href="https://github.com/sbilly/awesome-security" title="Awesome Security (GitHub)" description={<Translate id="links.site.security.awesomesec.desc">セキュリティに関するツール、リソース、ライブラリなどを集めたキュレーションリスト。</Translate>} />
          </div>
        </details>

        {/* --- 学術研究 & 論文 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="academic-research"
              children={<Translate id="links.majorCategory.academicResearch">学術研究 & 論文</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://arxiv.org/" title="arXiv" description={<Translate id="links.site.academic.arxiv.desc">物理学、数学、CS等の査読前論文を無料公開するオープンアクセスの先駆的プラットフォーム。</Translate>} />
            <NewsSiteCard href="https://ieeexplore.ieee.org/" title="IEEE Xplore" description={<Translate id="links.site.academic.ieee.desc">IEEE発行の電気工学・CS分野の学術雑誌、論文、技術標準を提供するデジタルライブラリ。</Translate>} />
            <NewsSiteCard href="https://dl.acm.org/" title="ACM Digital Library" description={<Translate id="links.site.academic.acm.desc">コンピューティング分野最大の学術団体ACMが発行する全論文誌や国際会議録を網羅。</Translate>} />
            <NewsSiteCard href="https://scholar.google.com/" title="Google Scholar" description={<Translate id="links.site.academic.scholar.desc">あらゆる学術分野の論文や書籍を横断検索でき、被引用数も追跡可能な検索エンジン。</Translate>} />
            <NewsSiteCard href="https://www.semanticscholar.org/" title="Semantic Scholar" description={<Translate id="links.site.academic.semanticscholar.desc">AIを活用し、論文要旨の自動生成や影響の大きい引用の可視化で文献調査を支援。</Translate>} />
            <NewsSiteCard href="https://dblp.org/" title="DBLP" description={<Translate id="links.site.academic.dblp.desc">CS分野に特化し、研究者の論文リストや共著者ネットワークを正確に追跡できる書誌情報DB。</Translate>} />
            <NewsSiteCard href="http://citeseerx.ist.psu.edu/" title="CiteSeerX" description={<Translate id="links.site.academic.citeseerx.desc">コンピュータ・情報科学分野の論文を対象に、引用情報を自動で抽出・リンクする検索エンジン。</Translate>} />
            <NewsSiteCard href="https://www.medrxiv.org/" title="medRxiv" description={<Translate id="links.site.academic.medrxiv.desc">医学・臨床・健康科学分野専門のプレプリントサーバー。最新の研究成果を迅速に共有。</Translate>} />
            <NewsSiteCard href="https://www.techrxiv.org/" title="TechRxiv" description={<Translate id="links.site.academic.techrxiv.desc">IEEEが設立した、電気工学やCS分野のプレプリントサーバー。</Translate>} />
            <NewsSiteCard href="https://www.ssrn.com/index.cfm/en/compscirn/" title="SSRN" description={<Translate id="links.site.academic.ssrn.desc">社会科学・人文科学分野中心の、世界最大級のワーキングペーパー・プレプリント共有プラットフォーム。</Translate>} />
            <NewsSiteCard href="https://doaj.org/" title="DOAJ" description={<Translate id="links.site.academic.doaj.desc">品質基準を満たした信頼性の高いオープンアクセスジャーナルのみを収録するディレクトリ。</Translate>} />
            <NewsSiteCard href="https://rnavi.org/" title="論文ナビ" description={<Translate id="links.site.academic.rnavi.desc">研究者有志によって運営される論文紹介・解説記事の投稿プラットフォーム。アウトリーチを重視し、一般向けのプレスリリース記事や専門家向けの解説、注目論文のレビュー、関連トピックの論文紹介などを投稿可能</Translate>} />
          </div>
        </details>

        {/* --- 標準化団体 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <SectionHeading
              id="standards-orgs"
              children={<Translate id="links.majorCategory.standardsOrgs">標準化団体</Translate>}
            />
          </summary>
          <div className={styles.cardGrid}>
            <NewsSiteCard href="https://www.w3.org/" title="W3C" description={<Translate id="links.site.standards.w3c.desc">World Wide Webの技術標準を策定する国際的な標準化団体。</Translate>} />
            <NewsSiteCard href="https://www.ietf.org/" title="IETF" description={<Translate id="links.site.standards.ietf.desc">インターネットの技術標準を策定するボランティアベースの組織。</Translate>} />
          </div>
        </details>

      </main>
    </Layout>
  );
}
