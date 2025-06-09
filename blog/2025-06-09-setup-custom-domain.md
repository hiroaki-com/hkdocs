---
title: Cloud Run と Value Domain で Docusaurus サイトにカスタムドメインを設定する手順
authors: [hk]
tags: [docusaurus]
---

この記事では、Google Cloud Run でホスティングしている 当サイト（Docusaurus）に、Value Domain で取得したカスタムドメイン `hkdocs.com` を設定した際の手順を整理します。

**前提環境:**

*   **ドメイン:** `hkdocs.com` ([Value Domain](https://www.value-domain.com/) で取得済み)
*   **ホスティング:** Google Cloud Run
*   **サイトジェネレーター:** Docusaurus



### ステップ1: Docusaurus 設定ファイルの更新

まず、Docusaurus サイトが新しいドメイン `hkdocs.com` を認識するように設定ファイルを変更します。

1.  Docusaurus プロジェクト内の `docusaurus.config.ts` (または `.js`) ファイルを開きます。
2.  `url` プロパティを、`https://hkdocs.com/` に変更します。
    ```typescript
    // docusaurus.config.ts
    const config: Config = {
      // ...
      url: 'https://hkdocs.com/', // ここを実際のドメインに変更
      baseUrl: '/',
      // organizationName や projectName も適切に設定
      // ...
    };
    ```
3.  `organizationName` (例: `hiroaki-com`) や `projectName` (例: `hkdocs`) が、GitHub リポジトリの `editUrl` と整合性が取れるように正しく設定されているか確認します。
4.  ファイルを保存します。



### ステップ2: Cloud Run でカスタムドメインマッピングを開始

次に、Google Cloud Console で Cloud Run サービスに `hkdocs.com` を紐付ける設定を開始します。

1.  **Google Cloud Console** にログインし、`hkdocs.com` をホストする **Cloud Run サービス**を選択します。
2.  「**カスタムドメインをマッピング**」 (または類似のメニュー) を選択し、「マッピングを追加」をクリックします。
3.  「ドメインを入力」フィールドに、`hkdocs.com` と入力し、「続行」します。
4.  Cloud Run は、ドメインの所有権を確認するための **TXT レコード**情報を提示します。この値を正確にメモしておきます。
    *   例: ホスト名 `@` (または `hkdocs.com.`)、値 `google-site-verification=ランダムな文字列`

 

### ステップ3: Value Domain でDNSレコードを設定 (TXTレコードによる所有権確認)

Value Domain の管理画面で、Cloud Run から指示されたTXTレコードを設定します。

1.  **Value Domain コントロールパネル**にログインします。
2.  対象ドメイン `hkdocs.com` の「DNSレコード/URL転送の変更」画面 (またはDNS設定画面) に進みます。
3.  DNSレコードの入力エリアに、ステップ2でメモしたTXTレコード情報を追加します。
    *   Value Domain の書式に合わせて入力します。
    *   **記載例:**
        ```dns
        # ドメイン所有権確認用TXTレコード
        txt @ google-site-verification=ランダムな文字列
        ```
        *(`google-site-verification=` の値は実際に表示されたものを使用)*
4.  DNS設定を保存します。DNSの変更がインターネット全体に反映されるまで数分～数時間待ちます。



### ステップ4: Cloud Run で所有権確認完了とA/AAAAレコード取得

Cloud Run がTXTレコードを認識すると、次に設定すべきAレコードとAAAAレコードが表示されます。

1.  **Google Cloud Console** の Cloud Run カスタムドメインマッピング画面に戻ります。
2.  所有権確認が完了すると、Cloud Run サービスへトラフィックを向けるための **A レコード (IPv4アドレス) と AAAA レコード (IPv6アドレス)** が複数表示されます。これらのIPアドレスをすべて正確にメモします。
    *   **Aレコードの例 (ダミー):** `198.51.100.10`, `198.51.100.11`, `198.51.100.12`, `198.51.100.13`
    *   **AAAAレコードの例 (ダミー):** `2001:db8:2::1a`, `2001:db8:2::1b`, `2001:db8:2::1c`, `2001:db8:2::1d`
    *(これらのIPアドレスはあくまで例であり、実際にはCloud Runから提供される固有のIPアドレスを使用してください)*

 

### ステップ5: Value Domain でDNSレコードを設定 (A/AAAAレコード)

再度 Value Domain のDNS設定画面で、取得したA/AAAAレコードを設定します。

1.  **Value Domain** の `hkdocs.com` のDNS設定画面を開きます。
2.  **重要:** `hkdocs.com` (ホスト名 `@`) に設定されている既存のAレコード、AAAAレコード、またはウェブサイト用のCNAMEレコードがあれば、それらを削除するか行頭に `#` をつけてコメントアウトします。これは、Cloud Run の設定と競合するのを防ぐためです。メール関連のMXレコードなどは変更しないでください。
3.  ステップ4でメモしたAレコードとAAAAレコードを、Value Domain の書式に従って追加します。
    *   **記載例 (IPアドレスはステップ4で取得したダミー値を実際の値に置き換えてください):**
        ```dns
        # hkdocs.com を Cloud Run に向ける設定
        # A レコード (IPv4)
        a @ 198.51.100.10
        a @ 198.51.100.11
        a @ 198.51.100.12
        a @ 198.51.100.13

        # AAAA レコード (IPv6)
        aaaa @ 2001:db8:2::1a
        aaaa @ 2001:db8:2::1b
        aaaa @ 2001:db8:2::1c
        aaaa @ 2001:db8:2::1d
        ```
4.  DNS設定を保存します。DNSの変更が反映されるまで待ちます。



### ステップ6: Cloud Run で最終確認と SSL 証明書発行

Cloud Run が新しいDNS設定を認識し、SSL証明書を発行するのを確認します。

1.  **Google Cloud Console** の Cloud Run カスタムドメインマッピング画面で、`hkdocs.com` のステータスが「有効」になり、SSL証明書が発行されていることを確認します。これには少し時間がかかる場合があります。

 

### ステップ7: Docusaurus サイトの再ビルドとデプロイ

Docusaurus の設定変更を反映させるため、サイトを再ビルドし、Cloud Run にデプロイします。

1.  ローカルのターミナルで、Docusaurus プロジェクトのルートディレクトリに移動します。
2.  ビルドコマンドを実行します (例: `pnpm build`, `npm run build`, `yarn build`)。
3.  ビルドされた静的ファイルを、Cloud Run サービスにデプロイします。



### ステップ8: 動作確認

最後に、設定したカスタムドメイン `https://hkdocs.com/` でサイトが正しく表示されるか確認します。

1.  Webブラウザで `https://hkdocs.com/` にアクセスします。
2.  サイトが表示され、HTTPS接続 (アドレスバーの鍵マーク) が有効であることを確認します。
3.  サイト内のリンクや機能が意図通りに動作するかテストします。
4.  必要であれば、`https://hkdocs.com/sitemap.xml` などのSEO関連ファイルも確認します。


