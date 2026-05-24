# 🛡️ StintikVPN | Freedom Configs

> **Интернет без границ. Автоматическая проверка. Лучшее качество.**  
> 🔄 Обновляется каждые 48 часов | ✅ Проверено скриптом | 🚀 Оптимизировано для РФ

<div align="center">

[![Status](https://img.shields.io/badge/Status-Online-success?style=for-the-badge)](https://github.com/Stintik-123/StintikVPN-)
[![Update](https://img.shields.io/badge/Updates-Every_48h-blue?style=for-the-badge)](https://github.com/Stintik-123/StintikVPN-/actions)
[![License](https://img.shields.io/badge/License-MIT-green?style=for-the-badge)](LICENSE)
[![Channel](https://img.shields.io/badge/Telegram-@StintikVPN-2CA5E0?style=for-the-badge&logo=telegram)](https://t.me/StintikVPN)

</div>

---

## ⚡ Быстрый старт

Выберите категорию, скопируйте ссылку и вставьте в свой клиент. Всё просто.

| Категория | Описание | Статус | Действие |
| :--- | :--- | :---: | :--- |
| **⚫ Black List** | Максимальная скорость. Для домашнего Wi-Fi и кабельных провайдеров. | 🟢 Работает | [📋 Копировать ссылку](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/black/black.txt) |
| **⚪ White List** | Обход жестких блокировок (МТС, Билайн, ТСПУ). SNI + CIDR технологии. | 🟢 Работает | [📋 Копировать ссылку](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/white/white.all.txt) |
| **📱 Mobile Black** | Специальная подборка для мобильных сетей (4G/5G). | 🟢 Работает | [📋 Копировать ссылку](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/black_mobile/black_mobile.txt) |
| **🤖 TG Proxy** | Список живых MTProto прокси для самого Telegram. | 🟢 Работает | [📋 Копировать ссылку](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/tg_proxy/tg_proxy.txt) |

### 🧩 Отдельные протоколы
Если ваш клиент требует конкретный тип:
`VLESS` → [Ссылка](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vless.txt) | 
`VMess` → [Ссылка](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/vmess.txt) | 
`Trojan` → [Ссылка](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/trojan.txt) | 
`SS` → [Ссылка](https://raw.githubusercontent.com/Stintik-123/StintikVPN-/main/checked/protocols/ss.txt)

---

## 📱 Лучшие клиенты (Рекомендация)

Без хорошего инструмента даже лучший конфиг бесполезен. Вот топ проверенных приложений:

| Платформа | Приложение | Почему оно? | Скачать |
| :--- | :--- | :--- | :--- |
| **Android** | **Hiddify Next** | Поддержка всех протоколов, авто-выбор, красивый UI. | [GitHub](https://github.com/hiddify/hiddify-next) |
| **iOS** | **FoXray** | Лучшая работа с Reality и SNI на iPhone. | [App Store](https://apps.apple.com/app/foxray/id6448799390) |
| **Windows** | **NekoBox** | Мощный комбайн с правилами маршрутизации. | [GitHub](https://github.com/MatsuriDayo/nekoray) |
| **macOS** | **V2Box** | Простота и скорость для Mac. | [App Store](https://apps.apple.com/app/v2box/id6446188157) |

<details>
<summary><b>🛠 Альтернативы VPN (Если нужна только скорость)</b></summary>
<br>
Иногда VPN избыточен. Для YouTube и Discord можно использовать инструменты обхода DPI (не меняют IP, не режут скорость):
<ul>
<li><b>Android:</b> <a href="https://github.com/ValdikSS/ByeDPIAndroid">ByeDPIAndroid</a> — включил и забыл.</li>
<li><b>Windows:</b> <a href="https://github.com/Flowseal/zapret-discord-youtube">Zapret</a> — настройка через bat-файл.</li>
</ul>
</details>

---

## 🧠 База знаний (Спойлеры)

<details>
<summary><b>❓ Что такое Black и White списки?</b></summary>
<br>
<ul>
<li><b>⚫ Black (Чёрные):</b> Обычные сервера. Быстрые, но могут блокироваться провайдерами "в лоб". Идеально для дома.</li>
<li><b>⚪ White (Белые):</b> Сервера с маскировкой. Они притворяются обычными сайтами (например, Microsoft). Медленнее на 10-15%, но работают там, где другие заблокированы.</li>
</ul>
</details>

<details>
<summary><b>❓ В чем разница между SNI и CIDR?</b></summary>
<br>
Это два метода маскировки внутри White списков:
<ul>
<li><b>SNI (Server Name Indication):</b> Подменяет имя домена при подключении. Провайдер видит, что вы идете на разрешенный сайт.</li>
<li><b>CIDR (IP Диапазоны):</b> Использует IP-адреса крупных корпораций. Провайдер боится их блокировать, чтобы не "положить" пол-интернета.</li>
<li><i>Совет: Если один метод не работает, переключитесь на другой.</i></li>
</ul>
</details>

<details>
<summary><b>❓ Какие протоколы самые надежные?</b></summary>
<br>
<ul>
<li><b>VLESS + Reality:</b> 👑 Король текущего времени. Невозможно отличить от обычного HTTPS трафика.</li>
<li><b>Trojan:</b> Классика маскировки под веб-сайт.</li>
<li><b>VMess / SS:</b> Хороши для скорости, но легче детектируются умными системами.</li>
</ul>
</details>

<details>
<summary><b>🌐 DNS для ускорения</b></summary>
<br>
Попробуйте прописать эти DNS в настройках телефона или роутера:
<ul>
<li><b>XBox DNS:</b> <code>xbox-dns.ru</code> (Открывает магазины игр)</li>
<li><b>Malw Link:</b> <code>dns.malw.link</code> (Быстрый и чистый)</li>
</ul>
</details>

---

## 💰 Поддержка проекта

Развитие этого репозитория требует ресурсов. Если сервис полезен — поддержите автора.

💳 **Реквизиты создателя (@Stintik-123):**
*   **Озон Банк:** `79960694715`

🤝 **Поддержка сообщества:**
Мы используем конфиги от энтузиастов. Если вам понравился конкретный сервер, найдите его владельца и поблагодарите его.
*   *Авторы исходников: Igareck, Kort0881, AvenCores, Zieng2 и другие.*

> ⭐ **Лучшая поддержка — это звезда (Star) этому репозиторию!** Это помогает проекту жить и развиваться.

---

<div align="center">

**StintikVPN** © 2026  
[Telegram Channel](https://t.me/StintikVPN) • [Discord](https://discord.gg/SHsWfuht) • [GitHub](https://github.com/Stintik-123)

*Сделано людьми для людей. Свободный интернет — это право каждого.*

</div>
