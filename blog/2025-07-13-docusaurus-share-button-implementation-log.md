---
title: Docusaurusにシェアボタンを実装した記録とトラブルシューティングの備忘録
authors: [hk]
tags: [docusaurus, react, typescript, css-modules, ui/ux]
---

### シェアボタンを実装する

このサイトの各記事に、SNSで共有するためのシェアボタンを設置しました。この記事では、その実装プロセスと、背景にある技術的な判断などについて記録します。

完成したコンポーネントの特長は、ページのタイトルとURLを自動で取得する点です。これにより、一度設置すれば、記事ごとに特別な設定を追加する必要がなく、メンテナンスの手間がかかりません。

<!-- truncate -->

#### 実装方針の選択

Docusaurusには、テーマのコアコンポーネントを直接上書きできる `swizzle` という強力な機能があります。しかし、今回の実装ではこの機能を採用しませんでした。

理由は、`swizzle` がプロジェクトを特定のDocusaurusバージョンに強く結びつけてしまい、将来のバージョンアップ時に互換性が失われるリスクを高めるからです。プロジェクトの長期的な安定性とメンテナンス性を最優先に考え、`swizzle` に頼らない、独立したReactコンポーネントとして実装するアプローチを選択しました。これにより、Docusaurus本体のアップデートから影響を受けにくい、堅牢な構造を維持できます。

#### 実装のプロセス

まず、シェアボタン機能を提供する `react-share` ライブラリをプロジェクトに追加します。

```bash
pnpm add react-share
```

次に、`src/components/ShareButtons/index.tsx` というパスに、シェアボタンのロジックとUIをカプセル化したコンポーネントを作成します。このコンポーネントの実装には、いくつかの重要なポイントがあります。

一つ目のポイントは、ライブラリの型定義に関する問題への対処です。
このプロジェクトが使用するReact 19の環境では、`react-share` がまだ完全に対応しておらず、そのままではTypeScriptの型エラーが発生します。そこで、影響範囲を限定しつつこの問題を安全に回避するため、`as any` を使って意図的に型チェックをバイパスします。

```tsx
// src/components/ShareButtons/index.tsx

import {
  TwitterShareButton as OriginalTwitterShareButton,
  // ... 他のボタンも同様にインポート
} from 'react-share';

// ライブラリの型定義がReact 19に未対応なため、安全にエラーを回避する
const TwitterShareButton = OriginalTwitterShareButton as any;
const FacebookShareButton = OriginalFacebookShareButton as any;
// ...
```

二つ目のポイントは、このコンポーネントの核となる、ページ情報の動的な取得です。
`useEffect` フック内で、ブラウザの `document.title` からページタイトルを抽出します。Docusaurusはページのタイトルを `記事名 | サイト名` という形式で生成するため、サイト名の部分を文字列処理で取り除き、純粋な記事タイトルを取得しています。

```tsx
// src/components/ShareButtons/index.tsx

useEffect(() => {
  // 表示中のページの完全なURLを生成
  setPageUrl(new URL(location.pathname, siteConfig.url).href);

  let title = '';
  if (typeof document !== 'undefined') {
    // Docusaurusが生成する `document.title` からサイト名部分を除去
    const siteTitleSuffix = ` | ${siteConfig.title}`;
    title = document.title.endsWith(siteTitleSuffix)
      ? document.title.slice(0, -siteTitleSuffix.length)
      : document.title;
  }
  setPageTitle(title);

  // ...
}, [/* ...依存配列... */]);
```

スタイリングについては、CSS Modules (`styles.module.css`) を使用してコンポーネントのスタイルをカプセル化しました。これにより、サイトの他の部分に影響を与えることなく、ボタンのレイアウトやホバーエフェクトを定義できます。

#### コンポーネントの使用方法

最後に、完成したコンポーネントを記事ファイル（`.mdx`）に配置します。使い方は非常にシンプルで、ファイルをインポートして呼び出すだけです。

```mdx
...記事本文の終わり...

---

import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />
```

この数行を追記するだけで、どの記事にも簡単にシェア機能を追加できるようになりました。`swizzle` を使わずに実装したことでDocusaurusのバージョンアップに対する耐性を高め、ライブラリの型問題には的を絞った対処を施すことで、メンテナンス性が高く再利用しやすい、自律的なコンポーネントが完成しました。

---

### React 19環境におけるライブラリの型エラー解決策

モダンなフロントエンド開発では、フレームワークの進化にライブラリが追いつくまでの過渡期に、予期せぬエラーに直面することがあります。今回は、React 19とDocusaurus v3の環境で `react-share` ライブラリを導入した際に発生した、複数のTypeScriptエラーへの対処記録です。

#### 遭遇した問題

実装を進める中で、コンパイラはいくつかの不可解なエラーを報告しました。例えば、「`children`プロパティが見つからない」というエラーや、「`JSX`という名前空間が存在しない」といったものです。さらに、Facebookのシェアボタンでは、公式ドキュメントで推奨されている `quote` プロパティが「型定義に存在しない」と指摘されました。

これらのエラーは、私たちのコードのロジックが間違っているわけではなく、より根深い原因があることを示唆していました。

#### 根本原因の分析

調査の結果、エラーの原因は主に2つに集約されることが分かりました。

一つ目は、**ライブラリとフレームワーク間のバージョンの非互換性**です。`react-share` が、React 19で変更された新しい型定義（特に `children` プロパティの扱い）にまだ完全に対応していませんでした。

二つ目は、**ライブラリ自体の型定義ファイルの不備**です。`FacebookShareButton` の `quote` プロパティが型定義ファイルに記述されていないのは、ライブラリ側の明らかなバグでした。

これらの問題は、私たちのアプリケーションコード側ではなく、依存しているライブラリ側に起因するものです。したがって、解決策はライブラリの修正を待つのではなく、私たちのコード側でこの問題を安全に「回避」することになります。

#### 影響範囲を限定した解決策

このような状況で最も安易な方法は `// @ts-ignore` コメントでエラーを黙らせることですが、これは将来のバグの温床となり、コードの可読性を著しく低下させるため、最善の策とは言えません。

私たちが採用したのは、**影響範囲を限定した安全な型キャスト**というアプローチです。問題のあるコンポーネントだけを `as any` を使って型を意図的に緩め、それを新しい名前のコンポーネントとして再定義します。

```tsx
// 元のコンポーネントを別名でインポート
import { 
  TwitterShareButton as OriginalTwitterShareButton 
} from 'react-share';

// 型キャストを行い、アプリケーション内で使用するコンポーネントを定義
// これにより、型エラーをこのファイル内に封じ込める
const TwitterShareButton = OriginalTwitterShareButton as any;
```

この方法の利点は、型チェックを無効にする範囲を問題のある箇所のみに限定できることです。コードを読む誰もが、なぜここで型キャストが行われているのかを明確に理解でき、将来ライブラリが更新された際には、この数行を削除するだけで簡単に本来の型安全な状態に戻せます。


import ShareButtons from '@site/src/components/ShareButtons';

<ShareButtons />
