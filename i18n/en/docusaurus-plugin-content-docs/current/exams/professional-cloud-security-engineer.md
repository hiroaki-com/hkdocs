---
sidebar_position: 8
title: Professional Cloud Security Engineer
tags: [google cloud, 認定資格, 合格記]
---

**🌸 合格：2025年01月17日**

**試験概要：**
- https://cloud.google.com/learn/certification/cloud-security-engineer?hl=ja
- [認定試験一覧](https://cloud.google.com/blog/topics/training-certifications/which-google-cloud-certification-exam-should-you-take?hl=en)


### 受験後回想メモ

**感想：**
```
感想：
難しかった。
基本的には、ドキュメントベースの問題なのだけれども、模擬試験よりは確実に応用的な問題であり
問題集（インド）と同様の問題はほとんどなかったと想像される。
論理的な思考力により選択式問題特有のテクニックを使用しなければいけない問題が多かった
ネットワーク構造やクラウドアーキテクト的な問題も多かったような印象だった。

客観的なメモ：
問題数：40問　と少ないこともプレッシャーとなった
時間：70分／120分 程度で一周し一応見直しもできた
```

##### 出題傾向：
```
**マイニング検出:**

- Google Cloudでは、暗号通貨マイニングの検出と防止のためのベストプラクティスが提供されています。これには、異常なCPU使用率やネットワークトラフィックの監視、リソースの自動スケーリングの設定、IAMポリシーの強化などが含まれます。
    
- 参考: [Google Cloudの暗号通貨マイニング検出ベストプラクティス](https://cloud.google.com/security-command-center/docs/cryptomining-detection-best-practices?hl=ja)
    

---

**IAMの時間制御:**

- Cloud Schedulerを使用して、指定した日時や間隔でHTTPリクエストを発行し、Cloud RunやCloud Functionsを自動的に呼び出すことができます。これにより、特定の時間帯にのみアクセス権を付与するなど、時間ベースのアクセス制御が可能となります。
    
- ポイント:
    
    - Cloud Schedulerの再試行設定により、実行失敗時のリトライも簡単に制御できます。
        
    - IAMロールの付与や削除など、アクセス権の管理をプログラムで実装可能です。
        

---

**外部キー管理に関する問題:**

- リージョンまたはプロジェクトの原因特定:
    
    - 外部キーに限らず、リージョン要件が重要です。例えば、Cloud KMSのキーは特定のリージョンに関連付けられており、異なるリージョンでの使用は制限されることがあります。
        
    - 参考: [Cloud KMSのロケーションに関するドキュメント](https://cloud.google.com/kms/docs/locations?hl=ja)
        
- DLPのデータ秘匿化手法:
    
    - ハッシュ化は、データを一方向に変換し、復号不可にする手法です。これにより、元のデータを復元できなくなります。
        
    - 注意: 確定的暗号化は、同じ入力に対して常に同じ出力を生成するため、復号可能ですが、ハッシュ化とは異なります。
        

---

**Container Registry（Artifact Registry）の機能:**

- Artifact Registryは、Container Registryの後継として、コンテナイメージやその他のパッケージの管理を提供します。脆弱性スキャンやモニタリング機能が統合されています。
    
- ポイント:
    
    - Artifact RegistryのArtifact Analysisで脆弱性スキャンを実施できます。
        
    - モニタリング機能は、Cloud Security Command Center (SCC)やGoogle Cloud Monitoringを使用して実装します。
        

---

**Cloud Security Command Center (SCC) のユースケース:**

- SCCは、Google Cloud環境のセキュリティ状態を可視化し、リスクを管理するための統合プラットフォームです。
    
- ユースケース:
    
    - 脆弱性検出: リソースの誤設定や公開されている資格情報、既知のリスクを発見し、修正します。
        
    - 脅威検出と軽減: マルウェア、暗号通貨マイナー、コンテナランタイム攻撃、DDoS攻撃などのアクティブな脅威を検出し、対応します。
        
    - ポスチャーとポリシー: セキュリティポスチャーを定義・展開し、設定の逸脱を監視・修正します。
        
    - データ管理: セキュリティコマンドセンターのデータの保存と処理を特定のリージョンに制限し、データの居住性を確保します。
        
    - 統合: BigQueryやPub/Subへのエクスポートを通じて、外部のセキュリティシステムと連携します。
        
- 参考: [Security Command Centerの概要](https://cloud.google.com/security-command-center/docs/security-command-center-overview)
    

---

**模擬試験問題の出題事例:**

- 問題: ある小売企業が、eコマースサイト（POSアプリケーションを含む）をGoogle Cloudに移行しようとしています。この場合に遵守する必要があるコンプライアンス標準はどれですか？
    
    - A. FedRAMP High
        
    - B. HIPAA
        
    - C. SOX
        
    - D. PCI DSS（正解）
        

- Security Command Center
- Cloud NGFW
- Shielded VM・Confidential VM・Binary Authorization  
- Cloud Certificate Authority Service


---
```



### 受験情報 2025 年 1 月 17 日

**試験名: Google Cloud Certified - Professional Cloud Security Engineer (Japanese)**
**試験日時: 17 January 2025 1530H**
**北区北7条西5丁目8-1 北7条ヨシヤビル4階**

準備：
- 政府発行の運転免許証
- クレジット カード
### 🔥受験に向けた戦略🔥
 
- [whizlabs.com](https://www.whizlabs.com/learn/course/google-cloud-certified-professional-cloud-security-engineer/301) をマスターする
	- １周完了：2025/01/14
	- ２周完了：2025/01/17
- [模擬試験](https://docs.google.com/forms/d/e/1FAIpQLSf4ADmZr8WnDZjIK6dWvRTel2VmsP0fJtONy6UOFjWZHe-MpQ/viewform?hl=ja) の実施
	-  91%：2025/01/14
- 可能な限りのWeb記事
	- [cloud architecture center](https://cloud.google.com/architecture?hl=ja)
- Google Cloud の画面

### 苦手項目

初見項目
- [Assured Workloads とは](https://cloud.google.com/assured-workloads/docs/overview?hl=ja)
- [SSL ポリシーの定義](https://cloud.google.com/load-balancing/docs/ssl-policies-concepts?hl=ja#defining_an_ssl_policy)
- [Google API に接続する](https://cloud.google.com/vpc/docs/private-access-options?hl=ja#connect-google-apis)
- [Workload Identity 連携](https://cloud.google.com/iam/docs/workload-identity-federation?hl=ja)
- [FWの優先度](https://cloud.google.com/firewall/docs/firewalls?hl=ja#priority_order_for_firewall_rules) - 初期優先度：1000
- VPCフローログの適用単位はVPC（サブネットよりもベター）

---

### 問題集作成用プロンプトメモ

##### 応用問題生成のTIPS

2024/12/14 

**模試の改善：**
模擬試験を公式サイトからコピーして、テキストファイルで保存
↓
GPTs へ登録して、フォーマットを整理
↓
Gemini（studio）へSystemプロンプトを設定の上、順次改善していく

**基礎問題の改善：**
GPTs で試験範囲に準じた基礎問題集を生成する
↓
Gemini（studio）へSystemプロンプトを設定の上、順次応用問題に改善していく