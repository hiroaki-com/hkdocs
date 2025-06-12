---
sidebar_position: 5
title: 「水平線の検知／置換」AppScript - Googleドキュメント用
---

# Googleドキュメント用「水平線の検知／置換」AppScript

### 作成の経緯
- ドキュメント内で区切りとして使用していた水平線を、特定のテキスト表記（例：「置換後の」）に一括で変更する必要があった。
- 水平線（---）は、MarkdownファイルからGoogleドキュメントへ展開した際に反映されたものでるが、検索・置換（`⌘＋F`／`⌘＋H`）では検知できないものであった。
- 目視での手動作業のため、非効率かつ定型的な作業の効率化の必要性があった。
- このような定型的な置換作業を自動化し、編集効率を上げるために作成。

### ユースケース
- ドキュメント内の全ての水平線を、指定した固定文字列（このスクリプトでは「置換後の文字列」）に一括で置換する。
- 例えば、一時的な区切りとして水平線を使用していた箇所を、正式なセクション見出しや注釈に変換する際に利用可能。
- 大量のドキュメントに対して、水平線の扱いを一貫性のある形に整形する作業を効率化する。

### 使い方
1.  Googleドキュメントのドキュメントを開きます。
2.  メニューバーから「拡張機能」>「Apps Script」を選択し、スクリプトエディタを開きます。
3.  表示されたスクリプトエディタに、下記のスクリプト全体をコピー＆ペーストします。
    もし既に他のスクリプトが存在する場合は、新しいスクリプトファイルを作成（「ファイル」 > 「新規作成」 > 「スクリプトファイル」）してペーストするか、既存のコードの末尾に追記してください。
4.  スクリプトエディタ上部のフロッピーディスクアイコン（プロジェクトを保存）をクリックしてスクリプトを保存します。
5.  スクリプトエディタ上部で、実行する関数として `replaceHorizontalRules` を選択します。（通常、関数が1つしかない場合は自動で選択されています。）
6.  実行ボタン（再生ボタンのアイコン「実行」）をクリックすると、スクリプトが実行されます。
    初回実行時には「承認が必要です」というダイアログが表示されるので、指示に従ってスクリプトの実行を承認してください。
7.  実行後、ドキュメント内のすべての水平線が「置換後の文字列」というテキストに置き換えられます。

```javascript
function replaceHorizontalRules() {
  const body = DocumentApp.getActiveDocument().getBody();
  const hrArray = [];

  // 1) すべての水平線を収集
  // ドキュメントの本文(body)から水平線(HORIZONTAL_RULE)要素を検索します。
  let res = body.findElement(DocumentApp.ElementType.HORIZONTAL_RULE);
  while (res) {
    // 見つかった水平線要素を配列hrArrayに追加します。
    // findElementはRangeElementを返すため、getElement()で実際のElementを取得します。
    hrArray.push(res.getElement());
    // 次の水平線を検索します。検索開始位置として現在の結果(res)を指定します。
    res = body.findElement(DocumentApp.ElementType.HORIZONTAL_RULE, res);
  }

  // 2) 末尾から順に置換
  // 配列の末尾から処理するのは、要素を削除・挿入する際に
  // 前方の要素のインデックスが変わってしまうのを避けるためです。
  for (let i = hrArray.length - 1; i >= 0; i--) {
    const hr = hrArray[i];                       // 配列から水平線要素を取得
    const para = hr.getParent();                 // 水平線が含まれる親の段落要素を取得
    const parentBody = para.getParent();         // その段落の親要素（通常はドキュメントのBody）を取得
    const index = parentBody.getChildIndex(para); // Body内での段落の位置（インデックス）を取得

    // 水平線が含まれる段落ごと削除します。
    // 水平線は通常、それ自体が独立した段落として扱われるためです。
    parentBody.removeChild(para);
    // 元の段落があった位置に、新しい段落として「置換後の文字列」というテキストを挿入します。
    parentBody.insertParagraph(index, '置換後の文字列');
  }
}
```