import React, { JSX, ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import LinksCard from '@site/src/components/LinksCard'; // --- news page と共通化 ---
import styles from './links.module.css';
import Translate, { translate } from '@docusaurus/Translate';
import { Download } from 'lucide-react';
import ShareButtons from '@site/src/components/ShareButtons';

// --- データモデル定義 ---
type LinkData = {
  href: string;
  title: { id: string; message: string };
  description: { id: string; message: string };
};

type LinkCategoryData = {
  id: string;
  title: { id: string; message: string };
  sites: LinkData[];
};

// --- データソース ---
const linksData: LinkCategoryData[] = [
  {
    id: 'backend',
    title: { id: 'links.majorCategory.backend', message: 'バックエンド' },
    sites: [
      { href: 'https://docs.python.org/3/', title: { id: 'links.site.backend.python.title', message: 'Python 3 Docs' }, description: { id: 'links.site.backend.python.desc', message: '公式Python 3ドキュメント。言語仕様から標準ライブラリまで。' } },
      { href: 'https://docs.djangoproject.com/', title: { id: 'links.site.backend.django.title', message: 'Django Docs' }, description: { id: 'links.site.backend.django.desc', message: '堅牢でスケーラブルなWebアプリを迅速に開発するためのPythonフレームワーク。' } },
      { href: 'https://www.django-rest-framework.org/', title: { id: 'links.site.backend.drf.title', message: 'Django REST Framework' }, description: { id: 'links.site.backend.drf.desc', message: 'Djangoで強力かつ柔軟なWeb APIを構築するためのツールキット。' } },
      { href: 'https://fastapi.tiangolo.com/', title: { id: 'links.site.backend.fastapi.title', message: 'FastAPI' }, description: { id: 'links.site.backend.fastapi.desc', message: 'Python 3.6+の型ヒントをベースにした、モダンで高速なWebフレームワーク。' } },
      { href: 'https://flask.palletsprojects.com/', title: { id: 'links.site.backend.flask.title', message: 'Flask' }, description: { id: 'links.site.backend.flask.desc', message: '軽量で拡張性の高いPythonマイクロWebフレームワーク。' } },
      { href: 'https://nodejs.org/docs/', title: { id: 'links.site.backend.node.title', message: 'Node.js Docs' }, description: { id: 'links.site.backend.node.desc', message: '非同期イベント駆動型のJavaScript実行環境の公式ドキュメント。' } },
      { href: 'https://nestjs.com/', title: { id: 'links.site.backend.nestjs.title', message: 'NestJS' }, description: { id: 'links.site.backend.nestjs.desc', message: '効率的でスケーラブルなサーバーサイドアプリケーションを構築するためのNode.jsフレームワーク。' } },
      { href: 'https://www.openapis.org/', title: { id: 'links.site.backend.openapi.title', message: 'OpenAPI Specification' }, description: { id: 'links.site.backend.openapi.desc', message: 'RESTful APIを記述するための標準仕様。エコシステムが豊富。' } },
    ],
  },
  {
    id: 'frontend',
    title: { id: 'links.majorCategory.frontend', message: 'フロントエンド' },
    sites: [
      { href: 'https://developer.mozilla.org/', title: { id: 'links.site.frontend.mdn.title', message: 'MDN Web Docs' }, description: { id: 'links.site.frontend.mdn.desc', message: 'Web技術のデファクトスタンダード。HTML, CSS, JavaScript等の公式リファレンス。' } },
      { href: 'https://web.dev/', title: { id: 'links.site.frontend.webdev.title', message: 'web.dev' }, description: { id: 'links.site.frontend.webdev.desc', message: 'GoogleによるモダンなWeb開発のベストプラクティス集。パフォーマンス、アクセシビリティなど。' } },
      { href: 'https://jamstack.org/', title: { id: 'links.site.frontend.jamstack.title', message: 'Jamstack' }, description: { id: 'links.site.frontend.jamstack.desc', message: 'JavaScript、API、Markupの頭文字を取ったモダンなWebアーキテクチャ。パフォーマンス、セキュリティ、スケーラビリティの向上を目指す。' } },
      { href: 'https://react.dev/', title: { id: 'links.site.frontend.react.title', message: 'React' }, description: { id: 'links.site.frontend.react.desc', message: 'コンポーネントベースUIを構築するための宣言的JavaScriptライブラリ。' } },
      { href: 'https://nextjs.org/docs', title: { id: 'links.site.frontend.nextjs.title', message: 'Next.js Docs' }, description: { id: 'links.site.frontend.nextjs.desc', message: 'Reactをベースにしたプロダクションフレームワーク。多彩なレンダリング戦略を提供。' } },
      { href: 'https://www.typescriptlang.org/docs/', title: { id: 'links.site.frontend.ts.title', message: 'TypeScript Docs' }, description: { id: 'links.site.frontend.ts.desc', message: '静的型付けを導入し、大規模開発の堅牢性を高めるJavaScriptのスーパーセット。' } },
      { href: 'https://vitejs.dev/guide/', title: { id: 'links.site.frontend.vite.title', message: 'Vite' }, description: { id: 'links.site.frontend.vite.desc', message: '高速な開発サーバーとビルドが特徴の次世代フロントエンドツール。' } },
      { href: 'https://tailwindcss.com/docs', title: { id: 'links.site.frontend.tailwind.title', message: 'Tailwind CSS' }, description: { id: 'links.site.frontend.tailwind.desc', message: 'ユーティリティファーストのCSSフレームワーク。HTML内で迅速にカスタムデザインを構築。' } },
      { href: 'https://playwright.dev/', title: { id: 'links.site.frontend.playwright.title', message: 'Playwright' }, description: { id: 'links.site.frontend.playwright.desc', message: '信頼性の高いエンドツーエンドテストを自動化するためのフレームワーク。' } },
      { href: 'https://caniuse.com/', title: { id: 'links.site.frontend.caniuse.title', message: 'Can I use...' }, description: { id: 'links.site.frontend.caniuse.desc', message: 'フロントエンド技術のブラウザ対応状況を確認できる必須ツール。' } },
    ],
  },
  {
    id: 'cloud-infra',
    title: { id: 'links.majorCategory.cloudInfra', message: 'クラウド & インフラ' },
    sites: [
      { href: 'https://cloud.google.com/docs', title: { id: 'links.site.cloud.gcp.title', message: 'Google Cloud Docs' }, description: { id: 'links.site.cloud.gcp.desc', message: 'クイックスタート、チュートリアル、包括的なガイドを含む完全なGCPドキュメント。' } },
      { href: 'https://cloud.google.com/architecture', title: { id: 'links.site.cloud.gcpArch.title', message: 'Cloud Architecture Center' }, description: { id: 'links.site.cloud.gcpArch.desc', message: '参照アーキテクチャ、設計ガイダンス、ベストプラクティスを提供するクラウドアーキテクチャセンター。' } },
      { href: 'https://docs.docker.com/', title: { id: 'links.site.cloud.docker.title', message: 'Docker Docs' }, description: { id: 'links.site.cloud.docker.desc', message: 'コンテナ仮想化技術のデファクトスタンダード。公式ドキュメント。' } },
      { href: 'https://www.terraform.io/docs', title: { id: 'links.site.cloud.terraform.title', message: 'Terraform Docs' }, description: { id: 'links.site.cloud.terraform.desc', message: 'Infrastructure as Codeを実現する代表的なツールの公式ドキュメント。' } },
      { href: 'https://cloud.google.com/build/docs', title: { id: 'links.site.cloud.gcb.title', message: 'Google Cloud Build' }, description: { id: 'links.site.cloud.gcb.desc', message: 'GCP上でCI/CDパイプラインを実行するためのマネージドサービス。' } },
      { href: 'https://docs.github.com/actions', title: { id: 'links.site.cloud.ghactions.title', message: 'GitHub Actions' }, description: { id: 'links.site.cloud.ghactions.desc', message: 'GitHubに統合されたCI/CDプラットフォーム。ワークフローを自動化。' } },
      { href: 'https://docs.netlify.com/', title: { id: 'links.site.cloud.netlify.title', message: 'Netlify' }, description: { id: 'links.site.cloud.netlify.desc', message: 'GitHub/GitLab等と連携し、ビルド、デプロイ、ホスティングを自動化するプラットフォーム。Jamstackアーキテクチャの中核を担う存在。' } },
    ],
  },
  {
    id: 'version-control',
    title: { id: 'links.majorCategory.versionControl', message: 'バージョン管理' },
    sites: [
      { href: 'https://git-scm.com/docs', title: { id: 'links.site.devtools.git.title', message: 'Git Official Docs' }, description: { id: 'links.site.devtools.git.desc', message: '分散バージョン管理システムGitの公式ドキュメント。' } },
      { href: 'https://docs.github.com/', title: { id: 'links.site.devtools.github.title', message: 'GitHub Docs' }, description: { id: 'links.site.devtools.github.desc', message: 'コードホスティング、共同開発、ActionsなどGitHub機能の公式ドキュメント。' } },
      { href: 'https://learngitbranching.js.org/', title: { id: 'links.site.devtools.learngit.title', message: 'Learn Git Branching' }, description: { id: 'links.site.devtools.learngit.desc', message: 'Gitのブランチ操作を視覚的かつインタラクティブに学べる、非常に優れた学習ツール。' } },
    ],
  },
  {
    id: 'data',
    title: { id: 'links.majorCategory.data', message: 'データ' },
    sites: [
      { href: 'https://cloud.google.com/bigquery/docs', title: { id: 'links.site.data.bigquery.title', message: 'BigQuery Docs' }, description: { id: 'links.site.data.bigquery.desc', message: 'ペタバイト級のデータを分析できるサーバーレスなデータウェアハウス。' } },
      { href: 'https://dbt.getdbt.com/docs/', title: { id: 'links.site.data.dbt.title', message: 'dbt Docs' }, description: { id: 'links.site.data.dbt.desc', message: 'データウェアハウスでのデータ変換を支援する「T」 in ELTツール。' } },
      { href: 'https://sqlzoo.net/', title: { id: 'links.site.data.sqlzoo.title', message: 'SQLZoo' }, description: { id: 'links.site.data.sqlzoo.desc', message: 'インタラクティブなチュートリアルと演習を通じてSQLを実践的に学べるサイト。' } },
      { href: 'https://www.kubeflow.org/docs/', title: { id: 'links.site.ai.kubeflow.title', message: 'Kubeflow Docs' }, description: { id: 'links.site.ai.kubeflow.desc', message: 'Kubernetes上でMLワークフローをデプロイ、管理するためのプラットフォーム。' } },
      { href: 'https://www.kaggle.com/learn', title: { id: 'links.site.ai.kaggle.title', message: 'Kaggle Learn' }, description: { id: 'links.site.ai.kaggle.desc', message: 'データサイエンスのコンペ、公開データセット、学習リソースが集まる世界最大のコミュニティ。' } },
    ],
  },
  {
    id: 'documentation',
    title: { id: 'links.majorCategory.documentation', message: 'ドキュメント & 作図' },
    sites: [
      { href: 'https://docusaurus.io/', title: { id: 'links.site.docs.docusaurus.title', message: 'Docusaurus' }, description: { id: 'links.site.docs.docusaurus.desc', message: 'React製の静的サイトジェネレーター。ドキュメントサイト構築に最適。' } },
      { href: 'https://mdxjs.com/', title: { id: 'links.site.docs.mdx.title', message: 'MDX' }, description: { id: 'links.site.docs.mdx.desc', message: 'MarkdownにJSXを組み込み可能にする形式。インタラクティブなドキュメントやブログ記事の作成に最適。' } },
      { href: 'https://decapcms.org/docs/intro/', title: { id: 'links.site.docs.decapcms.title', message: 'Decap CMS' }, description: { id: 'links.site.docs.decapcms.desc', message: 'Gitリポジトリをバックエンドとして利用するオープンソースのヘッドレスCMS。静的サイトジェネレーターとの親和性が高い。' } },
      { href: 'https://obsidian.md/', title: { id: 'links.site.docs.obsidian.title', message: 'Obsidian' }, description: { id: 'links.site.docs.obsidian.desc', message: 'ローカルのMarkdownファイルで動作する、強力な第二の脳としてのナレッジベースツール。' } },
      { href: 'https://www.markdownguide.org', title: { id: 'links.site.docs.markdown.title', message: 'Markdown Guide' }, description: { id: 'links.site.docs.markdown.desc', message: 'Markdown記法の基本から拡張機能までを網羅した包括的なガイド。' } },
      { href: 'https://mermaid-js.github.io/', title: { id: 'links.site.docs.mermaid.title', message: 'Mermaid' }, description: { id: 'links.site.docs.mermaid.desc', message: 'Markdownのようなテキストから図やチャートを生成するライブラリ。' } },
      { href: 'https://plantuml.com/', title: { id: 'links.site.docs.plantuml.title', message: 'PlantUML' }, description: { id: 'links.site.docs.plantuml.desc', message: 'シンプルなテキスト記述言語からUML図を迅速に作成できるツール。' } },
      { href: 'https://app.diagrams.net/', title: { id: 'links.site.docs.drawio.title', message: 'draw.io' }, description: { id: 'links.site.docs.drawio.desc', message: 'ブラウザで使える高機能な無料作図ツール。フローチャート、UML、ネットワーク構成図など、あらゆる図の作成に対応。' } },
      { href: 'https://excalidraw.com/', title: { id: 'links.site.docs.excalidraw.title', message: 'Excalidraw' }, description: { id: 'links.site.docs.excalidraw.desc', message: '手書き風の図を素早く作成できるオンラインホワイトボード。共同編集機能が強力で、チームでのブレインストーミングや設計議論に最適。' } },
      { href: 'https://www.figma.com/', title: { id: 'links.site.docs.figma.title', message: 'Figma' }, description: { id: 'links.site.docs.figma.desc', message: 'UIデザインから図表作成までこなす共同作業プラットフォーム。エンジニアリングの設計プロセスでも広く活用されるオンラインツール。' } },
    ],
  },
  {
    id: 'learning-community',
    title: { id: 'links.majorCategory.learningCommunity', message: '学習 & コミュニティ' },
    sites: [
      { href: 'https://roadmap.sh/', title: { id: 'links.site.devtools.roadmap.title', message: 'roadmap.sh' }, description: { id: 'links.site.devtools.roadmap.desc', message: '開発者向けの様々な技術領域の学習ロードマップ。次に何を学ぶべきかを示してくれる。' } },
      { href: 'https://news.ycombinator.com/', title: { id: 'links.site.devtools.hackernews.title', message: 'Hacker News' }, description: { id: 'links.site.devtools.hackernews.desc', message: 'Y Combinatorが運営する技術系ニュースサイト。世界中のGeekな議論が集まる場所。' } },
      { href: 'https://www.techmeme.com/', title: { id: 'links.site.learningCommunity.techmeme.title', message: 'Techmeme' }, description: { id: 'links.site.learningCommunity.techmeme.desc', message: '2005年にGabe Riveraが設立。テクノロジー業界のニュースを人間とアルゴリズムを組み合わせて集約する、アグリゲーター。' } },
      { href: 'https://stackoverflow.com/', title: { id: 'links.site.devtools.stackoverflow.title', message: 'Stack Overflow' }, description: { id: 'links.site.devtools.stackoverflow.desc', message: '世界中の開発者が質問し、知識を共有するQ&Aコミュニティ。' } },
      { href: 'https://www.geeksforgeeks.org/', title: { id: 'links.site.devtools.geeksforgeeks.title', message: 'GeeksforGeeks' }, description: { id: 'links.site.devtools.geeksforgeeks.desc', message: 'コンピュータサイエンスのトピックに関する記事、チュートリアル、問題集が豊富なサイト。' } },
      { href: 'https://leetcode.com/', title: { id: 'links.site.devtools.leetcode.title', message: 'LeetCode' }, description: { id: 'links.site.devtools.leetcode.desc', message: '技術面接の準備に最適な、アルゴリズムとデータ構造の問題集。' } },
    ],
  },
  {
    id: 'security',
    title: { id: 'links.majorCategory.security', message: 'セキュリティ' },
    sites: [
      { href: 'https://owasp.org/', title: { id: 'links.site.security.owasp.title', message: 'OWASP' }, description: { id: 'links.site.security.owasp.desc', message: 'Webアプリケーションのセキュリティを向上させることを目的としたオープンコミュニティ。' } },
      { href: 'https://www.nist.gov/', title: { id: 'links.site.security.nist.title', message: 'NIST' }, description: { id: 'links.site.security.nist.desc', message: '米国の国立標準技術研究所。サイバーセキュリティフレームワークなどが有名。' } },
      { href: 'https://www.cisa.gov/', title: { id: 'links.site.security.cisa.title', message: 'CISA' }, description: { id: 'links.site.security.cisa.desc', message: '米国のサイバーセキュリティ・社会基盤安全保障庁。脅威情報やアラートを提供。' } },
      { href: 'https://portswigger.net/web-security', title: { id: 'links.site.security.portswigger.title', message: 'Web Security Academy' }, description: { id: 'links.site.security.portswigger.desc', message: 'PortSwiggerによる、Webセキュリティの脆弱性に関する無料のオンライン学習リソース。' } },
      { href: 'https://ocw.mit.edu/', title: { id: 'links.site.security.mitocw.title', message: 'MIT OpenCourseWare' }, description: { id: 'links.site.security.mitocw.desc', message: 'MITの講義資料を無償で公開。サイバーセキュリティ関連コースも豊富。' } },
      { href: 'https://www.hacksplaining.com/owasp', title: { id: 'links.site.security.hacksplaining.title', message: 'Hacksplaining' }, description: { id: 'links.site.security.hacksplaining.desc', message: 'インタラクティブなレッスンを通じてセキュリティ脆弱性を学べるサイト。' } },
      { href: 'https://github.com/sbilly/awesome-security', title: { id: 'links.site.security.awesomesec.title', message: 'Awesome Security (GitHub)' }, description: { id: 'links.site.security.awesomesec.desc', message: 'セキュリティに関するツール、リソース、ライブラリなどを集めたキュレーションリスト。' } },
      { href: 'https://www.security-next.com/', title: { id: 'links.site.security.securitynext.title', message: 'Security NEXT' }, description: { id: 'links.site.security.securitynext.desc', message: 'サイバーセキュリティに関する最新情報、インシデントや脆弱性、対策に関するニュースを速報で提供する専門メディア。' } },
    ],
  },
  {
    id: 'academic-research',
    title: { id: 'links.majorCategory.academicResearch', message: '論文' },
    sites: [
      { href: 'https://arxiv.org/', title: { id: 'links.site.academic.arxiv.title', message: 'arXiv' }, description: { id: 'links.site.academic.arxiv.desc', message: '物理学、数学、CS等の査読前論文を無料公開するオープンアクセスの先駆的プラットフォーム。' } },
      { href: 'https://ieeexplore.ieee.org/', title: { id: 'links.site.academic.ieee.title', message: 'IEEE Xplore' }, description: { id: 'links.site.academic.ieee.desc', message: 'IEEE発行の電気工学・CS分野の学術雑誌、論文、技術標準を提供するデジタルライブラリ。' } },
      { href: 'https://dl.acm.org/', title: { id: 'links.site.academic.acm.title', message: 'ACM Digital Library' }, description: { id: 'links.site.academic.acm.desc', message: 'コンピューティング分野最大の学術団体ACMが発行する全論文誌や国際会議録を網羅。' } },
      { href: 'https://scholar.google.com/', title: { id: 'links.site.academic.scholar.title', message: 'Google Scholar' }, description: { id: 'links.site.academic.scholar.desc', message: 'あらゆる学術分野の論文や書籍を横断検索でき、被引用数も追跡可能な検索エンジン。' } },
      { href: 'https://www.semanticscholar.org/', title: { id: 'links.site.academic.semanticscholar.title', message: 'Semantic Scholar' }, description: { id: 'links.site.academic.semanticscholar.desc', message: 'AIを活用し、論文要旨の自動生成や影響の大きい引用の可視化で文献調査を支援。' } },
      { href: 'https://elicit.org/', title: { id: 'links.site.academic.elicit.title', message: 'Elicit' }, description: { id: 'links.site.academic.elicit.desc', message: 'AI研究アシスタントが論文検索から要約まで自動化。研究質問に対する関連論文を効率的に発見・分析。' } },
      { href: 'https://scispace.com/', title: { id: 'links.site.academic.scispace.title', message: 'Scispace' }, description: { id: 'links.site.academic.scispace.desc', message: 'AIを活用して研究論文の検索、理解、執筆を支援するプラットフォーム。文献レビューの効率化に貢献。' } },
      { href: 'https://researchrabbitapp.com/', title: { id: 'links.site.academic.researchrabbit.title', message: 'ResearchRabbit' }, description: { id: 'links.site.academic.researchrabbit.desc', message: '関連論文を視覚的に探索し、新たな発見を促す文献調査ツール。『論文版Spotify』とも呼ばれる。' } },
      { href: 'https://dblp.org/', title: { id: 'links.site.academic.dblp.title', message: 'DBLP' }, description: { id: 'links.site.academic.dblp.desc', message: 'CS分野に特化し、研究者の論文リストや共著者ネットワークを正確に追跡できる書誌情報DB。' } },
      { href: 'http://citeseerx.ist.psu.edu/', title: { id: 'links.site.academic.citeseerx.title', message: 'CiteSeerX' }, description: { id: 'links.site.academic.citeseerx.desc', message: 'コンピュータ・情報科学分野の論文を対象に、引用情報を自動で抽出・リンクする検索エンジン。' } },
      { href: 'https://www.medrxiv.org/', title: { id: 'links.site.academic.medrxiv.title', message: 'medRxiv' }, description: { id: 'links.site.academic.medrxiv.desc', message: '医学・臨床・健康科学分野専門のプレプリントサーバー。最新の研究成果を迅速に共有。' } },
      { href: 'https://pubmed.ncbi.nlm.nih.gov/', title: { id: 'links.site.academic.pubmed.title', message: 'PubMed' }, description: { id: 'links.site.academic.pubmed.desc', message: '医学・生命科学分野の世界最大規模の論文データベース。MEDLINEを含む査読済み論文を検索可能。' } },
      { href: 'https://www.techrxiv.org/', title: { id: 'links.site.academic.techrxiv.title', message: 'TechRxiv' }, description: { id: 'links.site.academic.techrxiv.desc', message: 'IEEEが設立した、電気工学やCS分野のプレプリントサーバー。' } },
      { href: 'https://www.ssrn.com/index.cfm/en/compscirn/', title: { id: 'links.site.academic.ssrn.title', message: 'SSRN' }, description: { id: 'links.site.academic.ssrn.desc', message: '社会科学・人文科学分野中心の、世界最大級のワーキングペーパー・プレプリント共有プラットフォーム。' } },
      { href: 'https://doaj.org/', title: { id: 'links.site.academic.doaj.title', message: 'DOAJ' }, description: { id: 'links.site.academic.doaj.desc', message: '品質基準を満たした信頼性の高いオープンアクセスジャーナルのみを収録するディレクトリ。' } },
    ],
  },
  {
    id: 'standards-orgs',
    title: { id: 'links.majorCategory.standardsOrgs', message: '標準化団体' },
    sites: [
      { href: 'https://www.w3.org/', title: { id: 'links.site.standards.w3c.title', message: 'W3C' }, description: { id: 'links.site.standards.w3c.desc', message: 'World Wide Webの技術標準を策定する国際的な標準化団体。' } },
      { href: 'https://www.ietf.org/', title: { id: 'links.site.standards.ietf.title', message: 'IETF' }, description: { id: 'links.site.standards.ietf.desc', message: 'インターネットの技術標準を策定するボランティアベースの組織。' } },
    ],
  },
];

/**
 * ホバー時に右側にアンカーリンク('#')を表示する見出しコンポーネント
 */
const SectionHeading = ({ as: Component, id, className, children }: { as: 'h2' | 'h3'; id: string; className: string; children: ReactNode }) => (
  // h2(Component)に行全体をホバー領域とするためのクラスを適用
  <Component id={id} className={`${className} ${styles.sectionHeading}`}>
    {/* テキストとアンカーリンクをspanで囲み、アンカーの位置決めの基準とする */}
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


export default function LinksPage(): JSX.Element {
  const escapeCsvField = (field: string): string => {
    if (/[",\n]/.test(field)) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const handleDownload = () => {
    const header = [
      translate({ id: 'links.download.header.siteName', message: 'SiteName' }),
      'URL',
    ].join(',');

    const allSites = linksData.flatMap((category) => category.sites);

    const rows = allSites.map((site) => {
      const siteTitle = translate(site.title);
      return [escapeCsvField(siteTitle), site.href].join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'hkdocs-links-sites.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

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
          <div className={styles.pageHeaderTitle}>
            <h1>
              <Translate id="links.page.heading">資料集</Translate>
            </h1>
            <p>
              <Translate id="links.page.subheading">
                開発・学習のためのリファレンス
              </Translate>
            </p>
          </div>
          <button
            onClick={handleDownload}
            className={styles.downloadButton}
            aria-label={translate({
              id: 'links.page.downloadButtonAriaLabel',
              message: '資料集サイト一覧をダウンロード',
            })}
            title={translate({
              id: 'links.page.downloadButtonTooltip',
              message: 'CSVリストをダウンロード',
            })}
          >
            <Download size={18} />
          </button>
        </div>

        {linksData.map((category) => (
          <details key={category.id} open className={styles.majorCategorySection}>
            <summary style={{ cursor: 'pointer' }}>
              <SectionHeading
                as="h2"
                id={category.id}
                className={styles.majorCategoryTitle}
                children={
                  <Translate id={category.title.id}>
                    {category.title.message}
                  </Translate>
                }
              />
            </summary>
            <div className={styles.cardGrid}>
              {category.sites.map((site) => (
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
        <div style={{ marginBottom: '3rem' }}>
          <ShareButtons />
        </div>
      </main>
    </Layout>
  );
}
