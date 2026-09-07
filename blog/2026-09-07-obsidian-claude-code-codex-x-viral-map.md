---
title: Obsidian × Claude Code / Codex の連携がなぜ定期的にバズるのか、直近の人気投稿を調べて整理した
authors: [hk]
tags: [claude-code, llm, markdown]
description: "Obsidian の Vault を Claude Code / Codex の作業ディレクトリにする手法が X で何度もバズっています。自分でも試すために、2026年1月から9月までの人気投稿を読み比べて、手法の現在地と共通する構造を整理しました。"
image: /img/obsidian-x-viral-map_01_cover.webp
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';
import XPost from '@site/src/components/XPost';

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />

Obsidian を使っているので、タイムラインに Obsidian × Claude Code / Codex の投稿が流れてくると目に留まります。それが今年に入ってから、数ヶ月おきに何度もバズっている。単一の新しいアプリが主役になっているわけでもないのに、同じテーマが繰り返し伸びる。

自分の Vault でも試してみようと思ったものの、投稿ごとに言っていることが微妙に違います。フォルダ構成だけの話もあれば、公式スキルを入れろという話もあり、MCP まで持ち出すものもある。どれから手を付けるべきか、そもそもこれらは競合する手法なのか、断片的に読んでいるだけでは判断できませんでした。

そこで、着手する前に 2026 年 1 月から 9 月にかけて伸びた投稿を通しで読み、時系列に並べ直しました。結論としては、競合ではありませんでした。核になっている思想は 1 月から一度も変わっておらず、変わるのはどの層を表に出すか（編纂ルール、公式スキル、Codex、MCP、CLI）だけです。以下はその整理です。

![Obsidian×Claude Code, Codex と記されたタイトル画像](/img/obsidian-x-viral-map_01_cover.webp)

{/* truncate */}

## 対象の切り方

2026 年 1 月から 9 月の X 投稿のうち、Obsidian × Claude Code / Codex を扱っていて、表示がおおよそ 10 万を超えたものを対象にしました。別スタックの投稿は外しています。骨格が同じ再掲は原則対象外ですが、同じ内容が時期を変えて再流通する例として 1 本だけ含めています。

## 全体の流れ

大きく 5 つの波があり、中身は置換ではなく、同じ骨格の上に層が足されていく形になっています。

| 時期 | 何が足されたか |
| --- | --- |
| 第 0 波（1–2 月） | 思想の固定。Vault を作業ディレクトリにする |
| 第 1 波（3–4 月） | Karpathy Wiki（raw / wiki / ルール）の手順化と日本語化 |
| 第 2 波（5 月） | 日常 OS への拡張と、Codex との併用 |
| 第 3 波（6–7 月） | 公式スキルの日本語圏での再燃と、成熟度モデルによる整理 |
| 第 4 波（8–9 月） | 実装のカタログ化と、CLI の再パッケージ |

## 第 0 波（1–2 月）Vault を作業ディレクトリにする

型を最初に出したのは Heinrich さんです。知識ベースをコードベースと同じものとして扱う。フォルダ、規約、関係、ナビできるエージェント。人は実装（ノート作成）ではなく方向と品質判定を持つ、という分担です。

<XPost url="https://x.com/arscontexta/status/2013045749580259680">Heinrich (@arscontexta) の投稿</XPost>

書き方の規則が具体的でした。

- リンクは文末の注釈にしない。文の中に `[[主張]]` を織り込み、エージェントが思考の経路を辿れるようにする。
- ノートは単体で成立させる。リンク先を 5 つ読まないと分からないノートは分割する。
- 題名はトピック名ではなく主張にする。`thoughts on ai slop` ではなく `quality is the hard part`。リンクした瞬間に文の一部になる。
- 孤立ノートより、多数の流入リンクを持つノートを価値とみなす。知識はノードではなくネットワーク。

エージェント側の動きは、起動時にフォルダ構造を見せる、1 行説明つきの index で全ファイルを開かずに候補を絞る、主題ページ（MOC）を先に読み、そこへ「この領域の歩き方」をエージェント自身が追記して次セッションのパンくずにする、変更前に必ず文脈を取る、2 ノートの交差から洞察が出たら新規ノートを作る、新しく取り込むたびに関連を検索し、理由をつけてリンクする、という流れです。

`CLAUDE.md` はその Vault 専用の哲学であり、思考用・仕事用・研究用・創作用でルールを変える。Heinrich さん自身の思考用 Vault のものは約 2000 行まで育っているとのことでした。Markdown が本体で、Obsidian は窓。人の仕事は判断、つまり何が残るかを決めることだ、という主張です。

これを英語圏に広げたのが Morgan さんの一文でした。手順記事ではなく、Claude Code + Obsidian は強い、Notion やメモアプリでは同じことができない、という指摘です。理由はローカルの素の Markdown をエージェントがファイルとして読めることにあります。

<XPost url="https://x.com/morganlinton/status/2022156484264833537">Morgan (@morganlinton) の投稿</XPost>

この段階での発明はプラグインではなく、チャットを捨てて Vault を作業ディレクトリにすること、それだけです。

## 第 1 波（3–4 月）週末で組める手順になる

Karpathy さんの LLM Wiki（raw / wiki / ルール）が乗ると、思想が手順に変わります。りゅうさんの投稿は、それを 8 手順に落とした日本語の保存版でした。

<XPost url="https://x.com/obsidianstudio9/status/2043873607731024164">りゅう (@obsidianstudio9) の投稿</XPost>

1. `my-knowledge-base/` の下に `raw/` `wiki/` `outputs/` だけ作る。最初から分類体系を設計しない。
2. 記事、スクショ、メモ、ブックマーク、PDF を raw に放り込む。質より量で、整理は後回し。
3. 収集は手でもブラウザ操作エージェントでもよい。必須ではない。
4. ルートに `CLAUDE.md` を置く。Wiki の形式、カテゴリ、トーン、出典 URL 必須、要約セクション必須、関連リンクを末尾に付ける、程度でよい。複雑なプロンプトは不要。
5. Claude Code をそのフォルダで起動し、raw を読ませて `INDEX.md` とトピック別ページを wiki に書かせる。目的はコピペ整理ではなく、ソース間の接続を作ること。
6. 運用の本体は「質問する → 答えを wiki に戻す」。チャットの履歴を保存場所にしない。
7. 月 1 でヘルスチェック。矛盾、重要トピックの抜け、出典不明の主張を見る。
8. Obsidian は必須ではない。ただし生成された `.md` をそのまま Vault として開けば、グラフとバックリンクが使える。

主張の核は、人間がメンテする第二の脳は必ず腐る、という点にあります。分類作業そのものをエージェントへ渡す。

同じ月に東大 ClaudeCode 研究所が、海外の Heinrich さん / Karpathy さん / sourfraser さん / defileo さん / kepano さんを初心者が 20 分で始められる形に束ねました。

<XPost url="https://x.com/ClaudeCode_UT/status/2046930094695043199">東大ClaudeCode研究所 (@ClaudeCode_UT) の投稿</XPost>

記憶の持ち方を 3 つに分け、① を主戦場に置いています。① LLM Wiki（Obsidian × Claude Code）は使うほど積み上がるが、トークンは増えやすい。② NotebookLM は速いがプロジェクト単位の使い切りで、次に引き継げない。③ `CLAUDE.md` だけなら Vault なしで「どう振る舞うか」を固定できる。

セットアップは、Vault を作って最初に `Memory.md`（仕事、プロジェクト、道具、目標、判断基準）と `Home.md`（目次）を書く。フォルダは Karpathy さんの `.raw/` と wiki で、投入は人がやり構造化はエージェントに任せる。基盤に `kepano/obsidian-skills`（記法・CLI・Web 掃除）、応用に `AgriciDaniel/claude-obsidian`（`/wiki` `/ingest` `/save` `/autoresearch` `/canvas` / lint）を置く構成です。

日常は 3 動作にまとまっています。

- 入れる: raw に投げて ingest。1 ソースから wiki 8〜15 ページ、1 ページ平均 12 リンク、という数字が挙げられている（投稿者の自己申告で、検証された値ではない）。
- 聞く: 先に短い `hot.md`（直近コンテキスト約 500 語）と `index.md` だけ読む。全ページを読まないので、Vault が数千ページでも質問コストを一定に近づけられる。
- 育つ: `/save` で会話を wiki へ戻す。10〜15 ingest ごと、または月 1 で lint。リンク切れ、孤立、矛盾、出典不明を見る。

失敗モードも書かれています。プラグイン集め、完璧なフォルダ設計、初手のノート品質へのこだわり。加えて、答えを保存すると誤りのほうも積み上がってしまう、という指摘があり、その対策が lint という位置づけです。

この波でバズの単位が、短文から「保存して週末にやる長文」へ変わりました。なお公式部品はこの波で登場したわけではなく、Obsidian CLI は 2 月末の 1.12 で、公式 Skills も年初には存在しています。4 月の日本語長文が、既にあった部品を手順に組み込んだ、という順序です。以降の投稿が全員それを引用しているわけでもありません。

## 第 2 波（5 月）人生 OS への拡張と Codex との併用

Defileo さんは PKM の話を人生 OS まで広げました。道具は増やしません。

<XPost url="https://x.com/defileo/status/2050656413006053793">Defileo (@defileo) の投稿</XPost>

置き場は 1 つの Vault にまとめる。仕事、財務、健康、学業、連絡先、投資、目標、プロジェクト、デイリー、ブランドを相互リンクする。朝、Claude が夜間差分を読み、変化・優先度・次の手・返信下書きを出す。カレンダー、Notion、CRM、ジャーナル、習慣トラッカー、家計アプリを並列しない。ここでの最適化はフォルダ設計というより、コンテキストの単一化です。質問のたびに前提を説明しない、という点に価値を置いています。

同じ月に Codex を絡めた投稿が 2 本出ました。りゅうさんの 2 本目は、Claude Code 単体運用の詰まりを書いたうえで、Codex を並走させる話です。

<XPost url="https://x.com/obsidianstudio9/status/2054849745248776318">りゅう (@obsidianstudio9) の投稿</XPost>

詰まりとして挙がるのは、コンテキストの消費、利用制限、Skill 発動の不安定さ、コード前提であること。そのうえでセットアップは `codex mcp add obsidian-mcp-tools` で、軽量な ingest や夜間処理は Codex、横断の矛盾検出や日本語の文章化は Claude Code、公式 `obsidian-skills` は両方から呼ぶ、という棲み分けになります。どちらかを捨てる話ではありません。自身の 1 年の運用を Raw / Wiki / Schema（Claude なら `CLAUDE.md`、Codex なら `AGENTS.md` 相当）という枠で語っているのもこの投稿です。

東大 Obsidian オタクさんの投稿は、整理された Vault でも思考が回らない、が主題でした。

<XPost url="https://x.com/ObsidianOtaku/status/2058665087876165671">東大Obsidianオタク (@ObsidianOtaku) の投稿</XPost>

海外記事の翻訳が本体で、蘇生の手順を 4 層に分けています。入口（取り込みを装置化する）、夜の装置（Codex 等の定期実行）、記憶層（Obsidian）、思考パートナー（`CLAUDE.md` と問い方）。ここでの Codex は編纂エンジンというより、寝ている間に振り分ける側として置かれています。

この波でテーマが二層になりました。編纂（wiki を育てる）と、日々の運用に載せること（朝のブリーフィング、夜間の自動処理）です。同時に、Claude 専用ネタからローカルエージェント全般へ開きました。

## 第 3 波（6–7 月）公式スキルの再燃と成熟度モデル

たい焼きさんの投稿は、第二の脳の思想ではなく、公式スキルの導入手順として日本語圏で再拡散した版です。スキル自体の初出ではなく、手順として届け直したところに位置があります。

<XPost url="https://x.com/taiyaki_ai3/status/2069366310832836683">たい焼き (@taiyaki_ai3) の投稿</XPost>

入れるものは 5 つでした。

| スキル | 役割 |
| --- | --- |
| `obsidian-markdown` | wikilink、embed、callout、properties |
| `obsidian-bases` | `.base` のビュー・フィルタ・計算 |
| `json-canvas` | `.canvas` |
| `obsidian-cli` | ターミナルから Vault 操作 |
| `defuddle` | Web を綺麗な Markdown にしてトークンを減らす |

対応は Claude Code / Codex / OpenCode。プラグインではなく Agent Skills（`SKILL.md` の束）です。Vault を普通のテキストとして壊すのを防ぐのが目的で、検索・作成・整理・リンク修復までエージェント側に寄せる。登録も API キー追加も不要で MIT ライセンス、という話はスキル単体についてのもので、Claude Code や Codex そのものの契約は別に必要です。

一方で Chesny さんの投稿は、どこまでなら簡素な構成のままで足りるのか、その条件を切ったところに価値がありました。ここまでで一番伸びた投稿でもあります。

<XPost url="https://x.com/chesny/status/2077344214493319484">Chesny (@chesny) の投稿</XPost>

成熟度を 3 段階に分けています。

- レベル 0: ノートをチャットに貼る。会話が切れたら記憶も切れる。
- レベル 1: Vault フォルダを Claude Code の作業ディレクトリにする。プラグインも DB も API も使わない。エージェントはフォルダ構造を見て、grep / glob で探し、frontmatter・wikilink・フォルダ規約どおりに Markdown を書く。実例として raw 78 本（論文・記事・ドキュメント）から wiki 180 ページ。うち概念が 83、残りはツール・人物・比較・ソース要約。新規投入のたびに既存ページの参照をエージェントが更新し、人手では wiki ページを書かない。
- レベル 2: MCP。Vault を「説明済みのフォルダ」から「接続時に能力を自己申告するサーバー」に変える。できることは resource（ノート本文、検索結果、backlink グラフを読む）、tool（作成・タグ更新・構造化クエリ）、prompt（「このソースを要約して wiki ページを作れ」を名前付き操作にする）の 3 種。

レベル 1 の天井も明示されています。Vault が変わるたびに規約を system prompt へ書き直すこと、孤立ページ検出や Dataview 相当を毎回ゼロから組むこと。単一 Vault・単一エージェントならレベル 1 で足り、複数エージェント・複数 Vault・ファイル単位を超える操作が必要になったら MCP へ上げる、という線引きです。導入そのものを否定しているわけではありません。

数字が最大になったのは、新しい導入手順を出したからではなく、今の自分はどのレベルかを言語化したからだと思います。自分の場合も、まずはこの一段目から始めればよい、とここで判断がつきました。

## 第 4 波（8–9 月）カタログ化と CLI の再パッケージ

kai さんの投稿は、GitHub の実装を 3 系統に整理したカタログです。

<XPost url="https://x.com/0xkkai/status/2085838657068347401">kai (@0xkkai) の投稿</XPost>

1. Karpathy Wiki: raw は生涯 1 回だけ読む。抽出結果を wiki に書き、以後の質問は wiki だけ見る。再検索のトークンを 7〜9 割減らす、というのがリポジトリ側の売り文句。代表が `AgriciDaniel/claude-obsidian` と純正寄りの `ekadetov/llm-wiki`。
2. Skills: 起動時は説明文だけ読み、発火したときだけ本体を読む。公式が `kepano/obsidian-skills`（Claude Code / Codex / OpenCode）。
3. MCP: ライブ橋渡し。読み専用（安全、検索）と読み書き（夜間メンテ）を分ける。Obsidian プラグイン依存なら API 経由（`iansinnott/obsidian-claude-code-mcp`）、プレーン Markdown ならファイル直読みで足りる。

結論は 10 個入れるな、でした。compiler（wiki 系）を 1 つ、bridge（MCP 系）を 1 つ。既存 500 ノート超でメンテが回らないならスケジューラ付きの重い系、貴重なアーカイブなら書き込み禁止 MCP、新規の空 Vault なら claude-obsidian で 1 ファイル ingest してグラフを見るのが最短、という分岐です。補足として、Smart Connections 等の既存ワークフローの上に AI を載せるプラグインと、raw をコンパイルせず RAG するだけ、は別物として切り分けています。

Machina さんは、個人 Wiki を事業の GTM 知識に特殊化しました。

<XPost url="https://x.com/EXM7777/status/2089714608244457543">Machina (@EXM7777) の投稿</XPost>

- フォルダは事業が知っている単位にする。offer、buyer、voice、market map、workflow、prospect、signal、message、metric など。
- 1 ノート 1 事実、50〜150 語。題名は口に出せる文。frontmatter は type / tags / created / status の 4 つ。
- 各ノートはフォルダハブ＋兄弟 2＋別フォルダ 1 へリンクする。島を作らない。
- `rulings/` にエージェントへの訂正を日付 1 行で残し、次回の下書き前に必ず読ませる。同じミスを口頭で繰り返さない。
- Claude Code はハブを先に読み、rulings を grep してから書く。学びはその日のうちにノートへ戻す。

グラフはフォルダで色分けし、白いハブが薄いクラスタを次に壊れる領域として先に見る、という運用も面白いところです。

東大 ClaudeCode 研究所は 4 月の骨格を再掲しました。6 年・4000 ノートの Vault に一晩向け、孤立 340 を接続、矛盾 18、下書き 6 本、以降は毎晩タグ付け、という運用イメージです。ただしこれは研究所自身の実験ではなく、そういう人がいた、という形で紹介されている伝聞です。準備はパスと約 400 語の `CLAUDE.md` だけ、としています。

<XPost url="https://x.com/ClaudeCode_UT/status/2093564303484039505">東大ClaudeCode研究所 (@ClaudeCode_UT) の投稿</XPost>

直近では 0xMarioNawfal さんが、Obsidian CLI を短文動画に再パッケージしています。

<XPost url="https://x.com/RoundtableSpace/status/2094723185904365880">0xMarioNawfal (@RoundtableSpace) の投稿</XPost>

アプリ UI を開かず、ターミナルから作成・検索・更新する。公式スキルが正しい記法、CLI がアプリ機能への到達という分担で、kepano さんの 4 点セット（アプリ / Web Clipper / CLI / Skills）の実行レイヤ側にあたります。8 月末以降の短文は、新規思想というより公式 Skills ＋ CLI の再パッケージが多くなっている印象です。

## 後から残る 4 層

通しで読むと、実体は新アプリではないことがはっきりします。ローカルの Markdown を保管場所の中心に置き、その整理と読み直しを Claude Code / Codex に任せる。人がやることから、分類と手入れ、そして毎回の前提説明を外し、何を投入するか、何を残すか、誤りを戻さないか、だけを残す。

そのうえで、複数の投稿を重ねたときに残る設計を自分なりに 4 層へまとめると次のようになります。12 本すべてがこの形を採っているわけではなく、Heinrich さんや Defileo さんは raw と wiki の分割を必須にしていません。

| 層 | 役割 |
| --- | --- |
| ルール | `CLAUDE.md` / `AGENTS.md`。Vault ごとの方針と禁止事項 |
| 素材 | `raw/`。放り込み専用。原則読み取り専用 |
| 知識 | `wiki/`。リンクで結ばれたページ。質問の答えはここに書き戻す |
| 道具 | 公式 Skills（記法）→ ファイル直読み → 足りなければ CLI / MCP |

差がつくのはツール名ではなく、次の 3 点だと思います。raw を何度も読ませないこと（kai さんが挙げる再検索トークン 7〜9 割減という主張）、誤答を wiki に残さないこと（東大 CC の lint、Machina さんの rulings）、記法を公式スキルで固定すること（たい焼きさんが紹介した `obsidian-skills`）。

## まとめ：いま採るべき設計

伸びている投稿ほど、新しい手法というより既存の考え方を言い直したものでした。Heinrich さんと Karpathy さんと kepano さんが部品を出し、日本語の長文がそれを手順にし、夏以降はリポジトリの比較と CLI で再燃している。「Markdown をエージェントの作業ディレクトリとして扱う」という中心が一度も変わっていないからこそ、そのつど新しい読み手に届いて繰り返しバズる、という構図です。

そのうえで、今から始めるならどう組むべきかを考えると、次の 3 つに絞られます。

まず、Vault のフォルダをそのままエージェントに開かせるところから始めること。プラグインも MCP も、最初は要りません。単一の Vault を一人で使っているうちは、フォルダ構造を読ませて `grep` で探させるだけで足ります。設定を増やすのは、複数のエージェントや複数の Vault を横断したくなってからで間に合います。

次に、取り込んだ素材を何度も読み返させないこと。元の資料を置く場所と、そこから書き起こした知識のページを分け、以後の質問は後者にだけ当てる。分けずに毎回すべてを読ませる形にすると、Vault が育つほど 1 回の質問が重くなります。素材の再読を減らすこの構造が、長く使ったときにいちばん効いてきます。

最後に、誤りを書き戻さない仕組みを、運用を始める前に用意しておくこと。会話の答えをページに残す運用は、正しい答えと同じ速さで誤りも溜めます。リンク切れ・孤立ページ・矛盾・出典不明を定期的に洗う点検と、エージェントへの訂正を 1 行ずつ書き残して次回の作業前に読ませる仕組み。この 2 つだけは、ページが増えてからでは追いつきません。

逆に、後回しでよいものもはっきりしました。完璧なフォルダ設計、最初のノートの品質、道具の数です。記法の細かい部分は公式スキルに任せられますし、MCP は必要になってから足せます。

今回の調査を踏まえて、自分にマッチする設計に落とし込んで行きたいと思います。

---

#### 参考｜情報ソース

本記事は下記の X 投稿の内容を整理したものです。

- [Heinrich (@arscontexta)](https://x.com/arscontexta/status/2013045749580259680) — 知識ベースをコードベースとして扱う型の原点。
- [Morgan (@morganlinton)](https://x.com/morganlinton/status/2022156484264833537) — 英語圏への拡散契機。
- [りゅう (@obsidianstudio9)](https://x.com/obsidianstudio9/status/2043873607731024164) — Karpathy Wiki を週末で組む 8 手順。
- [東大ClaudeCode研究所 (@ClaudeCode_UT)](https://x.com/ClaudeCode_UT/status/2046930094695043199) — 20 分で始める運用マニュアルと lint。
- [Defileo (@defileo)](https://x.com/defileo/status/2050656413006053793) — 1 Vault に集約する人生 OS。
- [りゅう (@obsidianstudio9)](https://x.com/obsidianstudio9/status/2054849745248776318) — Claude Code と Codex の棲み分けと、Raw / Wiki / Schema の運用。
- [東大Obsidianオタク (@ObsidianOtaku)](https://x.com/ObsidianOtaku/status/2058665087876165671) — 入口 / 夜の装置 / 記憶層 / 思考パートナーの 4 層。
- [たい焼き (@taiyaki_ai3)](https://x.com/taiyaki_ai3/status/2069366310832836683) — 公式 Agent Skills 5 種の導入手順。
- [Chesny (@chesny)](https://x.com/chesny/status/2077344214493319484) — レベル 0 / 1 / 2 の成熟度モデルと MCP へ上げる条件。
- [kai (@0xkkai)](https://x.com/0xkkai/status/2085838657068347401) — Wiki / Skills / MCP の 3 アーキテクチャ比較。
- [Machina (@EXM7777)](https://x.com/EXM7777/status/2089714608244457543) — GTM 知識への特殊化と `rulings/`。
- [東大ClaudeCode研究所 (@ClaudeCode_UT)](https://x.com/ClaudeCode_UT/status/2093564303484039505) — 4000 ノートを一晩で整理する再掲版。
- [0xMarioNawfal (@RoundtableSpace)](https://x.com/RoundtableSpace/status/2094723185904365880) — Obsidian CLI の再パッケージ。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" showSupportButton />
