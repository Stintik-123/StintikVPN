# 🚀 StintikVPN Checker

<div align="center">

[🇷🇺 Русский](#-russian) | [🇬🇧 English](#-english)

</div>

---

<h2 id="-russian">🇷🇺 Русский</h2>

Мощный асинхронный чекер VPN конфигураций и Telegram прокси с интеллектуальной системой оценки, GeoIP-маршрутизацией и детальной статистикой.

## 🔗 Быстрый доступ к результатам

Результаты проверки автоматически сортируются и сохраняются в следующие файлы:

### 📦 Основные списки
*   **[⚫ Black List (250 лучших)](checked/black/black.txt)** — Оптимальный баланс скорости и стабильности для ежедневного использования.
*   **[📱 Black Mobile (50 топ)](checked/black/black.mobile.txt)** — Лучшие серверы с минимальным пингом для мобильных устройств.
*   **[⚪ White All (100)](checked/white/white.all.txt)** — Полностью рабочие конфиги без фильтрации по типу.
*   **[🔍 White SNI (100)](checked/white/white.sni.txt)** — Конфигурации с валидным SNI (обход DPI).
*   **[🌐 White CIDR (100)](checked/white/white.cidr.txt)** — Конфигурации с корректными CIDR масками.

### 🛠 Протоколы
*   **[VLESS](checked/protocols/vless.txt)** — Современный протокол (рекомендуется для обхода блокировок).
*   **[VMess](checked/protocols/vmess.txt)** — Классический протокол V2Ray.
*   **[Trojan](checked/protocols/trojan.txt)** — Маскировка под обычный HTTPS трафик.
*   **[Shadowsocks](checked/protocols/ss.txt)** — Быстрый и легкий протокол.

### 🌍 По странам
Конфигурации отсортированы по географическому расположению серверов:
*   **[📂 Папка по странам](checked/by_country/)** — Отдельные файлы для каждой страны (например, `DE.txt`, `US.txt`, `FI.txt`).

### 💬 Telegram Прокси
*   **[MTProto Proxies](checked_tg/proxies.txt)** — Рабочие прокси для Telegram.
*   **[Mobile Proxies](checked_tg/mobile.txt)** — Быстрые прокси для смартфонов.

---

## ⚡ Уникальные возможности

### 🏆 Health Score System
Динамическая система оценки здоровья сервера от 0 до 100. Учитывает пинг, стабильность соединения, историю аптайма и скорость загрузки. Серверы с низким рейтингом автоматически исключаются из топ-списков.

### 🗺️ Smart Migration Map
Интеллектуальная система рекомендаций. Если серверы определенной страны становятся недоступными, чекер автоматически предлагает альтернативные локации с наилучшей связностью (например, при проблемах в РФ рекомендует Финляндию или Нидерланды).

### 🌍 Multi-API GeoIP
Определение местоположения через 3 независимых источника (ip-api, ipwhois, ipapi) с умным фоллбэком.
*   **Кэш на 30 дней**: Экономия запросов и ускорение работы.
*   **Распознавание блокировок**: Автоматическое выявление стран с цензурой (Иран, Китай, РФ).

### 💾 Reputation Database
База данных репутации IP-адресов. Серверы, которые часто отваливаются или работают нестабильно, помечаются и реже попадают в выборку.

---

## ⚙️ Настройка и запуск

### Требования
*   Python 3.9+
*   Установленные зависимости: `pip install -r requirements.txt`

### Запуск
```bash
# Проверка VPN конфигов
python main.py

# Проверка Telegram прокси
python tg_proxy_checker.py
```

### Конфигурация лимитов
В файле `main.py` можно изменить параметры:
*   `BLACK_LIMIT = 250` — Количество серверов в черном списке.
*   `MAX_PING = 3000` — Максимальный допустимый пинг (мс).
*   `THREADS = 800` — Количество потоков для проверки.

---

## 📊 Статистика
Файл `live_stats.json` содержит актуальную статистику:
*   Общее количество проверенных серверов.
*   Процент рабочих конфигураций.
*   Распределение по странам и протоколам.
*   Средний пинг и Health Score.

---

## 🔄 Перенос на другие платформы (GitLab, Codeberg)

Проект легко адаптируется для использования в CI/CD других хостингов:

1.  **GitLab CI**:
    *   Создайте файл `.gitlab-ci.yml`.
    *   Используйте образ `python:3.9`.
    *   В секции `script` пропишите установку зависимостей и запуск скриптов.
    *   Артефакты (папка `checked`) настройте в секции `artifacts`.

2.  **Codeberg / Gitea**:
    *   Аналогично GitLab, используйте Drone CI или встроенный Actions (если доступен).
    *   Обратите внимание на лимиты времени выполнения (обычно 60-90 минут).

3.  **GitHub Actions** (по умолчанию):
    *   Workflow файлы находятся в `.github/workflows/`.
    *   Таймер настроен на запуск каждые 6 часов.

> **Примечание**: При переносе убедитесь, что внешние API (GeoIP) не блокируют IP-адреса раннеров новой платформы. Возможно, потребуется увеличить интервалы между запросами.

---

<h2 id="-english">🇬🇧 English</h2>

Powerful asynchronous VPN config and Telegram proxy checker with intelligent scoring, GeoIP routing, and detailed statistics.

## 🔗 Quick Links to Results

Check results are automatically sorted and saved to the following files:

### 📦 Main Lists
*   **[⚫ Black List (250 Best)](checked/black/black.txt)** — Optimal balance of speed and stability for daily use.
*   **[📱 Black Mobile (50 Top)](checked/black/black.mobile.txt)** — Best servers with minimal ping for mobile devices.
*   **[⚪ White All (100)](checked/white/white.all.txt)** — Fully working configs without type filtering.
*   **[🔍 White SNI (100)](checked/white/white.sni.txt)** — Configs with valid SNI (DPI bypass).
*   **[🌐 White CIDR (100)](checked/white/white.cidr.txt)** — Configs with correct CIDR masks.

### 🛠 Protocols
*   **[VLESS](checked/protocols/vless.txt)** — Modern protocol (recommended for bypassing blocks).
*   **[VMess](checked/protocols/vmess.txt)** — Classic V2Ray protocol.
*   **[Trojan](checked/protocols/trojan.txt)** — Masquerades as normal HTTPS traffic.
*   **[Shadowsocks](checked/protocols/ss.txt)** — Fast and lightweight protocol.

### 🌍 By Country
Configs sorted by server geographic location:
*   **[📂 Country Folder](checked/by_country/)** — Separate files for each country (e.g., `DE.txt`, `US.txt`, `FI.txt`).

### 💬 Telegram Proxies
*   **[MTProto Proxies](checked_tg/proxies.txt)** — Working proxies for Telegram.
*   **[Mobile Proxies](checked_tg/mobile.txt)** — Fast proxies for smartphones.

---

## ⚡ Unique Features

### 🏆 Health Score System
Dynamic server health rating from 0 to 100. Considers ping, connection stability, uptime history, and download speed. Low-rated servers are automatically excluded from top lists.

### 🗺️ Smart Migration Map
Intelligent recommendation system. If servers in a specific country become unreachable, the checker automatically suggests alternative locations with the best connectivity.

### 🌍 Multi-API GeoIP
Location detection via 3 independent sources (ip-api, ipwhois, ipapi) with smart fallback.
*   **30-Day Cache**: Saves requests and speeds up execution.
*   **Censorship Detection**: Automatic identification of countries with restrictions (Iran, China, Russia).

### 💾 Reputation Database
IP reputation database. Servers that frequently drop or work unstably are flagged and less likely to appear in selections.

---

## ⚙️ Setup & Usage

### Requirements
*   Python 3.9+
*   Dependencies: `pip install -r requirements.txt`

### Run
```bash
# Check VPN configs
python main.py

# Check Telegram proxies
python tg_proxy_checker.py
```

### Configuration Limits
Edit `main.py` to change parameters:
*   `BLACK_LIMIT = 250` — Number of servers in the black list.
*   `MAX_PING = 3000` — Maximum allowed ping (ms).
*   `THREADS = 800` — Number of threads for checking.

---

## 📊 Statistics
The `live_stats.json` file contains up-to-date statistics:
*   Total checked servers.
*   Percentage of working configs.
*   Distribution by country and protocol.
*   Average ping and Health Score.

---

## 🔄 Migration to Other Platforms (GitLab, Codeberg)

The project is easily adaptable for CI/CD on other hosts:

1.  **GitLab CI**:
    *   Create `.gitlab-ci.yml`.
    *   Use `python:3.9` image.
    *   Define installation and run commands in `script`.
    *   Configure artifacts (`checked` folder) in `artifacts` section.

2.  **Codeberg / Gitea**:
    *   Similar to GitLab, use Drone CI or built-in Actions.
    *   Mind execution time limits (usually 60-90 mins).

3.  **GitHub Actions** (default):
    *   Workflow files are in `.github/workflows/`.
    *   Timer set to run every 6 hours.

> **Note**: When migrating, ensure external APIs (GeoIP) do not block the new platform's runner IPs. You may need to increase request intervals.
