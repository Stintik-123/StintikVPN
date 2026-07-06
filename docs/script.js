(function(){
  "use strict";

  /* ---------- прелоадер: запускается первым, независимо от остального кода ---------- */
  (function preloader(){
    var el = document.getElementById("preloader");
    if (!el) return;
    var hidden = false;
    var startedAt = Date.now();
    var MIN_VISIBLE = 800; // Уменьшено для быстрее загрузки
    function hide(){
      if (hidden) return; hidden = true;
      var wait = Math.max(0, MIN_VISIBLE - (Date.now() - startedAt));
      setTimeout(function(){
        el.classList.add("hidden");
        setTimeout(function(){ if (el.parentNode) el.parentNode.removeChild(el); }, 450);
      }, wait);
    }
    window.addEventListener("load", hide);
    setTimeout(hide, 2000); // Быстрее
  })();

  // Rest of the code remains the same, but I'll need to include full or use edit
