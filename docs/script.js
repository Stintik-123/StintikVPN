(function(){
  "use strict";

  // === ПРОСТОЙ ПРЕЛОАДЕР — ГАРАНТИРОВАННО ИСЧЕЗНЕТ ===
  window.addEventListener('load', function() {
    setTimeout(function() {
      var preloader = document.getElementById('preloader');
      if (preloader) {
        preloader.classList.add('hidden');
        setTimeout(function() {
          if (preloader.parentNode) {
            preloader.parentNode.removeChild(preloader);
          }
        }, 500);
      }
    }, 1000); // Минимум 1 секунда показываем
  });

  // Защита от зависания — через 3 секунды точно уберём
  setTimeout(function() {
    var preloader = document.getElementById('preloader');
    if (preloader) {
      preloader.classList.add('hidden');
      if (preloader.parentNode) {
        preloader.parentNode.removeChild(preloader);
      }
    }
  }, 3000);

  // === ОСТАЛЬНОЙ КОД ===
  const translations = {
    ru: {
      copy_btn: "⧉ Копировать",
      check_btn: "🔄 Проверить",
      report_btn: "⚠ Пожаловаться",
      checking: "⏳ Проверка...",
      works: "✅ Работает",
      fails: "🔴 Не работает",
      copied: "✓ Скопировано"
    },
    en: {
      copy_btn: "⧉ Copy",
      check_btn: "🔄 Check",
      report_btn: "⚠ Report",
      checking: "⏳ Checking...",
      works: "✅ Works",
      fails: " Fails",
      copied: "✓ Copied"
    }
  };
  let currentLang = localStorage.getItem('lang') || 'ru';

  // Тема
  const themeBtn = document.querySelector('.theme-toggle');
  if (themeBtn) {
    themeBtn.addEventListener('click', function() {
      document.body.classList.toggle('light-theme');
      localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
      themeBtn.innerHTML = document.body.classList.contains('light-theme') ? '☀️' : '';
    });
  }

  // Мобильное меню
  const navLinks = document.querySelector('.nav-links');
  if (navLinks) {
    const btn = document.createElement('button');
    btn.className = 'nav-icon hamburger';
    btn.innerHTML = '☰';
    btn.addEventListener('click', function() {
      navLinks.classList.toggle('open');
    });
    const navRight = document.querySelector('.nav-right');
    if (navRight) navRight.prepend(btn);
  }

  // Подписки
  const subscriptions = [
    { id:"black-main", cat:"black", name:"🏴 Чёрный список (основной)", desc:"Для обычного интернета.", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt" },
    { id:"black-backup", cat:"black", name:" Чёрный список (запасной)", desc:"Альтернативный источник.", url:"https://vpn.akres.fun/all" },
    { id:"black-mobile", cat:"black", name:" Black Mobile", desc:"20 лучших серверов для телефонов.", url:"https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt" },
    { id:"white-main", cat:"white", name:"🏳️ Белые списки", desc:"Для жёстких блокировок.", url:"https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt" },
    { id:"proto-vless", cat:"protocol", name:"⚡ VLESS", desc:"Лучший по скорости.", url:"https://mifa.world/vless" },
    { id:"proto-vmess", cat:"protocol", name:"🔒 VMess", desc:"Самый надёжный.", url:"https://mifa.world/vmess" }
  ];

  const subGrid = document.getElementById("subGrid");
  const skeletonGrid = document.getElementById("skeletonGrid");
  
  function renderSubs(filter) {
    if (!subGrid) return;
    subGrid.innerHTML = "";
    
    subscriptions.forEach(sub => {
      if (filter !== "all" && sub.cat !== filter) return;
      
      const card = document.createElement("div");
      card.className = "sub-card appear";
      card.id = "card-" + sub.id;
      
      card.innerHTML = `
        <h3>${sub.name}</h3>
        <div class="status-badge checking">⏳ Проверка...</div>
        <p>${sub.desc}</p>
        <code>${sub.url}</code>
        <div class="sub-actions-row">
          <button class="btn btn-primary copy-btn" data-url="${sub.url}"> Копировать</button>
          <button class="btn btn-ghost btn-check check-btn" data-url="${sub.url}"> Проверить</button>
        </div>
        <div class="rating-row">
          <button class="rating-btn like-btn">👍 <span>0</span></button>
          <button class="rating-btn dislike-btn">👎 <span>0</span></button>
        </div>
      `;
      
      // Копирование
      card.querySelector(".copy-btn").addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        navigator.clipboard.writeText(url).then(() => {
          this.textContent = "✓ Скопировано";
          setTimeout(() => { this.textContent = "⧉ Копировать"; }, 2000);
        });
      });
      
      // Проверка
      card.querySelector(".check-btn").addEventListener("click", function() {
        const url = this.getAttribute("data-url");
        const badge = card.querySelector('.status-badge');
        badge.textContent = " Проверка...";
        badge.className = "status-badge checking";
        
        fetch(url, { method: 'HEAD', mode: 'no-cors' })
          .then(() => {
            badge.textContent = "✅ Работает";
            badge.className = "status-badge works";
          })
          .catch(() => {
            badge.textContent = "🔴 Не работает";
            badge.className = "status-badge fails";
          });
      });
      
      subGrid.appendChild(card);
    });
  }

  // Показать подписки
  if (skeletonGrid) {
    setTimeout(() => {
      skeletonGrid.style.display = 'none';
      if (subGrid) {
        subGrid.style.display = 'grid';
        renderSubs("all");
      }
    }, 500);
  }

  // Табы
  document.querySelectorAll(".tab[data-filter]").forEach(tab => {
    tab.addEventListener("click", function() {
      document.querySelectorAll(".tab").forEach(t => t.classList.remove("active"));
      this.classList.add("active");
      renderSubs(this.getAttribute("data-filter"));
    });
  });

  // Звёзды GitHub
  fetch("https://api.github.com/repos/Stintik-123/StintikVPN")
    .then(r => r.json())
    .then(data => {
      const starsEl = document.getElementById("statStars");
      if (starsEl && data.stargazers_count) {
        starsEl.textContent = data.stargazers_count;
      }
    })
    .catch(() => {
      const starsEl = document.getElementById("statStars");
      if (starsEl) starsEl.textContent = "—";
    });

  // Количество подписок
  const statSubs = document.getElementById('statSubs');
  if (statSubs) statSubs.textContent = subscriptions.length;

})();
