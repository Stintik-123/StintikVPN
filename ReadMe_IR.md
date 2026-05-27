# 🚀 StintikVPN — آزادی اینترنت نزدیک‌تر از آن چیزی است که به نظر می‌رسد

<div align="center">

[🇷🇺 Русский](ReadMe.md) | [🇬🇧 English](ReadMe_EN.md) | [🇨🇳 中文](ReadMe_CN.md) | **🇮🇷 فارسی**

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
- [🤖 پروکسی تلگرام](#-پروکسی-تلگرام-mtproto--socks5)
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
| **Android**      | Incy / NekoBox                 | [Incy](https://play.google.com/store/apps/details?id=com.glarimy.incy) / [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **Android TV**   | NekoBox (نسخه TV)              | [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
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
https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt

### 🏴 لیست سیاه (ذخیره)
https://vpn.akres.fun/all

### 👑 Black Mobile (20 بهترین سرور مخصوص موبایل)
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt

### 🏳️ لیست سفید (اصلی)
https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt
### لیست سفید (CIDR)
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt
### لیست سفید (SNI)
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt

### 🛠️ بر اساس پروتکل
- **VLESS**: https://mifa.world/vless
- **VMess**: https://mifa.world/vmess
- **Trojan**: https://mifa.world/trojan
- **Shadowsocks**: https://mifa.world/ss

---

## 🤖 پروکسی تلگرام (MTProto + SOCKS5)

> آخرین به‌روزرسانی: **27.05.2026**

**لینک مورد نظر را کپی کرده و متصل شوید**

**1. SOCKS5**  
`84.201.182.112:1080`  
- https://t.me/socks?server=84.201.182.112&port=1080&user=86XFhWe7j9&pass=e4GwQtyVaZ

**2. MTProto**  
`46.243.235.29:853`  
- https://t.me/proxy?server=46.243.235.29&port=853&secret=ee534adcf23a16f425cbae129c4cb574cb6164732e78352e7275

**3. MTProto**  
`?`  
- https://t.me/proxy?server=de4.kael.fuckrkn.net&port=443&secret=ee1a499af9a7a18282da82e30714402e157777772e6165726f666c6f742e7275

**4. MTProto**  
`mtp1.sosproxy.space:443`  
- https://t.me/proxy?server=mtp1.sosproxy.space&port=443&secret=ee806bfea72377dacb92438b5f330856b464726976652e676f6f676c652e636f6d

**5. MTProto**  
`adsl.myrka.digital:443`  
- https://t.me/proxy?server=adsl.myrka.digital&port=443&secret=ee6e2443fe7f5904ff5ceded8d76f02ea268312e6d79726b612e6469676974616c

**6. MTProto**  
`95.163.176.204:2083` 
- https://t.me/proxy?server=95.163.176.204&port=2083&secret=ee93143b0fadcd4c8a99164fd3e819987f636f666665652e73616d6172617765622e74656368

**7. MTProto**  
`89.169.32.31:2083`  
- https://t.me/proxy?server=89.169.32.31&port=2083&secret=eea2b102b138450e1e33e7dc460ad967e8636f666665652e73616d6172617765622e74656368

---

## 🔗 آینه‌های پروژه StintikVPN

- **GitLab**: [https://gitlab.com/Stintik-123/StintikVPN](https://gitlab.com/Stintik-123/StintikVPN)

---

## ❓ سوالات متداول (FAQ)

**1. اشتراک کار نمی‌کند یا خیلی کند است.**  
اشتراک را در کلاینت به‌روزرسانی کنید (دکمه «Update»). پروتکل (VLESS Reality → Trojan) یا سرور را عوض کنید. گاهی اوقات راه‌اندازی مجدد کلاینت یا تغییر Wi-Fi/اینترنت موبایل کمک می‌کند.

**2. هر چند وقت یکبار کانفیگ‌ها به‌روز می‌شوند؟**  
کانفیگ‌ها روزانه توسط سازندگانشان به‌روز می‌شوند. لینک‌های README همیشه به نسخه‌های جدید اشاره دارند.

**3. چه زمانی باید از لیست سفید استفاده کرد؟**  
فقط زمانی که اپراتور موبایل شما (MTS, Beeline, Tele2 و غیره) «لیست سفید» RKN را فعال کرده است — و سایت‌های عادی باز نمی‌شوند.

**4. کدام کلاینت برای مبتدی بهترین است؟**  
**Hiddify** — راحت‌ترین و قابل‌فهم‌ترین. برای Windows و Android توصیه می‌شود. در iOS — **Streisand**.

**5. اگر پروکسی تلگرام وصل نشد چه کار کنم؟**  
پروکسی‌ها اغلب از کار می‌افتند. فقط یکی دیگر از لیست را امتحان کنید. آن‌ها به طور منظم به‌روز می‌شوند.

**6. آیا می‌توان از یک اشتراک در چند دستگاه استفاده کرد؟**  
بله، بیشتر اشتراک‌ها از اتصال همزمان چند دستگاه پشتیبانی می‌کنند (بستگی به سرور خاص دارد).

**7. استفاده از این کانفیگ‌ها امن است؟**  
کانفیگ‌ها از منابع باز جمع‌آوری شده‌اند. توصیه می‌شود داده‌های حساس (برنامه‌های بانکی، حساب‌های مهم) را از طریق آنها منتقل نکنید. با مسئولیت خود استفاده کنید.

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
