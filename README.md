# 🚀 StintikVPN — Интернет свобода ближе чем кажется

<img src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260716_095916_952.jpg" alt="StintikVPN Freedom" width="100%">
  
<div align="center">

**🇷🇺 Русский** | [🇬🇧 English](ReadMe_EN.md) | [🇨🇳 中文](ReadMe_CN.md) | [🇮🇷 فارسی](ReadMe_IR.md)

</div>

**StintikVPN** — сборник лучших бесплатных VPN-подписок. Ничего настраивать не нужно: скопируйте ссылку, вставьте в VPN-клиент и пользуйтесь.

---

## 📑 Навигация

- [🚀 Как пользоваться](#-как-пользоваться)
- [📱 Рекомендуемые VPN-клиенты](#-рекомендуемые-vpn-клиенты)
- [🏴‍☠️ Чёрные и белые списки](#-чёрные-и-белые-списки--что-это-и-когда-использовать)
- [📡 Подробнее о белых списках: SNI и CIDR](#-подробнее-о-белых-списках-sni-и-cidr)
- [🛠️ Протоколы – что лучше и для чего](#-протоколы--что-лучше-и-для-чего)
- [📦 VPN подписки](#-vpn-подписки)
- [🤖 Telegram-прокси](#-telegram-прокси-mtproto)
- [🔗 Зеркала проекта](#-зеркала-проекта-stintikvpn)
- [❓ FAQ](#-часто-задаваемые-вопросы-faq)
- [⚠️ Важное предупреждение](#-важное-предупреждение)
- [💰 Поддержать проект](#-поддержать-проект)

---

## 🚀 Как пользоваться

1. Скачайте клиент из таблицы ниже под ваше устройство.
2. Скопируйте нужную ссылку из раздела «VPN подписки».
3. В клиенте нажмите **«Добавить подписку»** или **«Импорт из буфера обмена»**.
4. Обновите список → нажмите **«Пинг»** → выберите живой сервер → подключитесь.

---

## 📱 Рекомендуемые VPN-клиенты

Подобраны так, чтобы было удобно и подростку, и родителям — простой интерфейс, минимум настроек.

| Устройство | Клиент | Ссылка |
|:-----------|:-------|:-------|
| **Windows** | **Hiddify** | [Скачать](https://github.com/hiddify/hiddify-next/releases) |
| **Android** | **Hiddify** | [Google Play](https://play.google.com/store/apps/details?id=app.hiddify.com) / [APK](https://github.com/hiddify/hiddify-next/releases) |
| **iPhone / iPad** | **Streisand** | [App Store](https://apps.apple.com/app/streisand/id6450534064) |
| **macOS** | **Hiddify** | [Скачать](https://github.com/hiddify/hiddify-next/releases) |
| **Linux** | **Hiddify** | [Скачать](https://github.com/hiddify/hiddify-next/releases) |
| **Android TV** | **NekoBox** | [Скачать](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |

> **Для новичка:** ставьте **Hiddify** (Windows / Android / macOS / Linux) или **Streisand** (iPhone). Этого достаточно.

---

## 🏴‍☠️ Чёрные и белые списки — что это и когда использовать

- **🏴 Чёрные списки** — для обычного интернета (домашний Wi‑Fi, кабель, 4G без жёстких блокировок).
- **🏳️ Белые списки** — когда оператор включил «белые списки» РКН и обычные сайты не открываются (часто на мобильном: МТС, Билайн, Tele2).

---

## 📡 Подробнее о белых списках: SNI и CIDR

- **White SNI** — фильтрует трафик по именам сайтов (например: `youtube.com`).
- **White CIDR** — фильтрует трафик по IP-диапазонам (например: `173.194.0.0/16`).

**Если не работает SNI — попробуйте CIDR. Если не работает CIDR — попробуйте SNI.**

---

## 🛠️ Протоколы — что лучше и для чего

- **VLESS** — скорость и маскировка (РКН иногда блокирует).
- **Trojan** — хорошая маскировка под обычный HTTPS.
- **VMess** — самый надёжный из распространённых.
- **Shadowsocks** — максимальная скорость, удобно для игр.

---

## 📦 VPN подписки

### 🏴 Чёрный список (основной)
https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt

### 🏴 Чёрный список (запасной)
https://vpn.akres.fun/all

### 👑 Black Mobile (лучшие сервера для телефонов)
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt

### 🏳️ Белые списки (основные)
https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt

### Белые списки (CIDR)
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt

### Белые списки (SNI)
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt

### 🛠️ По протоколам
- **VLESS**: https://mifa.world/vless
- **VMess**: https://mifa.world/vmess
- **Trojan**: https://mifa.world/trojan
- **Shadowsocks**: https://mifa.world/ss

---

## 🤖 Telegram-прокси (MTProto)

> Последнее обновление: **05.08.2026**

Скопируйте ссылку и откройте в Telegram (или добавьте вручную).

**1.** `213.219.212.4:443`  
https://t.me/proxy?server=213.219.212.4&port=443&secret=dd9e1dde0de02a2e7c22d10e2fff841013

**2.** `37.139.35.8:443`  
https://t.me/proxy?server=37.139.35.8&port=443&secret=ee2b36bf4b66aa5454903e1f63fdef88bc7777772e6d6963726f736f66742e636f6d

**3.** `45.12.239.10:443`  
https://t.me/proxy?server=45.12.239.10&port=443&secret=ee67d0b62d9adedce86f500c8be9b2c3cd6d2e6265626f6f2e7275

**4.** `proxy.vmelectronics.ru:443`  
https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477

**5.** `146.185.242.186:443`  
https://t.me/proxy?server=146.185.242.186&port=443&secret=ee95aa916bd319beb312cc6ba9b2c5aef8766b2e7275

---

## 🔗 Зеркала проекта StintikVPN

На случай блокировки GitHub:

- **GitLab**: https://gitlab.com/Stintik-123/StintikVPN
- **GitVerse**: https://gitverse.ru/Stintik-123/StintikHub
- **Codeberg**: https://codeberg.org/Stintik-123/StintikVPN

---

## ❓ Часто задаваемые вопросы (FAQ)

**1. Подписка не работает или очень медленно.**  
Обновите подписку в клиенте. Смените сервер или протокол. Иногда помогает перезапуск клиента или смена сети (Wi‑Fi ↔ мобильный интернет).

**2. Как часто обновляются конфиги?**  
Ежедневно их создателями. Ссылки в README всегда ведут на актуальные версии.

**3. Когда нужны белые списки?**  
Только когда оператор включил «белые списки» РКН и обычные сайты перестали открываться.

**4. Какой клиент для новичка?**  
**Hiddify** — Windows, Android, macOS, Linux. На iPhone — **Streisand**.

**5. Прокси Telegram не подключается.**  
Прокси часто отваливаются. Просто попробуйте следующий из списка.

**6. Можно ли на нескольких устройствах?**  
Да, большинство подписок это поддерживают (зависит от конкретного сервера).

**7. Это безопасно?**  
Конфиги из открытых источников. Не гоняйте через них банк и важные аккаунты. Используйте на свой страх и риск.

---

## ⚠️ Важное предупреждение

Все конфиги собраны из открытых источников. Работоспособность **не гарантируется** на 100%.  
Запрещено использовать в противоправных целях. Автор проекта не несёт ответственности за ваши действия.

---

## 💰 Поддержать проект

Если проект полезен — поставьте ⭐ звезду на репозиторий. Это бесплатно и сильно помогает.

---

*StintikVPN — сделано людьми для людей*
