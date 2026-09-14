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

**StintikVPN** — сборник бесплатных VPN-подписок и способов обхода. Скопируйте ссылку → вставьте в клиент → пользуйтесь.

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
- [🧅 Tor](#-tor)
- [🧩 Другие способы обхода](#-другие-способы-обхода)
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

Два варианта на платформу. **NekoRay / NekoBox больше не поддерживаются** — в список не включаем.

| Устройство | Вариант 1 | Вариант 2 |
|:-----------|:---------|:---------|
| **Windows** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayN](https://github.com/2dust/v2rayN/releases) / [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android** | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) | [Happ](https://github.com/Happ-proxy/happ-android/releases) / [v2rayNG](https://github.com/2dust/v2rayNG/releases) |
| **iPhone / iPad** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [Happ](https://apps.apple.com/app/happ-proxy-utility/id6504287215) / [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **macOS** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) / [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Linux** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Happ](https://github.com/Happ-proxy/happ-desktop/releases) / [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| **Android TV** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayNG](https://github.com/2dust/v2rayNG/releases) |

> **Happ** — современный клиент на Xray (VLESS/VMess/Trojan/SS). Сайт/сборки: [happ.info](https://happ.info) · [Android](https://github.com/Happ-proxy/happ-android).

---

## 🏴‍☠️ Чёрные и белые списки

Это **не «цвета VPN»**, а способ **маршрутизации**: через какой туннель идёт трафик.

### Чёрный список (blacklist / proxy only blocked)

- Через VPN/прокси идут **только** сайты и сервисы из списка (или типично заблокированные).
- Остальной трафик — **напрямую**, без VPN.
- **Когда:** домашний Wi‑Fi, кабель, обычный мобильный интернет, без режима «только белый список» у оператора.
- **Плюс:** меньше нагрузка на VPN, часто выше скорость «обычного» интернета.

### Белый список (whitelist / proxy everything except…)

- Через VPN идёт **почти всё**, кроме явно разрешённого (госуслуги, банк, локальные сервисы и т.п. — как задумано в конкретном списке).
- **Когда:** оператор/провайдер включил жёсткие ограничения («белые списки» РКН, сильный DPI, режется всё неизвестное).
- **Плюс:** выше шанс, что «всё остальное» вообще откроется; **минус:** больше трафика через узлы подписки.

Кратко: **чёрный** = «проксируем заблокированное», **белый** = «проксируем почти всё, потому что иначе сеть сама режет».

---

## 📡 SNI и CIDR

**SNI** и **CIDR** — это не «фильтры вместо друг друга», а **разные признаки**, по которым в конфиге/подписке описывают *куда* направлять трафик:

| Понятие | Что это | Пример |
|:--------|:--------|:-------|
| **SNI** | Имя сайта в TLS-рукопожатии (домен) | `youtube.com`, `google.com` |
| **CIDR** | Диапазон IP-адресов | `173.194.0.0/16` |

- Подписки с пометкой **SNI** опираются в основном на **домены**.
- Подписки с пометкой **CIDR** — на **IP-сети**.

Если IP из CIDR **уже режется TSPU/DPI**, смена «на SNI» **сама по себе не лечит** тот же заблокированный адрес. Имеет смысл:

1. Взять **другую подписку** (другие узлы).
2. Сменить **клиент / транспорт** (Reality, WS+CDN и т.д.).
3. Для жёсткой сети — **белые** списки или обход без VPN (zapret / ByeDPI).

Не делайте вывод «SNI не зашёл → включи CIDR и наоборот» как универсальный фикс.

---

## 🛠️ Протоколы

**Лучшего протокола не существует.** На разных провайдерах, TSPU и регионах блочат по-разному. Работоспособность зависит от **транспорта**, **маскировки** (Reality, WS, gRPC, CDN) и настроек поверх «голого» имени протокола.

| Протокол | Кратко по делу |
|:---------|:---------------|
| **VLESS** | Современная основа Xray. Сам по себе «не магия»: поведение задаёт transport + reality/tls/ws и т.д. Часто используют с Reality. |
| **Trojan** | Трафик под TLS, выглядит ближе к обычному HTTPS. Результат снова зависит от обвязки и узла. |
| **VMess** | Старый проприетарный протокол экосистемы V2Ray. Во многом устарел; часть сетей может цеплять по сигнатуре. |
| **Shadowsocks (SS)** | Простой и быстрый, но на агрессивном DPI **часто быстро детектится**. Для «просто поиграть» на мягкой сети ещё встречается, на жёсткой — слабый выбор. |

Практический совет: смотрите не название протокола в списке, а **пинг + факт открытия нужных сайтов**. Переключайте узлы и подписки, а не ищите «единственный правильный протокол».

---

## 📦 VPN‑подписки

### 🏴 Чёрный список (основной)
```
https://gitverse.ru/api/repos/Akres/VPN/raw/branch/master/all
```

### 👑 Black Mobile (для телефонов)
```
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt
```

### 🏳️ Белые списки (основные)
```
https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt
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

> Обновлено: **11.09.2026**

Скопируйте ссылку и откройте в Telegram:

1. **lumetra.mtproxy.zip**  
https://t.me/proxy?server=lumetra.mtproxy.zip&port=443&secret=ee9af09f8b8dcfe282445cf1bc91854acb786170692e6f7a6f6e2e7275

2. **85.192.34.18:9443**  
https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665

3. **proxy.tonservice.site**  
https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000

4. **172.65.100.45:25565**  
https://t.me/proxy?server=172.65.100.45&port=25565&secret=ee1603010200010001fc030386e24c3add6d656469612e737465616d706f77657265642e636f6d

5. **cluster.mtproxy.cc**  
https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363

---

## 🛡️ Обход без VPN

Иногда блокировки обходят **без** полноценного VPN (DPI-обход на устройстве).

### Zapret‑discord‑youtube (Windows)
1. Репозиторий: [Flowseal/zapret-discord-youtube](https://github.com/Flowseal/zapret-discord-youtube) → Releases.
2. Распакуйте архив, запустите `service.bat`.
3. Пункт **11** → «Run Tests», отметьте нужные `.bat` и tcp ping.
4. После теста запустите указанный «лучший» bat из папки.

### zapret / zapret2 (Linux)
- Классический **zapret**: [bol-van/zapret](https://github.com/bol-van/zapret) — есть [quick start для Linux/OpenWrt](https://github.com/bol-van/zapret/blob/master/docs/quick_start.md).
- **zapret2** (актуальная ветка разработки): [bol-van/zapret2](https://github.com/bol-van/zapret2) → Releases, бинарники под linux-x86_64 / arm64 и др.

Кратко для Linux (zapret):
1. Скачайте релиз `.tar.gz` с GitHub Releases.
2. Распакуйте, следуйте `docs/quick_start.md` (выбор стратегий, установка сервиса).
3. Нужны права root; на роутере OpenWrt — отдельная embedded-сборка из релизов.

### ByeByeDPI (Windows / Android)
1. APK/сборки из репозитория ByeByeDPI.
2. «Подбор» → дождитесь теста.
3. Выберите строку с **высоким** числом совпадений (например 59/60, не 5/60) → применить.
4. На главном экране — запуск.

### TG‑WS‑Proxy (локальный прокси для Telegram)
1. Сборка: [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy).
2. Запустите `tgwsproxy.exe`.
3. Дальше по подсказкам в приложении.

---

## 🧅 Tor

**Публичные списки мостов в README — плохая идея:** мосты быстро сгорают, IP нод Tor у части провайдеров уже в блок-листах. Мосты нужно получать **персонально**.

### Как получить мосты
1. Скачайте [Tor Browser](https://www.torproject.org/download/).
2. Мосты: [bridges.torproject.org](https://bridges.torproject.org/) (капча) **или** Telegram-боты/почта, которые рекомендует проект Tor в справке.
3. В Tor Browser: Настройки → Соединение → мосты → вставить **свои** строки.

Старые «топ-100 из raw github» используйте только как крайний эксперимент — они часто уже мертвы.

### VPN + Tor (через torrc)
Идея: сначала ваш VPN/прокси, поверх — Tor (Tor не ходит в интернет напрямую).

1. Поднимите системный VPN **или** локальный SOCKS/HTTP из клиента (Hiddify/v2rayN и т.д.).
2. В `torrc` (Tor Expert / Tor Browser в продвинутом режиме) укажите прокси, например:
   ```
   HTTPSProxy 127.0.0.1:PORT
   ```
   или SOCKS, если клиент отдаёт SOCKS — см. актуальные директивы в мануале Tor под вашу версию.
3. Перезапустите Tor и проверьте IP на check.torproject.org.

### Dual VPN (два слоя)
1. Первый слой — подписка/сервер «ближе» к вам.
2. Второй — другой сервер/провайдер «снаружи» (вложенный прокси в клиенте, если умеет chain, или VPN на роутере + VPN на ПК).
3. Смысл: скрыть факт Tor/второго VPN от локального DPI и разнести доверие по узлам. Минусы: скорость и сложность отладки.

### Смена exit node
В Tor нельзя «выбрать страну кнопкой» как в коммерческом VPN, но можно ограничить выходы, например в `torrc`:
```
ExitNodes {nl},{de}
StrictNodes 1
```
`{nl}` — код страны. Меняйте под задачу; `StrictNodes 1` запрещает выходы вне списка (если таких нет — сеть может не построиться).

---

## 🧩 Другие способы обхода

Краткий чеклист того, чего **нет** в виде готовых «скопируй ссылку» (и почему):

| Способ | Комментарий |
|:-------|:------------|
| **WARP** | Конфиги **индивидуальные**, их генерируют под себя (на сайте есть блок WARP — не расшаривайте чужой ключ как общий). |
| **WARP + AWS / VPS** | Самостоятельный хостинг + обёртка; готовой публичной подписки в репо нет. |
| **Обход через CDN** | Свой домен/воркер на CDN + VLESS/WS и т.п. — self-hosted. |
| **Tunnel over DNS** (dnstt, slipstream и аналоги) | Отдельные утилиты, не «вставить в Hiddify одной ссылкой». |
| **DoT / DoH / DoQ** | Через [dnscrypt-proxy](https://github.com/DNSCrypt/dnscrypt-proxy) и подобные — это DNS, не замена VPN. |
| **Платные VPN** | StintikVPN намеренно про **бесплатные** агрегаты; платные берите у проверенных сервисов отдельно. |
| **Self-hosted** | Свой VPS + 3X-UI / Marzban / Xray — максимальный контроль, своя ответственность. |

Если нужно — отдельные гайды можно добавить в Issues / канал [@StintikVPN](https://t.me/StintikVPN).

---

## 🔗 Зеркала

- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)  
- [GitVerse](https://gitverse.ru/Stintik-123/StintikHub)  
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)

---

## ❓ FAQ

<details>
<summary><strong>Подписка не работает / очень медленно</strong></summary>

Подписки бесплатные, в часы пик узлы перегружены. Обновите подписку, смените сервер (Ping), попробуйте другую ссылку из списка или белый/чёрный вариант под вашу сеть.
</details>

<details>
<summary><strong>Как часто обновляются конфиги?</strong></summary>

Их обновляют авторы исходных репозиториев (часто ежедневно). Ссылки в README ведут на «сырой» raw — подтягивается актуальное содержимое.
</details>

<details>
<summary><strong>Почему StintikVPN бесплатный?</strong></summary>

Это агрегатор чужих бесплатных подписок и прокси: автор не продаёт трафик, а собирает рабочие публичные источники в одном месте.
</details>

<details>
<summary><strong>Прокси Telegram не подключается</strong></summary>

MTProto-прокси часто режут. Возьмите другую строку из списка; по мере возможности список обновляется в канале.
</details>

<details>
<summary><strong>Какой клиент, если я не разбираюсь?</strong></summary>

**Hiddify** — Windows/Android. **Streisand** или **Happ** — iOS. Не используйте заброшенные NekoRay/NekoBox.
</details>

<details>
<summary><strong>Безопасно ли это?</strong></summary>

Конфиги из открытых источников. Не гоните через них банки, госуслуги и пароли. Для серьёзной приватности — свой сервер или проверенный платный сервис.
</details>

---

## ⚠️ Предупреждение

Конфиги из открытых источников. Работоспособность **не гарантируется**.  
Запрещено использовать в противоправных целях. Автор не несёт ответственности за ваши действия.

---

## 💰 Поддержать

Поставьте ⭐ на репозиторий — бесплатно и сильно помогает проекту.

Канал: [@StintikVPN](https://t.me/StintikVPN)

---

<p align="center"><em>StintikVPN — сделано людьми для людей</em></p>
