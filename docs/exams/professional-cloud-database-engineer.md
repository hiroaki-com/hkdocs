---
sidebar_position: 4
title: Professional Cloud Database Engineer
tags: [google cloud, 認定資格, 合格記]
---

**🌸 合格：2025年03月07日**

##### 合格メモ

```
感想：
- 問題数：50問
- 100/120 程度で1周完了→ 15分程度で見直し完了し終了
- - 予想得点率は75%~85%

- 初めての英語の試験であったが、集中力が日本語試験よりも発揮できたことでなんとかなった。時間も、問題をなんとか理解できたことや、短文の問題も半分くらいあったためなんとかなった。
- 英語の単語がわからない関係で解けない問題は多分１,２問 くらいだったと想像する。
- 見たことのある問題が多数あった。また、出題傾向もUdemyの問題集の範囲から逸脱している問題はなかったので、狭い範囲の問題を使い回している可能性が高いことを想像できた。
- 

出題傾向：
- Spanner
- Cloud SQL
- Datastream / Dataproc
- 可用性やフォーマンスチューニングに関する問題
- 認証認可
- CMEK

```


--- 

**試験概要：**
- https://cloud.google.com/learn/certification/cloud-database-engineer?hl=ja


### 受験情報 2025 年 3 月 7 日
試験名: Professional Cloud Database Engineer
オフライン試験・吉谷ビル7階
2025年3月7日15:00 (JST) 

---

### 🔥受験に向けた戦略🔥

- 公式の参考資料を読む
	- https://cloud.google.com/learn/certification/cloud-database-engineer?hl=ja

##### 学習戦略：

- 参考資料
	- 公式
		- https://cloud.google.com/learn/certification/cloud-database-engineer?hl=ja
		- 英語🔥 https://medium.com/google-cloud/how-to-prepare-for-the-google-cloud-professional-cloud-database-engineer-exam-2a69baa68b09
	- ブログ
		- https://blog.g-gen.co.jp/entry/professional-cloud-database-engineer

- とにかく問題集を回す｜
	- 2025/03/01 → Udemyの以下の問題集が削除されたため別の問題集に変更（返金対応済み）
		- OLD｜[Practice Exams | Google Cloud Database Engineer (GCP)](https://www.udemy.com/course/practice-exams-google-professional-cloud-database-engineer/?couponCode=ST5MT020225BROW)
		- New｜[Google Professional Cloud Database Engineer - GCP - Exams](https://www.udemy.com/course/google-professional-cloud-database-engineer-exams/)
			- [返金方法](https://www.udemy.com/dashboard/purchase-history/)：Request a Refund 


	- Wizlab の無料問題だけ学習
		- [Free Test ](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-database-engineer/2556)
			- 3周目：73%
			- 
	- [x] 旧問題集
	- 1周目：2025/02/08 約50%
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3

	- 2周目：2025/02/12 約70%
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3

	- [x] 新問題集
	- 1周目：
		- [x] Practice Test I｜50
		- [x] Practice Test 2｜50
		- [x] Practice Test 3｜60
		- [x] Practice Test 4｜76%｜2025/03/06
		- [x] Practice Test 5｜75% 2025/03/06
		- [x] Practice Test 6｜70% 2025/03/05

	- 復習：2025/03/07
		- [x] Practice Test I
		- [x] Practice Test 2
		- [x] Practice Test 3
		- [x] Practice Test 4
		- [x] Practice Test 5
		- [x] Practice Test 6


	-  [公式模試](https://docs.google.com/forms/d/e/1FAIpQLSe55cAg8a3NzgV_QCJ2_F75NAyE44Z-XuVB6oPJXaWnI5UBIQ/viewform?hl=ja) にトライする
		- → 模擬試験について：問題集で網羅されているため以後不要
			- 100 %：2025/02/13
			- 95%：2025/03/02


- [ ] アーキテクチャーセンターの記事を読む
	- https://cloud.google.com/architecture/databases?hl=ja
		- [x] 2025/02/13
---

##### 苦手項目

[リードレプリカ](https://cloud.google.com/sql/docs/mysql/replication?hl=ja#read-replicas) Cloud SQL 
> リードレプリカを使用して Cloud SQL インスタンスから作業をオフロードします。リードレプリカとは、**プライマリ インスタンスの正確なコピー**です。プライマリ インスタンスのデータやその他の変更は、リードレプリカで**ほぼリアルタイムで更新**されます。
> **リードレプリカは読み取り専用**です。書き込みはできません。リードレプリカは、クエリ、読み取りリクエスト、アナリティクス トラフィックを処理し、**プライマリ インスタンスの負荷を低減します。**

[クエリタグでフィルタリングする](https://cloud.google.com/sql/docs/postgres/using-query-insights?hl=ja#filter_by_query_tags) cloud SQL
 >アプリケーションのトラブルシューティングを行うには、最初に [SQL クエリにタグを追加](https://cloud.google.com/sql/docs/postgres/using-query-insights?hl=ja#adding-tags-to-sql-queries)する必要があります。 

[データベースの保護：Terraform on Google Cloud](https://cloud.google.com/docs/terraform/best-practices/general-style-structure?hl=ja#stateful-resources)
> データベースなどのステートフル リソースの場合は、削除保護（**deletion_protection**）が有効になっていることを確認します。次に例を示します。

[Cloud SQL インスタンスの Recommender ](https://cloud.google.com/sql/docs/mysql/recommender-sql-overprovisioned?hl=ja)
> オーバープロビジョニングされた **Cloud SQL インスタンスの Recommender** は、30 日以上経過したプライマリ インスタンスの使用状況の指標を分析します。この Recommender は、インスタンスごとに過去 30 日間の特定の指標値に基づいて **CPU とメモリの使用率**を分析します。Recommender はリードレプリカを分析しません。

[MongoDB Atlas とは？](https://www.mongodb.com/ja-jp/docs/atlas/#what-is-service-fullname-)
> MongoDB Atlas は、MongoDB の構築に従事する人々が手掛ける**マルチクラウド データベース** サービスです。データベースの配置と管理を簡素化し、選択したクラウドプロバイダーで堅牢で高性能なグローバルアプリケーションを構築するために必要な柔軟性を提供します。 

現在（**進行中／実行中**）のオペレーションのステータスを確認（Cloud SQL）
> Google Cloud コンソールでは、オペレーションの完了時に成功または失敗のみが表示されます。警告やその他の情報を表示するように設計されていません。
> 特定の Cloud SQL インスタンスのすべてのオペレーションを確認するには、[**`gcloud sql operations list`** コマンド](https://cloud.google.com/sdk/gcloud/reference/sql/operations/list?hl=ja)を実行します。

[Database Migration Service（移行元の必要な設定）](https://cloud.google.com/database-migration/docs/postgres/configure-source-database?hl=ja#configure-your-source-instance-postgres)
> 移行元インスタンスに **`pglogical`** **パッケージをインストール**し、 [`shared_preload_libraries`](https://www.postgresql.org/docs/current/runtime-config-client.html) 変数に含まれていることを確認します

[デフォルトのリーダー リージョンを構成する](https://cloud.google.com/spanner/docs/instance-configurations?hl=ja#configure-leader-region)：Spanner
> データベースの**デフォルト リーダー リージョンの**場所を変更して、接続するクライアントに近づけることでアプリケーションの**レイテンシを短縮**

[Spanner から Avro にデータベースをエクスポートする](https://cloud.google.com/spanner/docs/export?hl=ja)
> エクスポート プロセスでは、**Dataflow を使用して**、Cloud Storage バケット内のフォルダにデータを書き込みます。処理後のフォルダには、一連の **Avro ファイル**と JSON マニフェスト ファイルが格納されます。

[ストレージの自動増量（automatic-storage-increase）を有効にする](https://cloud.google.com/sql/docs/mysql/instance-settings?hl=ja#automatic-storage-increase-2ndgen)（Cloud SQL）
> この設定を有効にすると、Cloud SQL によって利用可能な**ストレージが 30 秒ごと**にチェックされます。利用可能なストレージがしきい値サイズを下回ると、自動的にストレージ容量が追加されます。利用可能なストレージがしきい値サイズを繰り返し下回る場合、**最大 64 TB** に達するまで続けてストレージが追加されます。

[Firestore の概要](https://cloud.google.com/firestore/docs/overview?hl=ja)
> Firestore は、Firebase と Google Cloud からのモバイル、ウェブ、サーバー開発に対応した、柔軟でスケーラブルなデータベースです。 リアルタイム リスナーを介してクライアント アプリ間でデータを同期し、モバイルとウェブの**オフライン サポート**を提供します。これにより、ネットワーク **レイテンシやインターネット接続に関係なく機能する**レスポンシブ アプリを構築できます。


[Google Cloud に移行する: 大規模なデータセットを転送する ](https://cloud.google.com/architecture/migration-to-google-cloud-transferring-your-large-datasets?hl=ja)
> **データ転送の時間やメジャーパターンなど時間があれば一読すべきまとめ記事**

[高可用性について ](https://cloud.google.com/sql/docs/mysql/high-availability?hl=ja)（SQL：手軽／最適な可用性）
> HA 構成では、データの冗長性が確保されます。HA 向けに構成された Cloud SQL インスタンスはリージョン インスタンスとも呼ばれ、構成された**リージョン内**にプライマリ ゾーンとセカンダリ ゾーンがあります。*リージョン インスタンスはプライマリ インスタンスとスタンバイ インスタンスで構成されます。各ゾーンの永続ディスクへの[同期レプリケーション](https://cloud.google.com/compute/docs/disks?hl=ja#repds)により、トランザクションが commit されたとしてレポートされる前に、プライマリ インスタンスへの書き込みのすべてが両方のゾーンのディスクに複製されます。インスタンスまたはゾーンに障害が発生した場合、スタンバイ インスタンスが新しいプライマリ インスタンスになります。ユーザーは新しいプライマリに再転送されます。このプロセスは、**フェイルオーバー**と呼ばれます。
 

エクスポートのパフォーマンスへの影響を最小限に抑える（Cloud SQL）
> 1. **リードレプリカからエクスポート**を取得します。エクスポートを**頻繁に**（毎日またはそれ以上の頻度で）行う場合、エクスポートされる**データ量が少な**ければ、これが適切な選択肢になります。
> 2. **サーバーレス エクスポート**（Cloud SQL ServerLessエクスポート）を使用します。**大規模**なデータベースの **1 回限りのエクスポート**を作成する場合は、これが適切な選択肢になります。


[Google Cloud VMware Engine](https://cloud.google.com/vmware-engine/docs/overview?hl=ja)
> Google Cloud VMware Engine は、 Google Cloudで VMware プラットフォームを運用できるフルマネージド サービスです。VMware Engine では、クラウド消費モデルのメリットを享受し総所有コストを低減できるように、VMware 運用の継続性を実現します。


[デフォルトのメンテナンスの時間枠](https://cloud.google.com/sql/docs/mysql/maintenance?hl=ja#default-windows)：**Default maintenance windows**（Cloud SQL）
> インスタンスのトラフィック処理量が最も少ない時間帯（日曜日の深夜 0 時頃）にメンテナンスを行いたいと考えています。また、年末商戦の繁忙期はメンテナンスを避ける必要があります。この場合、本番環境のインスタンスのメンテナンスを次のように設定
> → **Cloud SQLでのメンテナンス時間の設定が可能**

[CMEKとCSEK](https://qiita.com/atsumjp/items/b872744d69686a1fc783)
> 顧客管理鍵(CMEK)による暗号化は、ユーザがCloud KMSを使用して鍵を管理します。  
> 顧客提供鍵(CSEK)による暗号化は、ユーザ自身が鍵を作成し管理します。
> - **CMEK**: Customer-Managed Encryption Keys
> - **CSEK**: Customer-Supplied Encryption Keys

[Query Insights](https://cloud.google.com/sql/docs/mysql/using-query-insights?hl=ja#introduction) ：Cloud SQL
> Query Insights では、Cloud SQL データベースに対する**クエリ パフォーマンス**の問題を検出、診断、防止できます。直感的なモニタリングをサポートし、検出するだけでなくパフォーマンスの問題の根本原因の特定に役立つ診断情報を提供します。


[Spanner : LIKE 非推奨](https://cloud.google.com/spanner/docs/sql-best-practices?hl=ja#param-like)
> Spanner はパラメータ化された LIKE パターンを実行時まで評価しないので、**すべての行を読み取って LIKE 式で評価し、一致しない行を除外しなければなりません**。
> LIKE パターンの形式が foo%（たとえば、固定文字列で始まり、単一のワイルドカード パーセントで終わる）で、列にインデックスが付けられている場合、**LIKE の代わりに** STARTS_WITH を使用します。このオプションを使用すると、Spanner はクエリ実行プランをより効果的に最適化できます。

[並列レプリケーションを構成する](https://cloud.google.com/sql/docs/mysql/replication/manage-replicas?hl=ja#configuring-parallel-replication)：Cloud SQL
> レプリケーション ラグは、リードレプリカの更新がプライマリ インスタンスの更新よりも遅れた場合に発生します。このセクションでは、ユーザーが**並列レプリケーションを有効にして、レプリケーション ラグを減らす**


[高可用性を有効または無効にする （Cloud SQL）](https://cloud.google.com/sql/docs/mysql/configure-ha?hl=ja#ha-existing)
> インスタンスの高可用性は、インスタンスを作成するときに構成することも、**既存のインスタンスで有効**にすることもできます。`gcloud sql instances patch INSTANCE_NAME \ ...`


[SSD ストレージと HDD ストレージを切り替える](https://cloud.google.com/sql/docs/mysql/choosing-ssd-hdd?hl=ja#switching)：Cloud SQL
> Cloud SQL インスタンスを作成した後は、そのインスタンスでの SSD ストレージまたは HDD ストレージの選択は**変更できません。**
> 既存の HDD インスタンスを SSD に（またはその逆に）変更する必要がある場合には、既存のインスタンスから**データをエクスポート**し、**新規インスタンスに**データをインポートします。インスタンス全体の移行には時間がかかります。

[HDD ストレージのユースケース](https://cloud.google.com/sql/docs/mysql/choosing-ssd-hdd?hl=ja#when-in-doubt-ssd)：Cloud SQL
> 10 TB 以上のデータを保存する予定である。
> ※ 大量のデータを保存しない限り、HDD によるコスト削減はごくわずかです。**10 TB 以上のデータを保存する場合以外**は、**HDD ストレージの使用を検討する必要はありません。**


[Rotate server CA certificates](https://cloud.google.com/sql/docs/mysql/manage-ssl-instance#rotate)：Cloud SQL
> - 新しいサーバーを作成します。
> - 新しいサーバーCA証明書情報をダウンロードします。
> - クライアントを更新して、新しいサーバーCA証明書情報を使用します。
> - アクティブな証明書を移動する回転を完了します 「前の」スロットは、新しく追加された証明書を アクティブな証明書。

[How to Achieve PostgreSQL High Availability with pgBouncer](https://severalnines.com/blog/how-achieve-postgresql-high-availability-pgbouncer/) : PostgreSQL
> データベース接続のプーリングにPGBouncerを使用することは、クラウドSQLプライマリと読み取りレプリカインスタンスの間にアプリケーション負荷を均等に配布し、データベースのパフォーマンスとリソースの利用を最適化するための適切な選択です

[マルチリージョン構成のパフォーマンスに関するベスト プラクティス](https://cloud.google.com/spanner/docs/instance-configurations?hl=ja#multi-region-best-practices)：Spanner
> 最適な書き込みレイテンシを実現するには、書き込みの多いワークロードのコンピューティング リソースをデフォルトのリーダー リージョン内またはその近くに配置します。

[Spanner から Avro にデータベースをエクスポートする](https://cloud.google.com/spanner/docs/export?hl=ja)
> REST API または Google Cloud CLI を使用して Spanner データベースをエクスポートするには、このページのはじめにの手順を完了し、Dataflow ドキュメントの Spanner to Cloud Storage Avro の詳細な手順を参照してください。エクスポート プロセスでは、**Dataflow** を使用して、Cloud Storage バケット内のフォルダにデータを書き込みます。処理後のフォルダには、一連の **Avro ファイル**と JSON マニフェスト ファイルが格納されます。

[パフォーマンスオーバーヘッドなしで Cloud SQL からデータをエクスポート](https://cloud.google.com/blog/products/databases/introducing-cloud-sql-serverless-exports?hl=en)
>  [Cloud SQL](https://cloud.google.com/sql/) ： [Serverless Exports](https://cloud.google.com/sql/docs/mysql/import-export/exporting#standard-offload)の新しい機能を起動しました。 ServerLessエクスポートを使用すると、PerformanceまたはRisksのリスクに影響を与えずに、MySQLおよびPostgreSQLデータベースインスタンスからデータをエクスポートできます。 


[ファイル システムとパーティションのサイズを変更する](https://cloud.google.com/compute/docs/disks/resize-persistent-disk?hl=ja#resize_partitions)：GCE
> 非ブート データディスク上のファイル システムのサイズを変更します。
> **ext4** を使用している場合は、**resize2fs** コマンドを使用してファイル システムを拡張します。
> `sudo resize2fs /dev/DEVICE_NAME`


[自動フェイルオーバー](https://cloud.google.com/bigtable/docs/failovers?hl=ja#automatic)：Bigtable
> アプリのプロファイルで複数クラスタ ルーティングを使用している場合、
> Bigtable は自動的にフェイルオーバーを処理します。最も近いクラスタがリクエストを処理できない場合、Bigtable は対応可能な最も近いクラスタにトラフィックをルーティングします。


[移行元インスタンスを構成する](https://cloud.google.com/database-migration/docs/postgres/configure-source-database?hl=ja#configure-your-source-instance-postgres)｜Database Migration Service  > PostgreSQL
> 移行元インスタンスに pglogical パッケージをインストールし、 shared_preload_libraries 変数に含まれていることを確認します。
> 環境の移行元インスタンスに pglogical パッケージをインストールするをご覧ください。

[メンテナンスの影響を最小限に抑える](https://cloud.google.com/sql/docs/mysql/maintenance?hl=ja#impact)：Cloud SQL
> 
> 接続の切断による影響を最小限に抑えるには、[接続プール](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=ja#pools)を使用します。プーラーとデータベースの間の接続はメンテナンス中に切断されますが、アプリケーションとプーラーの間の接続は保持されます。これにより、接続の再確立がアプリケーションに対して透過的になり、接続プーラーにオフロードされます。
> 長時間実行トランザクションの数を制限することで、トランザクションの失敗を減らすことができます。クエリを小さくして、より効率的に書き換えることで、メンテナンスのダウンタイムが短縮されるだけでなく、データベースのパフォーマンスと信頼性も向上します。
> 
> 接続の切断やトランザクション エラーから効率的に復旧するには、効率的に[データベース接続を管理](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=ja)します。[指数バックオフ](https://cloud.google.com/sql/docs/mysql/manage-connections?hl=ja#backoff)を使用して、アプリケーションと接続プーラーに接続とクエリの再試行ロジックを構築できます。クエリが失敗した場合、または接続が切断された場合、システムは再試行の前に待機期間を設定します。待機時間は、後続の再試行ごとに増加します。たとえば、最初の再試行ではシステムは数秒しか待機しませんが、4 回目の再試行では最大で 1 分間待機する場合があります。このパターンに従うことで、サービスに過大な負荷をかけることなく、これらの問題を確実に修正できます。
> 

[スキーマ更新のパフォーマンス](https://cloud.google.com/spanner/docs/schema-updates?hl=ja#performance)：Cloud Spanner
> Spanner の**スキーマの更新**には、**ダウンタイムは必要ありません**。DDL 文のバッチを Spanner データベースに対して発行した場合、Spanner が更新を[長時間実行オペレーション](https://cloud.google.com/spanner/docs/manage-long-running-operations?hl=ja)として適用する間も、中断なくデータベースでの書き込みと読み取りを続けることができます。


[クロスリージョン レプリカ](https://cloud.google.com/sql/docs/mysql/replication/cross-region-replicas?hl=ja#regional_migration)：Cloud SQL｜データ移行
> クロスリージョン レプリカを使用すると、最小限のダウンタイムでデータベースを別のリージョンに移行できます。通常は、別のリージョンにレプリカを作成し、レプリケーションが完了したらレプリカを昇格させ、新しく昇格したインスタンスにクライアントをリダイレクトします。

[ベアメタル向け Google Distributed Cloud](https://cloud.google.com/kubernetes-engine/distributed-cloud/bare-metal/docs/concepts/about-bare-metal?hl=ja#how_it_works)（GDC for bare metal ）
> Anthos clusters on bare metal は、ベアメタル向け Google Distributed Cloud（ソフトウェアのみ）になりました。詳細については、プロダクトの概要をご覧ください。
> 
> Google Distributed Cloud は、Google Cloud の**インフラストラクチャ**とサービスをお客様のデータセンター（**オンプレ**）に拡張する Google のソリューションです。Google Distributed Cloud は、Google 提供のハードウェア上で動作する接続された構成とエアギャップのある構成の両方で使用できます。


[外部サーバーにデータを移行する](https://cloud.google.com/sql/docs/mysql/migrate-data?hl=ja#migrating-to-external)｜Cloud SQL データ移行
> データのプライマリ コピーを Cloud SQL から**外部サーバー**に最小限のダウンタイムで移行するには、**外部サーバーを外部レプリカ**としてセットアップしてから、その外部サーバーのレプリカになるように Cloud SQL インスタンスを降格します。

[ポイントインタイム リカバリ](https://cloud.google.com/sql/docs/mysql/backup-recovery/pitr?hl=ja#log-storage-for-pitr)（PITR）を使用する ｜Cloud SQL
> Cloud SQL は PITR に**バイナリログを使用します**。
> 2023 年 8 月 11 日、Google は、PITR のトランザクション ログの Cloud Storage への保存を開始しました。今回のリリース以降、次の条件が適用されます。
> 

[Cloud Spanner ノード数](https://lp.cloudplatformonline.com/rs/808-GJW-314/images/Database_OnAir_q2_0409_Session.pdf) ノード数の変更設定
> 編集画面からノード数の変更するだけで設定変更完了
> ダウンタイムなしで変更可能

[exactly-once ストリーミング](https://cloud.google.com/dataflow/docs/concepts/exactly-once?hl=ja#processing)｜Dataflow｜トランザクション的処理
> 非確定的な処理を効果的に**確定的**な処理にするには、**チェックポインティング**を使用します。チェックポインティングを使用すると、変換からの各出力は、次のステージに配信される前に、一意の ID を持つ安定したストレージにチェックポイントが設定されます。Dataflow のシャッフル配信の再試行は、チェックポイントされた出力をリレーします。コードが複数回実行される場合でも、Dataflow は、それらの実行のうちの 1 つだけの出力が保存されるようにします。**Dataflow は整合性ストア**を使用して、安定したストレージへの書き込みが重複しないようにします。
> 

[デュアルリージョン クォーラムの可用性](https://cloud.google.com/spanner/docs/monitoring-console?hl=ja#charts-metrics)｜Cloud Spanner
> デュアルリージョン **クォーラム**の可用性（instance/dual_region_quorum_availability）は、**デュアルリージョン** インスタンス構成でのみ使用できます。デュアルリージョン クォーラムと各リージョンの単一リージョン クォーラムの 3 つのクォーラムの健全性のタイムラインが表示されます。
> グラフには、クォーラムの可用性プルダウンがあり、正常モードまたは中断モードのリージョンを確認できます。このグラフをエラー率とレイテンシの指標とともに使用すると、**リージョン障害が発生した場合に、セルフマネージド フェイルオーバーのタイミングを決定できます**。
> 

[Google Kubernetes Engine から Cloud SQL に接続](https://cloud.google.com/sql/docs/mysql/connect-kubernetes-engine?hl=ja)する｜GKE / Cloud SQL
> **Cloud SQL Auth Proxy** は、**sidecar パターン**で（Pod をアプリケーションと共有する追加のコンテナとして）動作させることをおすすめします。次のいくつかの理由から、これを個別のサービスとして実行するよりも、この方法をおすすめします。
> >SQL トラフィックがローカルで公開されないようにします。Cloud SQL Auth Proxy は送信接続を暗号化しますが、受信接続の公開を制限する必要があります。


[レプリケーション構成の例](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja)｜Bigtable
> このページでは、Bigtable レプリケーションの一般的なユースケースについて説明し、これらのユースケースをサポートするために使用できる設定を紹介します。
> - [バッチ分析ワークロードを他のアプリケーションから分離する](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja#batch-vs-serve)
> - [高可用性（HA）の作成](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja#high-availability)
> - [ほぼリアルタイムのバックアップを提供する](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja#backup)
> - [高可用性とリージョンの復元力を維持する](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja#regional-failover)
> - [ユーザーの近くにデータを保存する](https://cloud.google.com/bigtable/docs/replication-settings?hl=ja#near-users)





##### Cloud SQLにおけるHTTPステータスエラーを簡潔にまとめた表

| **HTTP ステータスエラー番号** | **エラーメッセージ**            | **場面/原因**                          |
| ------------------- | ----------------------- | ---------------------------------- |
| **400**             | `Bad Request`           | リクエストの形式が不正（例: 必要なパラメータ不足、無効な値）    |
| **401**             | `Unauthorized`          | 認証情報無効、アクセス権限が不足している場合             |
| **403**             | `Forbidden`             | アクセス権限がない、IAM設定によりアクセス拒否される場合      |
| **404**             | `Not Found`             | 指定したリソースが存在しない場合（例: 不正なリソースID）     |
| **409**             | `Conflict`              | リソースの競合、インスタンス作成時の競合など             |
| **429**             | `Too Many Requests`     | APIリクエストが制限を超えた場合（リクエスト過多）         |
| **500**             | `Internal Server Error` | サーバ側で予期しないエラーが発生した場合               |
| **502**             | `Bad Gateway`           | ゲートウェイまたはプロキシでエラーが発生した場合           |
| **503**             | `Service Unavailable`   | サービス停止中やメンテナンス中、サーバが一時的に使用不可       |
| **504**             | `Gateway Timeout`       | リクエストがタイムアウトした場合（例: 長時間待機後にタイムアウト） |


---

#### 受験当日のTODO（PSE / PNE / PDE / PCA 受験時の成功事例） ⭐️

前日
- [x] しっかり寝る
    - アイマスク、耳栓、枕のセッティング
- [x] 当日
- 9時までに起きる（疲労が回復していることが重要）
- [x] カフェで試験前の確認を実施
    - [x] 気分的にドトール大通り店
	    -  [公式模試](https://docs.google.com/forms/d/e/1FAIpQLSe55cAg8a3NzgV_QCJ2_F75NAyE44Z-XuVB6oPJXaWnI5UBIQ/viewform?hl=ja) の間違った問題を復習
	    - [x] 苦手項目の復習
	    - 問題集で間違った問題の復習
	    - その他、重要記事を読書

- [x] 14:00 にカフェを出る

- 受験メールを印刷する
	- [x] アプリにメールを転送

- 会場到着前に仮眠を10分程度取り、十分に脳をリフレッシュさせる
	- 糖分も十分にとる

- 15時00分（テスト開始の30分前）には会場に到着して受付を完了させる
	- [x] 選択肢から読むことを意識する
	- [x] 見直しの時間を確保するよう意識する
