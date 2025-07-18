---
title: Artifact Registryの古いDockerイメージを自動削除してコスト節約
authors: [hk]
tags: [google cloud, artifact registry, cloud run, docker, cost-optimization]
---

### Artifact Registryで膨らむストレージ料金への対策

GitHub ActionsなどでCI/CDを組み、Google Cloud Runへデプロイする運用。その実行のたびに、新しいDockerイメージがArtifact Registryにプッシュされていく。これは非常に便利な仕組みである一方、何もしなければ古いイメージは溜まる一方。「**気づいたらストレージ料金が想定より高い…**」そんな経験はありませんか？

本記事では、この問題を解決するため、Artifact Registryの「**クリーンアップポリシー**」機能の活用法の紹介。不要になった古いDockerイメージを自動で削除し、ストレージコストを継続的に最適化する手順の、備忘録としての整理します。

*本記事は、Google Cloud Consoleの2025年7月時点のUIを元に解説。*

<!-- truncate -->

### 1. 方針の検討と決定

まず、どのような方針でクリーンアップを行うかの検討。今回は、代表的な3つのパターンを比較。

**1. タグなしイメージのみ削除**
CI/CDのビルド過程で生まれる中間生成物など、タグが付いていないイメージのみを削除する方法。過去のバージョンはすべて残るため安全だが、コスト削減効果は限定的。

**2. 期間ベースで古いイメージを削除**
「作成から90日以上経過したイメージ」のように期間を区切って削除するのはシンプルだが、アクティブな開発が続くと、必要な過去バージョンまで消えてしまうリスク。

**3. 最新Nバージョンを保持し、他を削除**
ロールバックなどを考慮して直近のバージョンは残しつつ、それより古いものを機械的に削除するため、安全性とコスト削減のバランスが最も良いと判断。

今回は3つ目の方針、「**最新の10バージョンは常に保持し、それ以外は削除する**」という方針の採用。

### 2. 設定の仕組み

この設定は、以下の2つのルールを組み合わせることで実現。

1.  **削除ポリシー:** まず、**すべてのイメージを削除の対象**として大胆に指定。
2.  **保持ポリシー:** 次に、削除対象の中から**「最新の10バージョン」を例外として削除対象から除外**。

Artifact Registryでは保持ポリシーが優先されるため、この2つのルールを組み合わせることで、安全に古いイメージだけをクリーンアップできるという仕組み。

### 3. 設定の具体的な手順

実際のコンソール画面に沿った手順。

まず、[Google Cloud Console](https://console.cloud.google.com/) にログインし、ナビゲーションメニューから**「Artifact Registry」**を選択。リポジトリの一覧が表示されたら、クリーンアップを設定したいリポジトリをクリック。

リポジトリの詳細画面に移動したら、上部にある**「リポジトリを編集 (`EDIT REPOSITORY`)」**タブをクリックし、**「ポリシーを編集 (`EDIT POLICIES`)」**ボタンを押して設定画面を開く。


ここからが設定の重要。2つのポリシーの順番通りの作成。

**ポリシー①：すべてのイメージを削除対象に**

「**クリーンアップポリシーを追加 (`ADD CLEANUP POLICY`)**」をクリックし、**ポリシータイプ (`Policy type`)** で **条件付き削除 (`Conditional deletion`)** を選択。条件として **タグの状態 (`Tag state`)** を **任意のタグの状態 (`Any tag state`)** に設定するだけで、他は変更不要。「**完了 (`DONE`)**」をクリックして保存。

![cleanup_policy](/img/cleanup_policy_1.png)


**ポリシー②：最新10バージョンを保護**

続けて、「**クリーンアップポリシーを追加 (`ADD CLEANUP POLICY`)**」を再度クリック。今度は **ポリシータイプ (`Policy type`)** で **最新バージョンを保持 (`Keep most recent versions`)** を選択。**保持する最新バージョンの数 (`Number of recent versions to keep`)** に`10`と入力し、「**完了 (`DONE`)**」をクリック。

![cleanup_policy](/img/cleanup_policy_2.png)

これで、「すべてのイメージを対象に、最新の10個だけは保持する」というルールの完成です。

最後に、設定の保存と有効化。

ここでいきなり有効化するのではなく、まずはポリシーの実行モードで**「ドライラン (`Dry run`)」**の選択を強く推奨。このモードでは、実際に削除は行われず、どのイメージが削除対象になるかを安全に確認可能。

ドライランで意図した通りのイメージが削除対象になっていることを確認後、再度この画面に戻り、実行モードを**「アーティファクトを削除 (`Delete artifacts`)」**に変更して**「保存 (`SAVE`)」**。

これで設定は完了。以降、バックグラウンドで定期的にジョブが実行され、古いイメージは自動的に削除。

### 4. 参考：その他の設定パターン

今回採用しなかったパターンの設定方法も簡潔に紹介。

**タグなしイメージのみを削除する場合（方針A）**
この設定は、ポリシーを1つ作成するだけで完結。**ポリシータイプ (`Policy type`)** で **条件付き削除 (`Conditional deletion`)** を選択し、**タグの状態 (`Tag state`)** を **タグなし (`Untagged`)** に設定。

**特定期間より古いイメージを削除する場合（方針B）**
これもポリシー1つで対応可能。**ポリシータイプ (`Policy type`)** で **条件付き削除 (`Conditional deletion`)** を選択し、**次の期間より前にアップロードされたパッケージ (`Packages uploaded before`)** に `90` 日などを設定。

### 5. まとめ

今回は、Artifact Registryのクリーンアップポリシーを活用し、不要なDockerイメージを自動で削除することで、ストレージコストを節約する方法の紹介。

一度設定してしまえば、あとは放置できるため、CI/CDパイプラインを運用するすべての開発者にとって、必須の作業と言える。ぜひ、自身のプロジェクトでもお試しを。
