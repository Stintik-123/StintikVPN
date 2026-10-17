"use strict";

/* StintikVPN — site logic (v2)
   Single source of data: data.json (subscriptions, TG proxies, updated date). */

var DATA_URL = "data.json";
var DATA = null;

function $(sel, root) { return (root || document).querySelector(sel); }
function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }

/* ---------- init ---------- */

document.addEventListener("DOMContentLoaded", function () {
  initTheme();
  fetch(DATA_URL).then(function (r) { return r.json(); }).then(function (data) {
    DATA = data;
    renderSubscriptions();
    renderProxies();
    renderUpdated();
  }).catch(function () {
    renderUpdated(); /* keep fallback date from HTML */
  });
});

/* ---------- data rendering ---------- */

function renderUpdated() {
  if (!DATA || !DATA.updated) return;
  var el = $("#proxy-date");
  if (el) el.textContent = DATA.updated;
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function renderSubscriptions() {
  var list = $("#sub-list");
  if (!list || !DATA) return;
  list.innerHTML = "";
  DATA.subscriptions.forEach(function (s) {
    var div = document.createElement("div");
    div.className = "sub";
    div.dataset.c = s.category;
    div.innerHTML =
      '<span class="sub-tag tag-' + (s.category === "black" ? "black" : "white") + '">' + esc(s.tag) + "</span>" +
      '<div class="sub-body"><h4>' + esc(s.title) + "</h4><span>" + esc(s.note) + "</span></div>" +
      '<div class="sub-actions">' +
      '<button class="btn btn-sm btn-qr" data-action="qr" data-url="' + esc(s.url) + '">QR</button>' +
      '<button class="btn btn-sm btn-copy" data-action="copy" data-url="' + esc(s.url) + '">Скопировать</button>' +
      '<button class="btn btn-sm btn-share" data-action="share" data-url="' + esc(s.url) + '">Поделиться</button>' +
      "</div>";
    list.appendChild(div);
  });
}

function renderProxies() {
  var list = $("#proxy-list");
  if (!list || !DATA) return;
  list.innerHTML = "";
  DATA.telegram_proxies.forEach(function (p) {
    var url = "https://t.me/proxy?server=" + encodeURIComponent(p.server) + "&port=" + p.port + "&secret=" + p.secret;
    var addr = /^[a-z]/i.test(p.server) ? p.server : p.server + ":" + p.port;
    var div = document.createElement("div");
    div.className = "proxy";
    div.innerHTML =
      '<div class="proxy-left"><span class="proxy-type">MTProto</span><span class="proxy-addr">' + esc(addr) + "</span></div>" +
      '<div class="sub-actions">' +
      '<button class="btn btn-sm btn-qr" data-action="qr" data-url="' + esc(url) + '">QR</button>' +
      '<button class="btn btn-sm btn-copy" data-action="copy" data-url="' + esc(url) + '">Скопировать</button>' +
      '<button class="btn btn-sm btn-share" data-action="share" data-url="' + esc(url) + '">Поделиться</button>' +
      '<a class="btn btn-sm btn-ghost" href="' + esc(url) + '" target="_blank" rel="noopener">Открыть</a>' +
      "</div>";
    list.appendChild(div);
  });
}

/* ---------- one delegated click handler for all buttons ---------- */

document.addEventListener("click", function (e) {
  var btn = e.target.closest("[data-action]");
  if (btn) {
    var url = btn.getAttribute("data-url");
    var act = btn.getAttribute("data-action");
    if (act === "copy") copyUrl(btn, url);
    else if (act === "share") shareUrl(url);
    else if (act === "qr") showQR(url);
    return;
  }
  var filter = e.target.closest(".filter");
  if (filter) { filt(filter.dataset.f); return; }
  var jump = e.target.closest(".filter-jump");
  if (jump) {
    filt(jump.getAttribute("data-f"));
    var s = document.getElementById("subs");
    if (s) s.scrollIntoView({ behavior: "smooth", block: "start" });
    return;
  }
  var faq = e.target.closest(".faq-q");
  if (faq) toggleFaq(faq);
});

function copyUrl(btn, url) {
  copyToClipboard(url).then(function () {
    var original = btn.textContent;
    btn.classList.add("done");
    btn.textContent = "\u2713 Готово";
    setTimeout(function () { btn.classList.remove("done"); btn.textContent = original; }, 1800);
    showToast("\u2713 Скопировано");
  });
}

function shareUrl(url) {
  if (!navigator.share) { showToast("Поделиться недоступно на этом устройстве"); return; }
  navigator.share({ text: url }).catch(function () { /* user closed the menu */ });
}

function showQR(url) {
  var modal = $("#qr-modal");
  var container = $("#qrcode");
  if (!modal || !container) return;
  container.innerHTML = "";
  if (typeof QRCode === "undefined") {
    container.innerHTML = '<p class="qr-fallback">QR-библиотека не загрузилась. Обнови страницу.</p>';
    modal.hidden = false;
    return;
  }
  var isLight = document.body.classList.contains("theme-light");
  try {
    new QRCode(container, {
      text: url, width: 200, height: 200,
      colorDark: isLight ? "#1a1a1e" : "#ececf1",
      colorLight: isLight ? "#ffffff" : "#060608",
      correctLevel: QRCode.CorrectLevel.M
    });
  } catch (e) {
    container.innerHTML = '<p class="qr-fallback">Не удалось сгенерировать QR</p>';
  }
  modal.hidden = false;
}

function closeQR() {
  var modal = $("#qr-modal");
  if (modal) modal.hidden = true;
}

/* ---------- theme / nav / toast / faq / filters ---------- */

function toggleTheme() {
  var body = document.body;
  var isLight = body.classList.contains("theme-light");
  body.classList.toggle("theme-light", !isLight);
  body.classList.toggle("theme-dark", isLight);
  localStorage.setItem("theme", isLight ? "dark" : "light");
}

function initTheme() {
  var saved = localStorage.getItem("theme");
  var prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
  var shouldUseLight = saved === "light" || (saved !== "dark" && prefersLight);
  document.body.classList.toggle("theme-light", shouldUseLight);
  document.body.classList.toggle("theme-dark", !shouldUseLight);
}

function toggleNav() {
  var links = $(".nav-links");
  var ctas = $(".nav-ctas");
  if (links) links.classList.toggle("open");
  if (ctas) ctas.classList.toggle("open");
}

function showToast(message) {
  var toast = $("#toast");
  if (!toast) return;
  toast.textContent = message;
  toast.hidden = false;
  setTimeout(function () { toast.classList.add("show"); }, 10);
  setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () { toast.hidden = true; }, 200);
  }, 1800);
}

function copyToClipboard(text) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    return navigator.clipboard.writeText(text).catch(function () { return legacyCopy(text); });
  }
  return legacyCopy(text);
}

function legacyCopy(text) {
  return new Promise(function (resolve) {
    var t = document.createElement("textarea");
    t.value = text;
    t.setAttribute("readonly", "");
    t.style.position = "fixed";
    t.style.left = "-9999px";
    document.body.appendChild(t);
    t.select();
    try { document.execCommand("copy"); } catch (e) {}
    document.body.removeChild(t);
    resolve();
  });
}

function toggleFaq(btn) {
  var item = btn.parentElement;
  var open = item.classList.contains("open");
  $all(".faq-item").forEach(function (x) { x.classList.remove("open"); });
  if (!open) item.classList.add("open");
}

function filt(cat) {
  $all(".filter").forEach(function (b) { b.classList.toggle("active", b.dataset.f === cat); });
  $all(".sub").forEach(function (r) {
    if (cat === "all") r.classList.remove("hidden");
    else {
      var c = (r.dataset.c || "").split(" ");
      r.classList.toggle("hidden", c.indexOf(cat) === -1);
    }
  });
}

/* smooth anchor scroll for nav links */
$all('a[href^="#"]').forEach(function (a) {
  a.addEventListener("click", function (e) {
    var h = a.getAttribute("href");
    if (!h || h === "#") return;
    var t = document.querySelector(h);
    if (t) { e.preventDefault(); t.scrollIntoView({ behavior: "smooth", block: "start" }); }
  });
});
