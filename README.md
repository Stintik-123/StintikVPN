# 🚀 StintikVPN - Интернет свобода ближе чем кажется

[![GitHub stars](https://img.shields.io/github/stars/Stintik-Official/StintikVPN-?style=flat-square)]( https://github.com/Stintik-Official/StintikVPN-/stargazers )
[![GitHub forks](https://img.shields.io/github/forks/Stintik-Official/StintikVPN-?style=flat-square)]( https://github.com/Stintik-Official/StintikVPN-/network/members )
[![Update Status](https://img.shields.io/badge/update-every%2048h-green)]( https://github.com/Stintik-Official/StintikVPN-/actions )

**Автоматически проверяемые бесплатные VPN конфигурации для обхода блокировок в России (2026)**

---

## 📑 Навигация

- [🔗 Актуальные проверенные подписки](#-актуальные-проверенные-подписки)
- [🤖 Telegram Прокси (Кликабельные)](#-telegram-прокси-кликабельные)
- [🧠 Ликбез: Что такое CIDR, SNI и протоколы?](#-ликбез-что-такое-cidr-sni-и-протоколы)
- [💰 Поддержать проект](#-поддержать-проект)
- [⚠️ Важное предупреждение](#️-важное-предупреждение)

---

## 🔗 Актуальные проверенные подписки

Здесь собраны **только рабочие** конфигурации, прошедшие автоматическую проверку на доступность и пинг. Списки обновляются каждые 48 часов.

> **Как использовать:** Скопируйте ссылку полностью и вставьте в свой VPN-клиент (Hiddify, NekoBox, v2rayNG, FoxRay) через функцию **"Добавить подписку"** или **"Import from URL"**.

| Тип подписки | Описание | Количество | Ссылка для импорта |
|:---|:---|:---:|:---|
| **🏴 Black List** | Обычные сервера. Максимальная скорость для домашнего интернета и Wi-Fi. | 250 лучших | [`checked/black/black.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/black/black.txt) |
| **📱 Black Mobile** | Оптимизированная версия для мобильных сетей. | 50 лучших | [`checked/black_mobile/black_mobile.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/black_mobile/black_mobile.txt) |
| **🏳️ White All** | Универсальный микс для сложных блокировок (СНИ + CIDR). | 50 лучших | [`checked/white/white.all.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/white/white.all.txt) |
| **🛡️ White SNI** | Сервера с подменой имени домена (Reality, Domain Fronting). | 50 лучших | [`checked/white/white.sni.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/white/white.sni.txt) |
| **🌐 White CIDR** | Сервера, использующие маршрутизацию по доверенным IP. | 50 лучших | [`checked/white/white.cidr.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/white/white.cidr.txt) |

### 🔧 Подписки по протоколам
Если ваш клиент поддерживает выбор конкретных протоколов:

| Протокол | Описание | Ссылка |
|:---|:---|:---|
| **VLESS** | Современный, быстрый и легкий протокол. | [`checked/protocols/vless.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/protocols/vless.txt) |
| **VMess** | Классический протокол, хорошая стабильность. | [`checked/protocols/vmess.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/protocols/vmess.txt) |
| **Trojan** | Маскируется под обычный HTTPS трафик. | [`checked/protocols/trojan.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/protocols/trojan.txt) |
| **Shadowsocks** | Старый добрый SOCKS5 прокси. | [`checked/protocols/ss.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/protocols/ss.txt) |

---

## 🤖 Telegram Прокси (Кликабельные)

Рабочие MTProto прокси для доступа к Telegram.
**Инструкция:** Просто нажмите на ссылку ниже, и Telegram предложит подключить прокси. Если не нажимается — скопируйте ссылку целиком и вставьте в настройки Telegram -> Данные и память -> Прокси.

<!-- TG_PROXY_TABLE_START -->
| # | Сервер | Порт | Подключить |
|:---:|:---|:---:|:---:|
| 1 | `84.201.168.161` | `8443` | [🔗 Connect](https://t.me/proxy?server=84.201.168.161&port=8443&secret=ddf7d43a5e2ca0a8fa4cec27829869cb6b) |
| 2 | `85.192.34.153` | `8443` | [🔗 Connect](https://t.me/proxy?server=85.192.34.153&port=8443&secret=dde3d3a09a31f5c857890cfc2a0bcab4c1) |
| 3 | `jtproxy.life` | `443` | [🔗 Connect](https://t.me/proxy?server=jtproxy.life&port=443&secret=eef0050d30441bab41f60acae779df0c4076646673696e612e7275) |
| 4 | `public2.mtproxygram.lol` | `443` | [🔗 Connect](https://t.me/proxy?server=public2.mtproxygram.lol&port=443&secret=eea4eaf1027f4b431bc2e711523e1f1b4062726f777365722e79616e6465782e636f6d) |
| 5 | `now.tproxyru.click` | `8980` | [🔗 Connect](https://t.me/proxy?server=now.tproxyru.click&port=8980&secret=ee104462821249bd7ac519130220c25d09617669746f2e7275) |
<!-- TG_PROXY_TABLE_END -->

> 💡 Полный список из 50 рабочих прокси доступен в файле: [`checked/tg_proxy/tg_proxy.txt`](https://raw.githubusercontent.com/Stintik-Official/StintikVPN-/main/checked/tg_proxy/tg_proxy.txt)

---

## 🧠 Ликбез: Что такое CIDR, SNI и протоколы?

Многие путаются в типах подписок. Давайте разберемся простыми словами.

### 🏴‍☠️ Black List vs 🏳️ White List
*   **Black List (Черные):** Это обычные мощные сервера за границей. Они работают быстро, но провайдер может видеть, что вы используете VPN, и блокировать их. Идеально для домашнего интернета, где нет жесткой цензуры.
*   **White List (Белые):** Это "хитрые" сервера, которые притворяются разрешенными сайтами (например, сайтом банка или новостным порталом). Провайдер думает, что вы заходите на белый сайт, и пропускает трафик. Нужно использовать, если обычные VPN заблокированы.

### 🛡️ Что такое SNI и CIDR в контексте VPN?
Это две разные технологии обхода блокировок внутри "Белых списков":

1.  **SNI (Server Name Indication) / Reality:**
    *   *Как работает:* При подключении ваш телефон говорит провайдеру: "Я иду на сайт `google.com`" (или другой разрешенный сайт), хотя на самом деле соединяется с VPN-сервером. Это подмена имени.
    *   *Когда использовать:* Если провайдер блокирует известные VPN-протоколы, но пропускает HTTPS трафик.
2.  **CIDR (Classless Inter-Domain Routing):**
    *   *Как работает:* Использует IP-адреса, принадлежащие крупным легальным компаниям (Microsoft, Amazon, Google). Провайдеры боятся блокировать эти диапазоны IP, так как вместе с VPN отвалится половина интернета.
    *   *Когда использовать:* Если SNI не работает или работает нестабильно. Часто самый надежный вариант для мобильных операторов.

### 🔌 Чем отличаются протоколы?
*   **VLESS (Reality):** Самый современный. Быстрый, трудно обнаружить. Рекомендуется в первую очередь.
*   **VMess:** Предшественник VLESS. Чуть тяжелее, но очень надежный.
*   **Trojan:** Маскируется под обычный просмотр сайтов. Хорош там, где режут всё остальное.
*   **Shadowsocks (SS):** Простой прокси. Сейчас используется реже, так как легче обнаруживается, но иногда спасает на старых устройствах.

---

## 💰 Поддержать проект

Этот репозиторий существует благодаря автоматизации и труду владельца (**@StintikVPN**), который настроил систему проверки, фильтрации мусора и обновления конфигов.

🎁 **Поддержка развития проекта (Owner):**
Если вам удобно пользоваться этими подписками, вы можете отблагодарить автора за труды:
*   **Озон Карта:** `79960694715` (Стинтик)
*   **Telegram:** [@Keb04w](https://t.me/Keb04w)

❤️ **Поддержка создателей конфигов:**
Мы агрегируем конфиги из открытых источников. Многие сервера принадлежат энтузиастам и небольшим проектам (Akres, Mihuil, Igareck и др.). Если какой-то конкретный сервер работает у вас идеально, найдите его автора (обычно имя указано в названии ключа) и поддержите его отдельно. Возможно, именно на их средства содержится инфраструктура, которой вы пользуетесь.

---

## ⚠️ Важное предупреждение

> Все конфигурации взяты из публичных источников. Автор репозитория **не владеет** этими серверами и не несет ответственности за их работу, скорость или логируемый трафик.
> **Используйте на свой страх и риск.** Запрещено использовать данные инструменты для нарушения законодательства РФ.

---

*StintikVPN – сделано людьми для людей. Обновляется автоматически.*# 🚀 StintikVPN - Интернет свобода ближе чем кажется

[![GitHub stars](https://img.shields.io/github/stars/Stintik-Official/StintikVPN-?style=flat-square)](https://github.com/Stintik-Official/StintikVPN-/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Stintik-Official/StintikVPN-?style=flat-square)](https://github.com/Stintik-Official/StintikVPN-/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Stintik-Official/StintikVPN-?style=flat-square)](https://github.com/Stintik-Official/StintikVPN-/watchers)
[![Auto Update](https://img.shields.io/badge/auto-update-every%2048h-brightgreen)](https://github.com/Stintik-Official/StintikVPN-/actions)

**Лучшие бесплатные обновляющиеся VPN конфигурации для обхода блокировок в России в 2026 году**

---

## 📑 Навигация

- [🚀 Возможно, Вам и не нужен VPN](#-возможно-вам-не-нужен-vpn-альтернативы)
- [📖 Как пользоваться подписками](#-как-пользоваться-vpn-подписками)
- [🎯 Типы подписок](#-типы-vpn-подписок)
- [🌐 Универсальные подписки](#-универсальные-подписки)
- [🔗 Актуальные ссылки](#-актуальные-ссылки-для-vpn)
- [🤖 Telegram прокси](#-telegram-прокси-mtproto)
- [🧠 Обход блокировок с помощью DNS](#-обход-блокировок-с-помощью-dns)
- [💰 Поддержать проект](#-поддержать-проект)
- [⚠️ Важное предупреждение](#️-важное-предупреждение)
- [💬 Контакты](#-контакты)

---

## 🚀 Возможно, Вам не нужен VPN (Альтернативы)

Иногда можно обойтись без полноценного VPN, который режет скорость. Эти инструменты работают локально и не шифруют трафик — они только маскируют его, чтобы обойти блокировки провайдера. Отлично подойдут для работы Ютуба и Дискорда

<details>
<summary><b>🔧 ByeByeDPI (Android)</b></summary>

1. Скачайте приложение [ByeByeDPI](https://github.com/romanvht/ByeByeDPI/releases) с GitHub.
2. Установите `.apk` файл на телефон.
3. Откройте приложение → нажмите кнопку **«Подбор»** → **«Запустить проверку»**.
4. Дождитесь окончания проверки и выберите стратегию с наибольшим количеством удачных подключений.
5. Нажмите **«Подключить»** — всё готово.

> **Важно:** ByeByeDPI работает только локально, не меняет Ваш IP и не шифрует трафик. YouTube будет открываться без рекламы.
</details>

<details>
<summary><b>⚡ Zapret-discord-youtube (Windows)</b></summary>

1. Скачайте последнюю версию [zapret-discord-youtube](https://github.com/Flowseal/zapret-discord-youtube) с GitHub.
2. Распакуйте архив в любую папку (например, `C:\zapret`).
3. Запустите файл `service.bat` **от имени администратора**.
4. В появившемся меню выберите `Run Tests` и дождитесь окончания проверки.
5. Программа покажет лучший bat-файл — запустите его.
</details>

---

## 📖 Как пользоваться подписками

1. Скопируйте нужную ссылку из таблиц ниже.
2. Вставьте в VPN-клиент (Happ, Hiddify, NekoBox, Incy и др.) через кнопку **«Добавить подписку»** или **«Импорт из буфера обмена»**.
3. Обновите список → проверьте пинг → подключитесь к рабочему серверу.

> 💡 **Совет:** Используйте универсальные подписки для большинства случаев. Чёрные списки — для домашнего Wi-Fi, белые — для мобильного интернета с жёсткими ограничениями.

---

## 🎯 Типы подписок

| 🏴 **Чёрные списки** | 🏳️ **Белые списки** | 🌐 **Универсальные подписки** |
|:---|:---|:---|
| Для обычного интернета **без жёстких блокировок** (домашний Wi‑Fi, кабель).<br>Максимальная скорость. | Для **жёстких ограничений мобильного интернета**, когда провайдер включает «белые списки».<br>Рекомендуется использовать только при включённых белых списках. | Имеют и простые сервера и сервера для обходов белых списков. Подходят для большинства ситуаций. |

---

## 🌐 Универсальные подписки

| Источник | Количество | Ссылка |
|:---|:---:|:---|
| **nzea243** | ~500+ | `https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/refs/heads/main/tri_228.txt` |
| **opti4riponty-arch** | ~1000+ | `https://raw.githubusercontent.com/opti4riponty-arch/VLESS-Co/refs/heads/main/VLESS%20%26%20Co` |
| **KuruVPN** | ~300+ | `https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt` |
| **akres.fun** | ~128 | `https://vpn.akres.fun/all` |
| **mifa.world** | ~50 | `https://mifa.world/fast` |

---

## 🔗 Актуальные ссылки

### 🏴 Чёрные списки (Black)

Для обычного использования без жёстких блокировок. Максимальная скорость.

| Источник | Описание | Ссылка |
|:---|:---|:---|
| **igareck (Base)** | Основной чёрный список | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_SS+All_RUS_base64.txt) |
| **igareck (VLESS)** | VLESS конфиги | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_base64.txt) |
| **igareck (Mobile)** | Оптимизировано для мобильных | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/BLACK_VLESS_RUS_mobile.txt) |
| **nzea243** | Универсальный микс | [Ссылка](https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/refs/heads/main/tri_228.txt) |
| **opti4riponty-arch** | VLESS & Co | [Ссылка](https://raw.githubusercontent.com/opti4riponty-arch/VLESS-Co/refs/heads/main/VLESS%20%26%20Co) |
| **KuruVPN** | Gitverse репозиторий | [Ссылка](https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt) |
| **akres.fun** | Быстрые сервера | [Ссылка](https://vpn.akres.fun/all) |
| **mifa.world** | Fast подборка | [Ссылка](https://mifa.world/fast) |

---

### 🏳️ Белые списки (White)

Для обхода жёстких блокировок мобильных операторов (МТС, Билайн, Мегафон, Tele2).

| Источник | Описание | Ссылка |
|:---|:---|:---|
| **igareck (White Mobile)** | Белый список для мобильных | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Vless-Reality-White-Lists-Rus-Mobile.txt) |
| **kort0881 (all_new)** | Полный белый список | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/new/all_new.txt) |
| **kort0881 (vless)** | Только VLESS | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vless.txt) |
| **kort0881 (vmess)** | Только VMess | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vmess.txt) |
| **kort0881 (trojan)** | Только Trojan | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/trojan.txt) |
| **kort0881 (ss)** | Только ShadowSocks | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/ss.txt) |
| **Mihuil121** | RU_Best проверка | [Ссылка](https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_white.txt) |
| **kort0881 (part2)** | Дополнительный список | [Ссылка](https://raw.githubusercontent.com/kort0881/vpn-checker-backend/main/checked/RU_Best/ru_white_all_part2.txt) |
| **AetrisVPN** | Gist зеркало | [Ссылка](https://gist.githubusercontent.com/flaafix/c79a81037d15163360571c7a7331b153/raw/AetrisVPN.txt) |

---

### 🏴‍☠️ Чёрные списки (Mobile Optimized)

Специально оптимизированные конфиги для мобильных устройств.

| Источник | Описание | Ссылка |
|:---|:---|:---|
| **igareck (Mobile Base64)** | Base64 кодировка | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_mobile_base64.txt) |

---

### 🏳️ SNI White Lists

Конфигурации с обходом через SNI (Server Name Indication).

| Источник | Описание | Ссылка |
|:---|:---|:---|
| **igareck (SNI All)** | Все SNI конфиги | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-SNI-RU-all-base64.txt) |
| **igareck (SNI Mobile)** | SNI для мобильных | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/Vless-Reality-White-Lists-Rus-Mobile-base64.txt) |

---

### 🏳️ CIDR White Lists

Конфигурации с использованием CIDR нотации для точной маршрутизации.

| Источник | Описание | Ссылка |
|:---|:---|:---|
| **igareck (CIDR All)** | Все CIDR конфиги | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-all-base64.txt) |
| **igareck (CIDR Checked)** | Проверенные CIDR | [Ссылка](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-checked-base64.txt) |

---

## 🤖 Telegram прокси (MTProto)

<!-- PROXY_TABLE_START -->
> Последнее обновление: **Автоматически каждые 48 часов**

### 📡 MTProto прокси

Быстрые и стабильные прокси для обхода блокировок Telegram в России.

| # | Сервер | Порт | Статус | Подключить |
|:---:|:---|:---:|:---:|:---:|
| 1 | `84.201.168.161` | `8443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=84.201.168.161&port=8443&secret=ddf7d43a5e2ca0a8fa4cec27829869cb6b) |
| 2 | `85.192.34.153` | `8443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=85.192.34.153&port=8443&secret=dde3d3a09a31f5c857890cfc2a0bcab4c1) |
| 3 | `jtproxy.life` | `443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=jtproxy.life&port=443&secret=eef0050d30441bab41f60acae779df0c40766473696e612e7275) |
| 4 | `public2.mtproxygram.lol` | `443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=public2.mtproxygram.lol&port=443&secret=eea4eaf1027f4b431bc2e711523e1f1b4062726f777365722e79616e6465782e636f6d) |
| 5 | `now.tproxyru.click` | `8980` | ✅ | [🔗 Добавить](https://t.me/proxy?server=now.tproxyru.click&port=8980&secret=ee104462821249bd7ac519130220c25d09617669746f2e7275) |
| 6 | `hello.proxytg.space` | `443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=hello.proxytg.space&port=443&secret=ee57b7509fe484325abedc85f18804843768656c6c6f2e70726f787974672e7370616365) |
| 7 | `ark.proxytg.space` | `443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=ark.proxytg.space&port=443&secret=eeb8df1294e7e13cd99e7a9144bae17db861726f726b2e70726f787974672e7370616365) |
| 8 | `super.its-work.ru` | `443` | ✅ | [🔗 Добавить](tg://proxy?server=super.its-work.ru&port=443&secret=ee726fbbbf8bc37222d0f92a6cac3aacf4636c6f7764666c6172652e636f6d) |
| 9 | `64.188.65.59` | `443` | ✅ | [🔗 Добавить](tg://proxy?server=64.188.65.59&port=443&secret=ee67ddd226a29e40d7f3d9c81acb8596287765622e6d61782e7275) |
| 10 | `158.160.188.98` | `8443` | ✅ | [🔗 Добавить](https://t.me/proxy?server=158.160.188.98&port=8443&secret=dd73675b09ac6690ff559bffa7b39a94c8) |

> 💡 **Совет:** Если один прокси не работает, попробуйте другой из списка. Серверы обновляются автоматически каждые 48 часов.
<!-- PROXY_TABLE_END -->

---

## 🧠 Обход блокировок с помощью DNS

Здесь собраны лучшие **бесплатные** DNS‑серверы для России.

### ⚙️ **XBox DNS (xbox-dns.ru)**

Открывает доступ к большинству сервисов с региональными блокировками.
**Настройка:** в поле «Частный DNS» введите `xbox-dns.ru`. Для ручного ввода IP используйте `111.88.96.50` и `111.88.96.51`.

### 🛡️ **dns.malw.link**

Очень быстрый и стабильный DNS, который можно настроить через сервера Cloudflare.
**Настройка:** Укажите адрес `dns.malw.link` как частный DNS. Ручные IP: `84.21.189.133` и `193.23.209.189`.

### 🔒 **AdGuard DNS**

Блокирует рекламу и трекеры на уровне DNS.
**Настройка:** Используйте `94.140.14.14` и `94.140.15.15` для основного и резервного DNS.

---

## 💰 Поддержать проект

Разработка и поддержка StintikVPN требует времени и сил. Если проект полезен и Вы хотите его развития, авторы будут благодарны за любую поддержку.

| Кому | Ссылка для помощи |
|:---|:---|
| **Stintik (создатель репозитория)** | `79960694715` (карта Озон) |
| **MifaWorld** | [pay.cloudtips.ru/p/99adaf36](https://pay.cloudtips.ru/p/99adaf36) |
| **Theakres** | [pay.cloudtips.ru/p/a09ce4dd](https://pay.cloudtips.ru/p/a09ce4dd) |
| **Aetris VPN** | [pay.cloudtips.ru/p/6f2a7544](https://pay.cloudtips.ru/p/6f2a7544) |

**Дополнительно если хотите поддержать проект просто поставьте звезду ⭐ на репозиторий**

---

## ⚠️ Важное предупреждение

> Все конфиги взяты из публичных открытых источников. **Работоспособность не гарантирована на 100%** – многое зависит от провайдера и региона.
> **Запрещено** использовать конфигурации в противоправных действиях, нарушающих законодательство РФ.
> Создатель проекта **не несёт ответственности** за Ваши действия. Используя подписки, Вы подтверждаете, что не нарушаете закон.

---

## 🔄 Обновление конфигов

Конфиги обновляются **автоматически** через GitHub Actions каждые **48 часов**.
Просто нажимайте **«Обновить подписку»** в своём клиенте и продолжайте пользоваться.

### 📊 Статистика обновлений

- **Частота:** Раз в 48 часов
- **Время выполнения:** ~2-5 минут (оптимизировано)
- **Источников:** 30+ публичных репозиториев
- **Проверок:** GeoIP, Ping, Socket connectivity
- **Кэширование:** IP и Geo данные кэшируются на 30 дней

---

## 💬 Контакты

- **Telegram-канал:** [@StintikVPN](https://t.me/StintikVPN)
- **Telegram для связи:** [@Keb04w](https://t.me/Keb04w)
- **Discord:** [@stintik_official](https://discord.gg/SHsWfuht)

---

*StintikVPN – сделано людьми для людей*
