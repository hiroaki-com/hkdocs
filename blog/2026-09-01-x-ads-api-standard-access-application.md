---
title: X 広告の数値を API で取るには申請が必要 — Ads API Access Form の項目を実際の画面で確認する
authors: [hk]
tags: [automation, 個人開発, troubleshooting]
description: "X Ads API は通常の X API とは別の承認制プログラムで、利用には App 単位の申請が必要です。申請フォームの実際の画面と各項目、承認されると何ができるようになるのかの備忘録です。"
image: /img/x-ads-api_01_ads-api-access-form.webp
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />

個人で運営しているサービスで X（旧 Twitter）に小額の広告を出しており、その数値を Ads Manager の画面から毎回手作業で拾っていました。API で取れれば楽になると思って調べたところ、X Ads API は通常の X API とは別の承認制プログラムで、使うには申請が必要だと知りました。API キーがあれば使えるものだと思っていたので、想定外でした。

フォームはログインしないと開けず、どんな項目を求められるのか事前には分かりません。2026 年 9 月時点の画面と、各項目に何を書いたかを残しておきます。

![X Ads API Access Form の全体。Company Information、Primary Contact、Access Request、規約への同意の 4 ブロックで構成されている](/img/x-ads-api_01_ads-api-access-form.webp)

{/* truncate */}

## 通常の X API とは別物

広告の数値を返すエンドポイントは、そもそもホストが違います。通常の X API が `api.x.com` なのに対し、Ads API は `ads-api.x.com` です。

その上でアプリ単位の承認制になっていて、承認されていないアプリからのリクエストは通りません。開発者アカウントを持っていても、API の利用料を払っていても、自動では付与されません。「キーはあるのに 403 が返る」が、設定ミスではなく単に申請していないから、ということがありえます。

申請自体は無料で、Ads API の利用にも費用はかかりません。お金がかかるのは広告の出稿費だけです。

## フォームの項目

1 ページで完結し、入力欄は 10 個ほど。すべて必須です。

| ブロック | 項目 | 書いたもの |
| --- | --- | --- |
| Company Information | Company | サービス名に `(individual developer)` を添える |
| | Company X Account | 広告を出しているアカウントのハンドル |
| | City / State-Province | 居住地。国名の欄はない |
| Primary Contact | Name / Email / Phone | 連絡が取れるもの |
| | Title | `Owner / Developer`（法人前提の項目なので個人だと該当なし。空欄や `N/A` は避けた） |
| Access Request | Developer App ID | 開発者ポータルの URL から取得（後述） |
| | Describe your purpose | 用途の自由記述（後述） |
| Acknowledgment of X Terms | 同意チェック | — |

想定と違ったのは、アクセスレベルを選ぶ項目がないことです。プルダウンもラジオボタンもなく、自由記述の中で伝えるしかありません。使用するエンドポイントや想定コール数の欄も同様にありません。実質的に審査されるのは App ID とテキストエリア 1 つだけ、ということになります。

## App ID は URL で確認できる

開発者ポータルの画面上には ID として明示されていませんが、対象のアプリを開いたときの URL の末尾に出ています。

```text
https://console.x.com/accounts/0000000000000000000/apps/00000000
                               ~~~~~~~~~~~~~~~~~~~      ~~~~~~~~
                               開発者アカウントの ID     ← これが App ID
```

`/accounts/` の直後にも長い数値がありますが、こちらは開発者アカウント自体の ID でフォームには不要です。桁数が違うので見分けはつくものの、コピーする位置を間違えやすいところでした。

## 用途の欄に書いたこと

必要な情報がここに集約されるので、以下を盛り込みました。

- 求めるアクセスレベル（専用の項目がないため本文で明示）
- 何のサービスで、どういう広告を出しているか
- どのデータを取得して何に使うか
- 対象は自分の広告アカウントのみであること
- 想定するコール数と頻度

アクセスレベルは Conversion Only と Standard Access の 2 つです。紛らわしいのですが、広告の実績数値を読むだけでも Standard Access が必要です。impressions や clicks を返す Analytics は Conversion Only に含まれていないので、「読むだけだから軽いほうで」という選び方ができません。

意識したのは 2 点でした。ひとつは、自分のアカウントだけを対象に読み取りしかしない、と明示すること。審査で警戒されるのは第三者アカウントの取り扱いとデータの再配布なので、そのどちらでもないと先に打ち消しておきます。もうひとつは、使う量を具体的に小さく書くこと。「1 日 1 回」「月 100 コール未満」のように運用の形まで書くと、要求しているレベルと実際の使い方が釣り合っていることが伝わります。

Standard Access を求めつつ「読み取りだけで足りる」と書くのは矛盾して見えるので、Analytics が Standard にしか含まれないためだ、と一言添えておきました。

送信すると `Success!` の画面になります。この時点では承認ではなく、結果はメールで届きます。

なお、公式ドキュメントからのフォームリンクが空白で表示される、あるいは受付終了ページへリダイレクトされるという報告が複数ありました。その場合は開発者コミュニティのフォーラム（`devcommunity.x.com`）の Ads API Access カテゴリにスレッドを立てる経路が案内されています。今回はフォームが正常に開いたので使っていません。

## 承認されると何ができるか

申請した当日に承認のメールが届きました。想定よりはるかに早く、待ち時間はほぼありませんでした。

できるようになったのは、Ads Manager の画面で見ていた数値をそのままデータとして取れる、ということです。

- アクセスできる広告アカウントの一覧と ID
- キャンペーン、広告グループ、配信中の広告といった構成
- 実績数値 — 表示回数、クリック数、消化額、エンゲージメント、動画の再生完了率など
- 日別の内訳（過去 7 日は即時、それ以前は非同期ジョブ経由で最大 90 日）

画面を開いて目視で拾い、手で転記する作業がなくなります。キャンペーンが数本なら手作業でもやれますが、毎日続けるとなると別で、購入データと突き合わせて獲得単価を出すところまで自動化できるのが大きいところでした。

承認されても変わらない点も 3 つあります。レートリミットの引き上げは一切行われません（個人利用の規模なら上限に当たることはまずありません）。消化額の確定には最大 3 日かかり、表示回数などが 24 時間で確定するのに対して遅れます。認証は OAuth 1.0a の 3-legged が必須で、v2 でよく使う Bearer トークンは受け付けられません。

## まとめ

X の広告データを API で取りたい場合、通常の X API とは別に Ads API の申請が要ります。ここに気づかないまま設定を疑うと時間を無駄にします。

フォーム自体は 10 項目ほどで身構えるほどのものではありませんが、アクセスレベルを選ぶ項目がなく自由記述で伝える必要がある点と、実績データを読むだけでも Standard Access が要る点は、事前に知らないと書き漏らします。迷いやすい App ID は開発者ポータルの URL の末尾で確認できます。

---

#### 参考｜情報ソース

- [X Ads API - Getting Started](https://docs.x.com/x-ads-api/getting-started) — Ads API の全体像と、通常の X API との関係を扱う公式の入口。
- [Increasing access](https://docs.x.com/x-ads-api/getting-started/increasing-access) — アクセスレベルの区分と申請手順が記載された公式ページ。
- [Analytics](https://docs.x.com/x-ads-api/analytics) — 取得できる数値の種類、取得可能な期間、レートリミットの定義。
- [X Developer Community](https://devcommunity.x.com/) — フォームが機能しない場合の申請代替ルートとなるフォーラム。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />
