---
sidebar_position: 5
title: Professional Cloud Developer 合格記
tags: [google cloud, 認定資格, 合格記]
---

**🌸 合格：2025年02月27日**

##### 合格メモ

```
感想：
- 問題数：50問
	- 自信のある問題：35問程度／見直した数：15問程度
	- 70/120分 程度で１周完了／見直しで30分程度 使用し、100/120分 程度で試験完了

初見の問題が多かった印象
また、Developerの模擬試験以外の、Cloud Architect　や Network からの出題も目立った印象
特に、Cloud Architect と被る問題が多かったので、試験対策時には同時に学習することを推奨
確実な正解を導かなければ、絞ることのできない選択肢構成が多かった印象

出題傾向：

- 限定公開のGoogleアクセスを使用したCloud SQL への接続の問題
- 外部ロードバランサーの使用したいインスタンスへのネットワーク構成の問題
- デプロイ時の認証認可に関する問題
- Cloud Build のコードや構成に関する問題
	- コードから接続エラーの改善策を求める
- デプロイ時のPub/subを使用したトリガーに絡む複合問題
- Cloud Run の仕様を推奨するような問題
- Artifacts Registry　を使用した、脆弱性スキャンのためのデプロイ手順を求める問題
- Binary Auth の構成手順を求めるような問題

```



---

**試験概要：**
- [Professional Cloud Developer](https://cloud.google.com/learn/certification/cloud-developer)


### 受験情報 2025 年 2 月 27 日
試験名: **Google Cloud Certified -Professional Cloud Developer**
遠隔プロクター：自宅
時計アイコン 2025年2月27日（木12:15 (世界時+09:00) 昼
🔥ぎっくり腰の状況次第で室内のセットアップができない可能性もあるので早めにリスケの検討

##### 試験当日

- 試験の準備のためにログインページで試験開始を待つ
	- 身分証を揃える
- 試験開始まで、公式ドキュメントと苦手項目を復習する

##### 試験後のTODO
🔥 緊急事態：Udemyの当該コースが削除されていた
- [ ] 試験終了後に返金請求を各コースでかける
- 試験の回想をメモする

---

### 🔥受験に向けた戦略🔥

- 公式の参考資料を読む
	- [GKE ネットワーキングのベスト プラクティス](https://cloud.google.com/kubernetes-engine/docs/best-practices/networking?hl=ja)
	- [トラブルシューティング ページ ｜GKE](https://cloud.google.com/kubernetes-engine/docs/troubleshooting?hl=ja)
	- [Google Cloud ホワイトペーパー](https://cloud.google.com/whitepapers?hl=ja)

##### 学習戦略：

- 参考資料

- とにかく問題集を回す
	- [ ] [Practice Exams | Google Cloud Database Engineer (GCP)](https://www.udemy.com/course/practice-exams-google-professional-cloud-database-engineer/?couponCode=ST5MT020225BROW)

	- Wizlab の無料問題だけ学習
		- [ ] [Free Test ](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-database-engineer/2556)

	- 1周目：2025/02/08 約50%
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3
		- [x] Practice Test 4
		- [x] Practice Test 5

	- 2周目：2025/02/25
		- [ ] Practice Test I
		- [ ] Practice Test 2
		- [ ] Practice Test 3
		- [ ] Practice Test 4
		- [ ] Practice Test 5

	- 復習を実施する（ 間違った問題の復習 ）
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3
		- [x] Practice Test 4
		- [ ] Practice Test 5
	
	- 復習を実施する（ レビューチェック済みの問題を復習する ）
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3
		- [x] Practice Test 4
		- [ ] Practice Test 5


	-  [公式模試](https://docs.google.com/forms/d/e/1FAIpQLSfFeB8zBNi2q-ar0V7iIguhk2e6P-UkrJ8OJfg6n0k6HcYLDQ/viewform) にトライする
		- → 模擬試験について：問題集で網羅されているため以後不要
			- 76.92％：2025/02/25
		- [x] [復習](https://docs.google.com/forms/d/e/1FAIpQLSfFeB8zBNi2q-ar0V7iIguhk2e6P-UkrJ8OJfg6n0k6HcYLDQ/viewscore?viewscore=AE0zAgBxwR7F-30cJ0CMd9gR57e-JDoitkdkgtpGFDlYtrZRiVk_1gLk_jalLWASjsyBubI)：2025/02/25

	- 苦手項目の復習
		- [x] 2025/02/26

- [ ] アーキテクチャーセンターのGCEの記事を読む
	- [アプリケーション開発に関するリソース](https://cloud.google.com/architecture/application-development?hl=ja#canary_test_pattern) 


---

##### 苦手項目

[**カーソル**、制限、オフセット](https://cloud.google.com/datastore/docs/concepts/queries?hl=ja#cursors_limits_and_offsets)｜datastore 
> **クエリカーソル**を使用すると、アプリケーションでクエリ オフセットの**オーバーヘッドを発生させることなく**、クエリの結果を一括取得できます。
> 
> **Datastore モード**のデータベースでは整数のオフセットをサポートしていますが、使用は**避けて**ください。その代わりに**カーソルを使用します**。
- ❌`SELECT * FROM books LIMIT 10 OFFSET 20;`
- ⭕️`SELECT * FROM books WHERE id > last_id ORDER BY id LIMIT 10;


[シリアル コンソールを使用して問題をデバッグする](https://cloud.google.com/compute/docs/troubleshooting/troubleshooting-ssh-errors?hl=ja#debug_with_serial_console)：Compute Engine
> **シリアル コンソールのログで接続エラーがないか調べる**ことをおすすめします。シリアル コンソールには、ローカル ワークステーションからブラウザを使用して **root ユーザーでアクセスできます。このアプローチは、SSH を使用してログインできない場合**や、インスタンスがネットワークに接続していない場合に便利です。


[Cloud Shell を使用した限定公開クラスタへ](https://cloud.google.com/kubernetes-engine/docs/how-to/private-clusters?hl=ja#cloud_shell)のアクセス：GKE・Cloud Shell
> 自動生成されたサブネットの使用セクションで作成した限定公開クラスタ、private-cluster-1 には、パブリック エンドポイントがあり、承認済みネットワークが有効になっています。Cloud Shell を使用してクラスタにアクセスする場合は、**Cloud Shell の外部 IP アドレスをクラスタの承認済みネットワークのリストに追加する必要**があります。


[イメージの脆弱性を表示する](https://cloud.google.com/artifact-analysis/docs/scan-os-automatically?hl=ja#view_the_image_vulnerabilities)：Artifact Registry 
>**Artifact Analysis は、Artifact Registry** にアップロードされた新しいイメージをスキャンします。このスキャンにより、コンテナ内のシステム パッケージに関する情報が抽出されます。レジストリ内のイメージの脆弱性の発生は、Google Cloud コンソール、Google Cloud CLI、または **Container Analysis API** を使用して確認できます。イメージに脆弱性が存在する場合、その詳細を確認できます。
> 

[アプリケーション ロードバランサ用の GKE Ingress](https://cloud.google.com/kubernetes-engine/docs/concepts/ingress?hl=ja)
> このページでは、**外部アプリケーション ロードバランサ（HTTPS）** の概要と仕組みについて説明します。Google Kubernetes Engine（GKE）では、**GKE Ingress** と呼ばれる、組み込みのマネージド Ingress コントローラを使用できます。このコントローラは、GKE で **HTTP(S)** ワークロードを処理する Google Cloud ロードバランサとして **Ingress リソース**を実装します。

[個々のプロジェクトでの Cloud KMS の設定](https://cloud.google.com/kms/docs/separation-of-duties?hl=ja#using_separate_project)：職掌分散（Separation of duties (SoD)）
> **職掌分散**を可能にするために、Cloud KMS を**独自のプロジェクト**（your-key-project など）で実行できます。分散要件の厳格さに応じて、次のいずれかを行うことができます。
	- （推奨）プロジェクト レベルで **owner なし**で your-key-project を作成し、**組織レベル**で付与された**組織管理者**を指定します。owner とは異なり、組織管理者は直接鍵の管理や使用はできません。鍵の管理や使用ができるユーザーを制限する IAM ポリシーの設定に限定されます。組織レベルのノードを使用すると、組織内のプロジェクトに対する権限をさらに制限することができます。


[トラフィック管理 （Traffic Director）](https://cloud.google.com/service-mesh/docs/overview?hl=ja#traffic_management)：Cloud Service Mesh
> Cloud Service Mesh では、メッシュ内のすべてのサービスのサービス レジストリを名前別およびそれぞれのエンドポイント別に管理します。このリストを維持して、トラフィック フロー（Kubernetes Pod の IP アドレス、マネージド インスタンス グループ内の Compute Engine VM の IP アドレスなど）を管理します。メッシュは、このサービス レジストリを使用してサービスと同時にプロキシを実行することで、適切なエンドポイントにトラフィックを転送します。プロキシレス gRPC ワークロードは、Envoy プロキシを使用するワークロードと並行して使用することもできます。


[インスタンス メタデータ サーバー](https://cloud.google.com/run/docs/container-contract?hl=ja#metadata-server)：Cloud Run
> Cloud Run インスタンスは、プロジェクト ID、リージョン、インスタンス ID、サービス アカウントなど、コンテナに関する詳細情報を取得するために使用できるメタデータ サーバーを公開します。メタデータ サーバーを使用して、**サービス ID のトークン**を生成することもできます。メタデータ サーバーのデータにアクセスするには、Metadata-Flavor: Google ヘッダーを使用して http://metadata.google.internal/ エンドポイントに HTTP リクエストを送信します。
> 

[BigQuery Job User](https://cloud.google.com/bigquery/docs/access-control?hl=ja#bigquery.jobUser) 
> BigQuery Job User  (roles/bigquery.jobUser)
>  - Provides permissions to run jobs, including queries, within the project.
>  - プロジェクト内で**クエリ**を含むジョブを実行する権限を付与します。

[コンピューティング容量を変更する](https://cloud.google.com/spanner/docs/compute-capacity?hl=ja#change-compute-capacity)：Cloud Spanner
> **インスタンスを作成した後で、そのコンピューティング容量を増やすことができます**。ほとんどの場合、リクエストは数分で完了します。まれに、スケールアップが完了するまでに最大 1 時間かかることがあります。... 
>  
>  コンピューティング容量を削除するときは、**Cloud Monitoring で CPU 使用率とリクエスト レイテンシをモニタリング**し、リージョンのインスタンスで CPU 使用率が 65% を下回り、マルチリージョンのインスタンスの各リージョンで 45% を下回るようにしてください。コンピューティング容量の削除中に、リクエストのレイテンシが一時的に増加する場合があります。
> 

[Cloud Trace と Zipkin の使用](https://cloud.google.com/trace/docs/zipkin?hl=ja#frequently_asked_questions) 
> Zipkin サーバーは、アプリケーションが Zipkin でインストゥルメントされているが、独自のトレース バックエンドを実行したくない場合や、**Cloud Trace の高度な分析ツールを利用したい**とう場合に役立ちます。

[GKE：ベストプラクティス：推奨](https://cloud.google.com/blog/products/containers-kubernetes/best-practices-for-creating-a-highly-available-gke-cluster?hl=en)
> **リージョンクラスター**は、**3つのKubernetesコントロールプレーンクォーラム**で構成され、ゾーンクラスターがクラスターのコントロールプレーンAPIに提供できる**よりも高い可用性**を提供します。また、コントロールプレーンが利用できない場合、ノードで実行されている既存のワークロードは影響を受けませんが、一部のアプリケーションはクラスターAPIの可用性に大きく依存しています。これらのワークロードには、リージョンクラスタートポロジを使用することをお勧めします。

[初期化期間（旧称クールダウン期間）](https://cloud.google.com/compute/docs/autoscaler?hl=ja#cool_down_period)：GCE
> 初期化期間（旧称クールダウン期間）は、VM インスタンスでアプリケーションが初期化されるのにかかる時間です。アプリケーションがインスタンスで初期化されている間に、インスタンスの使用状況は通常の状況を反映していない可能性があります。
>:
> インスタンスの初期化に要する時間よりも**大幅に長い初期化期間の値を設定**すると、オートスケーラーが適正な使用率データを無視してしまう可能性があります。その結果、グループの必要なサイズが過小評価され、**スケールアウトの遅延が生じる**ことがあります。


[Gateway API リソース](https://cloud.google.com/kubernetes-engine/docs/concepts/gateway-api?hl=ja#gateway_resources)：GKEネットワーク
> 図が有益

[Kubernetes Service とは](https://cloud.google.com/kubernetes-engine/docs/concepts/service?hl=ja#what-is-a-service)
> Service の目的は、一連の Pod エンドポイントを 1 つのリソースにグループ化することです。このグループにアクセスするさまざまな方法を構成できます。デフォルトでは固定クラスタ IP アドレスを取得し、クラスタ内のクライアントはそれを使って Service 内の Pod と通信できます。
> 

クラスタの可用性タイプ：GKE
> ベスト プラクティス:
> - **本番環境**ワークロードには、ゾーンクラスタよりも可用性が高い**リージョン クラスタ**を使用します。**開発環境**の場合は、ゾーン ノードプールを使用する**リージョン クラスタ**を使用します。リージョン コントロール プレーンとゾーン ノードプールを使用するクラスタの費用は、ゾーンクラスタと同じです。
> 

ネットワーク分離の選択肢：GKE
> ベスト プラクティス:
>- **Cloud NAT** を使用して、**GKE Pod** がパブリック IP アドレスでリソースにアクセスできるようにします。Cloud NAT を使用すると、Pod は直接インターネットに公開されませんが、インターネットに接続するリソースにはアクセスできるため、クラスタの全体的なセキュリティ ポスチャーが向上します。
> 


[GKE クラスタのアーキテクチャ ](https://cloud.google.com/kubernetes-engine/docs/concepts/cluster-architecture?hl=ja) 
> 構成図が有益
> 


[コンテナログを書き込む](https://cloud.google.com/run/docs/logging?hl=ja#container-logs)：Cloud Run ログ
> サービスまたはジョブからログを作成する場合、ログの出力先が次のいずれかであれば、Cloud Logging によってログが自動的に取得されます。
>- 標準出力（**stdout**）または標準エラー（**stderr**）ストリーム
> - /var/log ディレクトリにあるすべてのファイル
> - syslog（/dev/log）
> - Cloud Logging クライアント ライブラリを使用して作成されたログ。このログは、多くの一般的な言語で利用可能です。
> 
> ほとんどのデベロッパーは、ログの出力先として**標準出力**と**標準エラー**を想定しています。



[フレームグラフ](https://cloud.google.com/profiler/docs/concepts-flame?hl=ja)：Cloud Profiler
> Cloud Profiler では、フレームグラフを使用してプロファイリング データが表示されます。フレームグラフでは、ツリーや他のグラフより画面スペースが効率的に使用され、大量の情報がコンパクトで読みやすい形式で表示されます。
> 枠には**関数**の名前が付き、その幅はその**関数の合計 CPU 時間の測定値**に相対した長さになります。


[リクエスト レートを徐々に増やす](https://cloud.google.com/storage/docs/request-rate?hl=ja#ramp-up)：Cloud Strage
> Cloud Storage の自動スケーリングを常に最適に機能させるためには、高いリクエスト レートが数日間なかったバケットや、オブジェクト キーの新しい範囲を持つバケットのリクエスト レートを徐々に増やす必要があります。毎秒の書き込みリクエストが 1,000 件未満、または読み取りリクエストが 5,000 件未満のリクエスト レートについては、増やす必要はありません。リクエスト レートがこれらのしきい値を超えると予想される場合は、しきい値より低いまたは近いリクエスト レートから徐々にレートを上げていきます。ただし、20 分間でレートが倍にならないようにする必要があります。
> レイテンシやエラーレートの増大などの問題が発生した場合は、一時的にリクエスト レートの段階的な増加を中止するか、リクエスト レートを減らして、Cloud Storage でバケットがスケーリングされるまでもうしばらく待ってみます。**指数バックオフ**を使用して[リクエストを再試行](https://cloud.google.com/storage/docs/retry-strategy?hl=ja)するのは、次のようなときです。
 - `408` と `429` のレスポンス コードでエラーが発生する。
> - `5xx` レスポンス コードでエラーが発生する。
 

[uptime checks](https://cloud.google.com/monitoring/uptime-checks)：Cloud Monitoring
> HTTP と HTTPS の場合、すべての URL リダイレクトを行い、稼働時間チェックで受信した最終的なレスポンスを使用して成功基準を評価します。HTTPS チェックの場合、SSL 証明書の有効期限は、最後のレスポンスで受信したサーバー証明書に基づいて計算されます。
> 

[障害復旧アーキテクチャ](https://cloud.google.com/sql/docs/mysql/intro-to-cloud-sql-disaster-recovery?hl=ja#dr-architecture)：Cloud SQL
図を要確認
> Cloud SQL の 2 つのインスタンス（**プライマリ** インスタンスと**スタンバイ** インスタンス）は、**単一のリージョン**（プライマリ リージョン）内の 2 つの**別々のゾーン**にあります。インスタンスは、リージョン永続ディスクを使用して同期されます。
> 
> Cloud SQL（クロスリージョン **リードレプリカ**）の 1 つのインスタンスが **2 番目のリージョン**（セカンダリ リージョン）にあります。DR の場合、クロスリージョン リードレプリカは、リードレプリカの設定を使用して（非同期レプリケーションを使用）プライマリ インスタンスとの同期をとるように設定されます。
