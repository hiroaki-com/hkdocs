import React, { JSX } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import NewsSiteCard from '@site/src/components/NewsSiteCard';
import styles from './links.module.css';
import Translate, { translate } from '@docusaurus/Translate';


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

        {/* --- クラウド & インフラストラクチャ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="cloud-infra" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.cloudInfra">クラウド & インフラストラクチャ</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.cloud.gcp">Google Cloud Platform</Translate>
            </h3>
            <NewsSiteCard href="https://cloud.google.com/docs" title="Google Cloud Docs" description={<Translate id="links.site.cloud.gcp.desc">クイックスタート、チュートリアル、包括的なガイドを含む完全なGCPドキュメント。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/architecture" title="Cloud Architecture Center" description={<Translate id="links.site.cloud.gcpArch.desc">参照アーキテクチャ、設計ガイダンス、ベストプラクティスを提供するクラウドアーキテクチャセンター。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.cloud.containerIac">コンテナ技術 & IaC</Translate>
            </h3>
            <NewsSiteCard href="https://docs.docker.com/" title="Docker Docs" description={<Translate id="links.site.cloud.docker.desc">コンテナ仮想化技術のデファクトスタンダード。公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://www.terraform.io/docs" title="Terraform Docs" description={<Translate id="links.site.cloud.terraform.desc">Infrastructure as Codeを実現する代表的なツールの公式ドキュメント。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.cloud.cicd">CI/CD</Translate>
            </h3>
            <NewsSiteCard href="https://cloud.google.com/build/docs" title="Google Cloud Build" description={<Translate id="links.site.cloud.gcb.desc">GCP上でCI/CDパイプラインを実行するためのマネージドサービス。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/actions" title="GitHub Actions" description={<Translate id="links.site.cloud.ghactions.desc">GitHubに統合されたCI/CDプラットフォーム。ワークフローを自動化。</Translate>} />
          </div>
        </details>

        {/* --- バックエンド開発 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="backend-dev" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.backendDev">バックエンド開発</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.backend.pythonWeb">Python & Webフレームワーク</Translate>
            </h3>
            <NewsSiteCard href="https://docs.python.org/3/" title="Python 3 Docs" description={<Translate id="links.site.backend.python.desc">公式Python 3ドキュメント。言語仕様から標準ライブラリまで。</Translate>} />
            <NewsSiteCard href="https://docs.djangoproject.com/" title="Django Docs" description={<Translate id="links.site.backend.django.desc">堅牢でスケーラブルなWebアプリを迅速に開発するためのPythonフレームワーク。</Translate>} />
            <NewsSiteCard href="https://www.django-rest-framework.org/" title="Django REST Framework" description={<Translate id="links.site.backend.drf.desc">Djangoで強力かつ柔軟なWeb APIを構築するためのツールキット。</Translate>} />
            <NewsSiteCard href="https://fastapi.tiangolo.com/" title="FastAPI" description={<Translate id="links.site.backend.fastapi.desc">Python 3.6+の型ヒントをベースにした、モダンで高速なWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://flask.palletsprojects.com/" title="Flask" description={<Translate id="links.site.backend.flask.desc">軽量で拡張性の高いPythonマイクロWebフレームワーク。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.backend.jsNode">JavaScript & Node.js</Translate>
            </h3>
            <NewsSiteCard href="https://nodejs.org/docs/" title="Node.js Docs" description={<Translate id="links.site.backend.node.desc">非同期イベント駆動型のJavaScript実行環境の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://expressjs.com/" title="Express.js" description={<Translate id="links.site.backend.express.desc">Node.jsのための高速で最小限のWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://nestjs.com/" title="NestJS" description={<Translate id="links.site.backend.nestjs.desc">効率的でスケーラブルなサーバーサイドアプリケーションを構築するためのNode.jsフレームワーク。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.backend.apiDesign">API設計 & 標準</Translate>
            </h3>
            <NewsSiteCard href="https://www.openapis.org/" title="OpenAPI Specification" description={<Translate id="links.site.backend.openapi.desc">RESTful APIを記述するための標準仕様。エコシステムが豊富。</Translate>} />
          </div>
        </details>
        
        {/* --- データ & 分析 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="data-analytics" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.dataAnalytics">データ & 分析</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.data.gcp">Google Cloud データサービス</Translate>
            </h3>
            <NewsSiteCard href="https://cloud.google.com/bigquery/docs" title="BigQuery Docs" description={<Translate id="links.site.data.bigquery.desc">ペタバイト級のデータを分析できるサーバーレスなデータウェアハウス。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.data.tools">データ分析 & ツール</Translate>
            </h3>
            <NewsSiteCard href="https://dbt.getdbt.com/docs/" title="dbt Docs" description={<Translate id="links.site.data.dbt.desc">データウェアハウスでのデータ変換を支援する「T」 in ELTツール。</Translate>} />
            <NewsSiteCard href="https://sqlzoo.net/" title="SQLZoo" description={<Translate id="links.site.data.sqlzoo.desc">インタラクティブなチュートリアルと演習を通じてSQLを実践的に学べるサイト。</Translate>} />
          </div>
        </details>

        {/* --- 機械学習 & AI --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="ml-ai" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.mlAi">機械学習 & AI</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.ai.mlops">MLOps & 開発プラットフォーム</Translate>
            </h3>
            <NewsSiteCard href="https://www.kubeflow.org/docs/" title="Kubeflow Docs" description={<Translate id="links.site.ai.kubeflow.desc">Kubernetes上でMLワークフローをデプロイ、管理するためのプラットフォーム。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.ai.resources">AI開発リソース</Translate>
            </h3>
            <NewsSiteCard href="https://www.kaggle.com/learn" title="Kaggle Learn" description={<Translate id="links.site.ai.kaggle.desc">データサイエンスのコンペ、公開データセット、学習リソースが集まる世界最大のコミュニティ。</Translate>} />
          </div>
        </details>

        {/* --- フロントエンド & Web標準 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="frontend-web" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.frontendWeb">フロントエンド & Web標準</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.frontend.jsFrameworks">JavaScript & フレームワーク</Translate>
            </h3>
            <NewsSiteCard href="https://react.dev/" title="React" description={<Translate id="links.site.frontend.react.desc">コンポーネントベースUIを構築するための宣言的JavaScriptライブラリ。</Translate>} />
            <NewsSiteCard href="https://nextjs.org/docs" title="Next.js Docs" description={<Translate id="links.site.frontend.nextjs.desc">Reactをベースにしたプロダクションフレームワーク。多彩なレンダリング戦略を提供。</Translate>} />
            <NewsSiteCard href="https://www.typescriptlang.org/docs/" title="TypeScript Docs" description={<Translate id="links.site.frontend.ts.desc">静的型付けを導入し、大規模開発の堅牢性を高めるJavaScriptのスーパーセット。</Translate>} />
            <NewsSiteCard href="https://vitejs.dev/guide/" title="Vite" description={<Translate id="links.site.frontend.vite.desc">高速な開発サーバーとビルドが特徴の次世代フロントエンドツール。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.frontend.stylingTools">スタイリング & ツール</Translate>
            </h3>
            <NewsSiteCard href="https://tailwindcss.com/docs" title="Tailwind CSS" description={<Translate id="links.site.frontend.tailwind.desc">ユーティリティファーストのCSSフレームワーク。HTML内で迅速にカスタムデザインを構築。</Translate>} />
            <NewsSiteCard href="https://storybook.js.org/docs/" title="Storybook Docs" description={<Translate id="links.site.frontend.storybook.desc">UIコンポーネントを分離して開発・文書化するためのツール。</Translate>} />
            <NewsSiteCard href="https://playwright.dev/" title="Playwright" description={<Translate id="links.site.frontend.playwright.desc">信頼性の高いエンドツーエンドテストを自動化するためのフレームワーク。</Translate>} />
            <NewsSiteCard href="https://caniuse.com/" title="Can I use..." description={<Translate id="links.site.frontend.caniuse.desc">フロントエンド技術のブラウザ対応状況を確認できる必須ツール。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.frontend.webStandards">Web標準</Translate>
            </h3>
            <NewsSiteCard href="https://developer.mozilla.org/" title="MDN Web Docs" description={<Translate id="links.site.frontend.mdn.desc">Web技術のデファクトスタンダード。HTML, CSS, JavaScript等の公式リファレンス。</Translate>} />
            <NewsSiteCard href="https://web.dev/" title="web.dev" description={<Translate id="links.site.frontend.webdev.desc">GoogleによるモダンなWeb開発のベストプラクティス集。パフォーマンス、アクセシビリティなど。</Translate>} />
            <NewsSiteCard href="https://www.w3.org/" title="W3C" description={<Translate id="links.site.frontend.w3c.desc">World Wide Webの技術標準を策定する国際的な標準化団体。</Translate>} />
            <NewsSiteCard href="https://www.ietf.org/" title="IETF" description={<Translate id="links.site.frontend.ietf.desc">インターネットの技術標準を策定するボランティアベースの組織。</Translate>} />
          </div>
        </details>

        {/* --- 開発ツール & 学習 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="dev-tools" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.devTools">開発ツール & 学習</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.devtools.versionControl">バージョン管理</Translate>
            </h3>
            <NewsSiteCard href="https://git-scm.com/docs" title="Git Official Docs" description={<Translate id="links.site.devtools.git.desc">分散バージョン管理システムGitの公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/" title="GitHub Docs" description={<Translate id="links.site.devtools.github.desc">コードホスティング、共同開発、ActionsなどGitHub機能の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://learngitbranching.js.org/" title="Learn Git Branching" description={<Translate id="links.site.devtools.learngit.desc">Gitのブランチ操作を視覚的かつインタラクティブに学べる、非常に優れた学習ツール。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.devtools.learningCommunity">学習 & コミュニティ</Translate>
            </h3>
            <NewsSiteCard href="https://roadmap.sh/" title="roadmap.sh" description={<Translate id="links.site.devtools.roadmap.desc">開発者向けの様々な技術領域の学習ロードマップ。次に何を学ぶべきかを示してくれる。</Translate>} />
            <NewsSiteCard href="https://news.ycombinator.com/" title="Hacker News" description={<Translate id="links.site.devtools.hackernews.desc">Y Combinatorが運営する技術系ニュースサイト。世界中のGeekな議論が集まる場所。</Translate>} />
            <NewsSiteCard href="https://stackoverflow.com/" title="Stack Overflow" description={<Translate id="links.site.devtools.stackoverflow.desc">世界中の開発者が質問し、知識を共有するQ&Aコミュニティ。</Translate>} />
            <NewsSiteCard href="https://www.geeksforgeeks.org/" title="GeeksforGeeks" description={<Translate id="links.site.devtools.geeksforgeeks.desc">コンピュータサイエンスのトピックに関する記事、チュートリアル、問題集が豊富なサイト。</Translate>} />
            <NewsSiteCard href="https://leetcode.com/" title="LeetCode" description={<Translate id="links.site.devtools.leetcode.desc">技術面接の準備に最適な、アルゴリズムとデータ構造の問題集。</Translate>} />
          </div>
        </details>

        {/* --- ドキュメント & ナレッジ管理 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="docs-knowledge" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.docsKnowledge">ドキュメント & ナレッジ管理</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.docs.tools">ドキュメンテーションツール</Translate>
            </h3>
            <NewsSiteCard href="https://docusaurus.io/" title="Docusaurus" description={<Translate id="links.site.docs.docusaurus.desc">React製の静的サイトジェネレーター。ドキュメントサイト構築に最適。</Translate>} />
            <NewsSiteCard href="https://www.gitbook.com/" title="GitBook" description={<Translate id="links.site.docs.gitbook.desc">技術文書の作成、ホスティング、管理を簡単に行えるモダンなプラットフォーム。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.docs.knowledge">ナレッジ管理ツール</Translate>
            </h3>
            <NewsSiteCard href="https://obsidian.md/" title="Obsidian" description={<Translate id="links.site.docs.obsidian.desc">ローカルのMarkdownファイルで動作する、強力な第二の脳としてのナレッジベースツール。</Translate>} />
            <NewsSiteCard href="https://logseq.com/" title="Logseq" description={<Translate id="links.site.docs.logseq.desc">プライバシーを重視した、非線形のアウトライナー形式のナレッジベース。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.docs.diagram">作図 & ダイアグラム</Translate>
            </h3>
            <NewsSiteCard href="https://mermaid-js.github.io/" title="Mermaid" description={<Translate id="links.site.docs.mermaid.desc">Markdownのようなテキストから図やチャートを生成するライブラリ。</Translate>} />
            <NewsSiteCard href="https://plantuml.com/" title="PlantUML" description={<Translate id="links.site.docs.plantuml.desc">シンプルなテキスト記述言語からUML図を迅速に作成できるツール。</Translate>} />
          </div>
        </details>

        {/* --- セキュリティ --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="security" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.security">セキュリティ</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.security.organizations">機関 & 標準</Translate>
            </h3>
            <NewsSiteCard href="https://owasp.org/" title="OWASP" description={<Translate id="links.site.security.owasp.desc">Webアプリケーションのセキュリティを向上させることを目的としたオープンコミュニティ。</Translate>} />
            <NewsSiteCard href="https://www.nist.gov/" title="NIST" description={<Translate id="links.site.security.nist.desc">米国の国立標準技術研究所。サイバーセキュリティフレームワークなどが有名。</Translate>} />
            <NewsSiteCard href="https://www.cisa.gov/" title="CISA" description={<Translate id="links.site.security.cisa.desc">米国のサイバーセキュリティ・社会基盤安全保障庁。脅威情報やアラートを提供。</Translate>} />

            <h3 className={styles.subCategoryTitle}>
              <Translate id="links.subCategory.security.learning">学習リソース</Translate>
            </h3>
            <NewsSiteCard href="https://portswigger.net/web-security" title="Web Security Academy" description={<Translate id="links.site.security.portswigger.desc">PortSwiggerによる、Webセキュリティの脆弱性に関する無料のオンライン学習リソース。</Translate>} />
            <NewsSiteCard href="https://ocw.mit.edu/" title="MIT OpenCourseWare" description={<Translate id="links.site.security.mitocw.desc">MITの講義資料を無償で公開。サイバーセキュリティ関連コースも豊富。</Translate>} />
            <NewsSiteCard href="https://www.hacksplaining.com/" title="Hacksplaining" description={<Translate id="links.site.security.hacksplaining.desc">インタラクティブなレッスンを通じてセキュリティ脆弱性を学べるサイト。</Translate>} />
            <NewsSiteCard href="https://github.com/sbilly/awesome-security" title="Awesome Security (GitHub)" description={<Translate id="links.site.security.awesomesec.desc">セキュリティに関するツール、リソース、ライブラリなどを集めたキュレーションリスト。</Translate>} />
          </div>
        </details>

      </main>
    </Layout>
  );
}
