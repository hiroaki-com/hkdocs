---
title: Docusaurus サイト内ブラウザメモ機能の実装記録
authors: [hk]
tags: [docusaurus, react, typescript, localStorage, ブラウザ機能]
---

import ShareButtons from '@site/src/components/ShareButtons';
import GitHubStarLink from '@site/src/components/GitHubStarLink';

<GitHubStarLink repo="hiroaki-com/hkdocs" />


この記事では、DocusaurusサイトにReactとTypeScriptを利用して、クライアントサイドで動作するシンプルなブラウザメモ機能を実装した際の主要な仕様と技術的ポイントを整理。

#### 1. 基本機能と目的

ユーザーがブラウザ上で手軽にテキストメモを作成・保存し、次回訪問時にも内容を保持できる機能の提供。
サーバーサイドの処理を介さず、すべてクライアントサイド（ブラウザのlocalStorage）で完結させることによる手軽さと応答性を重視。

<!-- truncate -->

1.  **メモの永続化**
    入力されたメモ内容は、ユーザーのブラウザの `localStorage` に自動的に保存。これにより、ブラウザをリロードしたり、一度閉じて再度開いたりしても、以前の内容が復元される。

2.  **複数メモ欄の提供**
    固定数（今回は5つ）の独立したメモ入力欄を提供。各メモは個別に内容を保持。

3.  **自動高さ調整と手動最小化**
    各メモ入力欄は、入力されたテキスト量に応じて自動的に高さが調整される。また、ユーザーが手動で高さを最小（固定値）に切り替えることも可能。

4.  **最終更新日時の表示**
    各メモが最後に編集・保存された日時を表示。

5.  **全クリア機能**
    全てのメモ内容を一括でクリアする機能を提供。

#### 2. 主要な実装ポイント

Reactのコンポーネントとして `src/pages` 配下に単一ファイル (`browser-memo.tsx`) で実装。

1.  **状態管理 (`useState`)**
    *   `memoItems`: メモの内容 (`text`)、最終更新日時 (`lastUpdated`)、手動最小化状態 (`isManuallyMinimized`) を含むオブジェクトの配列。
        ```typescript
        interface MemoItem {
          text: string;
          lastUpdated: number | null;
          isManuallyMinimized: boolean;
        }
        const [memoItems, setMemoItems] = useState<MemoItem[]>(createInitialMemoItems);
        ```
    *   `hoveredIndex`: マウスホバーされている最小化/自動調整トグル領域のインデックス。UIのフィードバック用。

2.  **副作用処理 (`useEffect`)**
    *   **localStorageからのデータ読み込み**: コンポーネントマウント時に一度だけ実行。`localStorage` から保存データを読み込み、`memoItems` Stateを初期化。データ構造の検証も実施。
    *   **localStorageへのデータ保存**: `memoItems` Stateが変更されるたびに実行。現在の `memoItems` の内容をJSON文字列化して `localStorage` に保存。初期状態での不要な保存を防ぐロジックも含む。
    *   **テキストエリアの高さ自動調整**: `memoItems` State（特に `text` や `isManuallyMinimized`）が変更された際に、各テキストエリアの高さを動的に調整。`useRef` を用いてテキストエリア要素にアクセスし、`scrollHeight` を利用。
        ```typescript
        const adjustTextareaHeight = useCallback((index: number) => {
          const textarea = textareaRefs.current[index];
          if (textarea) {
            const itemIsManuallyMinimized = memoItems[index].isManuallyMinimized;
            if (itemIsManuallyMinimized) {
              textarea.style.height = `${DEFAULT_TEXTAREA_MIN_HEIGHT}px`;
            } else {
              textarea.style.height = 'auto';
              const scrollHeight = textarea.scrollHeight;
              textarea.style.height = `${Math.max(scrollHeight, DEFAULT_TEXTAREA_MIN_HEIGHT)}px`;
            }
          }
        }, [memoItems]);
        ```

3.  **イベントハンドラ (`useCallback`)**
    *   `handleUpdate`: テキストエリアの内容変更時に、対応するメモの `text` と `lastUpdated` を更新し、`isManuallyMinimized` を `false` にリセット。
    *   `handleToggleMinimize`: 最小化/自動高さ調整トグル領域クリック時に、対応するメモの `isManuallyMinimized` 状態を反転。
    *   `handleClearAllMemos`: 全クリアボタンクリック時に、全てのメモ項目を初期状態にリセット。

4.  **UIとスタイリング**
    *   Docusaurusの `@theme/Layout` を使用し、サイト全体のデザインと一貫性を保持。
    *   主要なスタイルはインラインスタイルで記述。Docusaurusのテーマ変数 (`var(--ifm-...)`) を活用し、ライト/ダークテーマに対応。
    *   テキストエリアの下部領域（最小化/自動調整トグルと最終更新日時表示）は、`div` 要素で実現。`border` や `backgroundColor` を工夫し、テキストエリアと一体感のあるクリック可能なUIを表現。

#### 3. データ永続化とセキュリティ

1.  **`localStorage` の利用**
    メモデータはキー (`STORAGE_KEY`) を指定して `localStorage` に保存。`JSON.stringify` と `JSON.parse` を用いてオブジェクトと文字列間の変換を行う。

2.  **セキュリティに関する考慮**
    この機能は完全にクライアントサイドで動作。入力されたデータが外部サーバーに送信されることは一切ない。データはユーザー自身のブラウザ内にのみ保存されるため、プライバシーが保護される。ただし、共用PCでの利用にはユーザー自身による注意が必要。この旨はページ上に明記。

#### 4. UI/UXのポイント

1.  **自動高さ調整**
    テキスト入力に応じてテキストエリアの高さが自動で変わるため、スクロールの手間を軽減。`resize: 'none'` と `overflowY: 'hidden'` をCSSで設定し、JavaScriptで高さを制御。

2.  **手動最小化オプション**
    長文メモを一時的にコンパクトに表示したい場合や、他のメモとの一覧性を高めたい場合に、ユーザーが高さを固定最小値に切り替えられる。

3.  **インタラクティブなフッター**
    各メモの下部領域にマウスホバーすると背景色が変化し、クリック可能であることを視覚的に示唆。`title` 属性で操作内容のツールチップも表示。

#### まとめと所感

Docusaurusの標準機能とReactの柔軟性を組み合わせることで、比較的容易にクライアントサイド完結型の便利機能を追加できた。
`localStorage` の利用は手軽だが、データ構造のバージョン管理やエラーハンドリングには注意が必要。
UI/UXの細かな調整（高さ調整ロジック、ホバーエフェクトなど）が、使い勝手に大きく影響する点を再認識。
今後の拡張としては、メモの並び替え、マークダウン対応、個別のメモ削除などが考えられるが、今回はシンプルさを優先。


<ShareButtons />

<GitHubStarLink repo="hiroaki-com/hkdocs" />