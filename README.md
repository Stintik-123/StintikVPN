# StintikVPN

<p align="center">
  <b>RU</b> ·
  <a href="README_EN.md">EN</a>
</p>

<p align="center">
  <a href="https://stintik-123.github.io/StintikVPN/"><img src="https://img.shields.io/badge/Сайт-GitHub%20Pages-111111?style=flat-square&logo=github" alt="Site"></a>
  <a href="https://t.me/StintikVPN"><img src="https://img.shields.io/badge/Telegram-@StintikVPN-26A5E4?style=flat-square&logo=telegram" alt="Telegram"></a>
  <img src="https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square" alt="Stars">
</p>

**StintikVPN** — короткий список бесплатных VPN-подписок и ссылок для клиентов.  
Не свой сервис: это агрегатор открытых источников. Работоспособность не гарантируется.

**Обновлено:** 16.10.2026

---

## Как начать

1. Установите клиент (таблица ниже).
2. Скопируйте **одну** ссылку подписки.
3. В клиенте: «Добавить подписку» / Import from clipboard.
4. Обновите список → Ping → выберите живой узел → подключитесь.

---

## Клиенты

| Платформа | Рекомендуем | Альтернатива |
|:----------|:------------|:-------------|
| **Windows** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayN](https://github.com/2dust/v2rayN/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android** | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) | [Happ](https://github.com/Happ-proxy/happ-android/releases) · [v2rayNG](https://github.com/2dust/v2rayNG/releases) |
| **iOS** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [Happ](https://apps.apple.com/app/happ-proxy-utility/id6504287215) |
| **macOS** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| **Linux** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |

Не умеете выбирать — берите **Hiddify** (Windows / Android) или **Streisand** (iOS).

---

## Какой режим подписки

| Режим | Когда |
|:------|:-----|
| **Чёрный список** | Обычный интернет, домашний Wi‑Fi, мобильный без жёстких ограничений |
| **Белый список** | Оператор режет почти всё, кроме «разрешённого» |

SNI и CIDR — разные способы описать маршруты (домены vs IP). Если один не заводится, попробуйте другой список или другую подписку, а не «переключатель ради переключателя».

---

## Подписки

Только проверенные на момент обновления ссылки (HTTP 200).

### Чёрный список

```
https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt
```

```
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt
```

### Белый список

```
https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt
```

```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt
```

```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt
```

Бесплатные узлы часто перегружены или отваливаются. Не работает — другая ссылка или обновите подписку в клиенте.

---

## Telegram-прокси

Откройте ссылку в Telegram. Если не коннектится — следующий из списка (бесплатные прокси часто блокируют).

1. https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363  
2. https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000  
3. https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665  

---

## Без VPN (обход DPI)

Иногда хватает локального обхода без туннеля:

| Инструмент | Платформа | Репозиторий |
|:-----------|:----------|:------------|
| **ByeDPI** | Android / Windows | [dovecoteescape/byedpi](https://github.com/dovecoteescape/byedpi) и форки клиентов |
| **zapret** | Windows | ищите актуальные сборки *zapret-discord-youtube* |
| **tg-ws-proxy** | Windows | [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy) |

Инструкции у авторов репозиториев — здесь только указатели, без копипасты устаревших шагов.

---

## Tor

1. [Tor Browser](https://www.torproject.org/download/)  
2. Настройки → Мосты → вставить строки:

- [Топ-100](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt)  
- [Все](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt)  
- [obfs4](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt)  

---

## Зеркала

- [Сайт](https://stintik-123.github.io/StintikVPN/)  
- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)  
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)  
- [GitVerse](https://gitverse.ru/Stintik-123/StintikHub)  

Бэкап состояния до переработки: ветка [`backup/pre-overhaul-2026-10-16`](https://github.com/Stintik-123/StintikVPN/tree/backup/pre-overhaul-2026-10-16).

---

## Важно

- Конфиги из открытых источников. **Не для банков, паролей и важной переписки.**  
- Не используйте в противоправных целях. Автор не несёт ответственности за ваши действия.  
- Это не коммерческий VPN и не «анонимность из коробки».

---

## Поддержка

⭐ на репозиторий помогает проекту.  
Канал: [@StintikVPN](https://t.me/StintikVPN)

<p align="center"><em>StintikVPN — собрано в одном месте, без лишнего</em></p>
