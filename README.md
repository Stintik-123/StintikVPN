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

**StintikVPN** — сборник бесплатных VPN-подписок. Скопируйте ссылку → вставьте в клиент → пользуйтесь.

---

## 📑 Навигация

- [🚀 Как пользоваться](#-как-пользоваться)
- [📱 VPN-клиенты](#-vpn-клиенты)
- [🏴‍☠️ Чёрные и белые списки](#-чёрные-и-белые-списки)
- [📡 SNI и CIDR](#-sni-и-cidr)
- [🛠️ Протоколы](#-протоколы)
- [📦 VPN-подписки](#-vpn-подписки)
- [🤖 Telegram-прокси](#-telegram-прокси)
- [🛡️ Обход без VPN](#-обход-без-vpn)
- [🧅 Tor-мосты](#tor-мосты)
- [🔗 Зеркала](#-зеркала)
- [❓ FAQ](#-faq)
- [⚠️ Предупреждение](#-предупреждение)
- [💰 Поддержать](#-поддержать)

---

## 🚀 Как пользоваться

1. Скачайте клиент под ваше устройство (см. таблицу ниже).
2. Скопируйте ссылку из раздела **VPN‑подписки**.
3. В клиенте выберите «Добавить подписку» или «Импорт из буфера».
4. Обновите список → выполните Ping → выберите рабочий сервер → подключитесь.

---

## 📱 VPN-клиенты

Два лучших варианта на каждую платформу, выбирайте что удобнее 

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

- **SNI** — фильтр по именам сайтов (например: youtube.com)
- **CIDR** — фильтр по IP‑диапазонам (например: 173.194.0.0/16)

Если SNI не работает — попробуйте CIDR. Если CIDR не работает — попробуйте SNI.

---

## 🛠️ Протоколы

| Протокол | В каком случае лучше использовать|
|:---------|:-----|
| **VLESS** | Хотите лучший на данный момент протокол но готовы потерпеть что иногда будет не работать так как в настоящее время активно блокируется РКН|
| **Trojan** | Хотите средний по всем параметрам протокол |
| **VMess** | Хотите самый надёжный протокол который легко не работает|
| **Shadowsocks** | Хотите быстрейший протокол (Лучший для онлайн игр)|

---

## 📦 VPN‑подписки

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

---

## 🤖 Telegram‑прокси

> Обновлено: **05.08.2026**

Скопируйте ссылку и откройте в Telegram.

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

## 🛡️ Обход без VPN (ByeDPI, zapret, tgwsproxy)

Иногда блокировки можно обойти и без VPN с помощью инструментов, обходящих DPI. Ниже приведены краткие инструкции по трём популярным решениям.

### Zapret‑discord‑youtube (Windows)
1. Перейдите на страницу репозитория Zapret‑discord‑youtube и скачайте релиз из раздела Releases.
2. Распакуйте архив и запустите файл `service` (или соответствующий исполняемый файл).
3. Выберите режим запуска «Run Tests», затем выберите все `.bat` файлы для проверки.
4. После проверки запустите подходящий скрипт; если требуется — установите в автозапуск через опцию Install Service.

> Примечание: инструкции и названия файлов в релизе могут отличаться — следуйте описанию в репозитории проекта.

### ByeByeDPI (Windows / Android)
1. Скачайте apk/исполняемый файл из репозитория ByeByeDPI.
2. Установите приложение (на Android — установите apk, на Windows — распакуйте и запустите исполняемый файл).
3. В приложении выполните тесты (если предусмотрено), выберите профиль с наибольшим совпадением и включите обход.
4. При необходимости настройте автозапуск.

> Примечание: поведение инструмента зависит от ОС и конфигурации сети.

### TG‑WS‑Proxy (локальный прокси для Telegram)
1. Скачайте сборку из репозитория Flowseal/tg-ws-proxy.
2. Запустите исполняемый файл `tgwsproxy.exe` или соответствующий скрипт на вашей платформе.
3. Следуйте инструкции проекта для настройки и подключения клиента Telegram через локальный прокси.

---

## 🧅 Tor‑мосты

Для использования Tor Browser:

1. Скачайте [Tor Browser](https://www.torproject.org/download/).
2. Откройте «Настройки» → «Мосты» → вставьте строки из списка.

Списки мостов:
- Топ-100: https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt  
- Все: https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt  
- Vanilla: https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_VANILLA.txt  
- obfs4: https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt

---

## 🔗 Зеркала

- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)  
- [GitVerse](https://gitverse.ru/Stintik-123/StintikHub)  
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)

---

## ❓ FAQ

<details>
<summary><strong>Подписка не работает / очень медленно</strong></summary>

Обновите подписку в клиенте. Смените сервер или протокол. Перезапустите клиент или смените сеть (Wi‑Fi ↔ мобильная сеть).
</details>

<details>
<summary><strong>Как часто обновляются конфиги?</strong></summary>

Конфиги обновляются ежедневно их авторами. Ссылки в README всегда актуальны.
</details>

<details>
<summary><strong>Когда нужны белые списки?</strong></summary>

Когда оператор включает «белые списки» РКН и обычные сайты перестают открываться.
</details>

<details>
<summary><strong>Прокси Telegram не подключается</strong></summary>

Прокси часто отключаются. Попробуйте другой прокси из списка.
</details>

<details>
<summary><strong>Какой клиент для новичка?</strong></summary>

**Hiddify** — самый простой вариант для Windows и Android. На iOS — **Streisand**.
</details>

<details>
<summary><strong>Это безопасно?</strong></summary>

Конфиги взяты из открытых источников и могут быть небезопасны. Не передавайте через них критичные данные (банковские аккаунты, пароли).
</details>

---

## ⚠️ Предупреждение

Конфиги из открытых источников. Работоспособность **не гарантируется**.  
Запрещено использовать в противоправных целях. Автор не несёт ответственности за ваши действия.

---

## 💰 Поддержать

Поставьте ⭐ на репозиторий — бесплатно и сильно помогает проекту.

Канал разработки: [@StintikVPN](https://t.me/StintikVPN)

---

<p align="center"><em>StintikVPN — сделано людьми для людей</em></p>
