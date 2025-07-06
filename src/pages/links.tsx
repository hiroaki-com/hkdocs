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
            <h3 className={styles.subCategoryTitle}>Google Cloud Platform</h3>
            <NewsSiteCard href="https://cloud.google.com/docs" title="Google Cloud Docs" description={<Translate id="links.site.cloud.gcp.desc">クイックスタート、チュートリアル、包括的なガイドを含む完全なGCPドキュメント。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/architecture" title="Cloud Architecture Center" description={<Translate id="links.site.cloud.gcpArch.desc">参照アーキテクチャ、設計ガイダンス、ベストプラクティスを提供するクラウドアーキテクチャセンター。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/sdk/docs" title="Google Cloud CLI Docs" description={<Translate id="links.site.cloud.gcloud.desc">gcloud, gsutil, bqコマンドラインツールのためのGoogle Cloud CLIドキュメント。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/security/docs" title="Google Cloud Security" description={<Translate id="links.site.cloud.gcpSecurity.desc">Google Cloudのセキュリティに関するドキュメントとベストプラクティス。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>Amazon Web Services</h3>
            <NewsSiteCard href="https://docs.aws.amazon.com/" title="AWS Documentation" description={<Translate id="links.site.cloud.aws.desc">全てのAWSサービスをカバーする包括的なドキュメント。</Translate>} />
            <NewsSiteCard href="https://aws.amazon.com/architecture/" title="AWS Architecture Center" description={<Translate id="links.site.cloud.awsArch.desc">Well-Architectedフレームワークのガイダンスを含むAWSアーキテクチャセンター。</Translate>} />
            <NewsSiteCard href="https://aws.amazon.com/whitepapers/" title="AWS Whitepapers" description={<Translate id="links.site.cloud.awsWhitepapers.desc">クラウドアーキテクチャとベストプラクティスに関するAWSのホワイトペーパー。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>コンテナ技術 & IaC</h3>
            <NewsSiteCard href="https://kubernetes.io/docs/" title="Kubernetes Docs" description={<Translate id="links.site.cloud.k8s.desc">コンテナオーケストレーションツールのデファクトスタンダード。公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://docs.docker.com/" title="Docker Docs" description={<Translate id="links.site.cloud.docker.desc">コンテナ仮想化技術のデファクトスタンダード。公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://www.terraform.io/docs" title="Terraform Docs" description={<Translate id="links.site.cloud.terraform.desc">Infrastructure as Codeを実現する代表的なツールの公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://www.pulumi.com/docs/" title="Pulumi Docs" description={<Translate id="links.site.cloud.pulumi.desc">使い慣れたプログラミング言語でIaCを実現するモダンなツール。</Translate>} />
            <NewsSiteCard href="https://docs.ansible.com/" title="Ansible Docs" description={<Translate id="links.site.cloud.ansible.desc">構成管理とプロビジョニングを自動化するツールの公式ドキュメント。</Translate>} />

            <h3 className={styles.subCategoryTitle}>CI/CD</h3>
            <NewsSiteCard href="https://cloud.google.com/build/docs" title="Google Cloud Build" description={<Translate id="links.site.cloud.gcb.desc">GCP上でCI/CDパイプラインを実行するためのマネージドサービス。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/actions" title="GitHub Actions" description={<Translate id="links.site.cloud.ghactions.desc">GitHubに統合されたCI/CDプラットフォーム。ワークフローを自動化。</Translate>} />
            <NewsSiteCard href="https://docs.gitlab.com/ee/ci/" title="GitLab CI/CD" description={<Translate id="links.site.cloud.gitlab.desc">ソースコード管理からCI/CDまでを統合したDevOpsプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://helm.sh/docs/" title="Helm Docs" description={<Translate id="links.site.cloud.helm.desc">KubernetesのパッケージマネージャーHelmの公式ドキュメント。</Translate>} />
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
            <h3 className={styles.subCategoryTitle}>Python & Webフレームワーク</h3>
            <NewsSiteCard href="https://docs.python.org/3/" title="Python 3 Docs" description={<Translate id="links.site.backend.python.desc">公式Python 3ドキュメント。言語仕様から標準ライブラリまで。</Translate>} />
            <NewsSiteCard href="https://docs.djangoproject.com/" title="Django Docs" description={<Translate id="links.site.backend.django.desc">堅牢でスケーラブルなWebアプリを迅速に開発するためのPythonフレームワーク。</Translate>} />
            <NewsSiteCard href="https://www.django-rest-framework.org/" title="Django REST Framework" description={<Translate id="links.site.backend.drf.desc">Djangoで強力かつ柔軟なWeb APIを構築するためのツールキット。</Translate>} />
            <NewsSiteCard href="https://fastapi.tiangolo.com/" title="FastAPI" description={<Translate id="links.site.backend.fastapi.desc">Python 3.6+の型ヒントをベースにした、モダンで高速なWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://flask.palletsprojects.com/" title="Flask" description={<Translate id="links.site.backend.flask.desc">軽量で拡張性の高いPythonマイクロWebフレームワーク。</Translate>} />

            <h3 className={styles.subCategoryTitle}>JavaScript & Node.js</h3>
            <NewsSiteCard href="https://nodejs.org/docs/" title="Node.js Docs" description={<Translate id="links.site.backend.node.desc">非同期イベント駆動型のJavaScript実行環境の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://expressjs.com/" title="Express.js" description={<Translate id="links.site.backend.express.desc">Node.jsのための高速で最小限のWebフレームワーク。</Translate>} />
            <NewsSiteCard href="https://nestjs.com/" title="NestJS" description={<Translate id="links.site.backend.nestjs.desc">効率的でスケーラブルなサーバーサイドアプリケーションを構築するためのNode.jsフレームワーク。</Translate>} />

            <h3 className={styles.subCategoryTitle}>プログラミング言語</h3>
            <NewsSiteCard href="https://go.dev/doc/" title="Go Docs" description={<Translate id="links.site.backend.go.desc">Googleが開発した、シンプルで効率的な静的型付けコンパイル言語。</Translate>} />
            <NewsSiteCard href="https://doc.rust-lang.org/" title="Rust Docs" description={<Translate id="links.site.backend.rust.desc">安全性、速度、並行性を重視したシステムプログラミング言語。</Translate>} />
            <NewsSiteCard href="https://kotlinlang.org/docs/" title="Kotlin Docs" description={<Translate id="links.site.backend.kotlin.desc">JVM上で動作する、現代的で実用的なプログラミング言語。</Translate>} />

            <h3 className={styles.subCategoryTitle}>API設計 & 標準</h3>
            <NewsSiteCard href="https://graphql.org/learn/" title="GraphQL" description={<Translate id="links.site.backend.graphql.desc">APIのためのクエリ言語。クライアントが必要なデータのみを要求できる。</Translate>} />
            <NewsSiteCard href="https://grpc.io/docs/" title="gRPC" description={<Translate id="links.site.backend.grpc.desc">Google開発の高性能RPCフレームワーク。Protocol Buffersを標準利用。</Translate>} />
            <NewsSiteCard href="https://www.openapis.org/" title="OpenAPI Specification" description={<Translate id="links.site.backend.openapi.desc">RESTful APIを記述するための標準仕様。エコシステムが豊富。</Translate>} />
            <NewsSiteCard href="https://swagger.io/docs/" title="Swagger" description={<Translate id="links.site.backend.swagger.desc">OpenAPI Specificationに基づいたAPI開発ツールセット。</Translate>} />
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
            <h3 className={styles.subCategoryTitle}>Google Cloud データサービス</h3>
            <NewsSiteCard href="https://cloud.google.com/bigquery/docs" title="BigQuery Docs" description={<Translate id="links.site.data.bigquery.desc">ペタバイト級のデータを分析できるサーバーレスなデータウェアハウス。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/dataflow/docs" title="Dataflow Docs" description={<Translate id="links.site.data.dataflow.desc">ストリームおよびバッチデータの処理パイプラインを実行するマネージドサービス。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/dataproc/docs" title="Dataproc Docs" description={<Translate id="links.site.data.dataproc.desc">Apache SparkとHadoopのマネージドサービス。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/composer/docs" title="Cloud Composer Docs" description={<Translate id="links.site.data.composer.desc">Apache Airflowのマネージドサービス。</Translate>} />

            <h3 className={styles.subCategoryTitle}>データベース</h3>
            <NewsSiteCard href="https://www.postgresql.org/docs/" title="PostgreSQL Docs" description={<Translate id="links.site.data.postgres.desc">強力なオープンソースのリレーショナルデータベース。</Translate>} />
            <NewsSiteCard href="https://dev.mysql.com/doc/" title="MySQL Docs" description={<Translate id="links.site.data.mysql.desc">世界で最も普及しているオープンソースのRDBの一つ。</Translate>} />
            <NewsSiteCard href="https://docs.mongodb.com/" title="MongoDB Docs" description={<Translate id="links.site.data.mongodb.desc">ドキュメント指向のNoSQLデータベース。</Translate>} />
            <NewsSiteCard href="https://redis.io/documentation" title="Redis Docs" description={<Translate id="links.site.data.redis.desc">インメモリで動作する高速なKey-Valueストア。</Translate>} />
            <NewsSiteCard href="https://www.duckdb.org/docs/" title="DuckDB Docs" description={<Translate id="links.site.data.duckdb.desc">高速なインプロセス分析用データベースエンジン。</Translate>} />

            <h3 className={styles.subCategoryTitle}>データ分析 & ツール</h3>
            <NewsSiteCard href="https://pandas.pydata.org/docs/" title="Pandas Docs" description={<Translate id="links.site.data.pandas.desc">Pythonのデータ分析ライブラリ。データフレーム操作が強力。</Translate>} />
            <NewsSiteCard href="https://numpy.org/doc/" title="NumPy Docs" description={<Translate id="links.site.data.numpy.desc">Pythonの数値計算ライブラリ。多次元配列の操作に不可欠。</Translate>} />
            <NewsSiteCard href="https://dbt.getdbt.com/docs/" title="dbt Docs" description={<Translate id="links.site.data.dbt.desc">データウェアハウスでのデータ変換を支援する「T」 in ELTツール。</Translate>} />
            <NewsSiteCard href="https://supabase.com/docs" title="Supabase Docs" description={<Translate id="links.site.data.supabase.desc">オープンソースのFirebase代替。PostgreSQLをベースにしたBaaS。</Translate>} />
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
            <h3 className={styles.subCategoryTitle}>Google Cloud AI/ML プラットフォーム</h3>
            <NewsSiteCard href="https://cloud.google.com/vertex-ai/docs" title="Vertex AI Docs" description={<Translate id="links.site.ai.vertexai.desc">MLモデルのビルド、デプロイ、スケーリングを統一するGCPのMLプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://developers.google.com/machine-learning/crash-course" title="Google ML Crash Course" description={<Translate id="links.site.ai.mlcrashcourse.desc">Googleのエンジニアが作成した、機械学習の基礎を速習するための実践的なコース。</Translate>} />
            <NewsSiteCard href="https://cloud.google.com/ai/docs" title="Google Cloud AI Docs" description={<Translate id="links.site.ai.gcpa.desc">翻訳、音声、視覚など、GCPのAIサービス全体のドキュメント。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>機械学習フレームワーク</h3>
            <NewsSiteCard href="https://www.tensorflow.org/" title="TensorFlow" description={<Translate id="links.site.ai.tf.desc">Googleが開発した機械学習のためのエンドツーエンドなオープンソースプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://pytorch.org/" title="PyTorch" description={<Translate id="links.site.ai.pytorch.desc">Define-by-Runのアプローチが特徴的な機械学習ライブラリ。研究分野で広く採用。</Translate>} />
            <NewsSiteCard href="https://scikit-learn.org/stable/" title="scikit-learn" description={<Translate id="links.site.ai.sklearn.desc">Pythonの代表的な機械学習ライブラリ。分類、回帰、クラスタリングなど。</Translate>} />

            <h3 className={styles.subCategoryTitle}>MLOps & 開発プラットフォーム</h3>
            <NewsSiteCard href="https://mlflow.org/docs/" title="MLflow Docs" description={<Translate id="links.site.ai.mlflow.desc">機械学習のライフサイクル全体を管理するためのオープンソースプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://www.kubeflow.org/docs/" title="Kubeflow Docs" description={<Translate id="links.site.ai.kubeflow.desc">Kubernetes上でMLワークフローをデプロイ、管理するためのプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://dvc.org/doc" title="DVC Docs" description={<Translate id="links.site.ai.dvc.desc">データとモデルのバージョン管理をGitと連携して行うためのツール。</Translate>} />
            <NewsSiteCard href="https://wandb.ai/site/docs" title="Weights & Biases Docs" description={<Translate id="links.site.ai.wandb.desc">ML実験の追跡、可視化、再現を支援するプラットフォーム。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>AI開発リソース</h3>
            <NewsSiteCard href="https://huggingface.co/docs" title="Hugging Face Docs" description={<Translate id="links.site.ai.hf.desc">自然言語処理(NLP)のためのトランスフォーマーモデルとライブラリのハブ。</Translate>} />
            <NewsSiteCard href="https://www.kaggle.com/learn" title="Kaggle Learn" description={<Translate id="links.site.ai.kaggle.desc">データサイエンスのコンペ、公開データセット、学習リソースが集まる世界最大のコミュニティ。</Translate>} />
            <NewsSiteCard href="https://colab.research.google.com/" title="Google Colab" description={<Translate id="links.site.ai.colab.desc">ブラウザからPythonを実行できる、特に機械学習に適した環境。無料のGPUアクセスが強力。</Translate>} />
            <NewsSiteCard href="https://optuna.readthedocs.io/" title="Optuna Docs" description={<Translate id="links.site.ai.optuna.desc">ハイパーパラメータの自動最適化フレームワーク。</Translate>} />
          </div>
        </details>

        {/* --- フロントエンド & デザイン --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="frontend-design" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.frontendDesign">フロントエンド & デザイン</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>Web標準技術</h3>
            <NewsSiteCard href="https://developer.mozilla.org/" title="MDN Web Docs" description={<Translate id="links.site.frontend.mdn.desc">Web技術のデファクトスタンダード。HTML, CSS, JavaScript等の公式リファレンス。</Translate>} />
            <NewsSiteCard href="https://web.dev/" title="web.dev" description={<Translate id="links.site.frontend.webdev.desc">GoogleによるモダンなWeb開発のベストプラクティス集。パフォーマンス、アクセシビリティなど。</Translate>} />

            <h3 className={styles.subCategoryTitle}>React エコシステム</h3>
            <NewsSiteCard href="https://react.dev/" title="React" description={<Translate id="links.site.frontend.react.desc">コンポーネントベースUIを構築するための宣言的JavaScriptライブラリ。</Translate>} />
            <NewsSiteCard href="https://nextjs.org/docs" title="Next.js Docs" description={<Translate id="links.site.frontend.nextjs.desc">Reactをベースにしたプロダクションフレームワーク。多彩なレンダリング戦略を提供。</Translate>} />

            <h3 className={styles.subCategoryTitle}>TypeScript & モダンJS</h3>
            <NewsSiteCard href="https://www.typescriptlang.org/docs/" title="TypeScript Docs" description={<Translate id="links.site.frontend.ts.desc">静的型付けを導入し、大規模開発の堅牢性を高めるJavaScriptのスーパーセット。</Translate>} />
            <NewsSiteCard href="https://vitejs.dev/guide/" title="Vite" description={<Translate id="links.site.frontend.vite.desc">高速な開発サーバーとビルドが特徴の次世代フロントエンドツール。</Translate>} />

            <h3 className={styles.subCategoryTitle}>CSSフレームワーク & スタイリング</h3>
            <NewsSiteCard href="https://tailwindcss.com/docs" title="Tailwind CSS" description={<Translate id="links.site.frontend.tailwind.desc">ユーティリティファーストのCSSフレームワーク。HTML内で迅速にカスタムデザインを構築。</Translate>} />
            <NewsSiteCard href="https://ui.shadcn.com/" title="shadcn/ui" description={<Translate id="links.site.frontend.shadcnui.desc">コンポーネントをコピー＆ペーストして使う新しいアプローチのUIコンポーネント集。</Translate>} />
            <NewsSiteCard href="https://mui.com/" title="Material-UI" description={<Translate id="links.site.frontend.mui.desc">GoogleのMaterial Designを実装した、人気のReact UIフレームワーク。</Translate>} />

            <h3 className={styles.subCategoryTitle}>デザイン & テスト</h3>
            <NewsSiteCard href="https://www.figma.com/developers" title="Figma for Developers" description={<Translate id="links.site.frontend.figma.desc">ブラウザベースのUI/UXデザインツール。共同編集機能が強力。</Translate>} />
            <NewsSiteCard href="https://storybook.js.org/docs/" title="Storybook Docs" description={<Translate id="links.site.frontend.storybook.desc">UIコンポーネントを分離して開発・文書化するためのツール。</Translate>} />
            <NewsSiteCard href="https://playwright.dev/" title="Playwright" description={<Translate id="links.site.frontend.playwright.desc">信頼性の高いエンドツーエンドテストを自動化するためのフレームワーク。</Translate>} />
            <NewsSiteCard href="https://caniuse.com/" title="Can I use..." description={<Translate id="links.site.frontend.caniuse.desc">フロントエンド技術のブラウザ対応状況を確認できる必須ツール。</Translate>} />
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
            <h3 className={styles.subCategoryTitle}>バージョン管理 & 共同開発</h3>
            <NewsSiteCard href="https://git-scm.com/docs" title="Git Official Docs" description={<Translate id="links.site.devtools.git.desc">分散バージョン管理システムGitの公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://docs.github.com/" title="GitHub Docs" description={<Translate id="links.site.devtools.github.desc">コードホスティング、共同開発、ActionsなどGitHub機能の公式ドキュメント。</Translate>} />
            <NewsSiteCard href="https://learngitbranching.js.org/" title="Learn Git Branching" description={<Translate id="links.site.devtools.learngit.desc">Gitのブランチ操作を視覚的かつインタラクティブに学べる、非常に優れた学習ツール。</Translate>} />

            <h3 className={styles.subCategoryTitle}>開発ユーティリティ</h3>
            <NewsSiteCard href="https://regex101.com/" title="regex101" description={<Translate id="links.site.devtools.regex101.desc">正規表現の作成、テスト、デバッグをリアルタイムで行える高機能なオンラインツール。</Translate>} />
            <NewsSiteCard href="https://godbolt.org/" title="Compiler Explorer" description={<Translate id="links.site.devtools.godbolt.desc">書いたコードが各種コンパイラでどうコンパイルされるかを確認できるインタラクティブツール。</Translate>} />
            <NewsSiteCard href="https://replit.com/" title="Replit" description={<Translate id="links.site.devtools.replit.desc">ブラウザ上でコーディング、コンパイル、実行、共有ができるオンラインIDE。</Translate>} />

            <h3 className={styles.subCategoryTitle}>学習 & キャリア</h3>
            <NewsSiteCard href="https://roadmap.sh/" title="roadmap.sh" description={<Translate id="links.site.devtools.roadmap.desc">開発者向けの様々な技術領域の学習ロードマップ。次に何を学ぶべきかを示してくれる。</Translate>} />
            <NewsSiteCard href="https://news.ycombinator.com/" title="Hacker News" description={<Translate id="links.site.devtools.hackernews.desc">Y Combinatorが運営する技術系ニュースサイト。世界中のGeekな議論が集まる場所。</Translate>} />
            <NewsSiteCard href="https://exercism.io/" title="Exercism" description={<Translate id="links.site.devtools.exercism.desc">50以上の言語でコーディングスキルを練習し、メンターシップを受けられるプラットフォーム。</Translate>} />
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
            <h3 className={styles.subCategoryTitle}>ドキュメンテーションツール</h3>
            <NewsSiteCard href="https://docusaurus.io/" title="Docusaurus" description={<Translate id="links.site.docs.docusaurus.desc">React製の静的サイトジェネレーター。ドキュメントサイト構築に最適。</Translate>} />
            <NewsSiteCard href="https://www.gitbook.com/" title="GitBook" description={<Translate id="links.site.docs.gitbook.desc">技術文書の作成、ホスティング、管理を簡単に行えるモダンなプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://mkdocs.org/" title="MkDocs" description={<Translate id="links.site.docs.mkdocs.desc">Markdownでプロジェクトドキュメントを構築するための、高速でシンプルな静的サイトジェネレーター。</Translate>} />

            <h3 className={styles.subCategoryTitle}>ナレッジ管理ツール</h3>
            <NewsSiteCard href="https://obsidian.md/" title="Obsidian" description={<Translate id="links.site.docs.obsidian.desc">ローカルのMarkdownファイルで動作する、強力な第二の脳としてのナレッジベースツール。</Translate>} />
            <NewsSiteCard href="https://logseq.com/" title="Logseq" description={<Translate id="links.site.docs.logseq.desc">プライバシーを重視した、非線形のアウトライナー形式のナレッジベース。</Translate>} />
            <NewsSiteCard href="https://notion.so/" title="Notion" description={<Translate id="links.site.docs.notion.desc">ドキュメント、データベース、Wikiなどを組み合わせたオールインワンのワークスペース。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>作図 & ダイアグラム</h3>
            <NewsSiteCard href="https://excalidraw.com/" title="Excalidraw" description={<Translate id="links.site.docs.excalidraw.desc">手書き風の図やワイヤーフレームを簡単に作成できる仮想ホワイトボードツール。</Translate>} />
            <NewsSiteCard href="https://mermaid-js.github.io/" title="Mermaid" description={<Translate id="links.site.docs.mermaid.desc">Markdownのようなテキストから図やチャートを生成するライブラリ。</Translate>} />
            <NewsSiteCard href="https://plantuml.com/" title="PlantUML" description={<Translate id="links.site.docs.plantuml.desc">シンプルなテキスト記述言語からUML図を迅速に作成できるツール。</Translate>} />
          </div>
        </details>

        {/* --- 特定分野の開発 --- */}
        <details open className={styles.majorCategorySection}>
          <summary style={{ cursor: 'pointer' }}>
            <h2 id="specialized-dev" className={styles.majorCategoryTitle}>
              <Translate id="links.majorCategory.specialized">特定分野の開発</Translate>
            </h2>
          </summary>
          <div className={styles.cardGrid}>
            <h3 className={styles.subCategoryTitle}>モバイル開発</h3>
            <NewsSiteCard href="https://reactnative.dev/docs/" title="React Native Docs" description={<Translate id="links.site.specialized.rn.desc">Reactを使用してクロスプラットフォームのモバイルアプリを構築。</Translate>} />
            <NewsSiteCard href="https://flutter.dev/docs" title="Flutter Docs" description={<Translate id="links.site.specialized.flutter.desc">単一のコードベースからモバイル、Web、デスクトップ用の美しいUIを構築。</Translate>} />
            
            <h3 className={styles.subCategoryTitle}>ゲーム開発</h3>
            <NewsSiteCard href="https://docs.unity3d.com/" title="Unity Docs" description={<Translate id="links.site.specialized.unity.desc">2Dおよび3Dゲーム開発のための世界をリードするプラットフォーム。</Translate>} />
            <NewsSiteCard href="https://godotengine.org/docs/" title="Godot Engine Docs" description={<Translate id="links.site.specialized.godot.desc">完全に無料でオープンソースの、機能豊富なクロスプラットフォームゲームエンジン。</Translate>} />

            <h3 className={styles.subCategoryTitle}>ブロックチェーン & Web3</h3>
            <NewsSiteCard href="https://ethereum.org/developers/" title="Ethereum Developers" description={<Translate id="links.site.specialized.ethereum.desc">分散型アプリケーション（dApps）を構築するためのリソース。</Translate>} />
            <NewsSiteCard href="https://docs.soliditylang.org/" title="Solidity Docs" description={<Translate id="links.site.specialized.solidity.desc">Ethereum上でスマートコントラクトを実装するための主要なプログラミング言語。</Translate>} />

            <h3 className={styles.subCategoryTitle}>セキュリティ</h3>
            <NewsSiteCard href="https://owasp.org/" title="OWASP" description={<Translate id="links.site.specialized.owasp.desc">Webアプリケーションのセキュリティを向上させることを目的としたオープンコミュニティ。</Translate>} />
            <NewsSiteCard href="https://portswigger.net/web-security" title="Web Security Academy" description={<Translate id="links.site.specialized.portswigger.desc">PortSwiggerによる、Webセキュリティの脆弱性に関する無料のオンライン学習リソース。</Translate>} />
          </div>
        </details>

      </main>
    </Layout>
  );
}
