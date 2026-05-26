# 🚀 StintikVPN — Интернет свобода ближе чем кажется

<div align="center">

**🇷🇺 Русский** | [🇬🇧 English](ReadMe_EN.md) | [🇨🇳 中文](ReadMe_CN.md) | [🇮🇷 فارسی](ReadMe_IR.md)

</div>

**StintikVPN** автоматически собирает, проверяет и обновляет конфиги для обхода блокировок в России.  
Вам не нужно ничего настраивать — просто берите готовые ссылки и вставляйте в ваш VPN-клиент.

[![GitHub stars](https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN-/watchers)

---

## 📑 Навигация

- [🚀 Как пользоваться](#-как-пользоваться)
- [📱 Рекомендуемые VPN-клиенты](#-рекомендуемые-vpn-клиенты)
- [🏴‍☠️ Чёрные и белые списки (Для чего и что это такое?) ](#️-чёрные-и-белые-списки-–-что-это-и-когда-использовать)
- [📡 Подробнее о белых списках: SNI и CIDR](#-подробнее-о-белых-списках-sni-и-cidr)
- [🛠️ Протоколы – что лучше и для чего](#️-протоколы-–-что-лучше-для-чего)
- [📦 VPN подписки](#-готовые-подписки)
- [🤖 Telegram прокси (MTProto)](#-telegram-прокси-mtproto)
- [🔗 Зеркала StintikVPN](#-зеркала)
- [❓ Часто задаваемые вопросы](#-часто-задаваемые-вопросы-faq)
- [⚠️ Важное предупреждение](#️-важное-предупреждение)
- [🌊 Техническая часть проекта)](#-для-более-продвинутых-внутренности-проекта)
- [💰 Поддержать проект](#-поддержать-проект)

---

## 🚀 Как пользоваться

1. Скопируйте нужную ссылку из раздела «Готовые подписки».
2. Вставьте её в ваш VPN-клиент через кнопку **«Добавить подписку»** или **«Импорт из буфера обмена»**.
3. Обновите список → выберите сервер → подключитесь.

---

## 📱 Рекомендуемые VPN-клиенты

| Устройство | Клиент | Ссылка |
|:---|:---|:---|
| **Windows** | Hiddify / v2rayN | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [v2rayN](https://github.com/2dust/v2rayN/releases) |
| **Android** | Incy / NekoBox | [Incy](https://play.google.com/store/apps/details?id=com.glarimy.incy) / [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **Android TV** | NekoBox (TV версия) | [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **iOS / iPadOS** | Streisand / V2Box | [Streisand](https://apps.apple.com/app/streisand/id6450534064) / [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **Linux** | Hiddify / NekoRay | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [NekoRay](https://github.com/MatsuriDayo/nekoray/releases) |
| **macOS** | Hiddify / Streisand | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [Streisand](https://apps.apple.com/app/streisand/id6450534064) |

---

## 🏴‍☠️ Чёрные и белые списки – что это и когда использовать

- **🏴 Чёрные списки** – для обычного интернета (домашний Wi‑Fi, кабель, 4G без жёстких блокировок).  
  Конфиги проверяются на скорость и стабильность. Подходят для YouTube, Discord, Telegram, Instagram, ChatGPT, когда провайдер ещё не включил «белые списки».

- **🏳️ Белые списки** – для жёстких блокировок (мобильный интернет, когда провайдер включает «белые списки» и разрешает только сайты из списка РКН).  
  Конфиги из белых списков маскируются под легитимные российские сервисы (Yandex, VK, Gosuslugi и др.). **Рекомендуется использовать только при включённых белых списках провайдера.**

**Как выбрать?**  
Начните с чёрного списка. Если YouTube / Discord не открываются — переключайтесь на белый. Если белый список работает, но тормозит – попробуйте другие протоколы или смените страну (в папке `checked/countries/`).

---

## 📡 Подробнее о белых списках: SNI и CIDR

Внутри белых списков есть три типа файлов. Вот что они означают:

- **white.all.txt** – обычные рабочие конфиги. Подходят для большинства ситуаций.

- **white.sni.txt** – конфиги с **валидным SNI**.  
  *Что такое SNI?* SNI (Server Name Indication) – это имя сервера, которое ваш клиент передаёт при подключении. DPI-системы провайдера проверяют SNI и блокируют подозрительные. Конфиги с валидным SNI маскируются под обычный сайт (например, «yandex.ru») и проходят блокировку. Если обычные белые списки работают плохо – попробуйте SNI‑версию.

- **white.cidr.txt** – конфиги с **CIDR-масками**.  
  *Что такое CIDR?* CIDR (Classless Inter-Domain Routing) – способ записи целых подсетей (например, `192.168.0.0/16`). Некоторые провайдеры блокируют не отдельные IP, а целые диапазоны. Конфиги с CIDR-масками могут обходить такие блокировки, так как указывают не конкретный IP, а подсеть. Если ваш IP попал под массовую блокировку – пробуйте CIDR‑версию.

---

## 🛠️ Протоколы – что лучше для чего

- **VLESS (с Reality)** – **лучший для обхода блокировок**. Самый современный, хорошо маскируется. Рекомендуем начинать с него.
- **VLESS (обычный)** – быстрее, но чуть хуже маскируется. Если Reality не работает – пробуйте этот.
- **VMess** – более старый, но очень надёжный. Работает почти везде, но может быть чуть медленнее.
- **Trojan** – хорош для маскировки, часто работает там, где VLESS не проходит.
- **Shadowsocks** – лёгкий и быстрый. Подойдёт, если нужна просто скорость, а блокировки не очень жёсткие.

**Совет:** Если не знаете, что выбрать – берите **VLESS (Reality)**. Если не работает – пробуйте Trojan или обычный VLESS.

---

## 📦 Готовые подписки

### ⚫ Чёрный список (основной)
[`checked/black/black.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/black/black.txt) – около 300 серверов, лучший баланс скорости и стабильности.

### 📱 Black Mobile (50 лучших без Anycast)
[`black_mobile.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/black_mobile.txt) – 50 лучших серверов для мобильных устройств (отфильтрованы от Anycast/CDN)

### ⚪ Белые списки
- [`checked/white/white.all.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.all.txt) – все рабочие конфиги (~150 серверов)
- [`checked/white/white.sni.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.sni.txt) – конфиги с валидным SNI (лучше маскируются)
- [`checked/white/white.cidr.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.cidr.txt) – конфиги с CIDR-масками (для обхода блокировок целых подсетей)

### 🛠️ По протоколам
- **VLESS (Reality)**: [`checked/protocols/vless.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vless.txt)
- **VMess**: [`checked/protocols/vmess.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vmess.txt)
- **Trojan**: [`checked/protocols/trojan.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/trojan.txt)
- **Shadowsocks**: [`checked/protocols/ss.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/ss.txt)

### 🌍 По странам

<details>
<summary>🗺️ Нажмите, чтобы открыть подписки по странам</summary>

| Страна | Файл | Ссылка |
|:---:|:---|:---|
| 🇷🇺 Россия | `RU.txt` | [`checked/countries/RU.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/RU.txt) |
| 🇺🇸 США | `US.txt` | [`checked/countries/US.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/US.txt) |
| 🇩🇪 Германия | `DE.txt` | [`checked/countries/DE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/DE.txt) |
| 🇳🇱 Нидерланды | `NL.txt` | [`checked/countries/NL.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/NL.txt) |
| 🇫🇮 Финляндия | `FI.txt` | [`checked/countries/FI.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/FI.txt) |
| 🇸🇪 Швеция | `SE.txt` | [`checked/countries/SE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/SE.txt) |
| 🇫🇷 Франция | `FR.txt` | [`checked/countries/FR.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/FR.txt) |
| 🇪🇸 Испания | `ES.txt` | [`checked/countries/ES.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/ES.txt) |
| 🇮🇹 Италия | `IT.txt` | [`checked/countries/IT.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/IT.txt) |
| 🇦🇹 Австрия | `AT.txt` | [`checked/countries/AT.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/AT.txt) |
| 🇨🇭 Швейцария | `CH.txt` | [`checked/countries/CH.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/CH.txt) |
| 🇳🇴 Норвегия | `NO.txt` | [`checked/countries/NO.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/NO.txt) |
| 🇮🇪 Ирландия | `IE.txt` | [`checked/countries/IE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/IE.txt) |
| 🇪🇪 Эстония | `EE.txt` | [`checked/countries/EE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/EE.txt) |
| 🇱🇻 Латвия | `LV.txt` | [`checked/countries/LV.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/LV.txt) |
| 🇱🇹 Литва | `LT.txt` | [`checked/countries/LT.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/LT.txt) |
| 🇹🇷 Турция | `TR.txt` | [`checked/countries/TR.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/TR.txt) |
| 🇦🇪 ОАЭ | `AE.txt` | [`checked/countries/AE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/AE.txt) |
| 🇯🇵 Япония | `JP.txt` | [`checked/countries/JP.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/JP.txt) |
| 🇰🇷 Южная Корея | `KR.txt` | [`checked/countries/KR.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/KR.txt) |
| 🇮🇳 Индия | `IN.txt` | [`checked/countries/IN.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/IN.txt) |
| 🇹🇭 Таиланд | `TH.txt` | [`checked/countries/TH.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/TH.txt) |
| 🇨🇾 Кипр | `CY.txt` | [`checked/countries/CY.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/CY.txt) |
| 🇹🇼 Тайвань | `TW.txt` | [`checked/countries/TW.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/TW.txt) |

</details>

<details>
<summary>🤝 СНГ (кроме России)</summary>

| Страна | Файл | Ссылка |
|:---:|:---|:---|
| 🇰🇿 Казахстан | `KZ.txt` | [`checked/countries/KZ.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/KZ.txt) |
| 🇺🇦 Украина | `UA.txt` | [`checked/countries/UA.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/UA.txt) |
| 🇬🇪 Грузия | `GE.txt` | [`checked/countries/GE.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/GE.txt) |
| 🇲🇩 Молдова | `MD.txt` | [`checked/countries/MD.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/MD.txt) |

> Остальные страны СНГ (Беларусь, Армения, Азербайджан, Таджикистан, Туркменистан, Узбекистан) пока не имеют достаточного количества серверов.

</details>

<details>
<summary>🏴‍☠️ Другие страны</summary>

| Описание | Файл | Ссылка |
|:---|:---|:---|
| 🏴‍☠️ Неопределённые / Другие | `XX.txt` | [`checked/countries/XX.txt`](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/countries/XX.txt) |

> Полный список всех доступных стран смотрите в папке [`checked/countries/`](https://github.com/Stintik-123/StintikVPN-/tree/main/checked/countries).

</details>

---

## 🤖 Telegram прокси (MTProto)

> Последнее обновление: **26.05.2026**

<!-- TG_PROXY_SECTION_START -->
<details>
<summary>🔓 Нажмите, чтобы открыть доступные Telegram прокси</summary>

| # | Сервер | Порт | Подключить |
|:---:|:---|:---:|:---:|
| 1 | `87.242.100.25` | `443` | [🔗 Добавить](https://t.me/proxy?server=87.242.100.25&port=443&secret=eefa41d7ab59231ab714b7865c9016a1356164732e78352e7275) |

</details>
<!-- TG_PROXY_SECTION_END -->

---

## 🔗 Зеркала

GitLab - https://gitlab.com/Stintik-123/StintikVPN



---

## ❓ Часто задаваемые вопросы (FAQ)

**1. Подписка не работает / очень медленно. Что делать?**  
Обновите список в клиенте (кнопка «Обновить подписку»). Если не помогло – попробуйте сменить протокол (например, с VLESS на Trojan) или страну в папке `checked/countries/`. Иногда помогает смена клиента (например, с Hiddify на NekoBox).

**2. Как часто обновляются конфиги?**  
Скрипт запускается автоматически каждый день. Все ссылки в README всегда ведут на свежие версии.

**3. Белые списки – когда они реально нужны?**  
Только когда ваш мобильный оператор (МТС, Билайн, Tele2 и др.) включает режим «белых списков» – тогда перестают открываться большинство сайтов и приложений. В такой ситуации обычные чёрные списки не работают, и только белые списки помогают оставаться онлайн.

**4. Какой клиент проще всего для новичка?**  
**Hiddify** – самый простой интерфейс и автопоиск лучшего сервера. Для Windows и Android подходит одинаково хорошо. На iOS – **Streisand**.

**5. Что делать, если Telegram прокси не подключается?**  
Прокси берутся из открытых источников и могут умирать. Просто подождите следующего автоматического обновления (раз в сутки) или следите за [Telegram-каналом](https://t.me/StintikVPN) – там публикуются свежие.

---

## ⚠️ Важное предупреждение

> Все конфиги собраны из публичных открытых источников поэтому **работоспособность не гарантирована на 100%** – многое зависит от провайдера и региона
> **Запрещено** использовать эти конфиги в противоправных действиях, нарушающих законодательство вашей страны 
> Создатель проекта **не несёт ответственности** за ваши действия. Используя подписки, вы подтверждаете, что не нарушаете закон вашей страны

---

## ⚡ Дополнительные гайды по обходу блокировок:

Скоро....

---

## 💰 Поддержать проект

Поддержка и развитие StintikVPN требует много сил и времени если вы хотите поддержать проект вы можете закинуть денег мне на покушать либо просто поставить звезду ⭐ на репозиторий 

**Карта для поддержки:** `79960694715` (Озон)

---

*StintikVPN – сделано людьми для людей*
