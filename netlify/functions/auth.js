const { createAuthApp } = require('decap-cms-auth-helper');

// Netlify Functionsは、拡張機能が自動設定した環境変数を process.env 経由で読み込めます。
// このコードは、それらの環境変数を読み込んで、Auth0と通信するための認証サーバーを起動します。
exports.handler = createAuthApp({
  secret: process.env.AUTH0_CLIENT_SECRET, // Netlifyが自動設定
  appID: process.env.AUTH0_CLIENT_ID,     // Netlifyが自動設定
  baseURL: process.env.URL,                 // Netlifyが自動設定するサイトのプライマリURL
  authDomain: process.env.AUTH0_DOMAIN,     // Netlifyが自動設定
});
