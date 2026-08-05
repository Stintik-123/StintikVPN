# 🚀 StintikVPN — Интернет свобода ближе чем кажется

<p align="center">
  <img src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260716_095916_952.jpg" alt="StintikVPN" width="100%">
</p>

<p align="center">
  <strong>🇷🇺 Русский</strong> ·
  <a href="ReadMe_EN.md">🇬🇧 English</a> ·
  <a href="ReadMe_CN.md">🇨🇳 中文</a> ·
  <a href="ReadMe_IR.md">🇮🇷 فارسی</a>
</p>

<p align="center">
  <a href="https://stintik-123.github.io/StintikVPN/"><img src="https://img.shields.io/badge/Site-GitHub%20Pages-0A0A0A?style=flat-square&logo=github" alt="Site"></a>
  <a href="https://t.me/StintikVPN"><img src="https://img.shields.io/badge/Telegram-@StintikVPN-26A5E4?style=flat-square&logo=telegram" alt="Telegram"></a>
  <img src="https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square" alt="Stars">
</p>

**StintikVPN** — сборник бесплатных VPN-подписок. Скопируй ссылку → вставь в клиент → пользуйся.

---

## 📑 Навигация

- [🚀 Как пользоваться](#-как-пользоваться)
- [📱 VPN-клиенты](#-vpn-клиенты)
- [🏴‍☠️ Чёрные и белые списки](#-чёрные-и-белые-списки)
- [📡 SNI и CIDR](#-sni-и-cidr)
- [🛠️ Протоколы](#-протоколы)
- [📦 VPN-подписки](#-vpn-подписки)
- [🤖 Telegram-прокси](#-telegram-прокси)
- [🧅 Tor-мосты](#-tor-мосты)
- [🛡️ Обход DPI](#-обход-dpi)
- [🔗 Зеркала](#-зеркала)
- [❓ FAQ](#-faq)
- [⚠️ Предупреждение](#-предупреждение)
- [💰 Поддержать](#-поддержать)

---

## 🚀 Как пользоваться

1. Скачай клиент под своё устройство (таблица ниже).
2. Скопируй ссылку из раздела **VPN-подписки**.
3. В клиенте: **Добавить подписку** / **Импорт из буфера**.
4. Обнови список → **Пинг** → выбери живой сервер → подключись.

---

## 📱 VPN-клиенты

По два проверенных варианта на платформу.

| Устройство | Вариант 1 | Вариант 2 |
|:-----------|:---------|:---------|
| **Windows** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayN](https://github.com/2dust/v2rayN/releases) |
| **Android** | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) | [v2rayNG](https://github.com/2dust/v2rayNG/releases) |
| **iPhone / iPad** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **macOS** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| **Linux** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [NekoRay](https://github.com/MatsuriDayo/nekoray/releases) |
| **Android TV** | [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) | [Hiddify](https://github.com/hiddify/hiddify-next/releases) |

---

## 🏴‍☠️ Чёрные и белые списки

| Тип | Когда использовать |
|:----|:------|
| **Чёрные** | Обычный интернет: домашний Wi‑Fi, кабель, 4G без жёстких блокировок |
| **Белые** | Оператор включил «белые списки» РКН |

---

## 📡 SNI и CIDR

- **SNI** — фильтр по именам сайтов (`youtube.com`)
- **CIDR** — фильтр по IP-диапазонам (`173.194.0.0/16`)

Не работает SNI → бери CIDR. Не работает CIDR → бери SNI. 

---

## 🛠️ Протоколы

| Протокол | Суть |
|:---------|:-----|
| **VLESS** | Скорость и маскировка (Сейчас активно блокируется РКН) |
| **Trojan** | Маскировка под HTTPS |
| **VMess** | Самый надёжный |
| **Shadowsocks** | Самый быстрый, лучший для игр |

---

## 📦 VPN-подписки

### 🏴 Чёрный список (основной)
```
https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt
```

### 👑 Black Mobile (для телефонов)
```
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt
```

### 🏴 Чёрный список (запасной)
```
https://gitverse.ru/api/repos/Akres/VPN/raw/branch/master/all
```

### 🏳️ Белые списки (основные)
```
https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt
```

### Белые списки (CIDR)
```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt
```

### Белые списки (SNI)
```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt
```

### По протоколам
| Протокол | Ссылка |
|:---------|:-------|
| VLESS | https://mifa.world/vless |
| VMess | https://mifa.world/vmess |
| Trojan | https://mifa.world/trojan |
| Shadowsocks | https://mifa.world/ss |

---

## 🤖 Telegram-прокси

> Обновлено: **05.08.2026**

Скопируй ссылку и открой в Telegram.

1. `213.219.212.4:443`  
   https://t.me/proxy?server=213.219.212.4&port=443&secret=dd9e1dde0de02a2e7c22d10e2fff841013

2. `37.139.35.8:443`  
   https://t.me/proxy?server=37.139.35.8&port=443&secret=ee2b36bf4b66aa5454903e1f63fdef88bc7777772e6d6963726f736f66742e636f6d

3. `45.12.239.10:443`  
   https://t.me/proxy?server=45.12.239.10&port=443&secret=ee67d0b62d9adedce86f500c8be9b2c3cd6d2e6265626f6f2e7275

4. `proxy.vmelectronics.ru:443`  
   https://t.me/proxy?server=proxy.vmelectronics.ru&port=443&secret=ee6164732e78352e72759c6509729477

5. `146.185.242.186:443`  
   https://t.me/proxy?server=146.185.242.186&port=443&secret=ee95aa916bd319beb312cc6ba9b2c5aef8766b2e7275

---

## 🧅 Tor-мосты

Для любителей пользоваться браузером Tor есть вариант проверенный временем, всеми любимые Tor-мосты, тут только лучшие 

| Список | Ссылка |
|:-------|:-------|
| Топ-100 | https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt |
| Все | https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt |
| Vanilla | https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_VANILLA.txt |
| obfs4 | https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt |
| WebTunnel | https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_WEBTUNNEL.txt |

Инструкуия как начать:

Скачай [Tor Browser](https://www.torproject.org/download/) → Настройки → Мосты → вставь строки из списка.

---

## 🛡️ Обход без VPN (ByeDPI, zapret, tgwsproxy)

Иногда блокировки можно обойти и без VPN с помощью средств обходящих DPI блокировку

| Инструмент | Для чего | Ссылка |
|:-----------|:---------|:-------|
| **zapret** | Ютуб, Дискорд | [bol-van/zapret](https://github.com/bol-van/zapret) |
| **ByeByeDPI** | Ютуб, на некоторых устройствах ещё и дискорд| [ByeByeDPI](https://github.com/romanvht/ByeByeDPI) · [byedpi](https://github.com/hufrea/byedpi) |
| **TG WS Proxy** | Локальный прокси для телеграмма, также есть версия на Android скину ниже| [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy) |

Инструкции по установке:

## Zapret-discord-youtube
1. Заходим на страницу репозитория и скачиваем zapret-discord-youtube с раздела Releases, на телефонах он в самом низу репозитория, на ПК он справа

2. Заходим в папку и находим файл service, нажимаем и выбираем вариант Run Tests, после выбираем все bat-файлы, после ждём и после теста всех батников выдаст лучший рабочий на этом устройстве

3. Нажимаем на него, он откроется в фоне и Дискорд с ютубом заработают

4. Если захотите установить его в автозапуск опять зайдите в файл service и выберите вариант Install Service после чего выберите нужный bat файл и... Готово 

## ByeByeDpi 

1. Скачиваем apk файл прямо с репозитория

2. Нажимаем на него и устанавливаем приложение, запускаем его после нажимаем подбор и нажимаем начать запуск

3. После теста нажимаем на тот у которого больше всего совпадений (Для примера 8/50 это плохо, 48/50 это хорошо) и нажимаем применить

4. Выходим в главное меню, нажимаем большую кнопку включения и пользуемся

## TGWSPROXY 

1. Устанавливаем программу с репозитория

2. Запускаем tgwsproxy.exe

3. Следуем инструкции 
---

## 🔗 Зеркала

- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)
- [GitVerse](https://gitverse.ru/Stintik-123/StintikHub)
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)

---

## ❓ FAQ

<details>
<summary><strong>Подписка не работает / очень медленно</strong></summary>

Обновите подписку в клиенте. Смените сервер или протокол. Перезапустите клиент или смените сеть (Wi‑Fi ↔ мобильный).
</details>

<details>
<summary><strong>Как часто обновляются конфиги?</strong></summary>

Ежедневно их создателями. Ссылки в README всегда актуальные.
</details>

<details>
<summary><strong>Когда нужны белые списки?</strong></summary>

Когда оператор включил «белые списки» РКН и обычные сайты не открываются.
</details>

<details>
<summary><strong>Прокси Telegram не подключается</strong></summary>

Прокси часто отваливаются. Попробуйте следующий из списка
</details>

<details>
<summary><strong>Это безопасно?</strong></summary>

Конфиги взяты из открытых источников и могут быть не безопасны, крайне не советую заходить через них в банки или важные аккаунты
</details>

---

## ⚠️ Предупреждение

Конфиги из открытых источников Работоспособность **не гарантируется**.  
Запрещено использовать в противоправных целях. Автор не несёт ответственности за ваши действия.

---

## 💰 Поддержать

Поставь ⭐ на репозиторий — бесплатно и сильно помогает проекту.

Канал разработки: [@StintikVPN](https://t.me/StintikVPN)

---

<p align="center"><em>StintikVPN — сделано людьми для людей</em></p>
