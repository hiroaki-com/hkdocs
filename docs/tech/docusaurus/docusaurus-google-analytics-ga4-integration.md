---
title: DocusaurusにGoogle Analytics (GA4)を導入する
sidebar_position: 10
tags: [Docusaurus, Google Analytics, GA4, gtag]
---

Docusaurusで構築した当サイトにGoogle Analytics 4 (GA4) を導入し、アクセス解析を行うための設定手順を備忘録として整理します。

**機能:**
*   DocusaurusサイトにGoogle Analytics 4 (GA4) を導入。
*   サイト全体のアクセス解析を可能に。

<!-- truncate -->

**参考:**
*   **Docusaurus公式ドキュメント (gtag):** [https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)
*   **Google Analytics:** [https://analytics.google.com/](https://analytics.google.com/)

---

### GA導入の考え方: Docusaurus と 通常のHTMLサイト の比較

Docusaurusでは設定ファイル一ヶ所の編集でGAを導入可能。これは、ビルド時にDocusaurusが自動で全ページのHTMLに必要なタグを埋め込む仕組みのため。

| 場面 | 通常のHTMLサイト (手作業) | Docusaurus (自動化) |
| :--- | :--- | :--- |
| **タグの追加時** | 全ページの`<head>`タグ内にトラッキングコードを手動でコピー＆ペースト。 | `docusaurus.config.ts`に設定を1ヶ所追記するのみ。 |
| **作業対象** | **全てのHTMLファイル**。 | **`docusaurus.config.ts` のみ**。 |
| **ID変更時** | 全てのHTMLファイルを再度修正する必要があり、修正漏れのリスクが高い。 | `docusaurus.config.ts`の**1行を修正するだけ**でサイト全体に反映。 |
| **ページ追加時** | 新規作成したHTMLファイルにも**GAタグの追加作業が必須**。 | **作業不要**。ビルド時に自動でGAタグが挿入される。 |

### GA4連携手順

#### 1. Google Analyticsでの測定ID取得

0.  ここでは、Google Analyticsのアカウントは作成済みの前提で進めます。
1.  [Google Analytics](https://analytics.google.com/) にアクセス。
2.  画面左下の **[管理]** をクリック。
3.  対象プロパティの **[データストリーム]** を選択。
4.  対象のウェブストリームをクリックし、**測定ID (`G-`から始まるID)** をコピー。

#### 2. Docusaurus設定ファイルの編集

プロジェクトルートの`docusaurus.config.ts`に、取得した測定IDを設定。

##### ※ 前提：DocusaurusのGA4連携プラグインについて

Docusaurusには2つのGoogle Analytics関連プラグインが存在。

*   **推奨: [`@docusaurus/plugin-google-gtag`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-gtag)**
    *   GA4 (`G-`から始まるID) に対応した現在の標準プラグイン。
*   **非推奨: [`@docusaurus/plugin-google-analytics`](https://docusaurus.io/docs/api/plugins/@docusaurus/plugin-google-analytics)**
    *   旧式のUniversal Analytics (`UA-`から始まるID) 用のプラグイン。
    *   公式ドキュメントに「このプラグインは非推奨であり、2023年7月1日に役に立たなくなりました」と明記されています。Universal Analytics自体が2023年7月1日で廃止されたため、このプラグインも現在は使用不可。

**今回は `@docusaurus/preset-classic` をすでに使用しているため、`@docusaurus/plugin-google-gtag` を別途インストールする必要はない。**
`preset-classic` が内部的にgtagプラグインを含んでいるため、`themeConfig` に設定を追記するだけでGA4との連携が可能。

#### Docusaurus設定ファイルの編集
DocusaurusのGA連携機能は、ローカル開発環境 (`pnpm start`)では無効化され、本番ビルド (`pnpm build`)でのみ有効。

**`docusaurus.config.ts` 編集例:**
```typescript
// docusaurus.config.ts
import type { Config } from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

const config: Config = {
  // ... (title, urlなどの既存設定)
  presets: [
    [
      'classic',
      {
        // ▼▼▼ gtagの設定をここに追記 ▼▼▼
        gtag: {
          trackingID: 'G-XXXXXXXXXX', // 1.で取得した測定IDに置き換える
          anonymizeIP: true,
        },
        // ...
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // 注意: ここにはgtagの設定を記述しない（非推奨時の設定箇所）
  },

  // ... (pluginsなどの既存設定)
};

export default config;
```

#### 3. 動作確認

設定変更をデプロイした後、公開サイトにアクセスし、以下のいずれかの方法で動作を確認。

1.  **ブラウザ開発者ツール:**
    *   [Network]タブを開き、フィルタに `collect` と入力。
    *   ページ遷移時に `google-analytics.com/g/collect?...` への通信が発生することを確認。
2.  **Google Analytics リアルタイムレポート:**
    *   GAの [レポート] > [リアルタイム] を表示。
    *   自身のアクセスがリアルタイムで計測されることを確認 (反映に数分かかる場合あり)。
3.  **Google Tag Assistant Companion:**
    *   Chrome拡張機能「Tag Assistant Companion」を導入。
    *   デバッグしたいページURLをTag Assistantサイトで指定し、Gtagが正しく認識・発火しているかを確認。    
