import React, { JSX, ReactNode } from 'react';
import Layout from '@theme/Layout';
import Head from '@docusaurus/Head';
import LinksCard from '@site/src/components/LinksCard';
import styles from './ai-tools.module.css';
import Translate, { translate } from '@docusaurus/Translate';
import { Download } from 'lucide-react';
import ShareButtons from '@site/src/components/ShareButtons';

// --- データモデル定義 ---
type AIToolData = {
  href: string;
  title: { id: string; message: string };
  description: { id: string; message: string };
};

type AIToolCategoryData = {
  id: string;
  title: { id: string; message: string };
  tools: AIToolData[];
};

// --- データソース ---
const aiToolsData: AIToolCategoryData[] = [
  {
    id: 'ai-chat',
    title: { id: 'aiTools.majorCategory.aiChat', message: '生成AIチャット' },
    tools: [
      { 
        href: 'https://openai.com/chatgpt', 
        title: { id: 'aiTools.tool.aiChat.chatgpt.title', message: 'ChatGPT' }, 
        description: { id: 'aiTools.tool.aiChat.chatgpt.desc', message: '人間のようなテキスト生成、複雑な質問への回答、幅広いライティングやコーディング作業の支援に優れた多用途AIチャットボット。' }
      },
      { 
        href: 'https://www.anthropic.com/claude', 
        title: { id: 'aiTools.tool.aiChat.claude.title', message: 'Claude' }, 
        description: { id: 'aiTools.tool.aiChat.claude.desc', message: '長文の読解や複雑な推論に強く、丁寧で安全な対話を重視したAIアシスタント。最大20万トークンという非常に長い文章を一度に処理可能。' }
      },
      { 
        href: 'https://gemini.google.com', 
        title: { id: 'aiTools.tool.aiChat.gemini.title', message: 'Google Gemini' }, 
        description: { id: 'aiTools.tool.aiChat.gemini.desc', message: 'Googleのサービス群に深く統合され、テキストやコード、画像など複数の形式のデータを理解・処理できるマルチモーダルAI。' }
      },
      { 
        href: 'https://copilot.microsoft.com', 
        title: { id: 'aiTools.tool.aiChat.copilot.title', message: 'Microsoft Copilot' }, 
        description: { id: 'aiTools.tool.aiChat.copilot.desc', message: '最新のWeb情報に基づいた回答や画像生成が可能なAIアシスタント。WindowsやOffice製品とのネイティブな連携により日常業務でシームレスに利用可能。' }
      },
    ],
  },
  {
    id: 'programming-support',
    title: { id: 'aiTools.majorCategory.programmingSupport', message: 'プログラミング支援' },
    tools: [
      { 
        href: 'https://github.com/features/copilot', 
        title: { id: 'aiTools.tool.programming.githubCopilot.title', message: 'GitHub Copilot' }, 
        description: { id: 'aiTools.tool.programming.githubCopilot.desc', message: '開発者のエディタ上で、AIがコードの補完や提案、関数全体の作成まで行うペアプログラマー。GitHub上の膨大なコードを学習し、文脈に応じた精度の高い提案が可能。' }
      },
      { 
        href: 'https://www.tabnine.com', 
        title: { id: 'aiTools.tool.programming.tabnine.title', message: 'Tabnine' }, 
        description: { id: 'aiTools.tool.programming.tabnine.desc', message: 'チーム独自のコードやコーディング規則を学習し、プライバシーを重視しながらコード補完をパーソナライズするAI。ローカル環境で実行可能。' }
      },
      { 
        href: 'https://cursor.sh', 
        title: { id: 'aiTools.tool.programming.cursor.title', message: 'Cursor' }, 
        description: { id: 'aiTools.tool.programming.cursor.desc', message: '自然言語での指示を通じて、コードの編集、リファクタリング、デバッグを行えるAIネイティブなコードエディタ。' }
      },
      { 
        href: 'https://sourcegraph.com/cody', 
        title: { id: 'aiTools.tool.programming.cody.title', message: 'Sourcegraph Cody' }, 
        description: { id: 'aiTools.tool.programming.cody.desc', message: '大規模リポジトリを対象にしたコード検索とAI補完。複数LLMを選択可能で、1Mトークン規模のコードベースを一括処理できる。' }
      },
    ],
  },
  {
    id: 'ai-development-platform',
    title: { id: 'aiTools.majorCategory.aiDevelopmentPlatform', message: 'AI開発プラットフォーム' },
    tools: [
      { 
        href: 'https://aistudio.google.com/', 
        title: { id: 'aiTools.tool.aiDev.aiStudio.title', message: 'Google AI Studio' }, 
        description: { id: 'aiTools.tool.aiDev.aiStudio.desc', message: 'Googleの最新AIモデル（Geminiファミリー）をブラウザ上で試し、プロトタイプを開発するためのツール。プロンプトから直接コードを生成する機能が強力。' }
      },
      { 
        href: 'https://console.anthropic.com/', 
        title: { id: 'aiTools.tool.aiDev.anthropicConsole.title', message: 'Anthropic Console' }, 
        description: { id: 'aiTools.tool.aiDev.anthropicConsole.desc', message: 'AnthropicのAIモデル（Claudeファミリー）をテストし、API経由で利用するための開発者向けプラットフォーム。長文処理能力や安全性を重視したモデルが特徴。' }
      },
      { 
        href: 'https://python.langchain.com/docs/integrations/providers/', 
        title: { id: 'aiTools.tool.aiDev.langchain.title', message: 'LangChain' }, 
        description: { id: 'aiTools.tool.aiDev.langchain.desc', message: '大規模言語モデル（LLM）を活用したアプリ開発を簡素化するPythonライブラリ。多様なAIプロバイダーやデータソースを抽象化し、一貫したインターフェースで利用可能。' }
      },
    ],
  },
  {
    id: 'app-integration-automation',
    title: { id: 'aiTools.majorCategory.appIntegrationAutomation', message: 'アプリ連携 & 自動化' },
    tools: [
      { 
        href: 'https://n8n.io', 
        title: { id: 'aiTools.tool.automation.n8n.title', message: 'n8n' }, 
        description: { id: 'aiTools.tool.automation.n8n.desc', message: '視覚的なエディタを使い、複雑な複数ステップの自動化ワークフローを構築できるツール。ソースコードが公開されており、自社サーバーで運用可能。' }
      },
      { 
        href: 'https://www.make.com/', 
        title: { id: 'aiTools.tool.automation.make.title', message: 'Make' }, 
        description: { id: 'aiTools.tool.automation.make.desc', message: 'ドラッグ＆ドロップでアプリのアイコンを繋ぎ、視覚的にワークフローを構築できる自動化プラットフォーム。複雑な分岐やループ処理も直感的に作成可能。' }
      },
      { 
        href: 'https://zapier.com', 
        title: { id: 'aiTools.tool.automation.zapier.title', message: 'Zapier' }, 
        description: { id: 'aiTools.tool.automation.zapier.desc', message: '7,000を超える圧倒的な数のアプリ連携に対応した自動化ツール。AIがワークフローの構築を提案する機能も持ち、ワークフロー自動化の標準的なツール。' }
      },
    ],
  },
  {
    id: 'information-research',
    title: { id: 'aiTools.majorCategory.informationResearch', message: '情報収集 & 比較' },
    tools: [
      { 
        href: 'https://www.perplexity.ai', 
        title: { id: 'aiTools.tool.research.perplexity.title', message: 'Perplexity AI' }, 
        description: { id: 'aiTools.tool.research.perplexity.desc', message: '質問に対して、ウェブ上の情報源を明記した上で、正確な答えを直接生成するAI検索エンジン。出典付きで信頼性の高い回答を対話形式で提供。' }
      },
      { 
        href: 'https://notebooklm.google', 
        title: { id: 'aiTools.tool.research.notebookLM.title', message: 'NotebookLM' }, 
        description: { id: 'aiTools.tool.research.notebookLM.desc', message: 'ユーザーがアップロードした資料に基づいて、情報の統合やインサイトの発見を支援するGoogle製のAIリサーチアシスタント。' }
      },
      { 
        href: 'https://tenbin.ai/', 
        title: { id: 'aiTools.tool.research.tenbin.title', message: '天秤AI by GMO' }, 
        description: { id: 'aiTools.tool.research.tenbin.desc', message: '複数の主要なLLM（GPT, Gemini, Claudeなど）の出力を、同じプロンプトで同時に比較・評価できるウェブツール。モデル選定やプロンプトチューニングに最適。' }
      },
      { 
        href: 'https://elicit.com', 
        title: { id: 'aiTools.tool.research.elicit.title', message: 'Elicit' }, 
        description: { id: 'aiTools.tool.research.elicit.desc', message: '研究論文の検索、要約、分析に特化したAIリサーチアシスタント。膨大な学術文献から効率的に知見を得るための機能が豊富。' }
      },
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

export default function AIToolsPage(): JSX.Element {
  const escapeCsvField = (field: string): string => {
    if (/[",\n]/.test(field)) {
      return `"${field.replace(/"/g, '""')}"`;
    }
    return field;
  };

  const handleDownload = () => {
    const header = [
      translate({ id: 'aiTools.download.header.toolName', message: 'ToolName' }),
      'URL',
    ].join(',');

    const allTools = aiToolsData.flatMap((category) => category.tools);

    const rows = allTools.map((tool) => {
      const toolTitle = translate(tool.title);
      return [escapeCsvField(toolTitle), tool.href].join(',');
    });

    const csvContent = [header, ...rows].join('\n');
    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'hkdocs-ai-tools.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Layout
      title={translate({ id: 'aiTools.page.title', message: 'AIツール集' })}
      description={translate({
        id: 'aiTools.page.description',
        message: '開発や業務効率化に役立つAIツールの包括的なコレクションです。',
      })}
    >
      <Head children={''} />
      <main className={styles.mainContainer}>
        <div className={styles.pageHeader}>
          <div className={styles.pageHeaderTitle}>
            <h1>
              <Translate id="aiTools.page.heading">AIツール集</Translate>
            </h1>
            <p>
              <Translate id="aiTools.page.subheading">
                個人開発・業務効率化に使えるAIツール
              </Translate>
            </p>
          </div>
          <button
            onClick={handleDownload}
            className={styles.downloadButton}
            aria-label={translate({
              id: 'aiTools.page.downloadButtonAriaLabel',
              message: 'AIツール一覧をダウンロード',
            })}
            title={translate({
              id: 'aiTools.page.downloadButtonTooltip',
              message: 'CSVリストをダウンロード',
            })}
          >
            <Download size={18} />
          </button>
        </div>

        {aiToolsData.map((category) => (
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
              {category.tools.map((tool) => (
                <div key={tool.href}>
                  <LinksCard
                    href={tool.href}
                    title={translate(tool.title)}
                    description={translate(tool.description)}
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
