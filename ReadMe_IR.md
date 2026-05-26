# 🇮🇷 StintikVPN — آزادی اینترنت نزدیک‌تر از آن چیزی است که فکر می‌کنید

<div align="center">

[**🇷🇺 Русский**](README.md) | [**🇬🇧 English**](ReadMe_EN.md) | [**🇨🇳 中文**](ReadMe_CN.md) | **🇮🇷 فارسی**

</div>

**StintikVPN** به‌طور خودکار پیکربندی‌ها را برای دور زدن سانسور در روسیه جمع‌آوری، تأیید و به‌روزرسانی می‌کند.  
نیازی به تنظیم هیچ چیز ندارید — فقط لینک‌های آماده را بگیرید و در کلاینت VPN خود وارد کنید.

[![GitHub stars](https://img.shields.io/github/stars/Stintik-123/StintikVPN-?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Stintik-123/StintikVPN-?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Stintik-123/StintikVPN-?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/watchers)

---

## 📑 ناوبری

- [🚀 نحوه استفاده](#-نحوه-استفاده)
- [📱 کلاینت‌های VPN پیشنهادی](#-کلاینتهای-vpn-پیشنهادی)
- [📦 اشتراک‌های آماده](#-اشتراکهای-آماده)
- [🤖 پروکسی‌های تلگرام (MTProto)](#-پروکسیهای-تلگرام-mtproto)
- [⚠️ هشدار مهم](#️-هشدار-مهم)
- [💰 حمایت از پروژه](#-حمایت-از-پروژه)

---

## 🚀 نحوه استفاده

1. لینک مورد نظر را از بخش "اشتراک‌های آماده" کپی کنید.
2. آن را از طریق **"افزودن اشتراک"** یا **"وارد کردن از کلیپ‌بورد"** در کلاینت VPN خود وارد کنید.
3. لیست را به‌روزرسانی کنید → سرور را انتخاب کنید → متصل شوید.

---

## 📱 کلاینت‌های VPN پیشنهادی

| دستگاه | کلاینت | لینک |
|:---|:---|:---|
| **Windows** | Hiddify / v2rayN | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [v2rayN](https://github.com/2dust/v2rayN/releases) |
| **Android** | Incy / NekoBox | [Incy](https://play.google.com/store/apps/details?id=com.glarimy.incy) / [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **Android TV** | NekoBox (نسخه TV) | [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **iOS / iPadOS** | Streisand / V2Box | [Streisand](https://apps.apple.com/app/streisand/id6450534064) / [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **Linux** | Hiddify / NekoRay | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [NekoRay](https://github.com/MatsuriDayo/nekoray/releases) |
| **macOS** | Hiddify / Streisand | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [Streisand](https://apps.apple.com/app/streisand/id6450534064) |

---

## 📦 اشتراک‌های آماده

### ⚫ لیست سیاه (اصلی)
[`checked/black/black.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/black/black.txt) – حدود 300 سرور، بهترین تعادل سرعت و پایداری.

### ⚪ لیست‌های سفید
- [`checked/white/white.all.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.all.txt) – همه پیکربندی‌های فعال (~150 سرور)
- [`checked/white/white.sni.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.sni.txt) – پیکربندی‌های با SNI معتبر (پوشش بهتر)
- [`checked/white/white.cidr.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.cidr.txt) – پیکربندی‌های با ماسک CIDR (برای دور زدن مسدودیت زیرشبکه‌ها)

### 🛠️ بر اساس پروتکل‌ها
- **VLESS (Reality)**: [`checked/protocols/vless.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vless.txt)
- **VMess**: [`checked/protocols/vmess.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vmess.txt)
- **Trojan**: [`checked/protocols/trojan.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/trojan.txt)
- **Shadowsocks**: [`checked/protocols/ss.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/ss.txt)

### 🌍 بر اساس کشورها
پوشه [`checked/countries/`](https://github.com/Stintik-123/StintikVPN-/tree/main/checked/countries) را ببینید – فایل‌هایی برای روسیه (RU)، آمریکا (US)، آلمان (DE)، هلند (NL) و سایر کشورها.

---

## 🤖 پروکسی‌های تلگرام (MTProto)

> آخرین به‌روزرسانی: **به‌روزرسانی خودکار روزانه**

<!-- TG_PROXY_SECTION_START -->
<details>
<summary>🔓 کلیک برای نمایش پروکسی‌های تلگرام موجود</summary>

| # | سرور | پورت | اتصال |
|:---:|:---|:---:|:---:|
| *هیچ پروکسی فعالی وجود ندارد* – بعداً بررسی کنید یا پروکسی خود را اضافه کنید |

</details>
<!-- TG_PROXY_SECTION_END -->

---

## ⚠️ هشدار مهم

> همه پیکربندی‌ها از منابع عمومی باز جمع‌آوری شده‌اند. **عملکرد 100٪ تضمین نمی‌شود** – многое зависит от вашего провайдера и региона.  
> **ممنوع است** استفاده از این پیکربندی‌ها برای فعالیت‌های غیرقانونی که نقض قوانین فدراسیون روسیه است.  
> خالق پروژه **مسئول اقدامات شما نیست**. با استفاده از لینک‌ها، تأیید می‌کنید که قانون را نقض نمی‌کنید.

---

## 💰 حمایت از پروژه

این پروژه با اشتیاق اداره می‌شود. اگر آن را مفید می‌دانید – در GitHub یک ⭐ ستاره بدهید، رایگان است و واقعاً کمک می‌کند.

**کارت برای حمایت:** `79960694715` (Ozon)

---

*StintikVPN – ساخته شده توسط مردم برای مردم*
