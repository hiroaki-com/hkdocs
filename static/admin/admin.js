(function() {
  // プルツーリフレッシュを防止するJavaScript処理
  function preventPullToRefresh() {
    let startY = 0;
    let isScrollable = false;

    document.addEventListener('touchstart', function(e) {
      startY = e.touches[0].pageY;
      // スクロール可能な要素かどうかをチェック
      const target = e.target;
      isScrollable = target.scrollTop > 0 ||
                    target.closest('[class*="EditorContainer"]') ||
                    target.closest('textarea') ||
                    target.closest('[data-slate-editor]') ||
                    target.closest('.cm-editor');
    }, { passive: true });

    document.addEventListener('touchmove', function(e) {
      const currentY = e.touches[0].pageY;
      const deltaY = currentY - startY;

      // ページトップで下方向にスワイプしようとした場合のみ防止
      if (deltaY > 0 && window.scrollY === 0 && !isScrollable) {
        e.preventDefault();
      }
    }, { passive: false });
  }

  // Netlify Identity 初期化
  if (window.netlifyIdentity) {
    window.netlifyIdentity.on("logout", () => { document.location.href = "/admin/"; });
  }

  window.addEventListener('load', preventPullToRefresh);
})();
