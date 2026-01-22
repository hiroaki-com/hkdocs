---
title: Google Colab を GitHub 連携するための手順
authors: [hk]
tags: [google-colab, github, vscode, git, python, development]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" />


Google Colabで作成したPythonコードを、MacBookのVSCodeとGitHubを使って本格的な開発フローに移行するための実践的な手順を解説します。これまでColab上でのみ開発を行っていた方が、GitHubでのバージョン管理とローカルVSCodeでの快適な編集環境を構築し、より効率的な開発体制を整えるための具体的なステップを紹介します。

- **リポジトリの準備**: GitHub上での受け入れ環境の構築
- **初回連携**: ColabからGitHubへの安全なコード移行
- **ローカル環境**: VSCodeでの編集環境セットアップ
- **運用ワークフロー**: 日常的な開発サイクルの確立

<!-- truncate -->

## 現在の状況と目標

**現在の状況**
- コードはGoogle Colab上にのみ存在（.ipynbファイル）
- GitHubにプライベートリポジトリが用意済み
- ローカル環境にはコードが存在しない
- Gitによるバージョン管理は未実施

**目標**
- GitHubでコードの変更履歴を管理
- MacBook/VSCodeでの快適な編集環境
- Google Colabでのスムーズな動作確認

## 1. GitHubリポジトリの準備

Colabからの保存を受け入れるため、リポジトリにmainブランチを作成します。

1. GitHubリポジトリを開く
2. READMEファイルを作成
   - 「Create a new file」または「Add a README file」をクリック
   - README.mdを作成することで、mainブランチが自動生成されます

## 2. ColabからGitHubへの初回保存

1. Colabでノートブックを開く
2. **ファイル > GitHubにコピーを保存** を選択
3. 保存先を設定
   - **リポジトリ**: your-username/your-repository-name を選択
   - **ブランチ**: main を選択
   - **コミットメッセージ**: 「Initial commit of notebook from Colab」など
4. OKボタンで保存実行

## 3. ローカル開発環境のセットアップ

### リポジトリのクローン

1. GitHubで緑色の「Code▼」ボタンをクリック
2. HTTPSのURLをコピー
3. ターミナルで以下を実行

```bash
git clone [コピーしたリポジトリURL]
```

### VSCodeの設定

1. クローンしたフォルダをVSCodeで開く
2. 必要な拡張機能をインストール
   - Python
   - Jupyter
3. .ipynbファイルをテキストで開く設定
   - ファイルを右クリック > 「別のエディターで開く...」> 「テキストエディター」
   - JSON形式で表示され、Git管理が容易になります

## 4. 日常の開発ワークフロー

### 編集からGitHub保存まで

1. **VSCodeでコード編集**
   - ローカルでアイデアを自由に実装

2. **変更をGitHubに保存**
   ```bash
   git add .
   git commit -m "機能追加: ユーザー認証ロジック改善"
   git push origin main
   ```

3. **Colabで動作確認**
   - **ファイル > ノートブックを開く** > **GitHub**タブ
   - リポジトリURLで検索: `https://github.com/your-username/your-repository-name`
   - 最新版のノートブックを開いて実行

---

## 重要な運用ルール

### 1. 作業開始前の同期確認
**どこで編集する場合でも、作業前に最新版を確認する**

**ローカルで作業する場合**
```bash
git pull origin main
```

**Colabで作業する場合**
- ファイル > ノートブックを開く > GitHubタブから最新版を開く

### 2. 編集完了時の保存
**編集が完了したら、必ずGitHubに保存する**

**ローカルで編集した場合**
```bash
git add .
git commit -m "変更内容の説明"
git push origin main
```

**Colabで編集した場合**
- ファイル > GitHubにコピーを保存を実行
- コミットメッセージに変更内容を記載

### 3. 複数の場所での同時編集を避ける
**同じファイルを複数の環境で同時に編集しない**
- 一つの作業が完了してGitHubに保存してから、別の環境で作業を開始する
- 他の環境で作業中の場合は、まずその作業を完了させる

### 4. コンフリクト発生時の対処
**もし競合が発生した場合**
- ローカルで `git status` を確認
- 必要に応じて `git stash` で一時保存
- `git pull origin main` で最新版を取得
- 手動でマージするか、VSCodeの差分表示機能を活用

## まとめ

この手順により、Google ColabとGitHub、ローカルVSCodeが連携した効率的な開発環境が構築できます。

- **GitHub**: 確実なバージョン管理とコード履歴の保持
- **ローカルVSCode**: 快適で高機能な編集環境
- **Google Colab**: 強力なGPU/TPUを活用した実行環境

それぞれの環境の特性を活かしながら、柔軟で安全な開発ワークフローを実現できます。適切な運用ルールを守ることで、コンフリクトを避けながら、どこからでも効率的に開発を進めることができるでしょう。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />

##### 参考文献

- [Google Colab | GitHub との連携](https://colab.research.google.com/github/)
- [GitHub Docs | リポジトリのクローン](https://docs.github.com/ja/repositories/creating-and-managing-repositories/cloning-a-repository)
- [Visual Studio Code | Jupyter Notebooks](https://code.visualstudio.com/docs/datascience/jupyter-notebooks)

