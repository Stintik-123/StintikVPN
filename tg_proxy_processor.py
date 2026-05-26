"""
🤖 TG Proxy Input Processor - StintikVPN
Принимает прокси из tg_proxy_input.txt, обрабатывает их и обновляет README.md
"""

import os
import re
import json
import time
from datetime import datetime

BASE_DIR = "checked_tg"
INPUT_FILE = os.path.join(BASE_DIR, "tg_proxy_input.txt")
OUTPUT_FILE = os.path.join(BASE_DIR, "tg_proxy.txt")
README_FILE = "README.md"
README_EN_FILE = "ReadMe_EN.md"
README_CN_FILE = "ReadMe_CN.md"
README_IR_FILE = "ReadMe_IR.md"

def parse_tg_proxy_line(line):
    """Парсит строку с TG прокси и извлекает сервер, порт и секрет"""
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    # Формат: tg://proxy?server=X&port=Y&secret=Z
    # Или: https://t.me/proxy?server=X&port=Y&secret=Z
    
    patterns = [
        r'(?:tg://|https://t\.me/)proxy\?(?:[^&]*&)*server=([^&]+)',
        r'(?:tg://|https://t\.me/)proxy\?(?:[^&]*&)*port=(\d+)',
        r'(?:tg://|https://t\.me/)proxy\?(?:[^&]*&)*secret=([^&]+)',
    ]
    
    server_match = re.search(r'server=([^&]+)', line)
    port_match = re.search(r'port=(\d+)', line)
    secret_match = re.search(r'secret=([^&]+)', line)
    
    if server_match and port_match:
        return {
            'raw': line,
            'server': server_match.group(1),
            'port': port_match.group(1),
            'secret': secret_match.group(1) if secret_match else ''
        }
    
    return None

def process_input_file():
    """Обрабатывает входной файл и возвращает список валидных прокси"""
    if not os.path.exists(INPUT_FILE):
        print(f"⚠️ Файл {INPUT_FILE} не найден")
        return []
    
    proxies = []
    with open(INPUT_FILE, 'r', encoding='utf-8') as f:
        for line in f:
            parsed = parse_tg_proxy_line(line)
            if parsed:
                proxies.append(parsed)
    
    return proxies

def update_readme_proxies(proxies):
    """Обновляет секцию с прокси в README файлах"""
    
    # Генерируем HTML таблицу для прокси
    proxy_rows = []
    for i, proxy in enumerate(proxies[:50], 1):  # Максимум 50 прокси
        server = proxy['server']
        port = proxy['port']
        secret = proxy.get('secret', '')
        
        # Создаем ссылку для подключения
        if secret:
            link = f"https://t.me/proxy?server={server}&port={port}&secret={secret}"
        else:
            link = f"https://t.me/proxy?server={server}&port={port}"
        
        row = f"| {i} | `{server}` | `{port}` | [🔗 Добавить]({link}) |"
        proxy_rows.append(row)
    
    if not proxy_rows:
        proxy_table = "| *Нет активных прокси* – добавьте их в tg_proxy_input.txt |"
    else:
        proxy_table = "\n".join(proxy_rows)
    
    # Формируем новую секцию
    new_section = f"""<!-- TG_PROXY_SECTION_START -->
<details>
<summary>🔓 Нажмите, чтобы открыть доступные Telegram прокси</summary>

| # | Сервер | Порт | Подключить |
|:---:|:---|:---:|:---:|
{proxy_table}

</details>
<!-- TG_PROXY_SECTION_END -->"""
    
    # Обновляем README.md
    update_readme_file(README_FILE, new_section)
    update_readme_file(README_EN_FILE, new_section.replace("Нажмите, чтобы открыть доступные Telegram прокси", "Click to expand available Telegram proxies").replace("*Нет активных прокси*", "*No active proxies*"))
    update_readme_file(README_CN_FILE, new_section.replace("Нажмите, чтобы открыть доступные Telegram прокси", "点击展开可用的 Telegram 代理").replace("*Нет активных прокси*", "*暂无活跃代理*").replace("Сервер", "服务器").replace("Порт", "端口").replace("Подключить", "连接"))
    update_readme_file(README_IR_FILE, new_section.replace("Нажмите, чтобы открыть доступные Telegram прокси", "کلیک برای نمایش پروکسی‌های تلگرام موجود").replace("*Нет активных прокси*", "*هیچ پروکسی فعالی وجود ندارد*").replace("Сервер", "سرور").replace("Порт", "پورت").replace("Подключить", "اتصال"))

def update_readme_file(filepath, new_section):
    """Обновляет секцию прокси в конкретном README файле"""
    if not os.path.exists(filepath):
        print(f"⚠️ Файл {filepath} не найден")
        return
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Находим и заменяем секцию между маркерами
    pattern = r'<!-- TG_PROXY_SECTION_START -->.*?<!-- TG_PROXY_SECTION_END -->'
    new_content = re.sub(pattern, new_section, content, flags=re.DOTALL)
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"✅ Обновлён {filepath}")

def main():
    print("🚀 TG Proxy Input Processor")
    print("=" * 40)
    
    # Обрабатываем входной файл
    proxies = process_input_file()
    
    if not proxies:
        print("❌ Не найдено валидных прокси во входном файле")
        return
    
    print(f"✅ Найдено {len(proxies)} валидных прокси")
    
    # Сохраняем обработанные прокси в output файл
    with open(OUTPUT_FILE, 'w', encoding='utf-8') as f:
        f.write(f"# StintikVPN TG Proxy Auto-Generated: {time.strftime('%Y-%m-%d %H:%M')} | Count: {len(proxies)}\n")
        for proxy in proxies:
            f.write(proxy['raw'] + '\n')
    
    print(f"💾 Прокси сохранены в {OUTPUT_FILE}")
    
    # Обновляем README файлы
    update_readme_proxies(proxies)
    
    print(f"\n✅ ГОТОВО! Обработано {len(proxies)} прокси")
    print(f"📅 Время обновления: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")

if __name__ == "__main__":
    main()
