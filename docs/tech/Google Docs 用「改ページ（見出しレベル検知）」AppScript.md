---
sidebar_position: 3
---

# Google Docs 用「改ページ（見出しレベル検知）」AppScript


### 作成の経緯
- 超長文なドキュメントの編集作業の中で、改ページの編集のために`⌘＋Enter`を繰り返し使用していたが、あまりにも時間がかかっていた
- [Chrome拡張機能](https://chromewebstore.google.com/category/extensions?hl=ja) などで目的の機能を提供しているサービスが無さそうであったため、自作

### ユースケース
- 書籍など超長文のGoogle Docs 編集作業の効率化
- 指定した見出しレベルの前に改ページを挿入する

### 使い方
 1. Google Docsのシートで、以下のAppScriptを貼り付けて、コメントのとおり実行するだけで使用可能


 ```Javascript
 // --- 設定箇所 ---
/**
 * @fileoverview 指定した見出しレベルの前に改ページを挿入するGoogle Apps Scriptです。
 *
 * ## 関数実行時の前提
 *
 * ・重要：実行する関数を選択　> [ insertPageBreakBreforeHeading ] を選択してください。 
 * 
 * ## 設定方法
 *
 * 1. **TARGET_HEADING_LEVEL** の値を、改ページを挿入したい見出しのレベル (1～6の半角整数) に変更します。
 *    - 1: Google ドキュメントの「見出し 1」スタイル
 *    - 2: Google ドキュメントの「見出し 2」スタイル
 *    - 3: Google ドキュメントの「見出し 3」スタイル
 *    - 4: Google ドキュメントの「見出し 4」スタイル
 *    - 5: Google ドキュメントの「見出し 5」スタイル
 *    - 6: Google ドキュメントの「見出し 6」スタイル
 *
 * 2. **注意点:**
 *    - このスクリプトは、Google ドキュメントの**標準の見出しスタイル**を認識します。
 *    - 改ページを挿入したい見出しのテキストには、メニュー [表示形式] > [段落スタイル] から
 *      対応する**「見出し X」スタイルを必ず適用**してください。
 *    - （単に文字の大きさや太さを変更しただけでは、見出しとして認識されません。）
 *
 * 3. 変更後、**必ずスクリプトファイルを保存**してください（フロッピーディスクのアイコンをクリック）。
 */
const TARGET_HEADING_LEVEL = 3; // 例: 「見出し 3」スタイルの前に改ページを挿入する場合
// --- 設定箇所ここまで ---

// --- 以降のスクリプトコード (変更なし) ---
/** グローバル定数: スクリプト名 */
const SCRIPT_NAME = 'カスタム スクリプト';
/** グローバル定数: 設定エラー時のメニュー名 */
const SCRIPT_ERROR_MENU_NAME = `${SCRIPT_NAME} (設定エラー)`;

/**
 * ドキュメントを開いたときにカスタムメニューを追加します。
 */
function onOpen() {
  try {
    if (!isValidHeadingLevel(TARGET_HEADING_LEVEL)) {
      Logger.log(`onOpen: TARGET_HEADING_LEVEL (${TARGET_HEADING_LEVEL}) が無効です。エラーメニューを表示します。`);
      showConfigurationErrorMenu("設定値が無効 (1-6の整数)");
      return;
    }

    DocumentApp.getUi()
      .createMenu(SCRIPT_NAME)
      .addItem(`「見出し ${TARGET_HEADING_LEVEL}」の前に改ページ挿入`, 'insertPageBreakBeforeHeading')
      .addToUi();
    Logger.log(`onOpen: メニューを正常に追加 (対象: 見出し ${TARGET_HEADING_LEVEL})。`);

  } catch (e) {
    Logger.log(`onOpen: メニュー追加中にエラー: ${e}\n${e.stack}`);
    showConfigurationErrorMenu("メニュー追加中にエラー発生");
  }
}

/**
 * 設定エラーがある場合に、エラーを示すメニュー項目を追加します。
 * @param {string} reason エラー理由
 */
function showConfigurationErrorMenu(reason) {
  try {
    DocumentApp.getUi()
      .createMenu(SCRIPT_ERROR_MENU_NAME)
      .addItem(`設定を確認 (${reason})`, 'showConfigurationError')
      .addToUi();
  } catch (e) {
    Logger.log(`showConfigurationErrorMenu: エラーメニュー表示中にさらにエラー: ${e}`);
    // UIが利用できない可能性も考慮し、ログ出力のみ
  }
}

/**
 * 設定エラー時に表示するアラート関数
 */
function showConfigurationError() {
  let currentSetting = "未定義またはアクセス不能";
  try {
    currentSetting = (typeof TARGET_HEADING_LEVEL !== 'undefined') ? String(TARGET_HEADING_LEVEL) : "未定義";
  } catch(e) { /* アクセス不能時のエラーは無視 */ }

  const message = `スクリプトの設定に問題があります。\n\n`
                + `現在の設定値: ${currentSetting}\n\n`
                + `スクリプトエディタを開き、ファイルの先頭にある「TARGET_HEADING_LEVEL」の値 (1～6の整数) を確認・修正し、**ファイルを保存**してください。\n\n`
                + `(例: const TARGET_HEADING_LEVEL = 3;)`
  DocumentApp.getUi().alert("スクリプト設定エラー", message, DocumentApp.getUi().ButtonSet.OK);
}

/**
 * 指定された見出しレベルが有効か (1-6の整数か) を判定します。
 * @param {any} level 判定する値
 * @return {boolean} 有効な場合は true
 */
function isValidHeadingLevel(level) {
    return typeof level === 'number' && Number.isInteger(level) && level >= 1 && level <= 6;
}

/**
 * 指定された数値の見出しレベルに対応する ParagraphHeading 定数を返します。
 * @param {number} level 見出しレベル (1-6 の整数)
 * @return {DocumentApp.ParagraphHeading | null} 対応する定数、または無効な場合は null
 */
function getHeadingConstant(level) {
  // isValidHeadingLevel でチェック済み想定だが念のため
  if (!isValidHeadingLevel(level)) {
    Logger.log(`getHeadingConstant: 無効なレベル: ${level}`);
    return null;
  }
  // オブジェクトルックアップで簡潔に
  const headingMap = {
    1: DocumentApp.ParagraphHeading.HEADING1,
    2: DocumentApp.ParagraphHeading.HEADING2,
    3: DocumentApp.ParagraphHeading.HEADING3,
    4: DocumentApp.ParagraphHeading.HEADING4,
    5: DocumentApp.ParagraphHeading.HEADING5,
    6: DocumentApp.ParagraphHeading.HEADING6,
  };
  return headingMap[level] || null; // level に対応する値がなければ null
}

/**
 * ParagraphHeading Enum 値から、その名前を取得します。
 * @param {DocumentApp.ParagraphHeading | any} enumValue ParagraphHeading の Enum 値
 * @return {string} Enum の名前 (例: 'HEADING3')、不明な場合は 'UNKNOWN'
 */
function getHeadingEnumName(enumValue) {
    if (enumValue === null || typeof enumValue === 'undefined') {
        return 'NULL_OR_UNDEFINED';
    }
    // キャッシュを使って効率化 (初回のみ全探索)
    if (!this.headingEnumNameCache) {
        this.headingEnumNameCache = {};
        for (const key in DocumentApp.ParagraphHeading) {
            // プロトタイプチェーン上のプロパティを避ける
            if (Object.prototype.hasOwnProperty.call(DocumentApp.ParagraphHeading, key)) {
                 this.headingEnumNameCache[DocumentApp.ParagraphHeading[key]] = key;
            }
        }
    }
    return this.headingEnumNameCache[enumValue] || `UNKNOWN_STYLE (${String(enumValue)})`;
}


/**
 * ドキュメント内の指定された見出しレベルの要素の直前に改ページを挿入します。
 */
function insertPageBreakBeforeHeading() {
  const startTime = new Date();
  let doc;

  // --- 1. 初期化と検証 ---
  try {
    doc = DocumentApp.getActiveDocument();
    if (!doc) throw new Error("アクティブなドキュメントを取得できませんでした。");
    doc.getName(); // アクセス権限チェックを兼ねる
  } catch (e) {
    handleExecutionError("ドキュメントアクセスエラー", e);
    return;
  }

  if (!isValidHeadingLevel(TARGET_HEADING_LEVEL)) {
    Logger.log(`insertPageBreakBeforeHeading: 設定値が無効 (${TARGET_HEADING_LEVEL})。`);
    showConfigurationError(); // 設定エラーの詳細を表示
    return;
  }

  const targetHeadingConstant = getHeadingConstant(TARGET_HEADING_LEVEL);
  if (!targetHeadingConstant) {
    // このエラーは通常発生しないはず (isValidHeadingLevel でチェック済みのため)
    Logger.log(`insertPageBreakBeforeHeading: 見出し定数取得失敗 (レベル: ${TARGET_HEADING_LEVEL})。`);
    DocumentApp.getUi().alert(`スクリプト内部エラー: 設定値 (${TARGET_HEADING_LEVEL}) に対応する見出しスタイル定数を取得できませんでした。`);
    return;
  }
  const targetHeadingName = getHeadingEnumName(targetHeadingConstant);

  Logger.log(`--- 改ページ挿入処理 開始 ---`);
  Logger.log(`ドキュメント: ${doc.getName()}, 対象見出し: ${TARGET_HEADING_LEVEL} (${targetHeadingName})`);

  // --- 2. 要素の走査と改ページ挿入 ---
  const body = doc.getBody();
  const numChildren = body.getNumChildren();
  let pageBreakInsertedCount = 0;
  let foundTargetHeadings = 0;

  Logger.log(`要素数: ${numChildren}。逆順に走査します...`);

  for (let i = numChildren - 1; i >= 0; i--) {
    const element = body.getChild(i);
    const elementType = element.getType();
    let headingStyle = null;

    try {
      // 見出しスタイルを持つ可能性のある要素タイプのみチェック
      if (elementType === DocumentApp.ElementType.PARAGRAPH) {
        headingStyle = element.asParagraph().getHeading();
      } else if (elementType === DocumentApp.ElementType.LIST_ITEM) {
        headingStyle = element.asListItem().getHeading();
      } else {
        continue; // 関係ない要素はスキップ
      }

      // ターゲットの見出しスタイルか判定
      if (headingStyle === targetHeadingConstant) {
        foundTargetHeadings++;
        // Logger.log(`  発見: Index ${i}, Type: ${elementType}`); // 必要ならコメント解除

        // ドキュメント先頭でなく、直前が改ページでなければ挿入
        if (i > 0 && body.getChild(i - 1).getType() !== DocumentApp.ElementType.PAGE_BREAK) {
          try {
            body.insertPageBreak(i);
            pageBreakInsertedCount++;
            // Logger.log(`    -> 改ページ挿入 (Index ${i})`); // 必要ならコメント解除
          } catch (insertError) {
            Logger.log(`! Index ${i} への改ページ挿入中にエラー: ${insertError}`);
            // エラーが発生しても処理は続行するが、ユーザーには通知しない（ログのみ）
          }
        } else if (i > 0) {
          // Logger.log(`    -> スキップ (直前が改ページ)`); // 必要ならコメント解除
        } else {
          // Logger.log(`    -> スキップ (ドキュメント先頭)`); // 必要ならコメント解除
        }
      }
    } catch (elementError) {
      // 要素処理中の予期せぬエラーはログに残し、処理を継続
      Logger.log(`! Index ${i} (Type: ${elementType}) の処理中にエラー: ${elementError}. スキップします。`);
    }
  }

  // --- 3. 結果報告 ---
  const endTime = new Date();
  const duration = (endTime.getTime() - startTime.getTime()) / 1000;

  Logger.log(`--- 走査終了 ---`);
  Logger.log(`処理時間: ${duration.toFixed(2)} 秒`);
  Logger.log(`検出された対象見出し (${targetHeadingName}): ${foundTargetHeadings} 個`);
  Logger.log(`挿入された改ページ: ${pageBreakInsertedCount} 個`);

  const resultMessage = buildResultMessage(pageBreakInsertedCount, foundTargetHeadings, targetHeadingName, duration);
  DocumentApp.getUi().alert("処理完了", resultMessage, DocumentApp.getUi().ButtonSet.OK);

  Logger.log(`--- 改ページ挿入処理 終了 ---`);
}

/**
 * 実行中のエラーを処理し、ユーザーに通知します。
 * @param {string} context エラーが発生した状況
 * @param {Error} error 発生したエラーオブジェクト
 */
function handleExecutionError(context, error) {
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
 * @param {number} insertedCount 挿入された改ページの数
 * @param {number} foundCount 見つかった対象見出しの数
 * @param {string} headingName 対象の見出しスタイル名
 * @param {number} duration 処理時間(秒)
 * @returns {string} アラート表示用のメッセージ
 */
function buildResultMessage(insertedCount, foundCount, headingName, duration) {
    const headingLevelName = `「${headingName}」スタイル (見出し ${TARGET_HEADING_LEVEL})`;

    if (insertedCount > 0) {
        return `${insertedCount} 箇所の ${headingLevelName} の前に改ページを挿入しました。\n\n処理時間: ${duration.toFixed(2)} 秒`;
    } else if (foundCount > 0) {
        return `${headingLevelName} は ${foundCount} 箇所で見つかりましたが、改ページは挿入されませんでした。\n(見出しが先頭にあるか、既に改ページが存在するため)\n\n処理時間: ${duration.toFixed(2)} 秒`;
    } else {
        return `${headingLevelName} が適用された要素が見つかりませんでした。\n\n以下の点を確認してください:\n`
             + `1. 設定値 (${TARGET_HEADING_LEVEL}) は正しいですか？\n`
             + `2. 対象テキストに [表示形式] > [段落スタイル] から正しい見出しスタイルが適用されていますか？\n`
             + `3. スクリプトの権限は承認されていますか？`;
    }
}
 ```