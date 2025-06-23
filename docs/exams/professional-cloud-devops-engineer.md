---
sidebar_position: 6
title: Professional Cloud DevOps Engineer
last_update:
  date: 2025-06-10
tags: [google cloud, 認定資格, 合格記]
---

**🌸 合格：2025年03月30日**

---
### 合格記

2025/03/30 受験し無事合格。ダブルヘッダーの洗礼を受けつつも乗り越える
```
## 試験概要
- 出題50問、50分程度で1周完了し、10分で見直して提出
- 9割は行ったと想像

## 試験の感想
- Udemyのコースの問題がそのまま出る or SREについて理解していれば即答の問題がほとんど
- アーキテクトやその他試験の浅い問題もあったのかもしれないが基礎的な問題がほとんど
- 前半簡単だったが、後半少し不安な箇所もあったので過去問題がたまたま出たという可能性も否めない


## 出題されたトピック
- [エージェント ポリシー] → 2回程度出題され、あまり理解していい無いことを自覚
- プライベートプール
- Cloud Build 全般
- SREの基礎的な思想全般
- IAM関連／GKEサービスアカウント関連 少々
- SRIの余裕を持った数値定義の問題（50→60/100→110...）

```

---

### 受験情報 2025 年 3 月 30 日 → 🌸合格🌸

試験名: Professional Cloud DevOps Engineer
- 日付: 2025 年 03 月 30 日
- 時刻: 03:45 PM

---
#### 受験当日のTODO（PSE / PNE / PDE / PCA 受験時の成功事例） ⭐️

前日
- [x] しっかり寝る
    - アイマスク、耳栓、枕のセッティング
- 当日
- [ ] 9時までに起きる（疲労が回復していることが重要）
	- [x] → 11時
- [x] カフェで試験前の確認を実施
    - 気分的にドトール大通り店
	    - [ ]  [公式模試](https://docs.google.com/forms/d/e/1FAIpQLSe55cAg8a3NzgV_QCJ2_F75NAyE44Z-XuVB6oPJXaWnI5UBIQ/viewform?hl=ja) の間違った問題を復習
	    - 苦手項目の復習
	    - [x] 問題集で間違った問題の復習
	    - [x] その他、重要記事を読書

- 14:00 にカフェを出る

- [x] 受験メールを印刷する
	- アプリにメールを転送

- [x] 会場到着前に仮眠を10分程度取り、十分に脳をリフレッシュさせる
	- [x] 糖分も十分にとる

- [x] 15時00分（テスト開始の30分前）には会場に到着して受付を完了させる
	- 選択肢から読むことを意識する
	- 見直しの時間を確保するよう意識する


---

### 🔥受験に向けた戦略🔥

- 公式の参考資料を読む
	- [認定試験一覧](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)

##### 学習戦略：

- 重要資料
	- [公式](https://cloud.google.com/learn/certification/cloud-devops-engineer/)
	- 💡[SRE Book Updates, by Topic](https://sre.google/resources/book-update/)｜Google SRE の 書籍３冊含むまとめ資料が無料で読めるので必読
		- [sre.google/books](http://sre.google/books)｜3冊をオンラインで無料に読める
	- [ビルドを高速化する際のベスト プラクティス](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=ja#caching_directories_with_google_cloud_storage%20%20https://cloud.google.com/build/docs/speeding-up-builds)


- 問題集
	- [Wizlab](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-cloud-devops-engineer/385/pt) の無料問題：Free Test だけ学習
		- [ ] 1周目：2025/03/24｜73%
		- [ ] 2周目：

	-  [Udemy](https://www.udemy.com/course/google-professional-cloud-devops-engineer-practice-exam-test/)問題集
	- 1周目：
		- [x] Practice Test I｜2025/03/23｜52%
		- [x] Practice Test 2｜2025/03/27｜53%
		- [x] Practice Test 3｜2025/03/25｜43%

	- 復習：
		- [ ] Practice Test I｜｜
		- [ ] Practice Test 2｜｜
		- [ ] Practice Test 3｜｜

	- 2周目：
		- [x] Practice Test I｜2025/03/28｜73%
		- [x] Practice Test 2｜2025/03/29｜81%
		- [x] Practice Test 3｜2025/03/29｜72%


	- [模擬試験](https://docs.google.com/forms/d/e/1FAIpQLSdpk564uiDvdnqqyPoVjgpBp0TEtgScSFuDV7YQvRSumwUyoQ/viewform)
		- [ ] 2025/03/24｜70%
			- Question 12 - 問題集と模擬試験の回答が違う可能性あり
		- [ ] ｜｜


- 暇があれば、Google SRE の記事を読む
	- [ ] [SRE Book Updates, by Topic](https://sre.google/resources/book-update/)

---

##### 苦手項目

[プライベート プール](https://cloud.google.com/build/docs/private-pools/private-pools-overview?hl=ja#overview_of_default_pools_and_private_pools)の概要｜Cloud Build
>**プライベート プール**は、**プライベート ネットワーク内のリソースへのアクセス**など、ビルド環境のカスタマイズを強化するワーカーのプライベート専用プールです。デフォルト プールと同様に、プライベート プールも Cloud Build によってホスト、フルマネージドされ、ゼロまでスケールアップまたはスケールダウンできます。インフラストラクチャの設定、アップグレード、スケーリングは不要です。プライベート プールはお客様固有のリソースであるため、さまざまな方法で構成できます。

[キャッシュされた Docker イメージ](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=ja#using_a_cached_docker_image)の使用｜Cloud Build 
> Docker イメージビルドの速度を上げる最も簡単な方法は、後続のビルドに使用できるようにキャッシュ イメージを指定することです。ビルド構成ファイルに **`--cache-from`** 引数を追加すると、キャッシュされたイメージを指定できます。これにより、Docker はこのイメージをキャッシュ ソースとしてビルドします。

[Google Cloud Storage でのディレクトリの](https://cloud.google.com/build/docs/optimize-builds/speeding-up-builds?hl=ja#caching_directories_with_google_cloud_storage)キャッシュ｜Cloud Build 
>ビルドの速度を上げるには、以前のビルドの結果を再利用します。以前のビルドの結果を **Google Cloud Storage バケットにコピーし、その結果から計算を行い、新しい結果をコピーしてバケットに戻す**ことができます。ビルドに時間がかかるときに、生成されるファイル数が少なく、Google Cloud Storage とのコピーに時間がかからない場合は、この方法を使用します。
>
>Docker ビルド専用の **`--cache-from`** とは異なり、Google Cloud Storage のキャッシュは、[Cloud Build でサポートされているすべてのビルダー](https://github.com/GoogleCloudPlatform/cloud-builders)で使用できます。

テスト（移行）に[別の組織](https://cloud.google.com/architecture/identity/best-practices-for-planning?hl=ja#use_a_separate_organization_for_experimenting)を使用する｜組織
>実験的なアクティビティを行うには、**サンドボックス環境として別の組織**を使用します。別の組織を使用することで、本番環境の組織で使用しているポリシー、構成、自動化の制約を受けずに作業を行うことができます。
>
> テストには[ステージング組織](https://cloud.google.com/architecture/identity/best-practices-for-planning?hl=ja#use_a_separate_staging_organization)を**使用しないで**ください。ステージング環境では、本番環境の組織と同様の IAM ポリシーと組織のポリシーを使用する必要があります。そのため、ステージング環境に本番環境と同じ制限が適用される可能性があります。同時に、テストを許可するためにポリシーを緩和すると、ステージング組織の目的が損なわれます。


[images](https://cloud.google.com/build/docs/build-config-file-schema?hl=ja#images)｜Cloud Build 
> ビルド構成ファイルの **`images` フィールド**には、Cloud Build が Artifact Registry または Container Registry に push する 1 つ以上の Linux **Docker イメージ**を指定します。Linux Docker イメージを生成せずにタスクを実行するビルドがあるかもしれませんが、イメージをビルドしてレジストリにプッシュしない場合、イメージはビルド完了時に破棄されます。指定されたイメージがビルド時に生成されない場合、ビルドは失敗します。 イメージの保存の詳細については、[Artifact Registry にアーティファクトを保存する](https://cloud.google.com/build/docs/building/store-artifacts-in-artifact-registry?hl=ja)をご覧ください。


[artifacts](https://cloud.google.com/build/docs/build-config-file-schema?hl=ja#artifacts)｜Cloud Build 
> ビルド構成ファイルの **`artifacts` フィールド**には、Cloud Storage に保存する 1 つ以上の**コンテナ以外**のアーティファクトを指定します。コンテナ以外のアーティファクトを保存する詳細については、[Cloud Storage へのビルド アーティファクトの保存](https://cloud.google.com/build/docs/building/store-artifacts-in-cloud-storage?hl=ja)をご覧ください。

[セカンダリ サンプリング レート](https://cloud.google.com/vpc/docs/flow-logs?hl=ja#log-sampling)｜VPC Flow Logs
 > - VM の場合、**デフォルトではログエントリの 50%** が保持されます。このパラメータは **`1.0`（100%、すべてのログエントリを保持）から `0.0`（0%、ログを保持しない）の範囲**で設定できます。
> - VLAN アタッチメントと Cloud VPN トンネルの場合、デフォルトではログエントリの 100% が保持されます。このパラメータは、`1.0` から `0.0` より大きい値の範囲で設定できます。

 [エージェント ポリシー](https://cloud.google.com/stackdriver/docs/solutions/agents/ops-agent/managing-agent-policies?hl=ja)｜Google Cloud CLI
> エージェント ポリシーの作成と管理は、**Google Cloud CLI** の gcloud beta compute instances ops-agents policies コマンド グループまたは agent-policy Terraform モジュールを使用して行います。エージェント ポリシーは、Compute Engine の VM Manager ツールスイートを使用して **OS ポリシーを管理**します。このポリシーでは、Google Cloud Observability エージェント（Ops エージェント、従来の Monitoring エージェント、従来の Logging エージェント）などのソフトウェア構成のデプロイとメンテナンスを自動化できます。>


[Cloud Storage バケットに状態を保存するように Terraform](https://cloud.google.com/docs/terraform/resource-management/managing-infrastructure-as-code?hl=ja#configuring_terraform_to_store_state_in_a_cloud_storage_bucket) を構成｜Terraform
> デフォルトでは、Terraform はローカルの `terraform.tfstate` という名前のファイルに状態を保存します。多くのユーザーが Terraform を同時に実行していて、各マシンが現在のインフラストラクチャを独自に理解している場合は特に、このデフォルト構成が原因でチームでの Terraform の使用が難しくなる場合があります。
>
> このような問題を回避するために、このセクションでは、**Cloud Storage バケットを指すリモート状態を構成**します。リモート状態はバックエンドの機能であり、このチュートリアルでは、backend.tf ファイルで構成されます。次に例を示します。

[IAM Conditions の概要](https://cloud.google.com/iam/docs/conditions-overview?hl=ja#example-date-time)｜IAMの条件指定
> 日時式の例
	ロール バインディングで次の条件式を使用すると、2021 年 1 月 1 日の午前 0 時までアクセスが許可されます。

[Packer](https://cloud.google.com/build/docs/building/build-vm-images-with-packer?hl=ja#yaml) を使用した VM イメージのビルド｜Cloud Build
> Packer は、単一のソース構成から**複数のプラットフォーム向け**に同じ仮想マシン（VM）イメージを作成するオープンソース ツールです。このページでは、Packer と Cloud Build によって Compute Engine で使用する VM イメージを作成する方法について説明します。

[Triggering on Pub/Sub Messages](https://spinnaker.io/docs/guides/user/pipeline/triggers/pubsub/)｜Spinnaker
> Pub/SubとSpinnakerがコラボされていることを認識


[create_before_destroy](https://developer.hashicorp.com/terraform/language/meta-arguments/lifecycle#create_before_destroy)｜Terraform
> create_before_destroy (bool) - デフォルトでは、TerraformがリモートAPIの制限によりインプレースで更新できないリソース引数を変更する必要がある場合、Terraformは既存のオブジェクトを削除し、その後、新しい設定済み引数で新しい置き換えオブジェクトを作成します。
> 
> create_before_destroyメタ引数はこの動作を変更し、置き換えオブジェクトが最初に作成され、その後に元のオブジェクトが削除されるようにします。


---

##### HTTP ステータスエラー番号 一覧

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



---
UdemyのInvalid URLs レポート　2025/03/29 報告完了

Practice Test 2: 
Still Invalid URLs References
```
You oversee an application operating within Google Kubernetes Engine (GKE) and employing the blue/green deployment approach. Portions of the Kubernetes manifests are provided below: ...
```

Practice Test 2: 
以下、正解の選択肢が間違っている
```
Your organization aims to elevate the availability target of an application from 99.9% to 99.99% with a $2,000 investment. ...
```
