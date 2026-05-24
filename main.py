import os
import re
import socket
import ssl
import time
import json
import requests
import base64
import threading
from urllib.parse import unquote, urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

# ==========================================
# ⚙️ КОНФИГУРАЦИЯ (ОПТИМИЗИРОВАНО ДЛЯ СКОРОСТИ)
# ==========================================
BASE_DIR = "checked"
TIMEOUT = 2          # Жесткий таймаут для скорости
THREADS = 300          # Много потоков для быстрой проверки
MAX_PING_MS = 3000     # Строгий лимит пинга

# ЛИМИТЫ НА ВЫХОДЕ
LIMITS = {
    "black": 250,
    "black_mobile": 50,
    "white_all": 50,
    "white_sni": 50,
    "white_cidr": 50,
    "tg_proxy": 50,
    "protocols": 100
}

# Файлы данных
HISTORY_FILE = os.path.join(BASE_DIR, "history.json")
REPUTATION_FILE = os.path.join(BASE_DIR, "reputation.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")
# IP_CACHE_FILE удален, так как мы отключили GeoIP

FAIL_THRESHOLD = 2     # Исключать сервер после 2 неудач подряд

# TELEGRAM CONFIG
TG_BOT_TOKEN = "8645441777:AAH7kWlfGqIEggu6SuhgtHCcd0ifNtiSz50"      # ВСТАВЬТЕ ТОКЕН СЮДА
TG_CHAT_ID = "-1003884045475"        # ВСТАВЬТЕ ID ЧАТА СЮДА

# ==========================================
# 🌍 МАРКЕРЫ И ФИЛЬТРЫ (БЕЗ GEOIP API)
# ==========================================
RU_MARKERS_STRICT = [
    ".ru", "moscow", "msk", "spb", "saint-peter", "russia",
    "россия", "москва", "питер", "ru-", "-ru.",
    "178.154.", "77.88.", "5.255.", "87.250.",
    "95.108.", "213.180.", "195.208.", "91.108.", "149.154.",
]
EURO_CODES = {"NL", "DE", "FI", "GB", "FR", "SE", "PL", "CZ", "AT", "CH", "IT", "ES", "NO", "DK", "BE", "IE", "LU", "EE", "LV", "LT"}

BAD_MARKERS = ["CN", "IR", "KP", "RELAY", "POOL"]
CDN_KEYWORDS = ["cloudflare", "cdn", "akamai"]

# ==========================================
# 📂 ИСТОЧНИКИ ДАННЫХ
# ==========================================
OUTPUTS = {
    "black": {
        "folder": os.path.join(BASE_DIR, "black"),
        "file": "black.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_SS+All_RUS_base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_base64.txt",
            "https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/refs/heads/main/tri_228.txt",
            "https://vpn.akres.fun/all",
            "https://mifa.world/fast",
        ],
    },
    "black_mobile": {
        "folder": os.path.join(BASE_DIR, "black_mobile"),
        "file": "black_mobile.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_mobile_base64.txt",
        ],
    },
    "white_all": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.all.txt",
        "urls": [
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vless.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_white.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Vless-Reality-White-Lists-Rus-Mobile.txt",
        ],
    },
    "white_sni": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.sni.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-SNI-RU-all-base64.txt",
        ],
    },
    "white_cidr": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.cidr.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-all-base64.txt",
        ],
    },
    "tg_proxy": {
        "folder": os.path.join(BASE_DIR, "tg_proxy"),
        "file": "tg_proxy.txt",
        "urls": [
            "https://t.me/proxy?server=84.201.168.161&port=8443&secret=ddf7d43a5e2ca0a8fa4cec27829869cb6b",
            "https://t.me/proxy?server=85.192.34.153&port=8443&secret=dde3d3a09a31f5c857890cfc2a0bcab4c1",
            "https://t.me/proxy?server=jtproxy.life&port=443&secret=eef0050d30441bab41f60acae779df0c4076646673696e612e7275",
        ],
    },
}

PROTOCOL_FILES = {
    "vless": os.path.join(BASE_DIR, "protocols", "vless.txt"),
    "vmess": os.path.join(BASE_DIR, "protocols", "vmess.txt"),
    "trojan": os.path.join(BASE_DIR, "protocols", "trojan.txt"),
    "ss": os.path.join(BASE_DIR, "protocols", "ss.txt"),
}

# ==========================================
# 🔧 ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ
# ==========================================
for meta in OUTPUTS.values():
    os.makedirs(meta["folder"], exist_ok=True)
os.makedirs(os.path.dirname(PROTOCOL_FILES["vless"]), exist_ok=True)
os.makedirs(BASE_DIR, exist_ok=True)

_reputation_db = {}
_stats = {"sources": defaultdict(int), "total_checked": 0, "alive": 0, "dead": 0, "sources_alive": defaultdict(int)}

_lock = threading.Lock()
_rep_lock = threading.Lock()
_stats_lock = threading.Lock()

# ==========================================
# 🧠 РЕПУТАЦИЯ И КЭШ
# ==========================================
def load_json(path):
    if os.path.exists(path):
        try:
            with open(path, "r", encoding="utf-8") as f:
                return json.load(f)
        except Exception:
            return {}
    return {}

def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

def load_reputation():
    global _reputation_db
    _reputation_db = load_json(REPUTATION_FILE)

def save_reputation():
    with _rep_lock:
        save_json(REPUTATION_FILE, _reputation_db)

def check_reputation(host, port):
    key = f"{host}:{port}"
    with _rep_lock:
        entry = _reputation_db.get(key)
        if entry and entry.get("fails", 0) >= FAIL_THRESHOLD:
            return False
    return True

def update_reputation(host, port, success):
    key = f"{host}:{port}"
    with _rep_lock:
        if key not in _reputation_db:
            _reputation_db[key] = {"fails": 0}
        if success:
            _reputation_db[key]["fails"] = 0
        else:
            _reputation_db[key]["fails"] += 1

# ==========================================
# 🕵️ ПАРСИНГ И ПРОВЕРКА (БЕЗ GEOIP)
# ==========================================
def parse_proxy_line(line, source_url=""):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    # Нормализация TG прокси
    if line.startswith("tg://proxy"):
        # Конвертируем tg:// в https://t.me для кликабельности
        line = line.replace("tg://proxy?", "https://t.me/proxy?")
        return {"type": "tg_proxy", "raw": line, "host": None, "port": None, "source_url": source_url}
    
    if line.startswith("https://t.me/proxy"):
        return {"type": "tg_proxy", "raw": line, "host": None, "port": None, "source_url": source_url}
    
    # VLESS
    if line.startswith("vless://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            params = parse_qs(parsed.query)
            return {"type": "vless", "host": host, "port": port, "name": name, "raw": line, "params": params, "source_url": source_url}
        except: return None
    
    # VMess
    if line.startswith("vmess://"):
        try:
            decoded = base64.b64decode(line[8:] + '==').decode('utf-8')
            data = json.loads(decoded)
            return {"type": "vmess", "host": data.get('add'), "port": int(data.get('port', 443)), "name": data.get('ps', ''), "raw": line, "params": data, "source_url": source_url}
        except: return None
        
    # Trojan
    if line.startswith("trojan://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            return {"type": "trojan", "host": host, "port": port, "name": name, "raw": line, "params": {}, "source_url": source_url}
        except: return None

    # SS
    if line.startswith("ss://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            return {"type": "ss", "host": host, "port": port, "name": name, "raw": line, "params": {}, "source_url": source_url}
        except: return None
        
    return None

def check_socket(host, port, timeout=TIMEOUT):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        start = time.time()
        result = sock.connect_ex((host, port))
        ping = (time.time() - start) * 1000
        sock.close()
        if result == 0 and ping < MAX_PING_MS:
            return True, ping
        return False, ping
    except:
        return False, 9999

def get_country_approx(host, name):
    """Быстрое определение страны только по имени и хосту (без API)"""
    host_l = host.lower() if host else ""
    name_u = name.upper() if name else ""
    
    if host_l.endswith(".ru") or "RU" in name_u or "ROSSIA" in name_u or "MOSCOW" in name_u:
        return "RU"
    for code in EURO_CODES:
        if code in name_u:
            return code
    return "UNKNOWN"

def process_key(item):
    p_type = item.get('type')
    source = item.get('source_url', 'unknown')
    
    if p_type == 'tg_proxy':
        return {'valid': True, 'item': item, 'ping': 0, 'country': 'XX', 'source': source}

    host = item.get('host')
    port = item.get('port')
    
    if not host or not port:
        return None
    
    # 1. Проверка репутации
    if not check_reputation(host, port):
        return None

    # 2. Socket Check (Самая быстрая часть)
    is_online, ping = check_socket(host, port)
    
    if not is_online:
        update_reputation(host, port, False)
        return None
        
    update_reputation(host, port, True)
    
    # 3. Быстрое определение страны (без API!)
    name = item.get('name', '')
    country = get_country_approx(host, name)
    
    # Фильтр плохих стран (если явно видно в имени)
    if country == "UNKNOWN":
        # Можно добавить дополнительную эвристику, но пока пропускаем
        pass
    
    for bad in BAD_MARKERS:
        if bad in name.upper():
            return None

    return {'valid': True, 'item': item, 'ping': ping, 'country': country, 'source': source}

def classify_white_smart(item, country):
    name = (item.get('name') or "").upper()
    params = item.get('params', {})
    raw = item.get('raw', "")
    
    if "CIDR" in name or "192.168" in raw or "/32" in raw:
        return "white_cidr"
    
    security = ""
    if isinstance(params, dict):
        sec_list = params.get('security', [])
        security = sec_list[0] if isinstance(sec_list, list) else sec_list
    
    if security == 'reality' or 'reality' in raw.lower():
        return "white_sni"
        
    sni_val = ""
    if isinstance(params, dict):
        sni_list = params.get('sni', [])
        sni_val = sni_list[0] if isinstance(sni_list, list) else sni_list
    
    if sni_val and sni_val != item['host']:
        return "white_sni"
        
    return "white_all"

def fetch_urls(urls, category_name):
    all_items = []
    for url in urls:
        try:
            r = requests.get(url.strip(), timeout=10)
            if r.status_code == 200:
                content = r.text
                try:
                    decoded = base64.b64decode(content).decode('utf-8')
                    lines = decoded.splitlines()
                except:
                    lines = content.splitlines()
                
                valid_count = 0
                for line in lines:
                    parsed = parse_proxy_line(line, source_url=url)
                    if parsed:
                        all_items.append(parsed)
                        valid_count += 1
                
                with _stats_lock:
                    _stats["sources"][url] += valid_count
        except Exception as e:
            print(f"Error fetching {url}: {e}")
    return all_items

def send_telegram_report(stats, counts):
    if not TG_BOT_TOKEN or not TG_CHAT_ID:
        print("⚠️ Telegram не настроен (нет токена или ID). Пропускаю отчет.")
        return
    
    msg = f"🚀 <b>StintikVPN Checker Report</b>\n\n"
    msg += f"✅ Живых: <b>{stats['alive']}</b>\n"
    msg += f"❌ Мертвых: <b>{stats['dead']}</b>\n"
    msg += f"⏱ Время работы: <b>{stats.get('duration', 0):.1f} сек</b>\n\n"
    
    msg += "<b>Лимиты соблюдены:</b>\n"
    for cat, count in counts.items():
        limit = LIMITS.get(cat, 0)
        if limit > 0:
            msg += f"├ {cat}: {count}/{limit}\n"
    
    msg += "\n<b>🏆 Топ источников:</b>\n"
    sorted_sources = sorted(stats.get('sources_alive', {}).items(), key=lambda x: x[1], reverse=True)[:5]
    for url, count in sorted_sources:
        short_url = url.split('/')[-1].replace('.txt', '')
        msg += f"├ {short_url}: {count}\n"
        
    url_req = f"https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage"
    try:
        requests.post(url_req, json={
            "chat_id": TG_CHAT_ID,
            "text": msg,
            "parse_mode": "HTML"
        })
        print("📩 Отчет отправлен в Telegram!")
    except Exception as e:
        print(f"❌ Ошибка отправки в Telegram: {e}")

def main():
    start_time = time.time()
    print(f"🚀 StintikVPN Fast Checker Started (Threads: {THREADS}, GeoIP: OFF)")
    load_reputation()
    
    results = {
        'black': [], 'black_mobile': [], 'white_all': [],
        'white_sni': [], 'white_cidr': [], 'tg_proxy': [],
        'protocols': defaultdict(list)
    }
    
    all_tasks = []
    
    print("📥 Загрузка списков...")
    black_items = fetch_urls(OUTPUTS['black']['urls'], 'black')
    for item in black_items: all_tasks.append((item, 'black'))
        
    white_urls = OUTPUTS['white_all']['urls'] + OUTPUTS['white_sni']['urls'] + OUTPUTS['white_cidr']['urls']
    white_items = fetch_urls(white_urls, 'white')
    for item in white_items: all_tasks.append((item, 'white'))
        
    tg_items = fetch_urls(OUTPUTS['tg_proxy']['urls'], 'tg')
    for item in tg_items:
        results['tg_proxy'].append({'valid': True, 'item': item, 'ping': 0, 'country': 'XX', 'source': item.get('source_url')})

    print(f"🔍 Проверка {len(all_tasks)} ключей (без GeoIP)...")
    
    alive_count = 0
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        futures = [executor.submit(process_key, item) for item, _ in all_tasks]
        for future in as_completed(futures):
            res = future.result()
            if res and res.get('valid'):
                alive_count += 1
                item = res['item']
                source = res['source']
                
                with _stats_lock:
                    if source not in _stats['sources_alive']:
                        _stats['sources_alive'][source] = 0
                    _stats['sources_alive'][source] += 1
                
                src_url = item.get('source_url', '')
                is_white_source = any(u == src_url for u in white_urls)
                
                if not is_white_source:
                    results['black'].append(res)
                else:
                    sub_cat = classify_white_smart(item, res['country'])
                    results[sub_cat].append(res)
                    results['white_all'].append(res)
                
                p_type = item['type']
                if p_type in ['vless', 'vmess', 'trojan', 'ss']:
                    results['protocols'][p_type].append(res)

    end_time = time.time()
    _stats['alive'] = alive_count
    _stats['dead'] = len(all_tasks) - alive_count
    _stats['total_checked'] = len(all_tasks)
    _stats['duration'] = end_time - start_time

    print("💾 Сохранение результатов...")
    
    def save_list_category(name, data_list, filename):
        data_list.sort(key=lambda x: x['ping'])
        limited = data_list[:LIMITS.get(name, 100)]
        path = os.path.join(BASE_DIR, filename)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        header = f"# StintikVPN Auto-Generated: {time.strftime('%Y-%m-%d %H:%M')} | Count: {len(limited)}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        return len(limited)

    final_counts = {}
    final_counts['black'] = save_list_category('black', results['black'], OUTPUTS['black']['file'])
    final_counts['black_mobile'] = save_list_category('black_mobile', results['black'], OUTPUTS['black_mobile']['file'])
    final_counts['white_all'] = save_list_category('white_all', results['white_all'], OUTPUTS['white_all']['file'])
    final_counts['white_sni'] = save_list_category('white_sni', results['white_sni'], OUTPUTS['white_sni']['file'])
    final_counts['white_cidr'] = save_list_category('white_cidr', results['white_cidr'], OUTPUTS['white_cidr']['file'])
    
    tg_path = OUTPUTS['tg_proxy']['file']
    limited_tg = results['tg_proxy'][:LIMITS['tg_proxy']]
    with open(tg_path, 'w', encoding='utf-8') as f:
        f.write(f"# TG Proxies Updated: {time.strftime('%Y-%m-%d')}\n")
        f.write('\n'.join([x['item']['raw'] for x in limited_tg]))
    final_counts['tg_proxy'] = len(limited_tg)
    
    for proto, data in results['protocols'].items():
        data.sort(key=lambda x: x['ping'])
        limited = data[:LIMITS['protocols']]
        p_path = PROTOCOL_FILES[proto]
        with open(p_path, 'w', encoding='utf-8') as f:
            f.write(f"# {proto.upper()} Protocol List\n")
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        final_counts[f'proto_{proto}'] = len(limited)

    save_reputation()
    save_json(STATS_FILE, _stats)
    
    print("📊 Отправка отчета...")
    send_telegram_report(_stats, final_counts)
    
    print(f"✅ ГОТОВО! Время: {_stats['duration']:.2f} сек. Рабочих: {_stats['alive']}")

if __name__ == "__main__":
    main()
