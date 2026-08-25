# 🚀 StintikVPN — آزادی اینترنت نزدیک‌تر از آن چیزی است که به نظر می‌رسد

<div align="center">

[🇷🇺 Русский](README.md) | [🇬🇧 English](ReadMe_EN.md) | [🇨🇳 中文](ReadMe_CN.md) | **🇮🇷 فارسی**

</div>

**StintikVPN** — مجموعه‌ای از بهترین اشتراک‌های رایگان VPN. نیازی به تنظیمات نیست: فقط لینک را کپی کنید، در کلاینت VPN قرار دهید و استفاده کنید.

[![GitHub stars](https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/watchers)

---

## 📑 فهرست

- [🚀 نحوه استفاده](#-نحوه-استفاده)
- [📱 کلاینت‌های پیشنهادی VPN](#-کلاینت‌های-پیشنهادی-vpn)
- [🏴‍☠️ لیست‌های سیاه و سفید](#-لیست‌های-سیاه-و-سفید--چیست-و-کی-استفاده-شود)
- [📡 بیشتر درباره لیست‌های سفید: SNI و CIDR](#-بیشتر-درباره-لیست‌های-سفید-sni-و-cidr)
- [🛠️ پروتکل‌ها – کدام بهتر و برای چیست](#-پروتکلها-–-کدام-بهتر-و-برای-چیست)
- [📦 اشتراک‌های VPN](#-اشتراکهای-vpn)
- [🤖 پروکسی تلگرام](#-پروکسی-تلگرام)
- [🔗 آینه‌های پروژه StintikVPN](#-آینه‌های-پروژه-stintikvpn)
- [❓ سوالات متداول](#-سوالات-متداول-faq)
- [⚠️ هشدار مهم](#-هشدار-مهم)
- [💰 حمایت از پروژه](#-حمایت-از-پروژه)

---

## 🚀 نحوه استفاده

1. لینک مورد نظر را از بخش «اشتراک‌های آماده» کپی کنید.
2. آن را در کلاینت VPN خود از طریق دکمه **«Add Subscription»** یا **«Import from clipboard»** قرار دهید.
3. دکمه «Ping» را بزنید → یک سرور زنده انتخاب کنید → وصل شوید.

---

## 📱 کلاینت‌های پیشنهادی VPN

| دستگاه           | کلاینت                         | لینک |
|:-----------------|:-------------------------------|:-----|
| **Windows**      | Hiddify / v2rayN               | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [v2rayN](https://github.com/2dust/v2rayN/releases) |
| **Android**      | Hiddify / v2rayNG              | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) / [v2rayNG](https://github.com/2dust/v2rayNG/releases) |
| **iOS / iPadOS** | Streisand / V2Box              | [Streisand](https://apps.apple.com/app/streisand/id6450534064) / [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **Linux**        | Hiddify / NekoRay              | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [NekoRay](https://github.com/MatsuriDayo/nekoray/releases) |
| **macOS**        | Hiddify / Streisand            | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [Streisand](https://apps.apple.com/app/streisand/id6450534064) |

---

## 🏴‍☠️ لیست‌های سیاه و سفید – چیست و کی استفاده شود

- **🏴 لیست سیاه** — برای اینترنت معمولی (Wi-Fi خانگی، کابل، 4G بدون محدودیت شدید).  
- **🏳️ لیست سفید** — برای محدودیت‌های شدید (اینترنت موبایل زمانی که «لیست سفید» RKN فعال است).

---

## 📡 بیشتر درباره لیست‌های سفید: SNI و CIDR

- **White SNI** اشتراک با فیلتر SNI ترافیک را بر اساس نام متنی وب‌سایت‌ها فیلتر می‌کند (مثلاً youtube.com).
- **White CIDR** — اشتراک با فیلتر CIDR ترافیک را بر اساس محدوده IP عددی فیلتر می‌کند (مثلاً 173.194.0.0/16)

**به زبان ساده: اگر SNI کار نمی‌کند از CIDR استفاده کنید، اگر CIDR کار نمی‌کند از SNI استفاده کنید.**

---

## 🛠️ پروتکل‌ها – کدام بهتر و برای چیست

- **VLESS** — بهترین از نظر سرعت و پنهان‌کاری، اما اخیراً در قابلیت اطمینان ضعیف شده، RKN به طور فعال آن را مسدود می‌کند.
- **Trojan** — پنهان‌کاری خوب.
- **VMess** — قابل اعتمادترین پروتکل از بین همه.
- **Shadowsocks** — حداکثر سرعت (توصیه شده برای بازی‌های آنلاین).

---

## 📦 اشتراک‌های VPN

### 🏴 لیست سیاه (اصلی)
```
https://gitverse.ru/api/repos/Akres/VPN/raw/branch/master/all
```

### 👑 Black Mobile (مخصوص موبایل)
```
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt
```

### 🏳️ لیست سفید (اصلی)
```
https://raw.githubusercontent.com/flaafix/AetrisVPN-white-list-lite/refs/heads/main/AetrisVPN.txt
```

### لیست سفید (CIDR)
```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt
```

### لیست سفید (SNI)
```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt
```

---

## 🤖 پروکسی تلگرام

> آخرین به‌روزرسانی: **25.08.2026**

لینک مورد نظر را کپی کرده و در تلگرام باز کنید:

1. **path.mtproxy.pw**  
https://t.me/proxy?server=path.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

2. **bridge.mtproxy.pw**  
https://t.me/proxy?server=bridge.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

3. **entry.mtproxy.pw**  
https://t.me/proxy?server=entry.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

4. **open.mtproxy.pw**  
https://t.me/proxy?server=open.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

5. **online.mtproxy.pw**  
https://t.me/proxy?server=online.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

6. **safe.mtproxy.pw**  
https://t.me/proxy?server=safe.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

7. **private.mtproxy.pw**  
https://t.me/proxy?server=private.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

8. **public.mtproxy.pw**  
https://t.me/proxy?server=public.mtproxy.pw&port=443&secret=ee3f8a91c2d7e04b6a9f12c5e8370bd4aa786170692e6f7a6f6e2e7275

---

## 🔗 آینه‌های پروژه StintikVPN

- **GitLab**: https://gitlab.com/Stintik-123/StintikVPN
- **GitVerse**: https://gitverse.ru/Stintik-123/StintikHub
- **Codeberg**: https://codeberg.org/Stintik-123/StintikVPN

---

## ❓ سوالات متداول (FAQ)

**1. اشتراک کار نمی‌کند یا خیلی کند است.**  
اشتراک را در کلاینت به‌روزرسانی کنید (دکمه «Update»). پروتکل یا سرور را عوض کنید. گاهی اوقات راه‌اندازی مجدد کلاینت یا تغییر Wi-Fi/اینترنت موبایل کمک می‌کند.

**2. هر چند وقت یکبار کانفیگ‌ها به‌روز می‌شوند؟**  
کانفیگ‌ها روزانه توسط سازندگانشان به‌روز می‌شوند. لینک‌های README همیشه به نسخه‌های جدید اشاره دارند.

**3. چه زمانی باید از لیست سفید استفاده کرد؟**  
فقط زمانی که اپراتور موبایل شما «لیست سفید» RKN را فعال کرده است — و سایت‌های عادی باز نمی‌شوند.

**4. کدام کلاینت برای مبتدی بهترین است؟**  
**Hiddify** — راحت‌ترین و قابل‌فهم‌ترین. برای Windows و Android توصیه می‌شود. در iOS — **Streisand**.

**5. اگر پروکسی تلگرام وصل نشد چه کار کنم؟**  
پروکسی‌ها اغلب از کار می‌افتند. فقط یکی دیگر از لیست را امتحان کنید.

**6. آیا می‌توان از یک اشتراک در چند دستگاه استفاده کرد؟**  
بله، بیشتر اشتراک‌ها از اتصال همزمان چند دستگاه پشتیبانی می‌کنند.

**7. استفاده از این کانفیگ‌ها امن است؟**  
کانفیگ‌ها از منابع باز جمع‌آوری شده‌اند. توصیه می‌شود داده‌های حساس را از طریق آنها منتقل نکنید.

---

## ⚠️ هشدار مهم

تمامی کانفیگ‌ها از منابع باز جمع‌آوری شده‌اند. کارایی **تضمینی ۱۰۰٪** نیست.  
استفاده در اهداف غیرقانونی ممنوع است. نویسنده پروژه مسئولیتی در قبال اعمال شما ندارد.

---

## 💰 حمایت از پروژه

حمایت و توسعه StintikVPN زمان و انرژی زیادی می‌برد، بنابراین اگر می‌خواهید به پروژه کمک کنید، می‌توانید برای خوراک من پول واریز کنید یا فقط ⭐ ستاره به مخزن بدهید — این رایگان است و به شدت به پروژه کمک می‌کند.

**کارت:** `79960694715` (Ozon)

---

*StintikVPN — ساخته شده توسط مردم برای مردم*
