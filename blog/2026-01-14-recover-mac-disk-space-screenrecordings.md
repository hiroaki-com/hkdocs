---
title: M1 Macのストレージ空き容量を109GB確保した話｜ScreenRecordingsフォルダの整理
authors: [hk]
tags: [mac, storage, terminal, cleanup, maintenance, macOS, screen recording, ディスク容量, メンテナンス, Mac重い, パソコン重い]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" />


![システム設定のストレージ画面](/img/mac_storage_settings_cleanup.png)

### 1. はじめに

愛用しているMacbookの動作は快適そのものですが、ふと「見えないところに不要なファイルや設定が溜まっていないか？」と気になり、ターミナルを使ってシステムのチェックを行いました。

セキュリティ面は問題ありませんでしたが、ストレージに関しては気になる点が見つかりました。
システム設定からは見えにくい、ある一つの隠しフォルダが`109GB`もの容量を使用していたのです。

本記事では、このストレージ圧迫の原因を特定した経緯と、Macの空き容量を確保した際の手順を記録として残します。

<!-- truncate -->

![システム設定のストレージ画面](/img/mac_storage_settings_cleanup.png)


### 2. 検証環境

| 項目 | 詳細 |
| :--- | :--- |
| **機種** | MacBook Air (M1, 2020) |
| **OS** | macOS Sequoia 15.1 |

### 3. 発見の経緯：ターミナルでのシステム診断

#### ステップ1：セキュリティチェック
最初は容量確保ではなく、不審なプロセスがないかの確認が目的でした。ターミナルで以下の項目をチェックしました。

*   起動時に自動実行されるプログラム（`LaunchAgents`）
*   CPUを異常に消費しているプロセス
*   ブラウザの不明な拡張機能

**実行したコマンド例:**
```zsh
ls -la ~/Library/LaunchAgents /Library/LaunchAgents /Library/LaunchDaemons
```

結果として、開発ツールやブラウザのプロファイルなどは多数ありましたが、不審なプログラムの痕跡はなく、システムはクリーンな状態でした。

#### ステップ2：ストレージの深掘り診断
次に、GUIの「ストレージ管理」画面では詳細が分かりにくいライブラリフォルダ等を対象に、容量を消費しているフォルダTOP20を表示してみました。

```zsh
du -sh ~/Library/* 2>/dev/null | sort -hr | head -20
```

すると、予想外の結果が表示されました。

```text
109G    /Users/[username]/Library/ScreenRecordings
7.5G    /Users/[username]/Library/Application Support
9.9G    /Users/[username]/Library/Containers
...
```

「ScreenRecordings」だけで109GB。
ディスク全体の約4分の1を、この1つのフォルダが占有していました。

### 4. 原因：録画データの「一時ファイル」

`~/Library/ScreenRecordings` というパスを見て、中身を確認してみました。

```zsh
open ~/Library/ScreenRecordings
```

フォルダ内には、30GB〜40GBほどの動画ファイルが3つ残っていました。

#### なぜこんな場所に？
中身を確認したところ、これは前職時代に行っていたミーティングの録画データでした。当時は業務上の必要から頻繁に画面収録機能を使って会議を記録していたのですが、保存した覚えのないデータが含まれていました。

調べてみると、このフォルダはmacOSが画面収録を行う際の「一時保存場所」のようです。通常は録画停止後にデスクトップなどの指定場所へ保存されますが、以下のようなケースでは移動されずに残ってしまうことがあるようです。

*   録画中にアプリやOSが強制終了した
*   保存処理が完了する前にMacを閉じてしまった
*   長時間録画を行い、書き出し処理が正常に終わらなかった

どうやら、会議の録画後に何らかの理由で保存プロセスが完了せず、一時ファイルとしてひっそりと残り続けていたようです。

### 5. 解決策と結果

#### 手順：不要ファイルの削除
中身をプレビューして、すでに不要となった古い録画データであることを確認した後、Finderから削除しました。
また、念のため `tmutil` コマンドで古いTime Machineのローカルスナップショットも整理しました。

#### クリーンアップ結果

**Before:**
ストレージ使用量：システムデータ等が圧迫し、空き容量に余裕がない状態。

**After:**
```text
Filesystem     Size   Used   Avail Capacity
/dev/disk3s1s1 460Gi  15Gi   366Gi      4%
```

空き容量：366GB (使用率わずか4%)

不要な3つのファイルを削除しただけで100GB以上の空きが生まれ、ストレージ環境が大幅に改善されました。

### まとめ

「Macの容量がなんとなく足りないけれど、大きなファイルが見当たらない」という方は、通常のドキュメントフォルダだけでなく、ライブラリ内の隠しフォルダも確認してみる価値があります。

*   チェックすべき場所: `~/Library/ScreenRecordings`
*   確認方法: Finderのメニュー「移動」>「フォルダへ移動」に上記パスを入力

特に、私のように仕事やプライベートで画面収録をよく利用される方は、保存し損ねた一時ファイルが残っている可能性があります。
ターミナルでの操作に抵抗がある方でも、このフォルダのチェックだけなら簡単に行えますので、一度確認してみてはいかがでしょうか。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />
