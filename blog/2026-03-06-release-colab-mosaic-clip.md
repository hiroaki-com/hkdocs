---
title: "動画の任意範囲にモザイクをかけるGoogle Colabツール「Colab Mosaic Clip」をリリースしました"
date: "2026-03-06"
description: "動画の任意の時間範囲・任意の位置にモザイクまたは単色マスクをかけてMP4で出力するオープンソースツールのリリースを発表します。ブラウザ上のGUI操作だけで完結し、環境構築は不要です。"
authors: [hk]
tags: [release, ffmpeg, google-colab, mosaic, privacy, open-source]
---

import Admonition from '@theme/Admonition';
import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/colab-mosaic-clip" />

<div style={{ textAlign: 'center', marginBottom: '32px' }}>
  <video
    src="https://github.com/user-attachments/assets/0c5b0ee4-e73c-4e62-8fac-a351ec8fb391"
    alt="Colab Mosaic Clip デモ"
    style={{ maxWidth: '100%', borderRadius: '8px' }}
    autoPlay
    loop
    muted
    playsInline
  />
</div>

本日、動画の任意の時間範囲・任意の位置にGUI操作だけでモザイクまたは単色マスクをかけてMP4で出力するオープンソースツール **Colab Mosaic Clip** を公開しました。Google Colab上でffmpegとPillowを動かし、時間範囲の指定からモザイク位置の指定・書き出しまでをすべてノートブックのUI上で完結できます。

{/* truncate */}

### 背景

開発したツールや社内ドキュメントを紹介するとき、画面録画をそのまま使いたいのに、APIキーやアカウント情報が映り込んでいてそのまま公開できない、という状況は繰り返し発生します。

以前リリースした[デモ動画をGIF・MP4に変換するツール](https://hkdocs.com/docs/tech/google-colab/google-colab-demo-gif-mp4-converter/)を実際に使う中で、「モザイク処理もセットでできると嬉しい」という場面が積み重なったことがきっかけです。既存ツールへの機能追加はコードの複雑化を招くため、専用ツールとして分離して作ることにしました。ローカルへの動画編集ソフトの導入は環境汚染や習得コストの面から避けたかったので、同じくGoogle Colabで完結させる方針にしています。

### 主な機能

コードを書かずに実行できる設計になっています。セルを上から順に実行し、動画プレイヤーとCanvas上のGUI操作だけで処理が完了します。

動画プレイヤーを再生しながら「開始秒を記録」「終了秒を記録」ボタンを押すだけで、モザイクをかける時間範囲を指定できます。開始秒のフレーム画像が自動で表示されるので、そのままCanvas上をクリックしてモザイク枠を追加します。枠はドラッグで移動・リサイズが可能で、複数箇所への同時指定にも対応しています。

マスクパターンはモザイク（ピクセル化）と単色塗りつぶしの2種類から選択できます。出力幅は240〜1920pxの範囲で指定可能で、完了後はノートブック上でプレビューを確認してからローカルへのダウンロードまたはGoogle Driveへの保存を選択できます。

技術的な実装の詳細（Canvas UIの座標スケーリング、FFmpegのfilter_complexによるoverlay方式、Pillowによるプレビュー処理など）は[技術ドキュメント](/docs/tech/google-colab/google-colab-mosaic-clip)で解説しています。

### 使い始める

環境構築は不要です。以下のColabリンクを開き、セルを上から順に実行してください。

- **Google Colab で実行する**: [Colab Mosaic Clip（日本語版）](https://colab.research.google.com/github/hiroaki-com/colab-mosaic-clip/blob/main/mosaic_clip_ja.ipynb)
- **ソースコードを見る**: [hiroaki-com/colab-mosaic-clip on GitHub](https://github.com/hiroaki-com/colab-mosaic-clip)

フィードバックやPull Requestはいずれも歓迎します。

<ShareButtons />

<GitHubStarLink repo="hiroaki-com/colab-mosaic-clip" />
