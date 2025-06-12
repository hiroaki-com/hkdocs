---
sidebar_position: 4
title: 「改ページ（文字列検知）」AppScript - Googleドキュメント用
---

# Googleドキュメント用「改ページ（文字列検知）」AppScript

### 作成の経緯
- 超長文なドキュメントの編集作業の中で、改ページの編集のために`⌘＋Enter`を繰り返し使用していたが、あまりにも時間がかかっていた
- [Chrome拡張機能](https://chromewebstore.google.com/category/extensions?hl=ja) などで目的の機能を提供しているサービスが無さそうであったため、自作

### ユースケース
- 書籍など超長文のGoogleドキュメント 編集作業の効率化
- 指定した複数の文字列のいずれかで始まる段落の前に改ページを挿入するスクリプト（前方一致）

### 使い方
 1. Googleドキュメントのシートで、以下のAppScriptを貼り付けて、コメントのとおり実行するだけで使用可能


 ```Javascript
 // 使い方:
/**
 * @fileoverview 指定した複数の文字列のいずれかで始まる段落の前に改ページを挿入するスクリプトです。
 *
 * ## 関数実行時の前提
 *
 * ・重要：実行する関数を選択　> [ insertPageBreakAtPrefixMarkers ] を選択してください。 
 *
 *
 * ## 目印の文字列に関する設定方法
 *
 * 1. **PAGEBREAK_PREFIXES** の値を、改ページの目印としたい文字列の**接頭辞**（始まりの部分）の**配列**に変更します。
 *    - このシステムは前方一致するテキストを目印として検索します。
 *    - 配列は角括弧 `[]` で囲み、各接頭辞文字列をダブルクォーテーション `"` またはシングルクォーテーション `'` で囲み、カンマ `,` で区切ります。
 *    - **要素数:** 配列には、有効な接頭辞文字列を **1 つ以上**含めてください。いくつでも設定可能です。
 *    - **有効な接頭辞:**
 *        - 空文字列 (`""`) や、スペースなどの空白文字のみ (`" "`) は**無視されます**。改ページの対象とはなりません。
 *        - 大文字・小文字は区別されます。
 *
 * 2. **設定例:**
 *    - **接頭辞が 1 つだけの場合:**
 *      例: `const PAGEBREAK_PREFIXES = ["PAGEBREAK"];`
 *      この設定では、「PAGEBREAK」という文字列で始まる段落（例: "PAGEBREAK" や "PAGEBREAK Section Title" など）の前に改ページが挿入されます。
 *
 *    - **接頭辞が 2 つの場合:**
 *      例: `const PAGEBREAK_PREFIXES = ["Chapter ", "Appendix "];`
 *      この設定では、「Chapter 」(Chapterの後ろに半角スペースあり) または「Appendix 」(Appendixの後ろに半角スペースあり) で始まる段落
 *      （例: "Chapter 1 Introduction", "Appendix A References" など）の前に改ページが挿入されます。
 *
 *    - **接頭辞が 3 つ以上の場合:**
 *      例: `const PAGEBREAK_PREFIXES = ["図-", "表-", "リスト "];`
 *      この設定では、「図-」、「表-」、または「リスト 」(リストの後ろに半角スペースあり) で始まる段落
 *      （例: "図-1 システム構成", "表-2 パラメータ一覧", "リスト 1 手順" など）の前に改ページが挿入されます。
 *
 *    - **ポイント:**
 *      - 接頭辞にスペースを含めるかどうかで、一致する対象が変わります。
 *        例: `"Chapter"` は "ChapterEnd" に一致しますが、`"Chapter "` は一致しません。
 *      - 必要な数だけ、カンマで区切って文字列を追加できます。
 *
 * 3. **動作:**
 *    - この配列に含まれる**有効な接頭辞**のいずれかで**始まる**テキストを持つ段落の**直前**に改ページが挿入されます。
 *    - 段落 (Paragraph) 要素のテキストのみをチェックします。
 *
 * 4. 変更後、**必ずスクリプトファイルを保存**してください（フロッピーディスクのアイコンをクリック）。
 */
const PAGEBREAK_PREFIXES = ["問題文 (日本", "章"]; // 例: ["図-", "表-"] や ["MyMarker"] など。設定方法は上のコメントを参照してください。
// --- 設定箇所ここまで ---


// --- グローバル定数 ---
const SCRIPT_NAME_MULTI_PREFIX = 'カスタム 改ページ (複数前方一致)';
const SCRIPT_ERROR_MENU_NAME_MULTI_PREFIX = `${SCRIPT_NAME_MULTI_PREFIX} (設定エラー)`;

/**
 * 設定された接頭辞配列から、有効な（空でなく、空白のみでない）文字列のみを抽出します。
 * @param {any} prefixes 設定された PAGEBREAK_PREFIXES の値
 * @returns {string[]} 有効な接頭辞文字列の配列
 */
function getValidPrefixes(prefixes) {
  if (!Array.isArray(prefixes)) {
    return []; // 配列でなければ空配列を返す
  }
  // filter を使用して、文字列型かつ trim() して空でないものだけを抽出
  return prefixes.filter(prefix => typeof prefix === 'string' && prefix.trim().length > 0);
}

/**
 * ドキュメントを開いたときにカスタムメニューを追加します。
 */
function onOpen_MultiPrefix() {
  try {
    const validPrefixes = getValidPrefixes(PAGEBREAK_PREFIXES);

    // 有効な接頭辞が1つもない場合はエラーメニューを表示
    if (validPrefixes.length === 0) {
      Logger.log(`onOpen_MultiPrefix: 有効な改ページ接頭辞が設定されていません (${JSON.stringify(PAGEBREAK_PREFIXES)})。エラーメニューを表示します。`);
      showConfigurationErrorMenu_MultiPrefix("有効な改ページ接頭辞が設定されていません");
      return;
    }

    // メニュー項目名の生成（表示する接頭辞を調整）
    let menuItemText = `指定接頭辞 (${validPrefixes.slice(0, 2).map(p => `"${p}"`).join(', ')}...)の前で改ページ`;
    if (validPrefixes.length === 1) {
        menuItemText = `接頭辞 "${validPrefixes[0]}" の前で改ページ`;
    } else if (validPrefixes.length === 2) {
        menuItemText = `接頭辞 (${validPrefixes.map(p => `"${p}"`).join(', ')})の前で改ページ`;
    }

    DocumentApp.getUi()
      .createMenu(SCRIPT_NAME_MULTI_PREFIX)
      .addItem(menuItemText, 'insertPageBreakAtPrefixMarkers')
      .addToUi();
    Logger.log(`onOpen_MultiPrefix: メニューを正常に追加 (有効な対象接頭辞: ${JSON.stringify(validPrefixes)})。`);

  } catch (e) {
    Logger.log(`onOpen_MultiPrefix: メニュー追加中にエラー: ${e}\n${e.stack}`);
    showConfigurationErrorMenu_MultiPrefix("メニュー追加中にエラー発生");
  }
}

/**
 * 設定エラーがある場合に、エラーを示すメニュー項目を追加します。
 * @param {string} reason エラー理由
 */
function showConfigurationErrorMenu_MultiPrefix(reason) {
  try {
    DocumentApp.getUi()
      .createMenu(SCRIPT_ERROR_MENU_NAME_MULTI_PREFIX)
      .addItem(`設定を確認 (${reason})`, 'showConfigurationError_MultiPrefix')
      .addToUi();
  } catch (e) {
    Logger.log(`showConfigurationErrorMenu_MultiPrefix: エラーメニュー表示中にさらにエラー: ${e}`);
  }
}

/**
 * 設定エラー時に表示するアラート関数
 */
function showConfigurationError_MultiPrefix() {
  let currentSetting = "未定義またはアクセス不能";
  try {
    // 設定値が配列かどうかをチェックしてから JSON.stringify を試みる
    currentSetting = typeof PAGEBREAK_PREFIXES !== 'undefined'
      ? (Array.isArray(PAGEBREAK_PREFIXES) ? JSON.stringify(PAGEBREAK_PREFIXES) : `無効な設定値 (${PAGEBREAK_PREFIXES})`)
      : "未定義";
  } catch(e) {
    currentSetting = "設定値の表示中にエラーが発生しました";
   }

  const message = `スクリプトの設定に問題があります。\n\n`
                + `現在の設定値 (PAGEBREAK_PREFIXES): ${currentSetting}\n\n`
                + `スクリプトエディタを開き、ファイルの先頭にある「PAGEBREAK_PREFIXES」の値を確認・修正し、**ファイルを保存**してください。\n\n`
                + `この値は、改ページの目印となる**空でない**接頭辞文字列を **1 つ以上**含む**配列**（例: ["PREFIX1", "PREFIX2"]）である必要があります。\n`
                + `空文字列 "" や空白のみ " " は無視されます。\n\n`
                + `(例: const PAGEBREAK_PREFIXES = ["Chapter ", "Section ", "図-"];)` // より具体的な例
  DocumentApp.getUi().alert("スクリプト設定エラー", message, DocumentApp.getUi().ButtonSet.OK);
}


/**
 * ドキュメント内で有効な接頭辞のいずれかで始まる段落の前に改ページを挿入します。
 */
function insertPageBreakAtPrefixMarkers() {
  const startTime = new Date();
  let doc;

  // --- 1. 初期化と検証 ---
  try {
    doc = DocumentApp.getActiveDocument();
    if (!doc) throw new Error("アクティブなドキュメントを取得できませんでした。");
    doc.getName(); // アクセス権限チェック
  } catch (e) {
    handleExecutionError_MultiPrefix("ドキュメントアクセスエラー", e);
    return;
  }

  // 設定値から有効な接頭辞のみを取得
  const validPrefixes = getValidPrefixes(PAGEBREAK_PREFIXES);

  // 有効な接頭辞がなければ処理を中断し、エラーメッセージを表示
  if (validPrefixes.length === 0) {
      Logger.log(`insertPageBreakAtPrefixMarkers: 処理開始前にチェックした結果、有効な改ページ接頭辞が設定されていません。`);
      showConfigurationError_MultiPrefix("有効な改ページ接頭辞が設定されていません");
      return;
  }

  Logger.log(`--- 複数前方一致による改ページ挿入処理 開始 ---`);
  Logger.log(`ドキュメント: ${doc.getName()}`);
  Logger.log(`有効な対象接頭辞 (実際に検索に使用): ${JSON.stringify(validPrefixes)}`); // 実際に使うリストをログ出力

  // --- 2. 要素の走査と改ページ挿入 ---
  const body = doc.getBody();
  const numChildren = body.getNumChildren();
  let pageBreakInsertedCount = 0;
  let foundMarkersCount = 0;

  Logger.log(`要素数: ${numChildren}。逆順に走査します...`);

  for (let i = numChildren - 1; i >= 0; i--) {
    const element = body.getChild(i);

    if (element.getType() === DocumentApp.ElementType.PARAGRAPH) {
      const paragraph = element.asParagraph();
      let paragraphText;
      try {
        paragraphText = paragraph.getText();

        // 有効な接頭辞リスト (`validPrefixes`) のいずれかで始まるかチェック
        if (validPrefixes.some(prefix => paragraphText.startsWith(prefix))) {
          foundMarkersCount++;
          // Logger.log(`  発見: Index ${i}, Text: "${paragraphText}", Prefix: ${validPrefixes.find(p => paragraphText.startsWith(p))}`);

          if (i > 0 && body.getChild(i - 1).getType() !== DocumentApp.ElementType.PAGE_BREAK) {
            try {
              body.insertPageBreak(i);
              pageBreakInsertedCount++;
              // Logger.log(`    -> 改ページ挿入 (Index ${i})`);

              // オプション: マーカーテキストの段落自体を削除する場合
              // try {
              //   paragraph.removeFromParent();
              //   Logger.log(`    -> 前方一致した段落 (元Index ${i+1}) を削除しました。`);
              // } catch (removeError) {
              //   Logger.log(`! Index ${i+1} のマーカー段落削除中にエラー: ${removeError}`);
              // }

            } catch (insertError) {
              Logger.log(`! Index ${i} への改ページ挿入中にエラー: ${insertError}`);
            }
          } // else: skip (already page break or beginning of doc)
        }
      } catch (elementError) {
        Logger.log(`! Index ${i} (Type: PARAGRAPH) の処理中にエラー: ${elementError}. スキップします。`);
      }
    }
  }

  // --- 3. 結果報告 ---
  const endTime = new Date();
  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  Logger.log(`--- 走査終了 ---`);
  Logger.log(`処理時間: ${duration.toFixed(2)} 秒`);
  Logger.log(`検出された指定接頭辞で始まる段落 (${JSON.stringify(validPrefixes)}): ${foundMarkersCount} 個`);
  Logger.log(`挿入された改ページ: ${pageBreakInsertedCount} 個`);

  const resultMessage = buildResultMessage_MultiPrefix(pageBreakInsertedCount, foundMarkersCount, validPrefixes, duration);
  DocumentApp.getUi().alert("処理完了", resultMessage, DocumentApp.getUi().ButtonSet.OK);

  Logger.log(`--- 複数前方一致による改ページ挿入処理 終了 ---`);
}

/**
 * 実行中のエラーを処理し、ユーザーに通知します。
 * (handleExecutionError_MultiPrefix 関数は変更なし)
 * @param {string} context エラーが発生した状況
 * @param {Error} error 発生したエラーオブジェクト
 */
function handleExecutionError_MultiPrefix(context, error) {
    Logger.log(`実行時エラー (${context}): ${error}\n${error.stack}`);
    let userMessage = `スクリプトの実行中にエラーが発生しました。\n\n状況: ${context}`;
    if (error.message) {
        if (error.message.includes("Authorization required") || error.message.includes("権限が必要")) {
            userMessage = "スクリプトの実行に必要な権限が承認されていません。\n\nドキュメントを再読み込みするか、スクリプトを再度実行し、承認画面で許可してください。";
        } else {
            userMessage += `\n詳細: ${error.message}`;
        }
    }
    DocumentApp.getUi().alert("スクリプト エラー", userMessage, DocumentApp.getUi().ButtonSet.OK);
}

/**
 * 処理結果に基づいてユーザーへのメッセージを生成します。
 * (buildResultMessage_MultiPrefix 関数は変更なし、表示する接頭辞リストは有効なもののみ)
 * @param {number} insertedCount 挿入された改ページの数
 * @param {number} foundCount 見つかった前方一致する段落の数
 * @param {string[]} validPrefixes 有効な接頭辞の配列
 * @param {number} duration 処理時間(秒)
 * @returns {string} アラート表示用のメッセージ
 */
function buildResultMessage_MultiPrefix(insertedCount, foundCount, validPrefixes, duration) {
    // 表示する接頭辞を最大3つに制限し、引用符で囲む
    const displayPrefixes = validPrefixes.slice(0, 3).map(p => `"${p}"`);
    const prefixDescription = `指定された接頭辞 (${displayPrefixes.join(', ')}${validPrefixes.length > 3 ? '...' : ''}) で始まる段落`;

    if (insertedCount > 0) {
        return `${insertedCount} 箇所の ${prefixDescription} の前に改ページを挿入しました。\n\n処理時間: ${duration.toFixed(2)} 秒`;
    } else if (foundCount > 0) {
        return `${prefixDescription} は ${foundCount} 箇所で見つかりましたが、改ページは挿入されませんでした。\n(段落が先頭にあるか、既に改ページが存在するため)\n\n処理時間: ${duration.toFixed(2)} 秒`;
    } else {
        return `${prefixDescription} が見つかりませんでした。\n\n以下の点を確認してください:\n`
             + `1. スクリプト上部の「PAGEBREAK_PREFIXES」に有効な接頭辞が設定されていますか？ (現在の有効な設定: ${JSON.stringify(validPrefixes)})\n`
             + `2. ドキュメントに、これらの接頭辞のいずれかで始まる段落が存在しますか？ (大文字/小文字も区別)\n`
             + `3. スクリプトの権限は承認されていますか？`;
    }
}
 ```