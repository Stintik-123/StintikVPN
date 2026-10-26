

# StintikVPN — интернет-свобода ближе, чем кажется

<img src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260716_095916_952.jpg" alt="StintikVPN" width="100%">
</p>

<p align="center">
  <strong>🇷🇺 Русский</strong> ·
  <a href="README_EN.md">🇬🇧 English</a> ·
  <a href="README_CN.md">🇨🇳 中文</a> ·
  <a href="README_IR.md">🇮🇷 فارسی</a>
</p>

<p align="center">
  <a href="https://stintik-123.github.io/StintikVPN/"><img src="https://img.shields.io/badge/Сайт-GitHub%20Pages-0A0A0A?style=flat-square&logo=github" alt="Сайт проекта"></a>
  <a href="https://t.me/StintikVPN"><img src="https://img.shields.io/badge/Telegram-@StintikVPN-26A5E4?style=flat-square&logo=telegram" alt="Telegram-канал"></a>
  <a href="https://github.com/Stintik-123/StintikVPN/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Stintik-123/StintikVPN?style=flat-square&color=blue" alt="Лицензия MIT"></a>
  <img src="https://img.shields.io/github/last-commit/Stintik-123/StintikVPN?style=flat-square" alt="Последний коммит">
  <img src="https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square" alt="Звёзды">
  <img src="https://img.shields.io/github/forks/Stintik-123/StintikVPN?style=flat-square" alt="Форки">
</p>

**Бесплатные VPN-подписки, Telegram-прокси и инструкции по обходу блокировок.**
Скопировали ссылку → вставили в клиент → работает. Без регистрации и без оплаты.

> [!WARNING]
> Конфиги собраны из открытых источников, их работоспособность **не гарантируется**.
> Не передавайте через них пароли и данные карт, не заходите в банки и другие
> критичные сервисы. Подробнее — в разделе [«Безопасно ли это»](#faq).

---

## Содержание

- [Быстрый старт](#-быстрый-старт)
- [Подписки](#-подписки)
- [Telegram-прокси](#-telegram-прокси)
- [Клиенты](#-клиенты)
- [Чёрные и белые списки](#-чёрные-и-белые-списки)
- [SNI и CIDR](#-sni-и-cidr)
- [Протоколы](#-протоколы)
- [Обход без VPN](#-обход-без-vpn)
- [Tor-мосты](#-tor-мосты)
- [Инструменты](#-инструменты)
- [WARP](#-warp)
- [Зеркала](#-зеркала)
- [FAQ](#-faq)
- [Участие](#-участие)
- [Лицензия](#-лицензия)
- [Поддержать](#-поддержать)

---

## Быстрый старт

1. Установите клиент из раздела [«Клиенты»](#-клиенты) — новичку проще всего
   начать с **Incy** (наполовину лучший клиент, где доступен) или **Karing** (где Incy недоступен). На iPhone — **Streisand**.
2. Откройте раздел [«Подписки»](#-подписки), скопируйте нужную ссылку кнопкой
   **«Скопировать»** (на сайте есть ещё и QR-код).
3. В клиенте выберите «Добавить подписку» или «Импорт из буфера».
4. Обновите список → проверьте пинг → выберите рабочий узел → подключитесь.

Если обычный интернет работает — берите **чёрные списки**. Если оператор включил
«белые списки» РКН — нужны **белые списки**.

---

## Подписки

<!-- SUBS:START -->

| Подписка | Ссылка |
|:-------|:-----------------|
| Чёрные списки (основной) | `https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt` |
| Black Mobile (для телефонов) | `https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt` |
| Белые списки (основные) | `https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt` |
| Белые списки (CIDR) | `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt` |
| Белые списки (SNI) | `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt` |

<!-- SUBS:END -->

---

## Telegram-прокси

<!-- PROXIES:START -->

Обновлено: 17.10.2026

| Прокси | Ссылка |
|:-------|:-----------------|
| lumetra.mtproxy.zip | `https://t.me/proxy?server=lumetra.mtproxy.zip&port=443&secret=ee9af09f8b8dcfe282445cf1bc91854acb786170692e6f7a6f6e2e7275` |
| 85.192.34.18:9443 | `https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665` |
| proxy.tonservice.site | `https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000` |
| 172.65.100.45:25565 | `https://t.me/proxy?server=172.65.100.45&port=25565&secret=ee1603010200010001fc030386e24c3add6d656469612e737465616d706f77657265642e636f6d` |
| cluster.mtproxy.cc | `https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363` |

<!-- PROXIES:END -->

> Прокси бесплатные, поэтому их часто блокируют. Не работает один — берите другое.

---

## Клиенты

| Устройство | Рекомендуем | Альтернатива |
|:-----------|:------------|:-------------|
| **Windows** | [Incy](https://incy.cc/) · [Karing](https://github.com/KaringX/karing/releases) | [Hiddify](https://github.com/hiddify/hiddify-next/releases) · [v2rayN](https://github.com/2dust/v2rayN/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android** | [Incy](https://incy.cc/) · [Karing](https://github.com/KaringX/karing/releases) | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) · [v2rayNG](https://github.com/2dust/v2rayNG/releases) · [Happ](https://github.com/Happ-proxy/happ-android/releases) |
| **iPhone / iPad** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [Happ](https://apps.apple.com/app/happ-proxy-utility/id6504287215) · [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **macOS** | [Incy](https://incy.cc/) · [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Linux** | [Karing](https://github.com/KaringX/karing/releases) · [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android TV** | [Incy](https://incy.cc/) · [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayNG](https://github.com/2dust/v2rayNG/releases) |

---

## Чёрные и белые списки

| Тип | Когда использовать |
|:----|:-------------------|
| **Чёрные** | Обычный интернет: домашний Wi-Fi, кабель, 4G без жёстких блокировок |
| **Белые** | Оператор включил «белые списки» РКН |

---

## SNI и CIDR

**SNI** и **CIDR** — это не «фильтры», которые можно просто менять местами, а
**разные способы описать, какой трафик куда направлять в подписке**:

| | Что это | Пример |
|:--|:--------|:-------|
| **SNI** | Имя сайта в TLS (домен) | `youtube.com` |
| **CIDR** | Диапазон IP-адресов | `173.194.0.0/16` |

Подписки с пометкой SNI опираются в основном на **домены**, с пометкой CIDR — на
**IP-сети**. Если IP из CIDR уже режется TSPU/DPI, переключение «на SNI» само по
себе не поможет с тем же адресом: меняют узел, подписку или способ обхода, а не
переключают SNI ↔ CIDR как универсальный фикс.

---

## Протоколы

| Протокол | Заметка |
|:---------|:--------|
| **VLESS** | Лучший современный протокол, но может часто блокироваться |
| **Trojan** | Универсальный вариант «на каждый день» |
| **VMess** | Обычно стабильнее на старых и капризных сетях |
| **Shadowsocks** | Простой и часто шустрый; для игр смотрите пинг конкретного узла |

---

## Обход без VPN

Иногда блокировки можно обойти и без VPN.

### Zapret-discord-youtube (Windows)

1. Откройте страницу репозитория [Zapret-discord-youtube](https://github.com/Flowseal/zapret-discord-youtube) и скачайте релиз из раздела Releases.
2. Распакуйте архив и запустите `service.bat`.
3. Нажмите цифру 11 и выберите «Run Tests», затем отметьте все `.bat` файлы для проверки и tcp ping.
4. После теста появится лучший bat-файл — вернитесь в папку и запустите его.

### ByeByeDPI (Windows / Android)

1. Скачайте apk из репозитория [ByeByeDPI](https://github.com/Valent-in/ByeByeDPI).
2. Установите приложение и нажмите «подбор».
3. После теста выберите строку с наибольшим числом совпадений (например, 5/60 — плохо, 59/60 — хорошо) и примените её.
4. Вернитесь на главный экран и нажмите кнопку запуска.

### TG-WS-Proxy (локальный прокси для Telegram)

1. Скачайте сборку из репозитория [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy).
2. Запустите `tgwsproxy.exe`.
3. Следуйте инструкциям внутри приложения.

---

## Tor-мосты

Для Tor Browser: **Настройки → Мосты** → вставьте строки из списка.

- Топ-100: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt`
- Все: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt`
- Vanilla: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_VANILLA.txt`
- obfs4: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt`

---

## Инструменты

| Инструмент | Зачем |
|:-----------|:------|
| [Speedtest](https://www.speedtest.net/) | Проверка скорости трафика |
| [2ip](https://2ip.ru/) | Проверка IP и утечек данных |
| [Happ decoder](https://utils.docs.rw/cryptohapp) | Дешифратор подписок Happ |
| [Clash converter](https://acl4ssr-sub.github.io/) | Конвертер подписок |

---

## WARP

Все Warp конфиги лежат в тг @StintikWarp

---

## Зеркала

- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)
- [GitVerse](https://gitverse.ru/Stintik-123/StintikVPN)

Если GitHub недоступен — пользуйтесь зеркалами, там та же история и те же файлы

---

## FAQ

<details>
<summary><strong>Подписка не работает / очень медленно</strong></summary>

Подписки бесплатные, поэтому могут не работать в моменты большого наплыва людей.
Попробуйте другую подписку или обновите текущую.
</details>

<details>
<summary><strong>Как часто обновляются конфиги?</strong></summary>

Конфиги обновляются ежедневно их авторами. Ссылки проверяются автоматически каждое
утро — если одна не открывается, берите другую, а о мёртвой сообщите через
[issue](https://github.com/Stintik-123/StintikVPN/issues/new?template=config_issue.yml).
</details>

<details>
<summary><strong>Почему StintikVPN бесплатный?</strong></summary>

Это агрегатор бесплатных VPN-подписок и прокси: создатель ничего не тратит, а просто
собирает в одном месте всё бесплатное из интернета.
</details>

<details>
<summary><strong>Прокси Telegram не подключается</strong></summary>

Прокси бесплатные, поэтому их часто блокирует РКН. Обновляем по мере возможности, но
если не работает — попробуйте другой прокси из списка.
</details>

<details>
<summary><strong>Какой VPN-клиент лучше всего использовать, если я не разбираюсь?</strong></summary>

Наполовину лучший клиент — **Incy** (где доступен). На другой половине — **Karing**. На iOS — **Streisand** или **Happ**.
</details>

<details>
<summary><strong>Безопасно ли всё это использовать?</strong></summary>

Конфиги взяты из открытых источников и могут быть небезопасны. Главное — не
передавайте через них важные данные (пароли и т. д.) и не заходите в банки или
другие критичные для вас сервисы.
</details>

---

## Участие

Приветствуются любые идеи и правки:

- [CONTRIBUTING.md](CONTRIBUTING.md) — как внести изменения
- [SECURITY.md](SECURITY.md) — как сообщить об уязвимости
- [Issue](https://github.com/Stintik-123/StintikVPN/issues/new/choose) — баги,
  битые ссылки и предложения
- [Telegram-канал](https://t.me/StintikVPN) — оперативные сообщения

---

## Лицензия

[MIT](LICENSE) © StintikVPN. Подписки и прокси принадлежат их авторам,
упомянутым в `docs/data.json`.

---

## Поддержать

Поставьте ⭐ репозиторию — это бесплатно и сильно помогает проекту.

Канал разработки: [@StintikVPN](https://t.me/StintikVPN)

---

<p align="center"><em>StintikVPN — сделано людьми для людей</em></p>
