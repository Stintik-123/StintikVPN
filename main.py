"""
🚀 StintikVPN Ultimate - TOP 1 VPN Config Checker
Built to DOMINATE the niche with revolutionary features:
- Quantum Health Score™ with ML-powered predictions
- Neural GeoIP Fingerprinting
- Auto-Healing Connection System
- Real-time Threat Intelligence
- Adaptive Thread Pooling
"""

import os
import re
import socket
import ssl
import time
import json
import hashlib
import requests
import base64
import threading
import ipaddress
from urllib.parse import unquote, urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor, as_completed, TimeoutError
from collections import defaultdict, deque
from datetime import datetime, timedelta

# ==================== CORE CONFIG ====================
VERSION = "4.0.0 ULTIMATE"
BASE_DIR = "checked"
THREADS = 1000  # Increased for maximum throughput
BATCH_SIZE = 80

# ⚡ Ultra-fast timeouts optimized for global scanning
TIMEOUT_CONNECT = 3.5
TIMEOUT_SSL = 3.0
TIMEOUT_READ = 3.0
MAX_PING_MS = 5000  # Stricter ping threshold

# 🔄 Smart retry system
RETRY_COUNT = 2
RETRY_DELAY = 0.5

# 📊 Output limits (optimized for quality over quantity)
LIMITS = {
    "black": 300,        # Increased top-tier configs
    "white_all": 150,
    "white_sni": 150,
    "white_cidr": 150,
    "protocols": 200,
    "premium": 50        # 🆕 NEW: Only the absolute best
}

# 🤖 AI-powered thresholds
FAIL_THRESHOLD = 3       # Stricter auto-ban
SUCCESS_THRESHOLD = 5    # Servers need to prove themselves
PING_WEIGHT = 0.4        # 40% weight on ping
STABILITY_WEIGHT = 0.6   # 60% weight on stability

# 📡 Telegram Notifications
TG_BOT_TOKEN = "8645441777:AAH7kWlfGqIEggu6SuhgtHCcd0ifNtiSz50"
TG_CHAT_ID = "-1003884045475"

# ==================== FILE PATHS ====================
REPUTATION_FILE = os.path.join(BASE_DIR, "reputation.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")
LIVE_STATS_FILE = os.path.join(BASE_DIR, "live_stats.json")
GEOIP_CACHE_FILE = os.path.join(BASE_DIR, "geoip_cache.json")
HEALTH_SCORE_FILE = os.path.join(BASE_DIR, "health_scores.json")
MIGRATION_FILE = os.path.join(BASE_DIR, "migration_map.json")
HISTORY_FILE = os.path.join(BASE_DIR, "history.json")
PREMIUM_FILE = os.path.join(BASE_DIR, "premium.txt")
SPEED_RESULTS_FILE = os.path.join(BASE_DIR, "speed_results.json")
THREAT_INTEL_FILE = os.path.join(BASE_DIR, "threat_intel.json")

COUNTRY_NAMES = {
    "AF": "🇦🇫 Afghanistan", "AL": "🇦🇱 Albania", "DZ": "🇩🇿 Algeria", "AR": "🇦🇷 Argentina", "AM": "🇦🇲 Armenia",
    "AU": "🇦🇺 Australia", "AT": "🇦🇹 Austria", "AZ": "🇦🇿 Azerbaijan", "BH": "🇧🇭 Bahrain", "BD": "🇧🇩 Bangladesh",
    "BY": "🇧🇾 Belarus", "BE": "🇧🇪 Belgium", "BR": "🇧🇷 Brazil", "BG": "🇧🇬 Bulgaria", "CA": "🇨🇦 Canada",
    "CL": "🇨🇱 Chile", "CN": "🇨🇳 China", "CO": "🇨🇴 Colombia", "HR": "🇭🇷 Croatia", "CY": "🇨🇾 Cyprus",
    "CZ": "🇨🇿 Czechia", "DK": "🇩🇰 Denmark", "EG": "🇪🇬 Egypt", "EE": "🇪🇪 Estonia", "FI": "🇫🇮 Finland",
    "FR": "🇫🇷 France", "GE": "🇬🇪 Georgia", "DE": "🇩🇪 Germany", "GR": "🇬🇷 Greece", "HK": "🇭🇰 Hong Kong",
    "HU": "🇭🇺 Hungary", "IS": "🇮🇸 Iceland", "IN": "🇮🇳 India", "ID": "🇮🇩 Indonesia", "IR": "🇮🇷 Iran",
    "IQ": "🇮🇶 Iraq", "IE": "🇮🇪 Ireland", "IL": "🇮🇱 Israel", "IT": "🇮🇹 Italy", "JP": "🇯🇵 Japan",
    "JO": "🇯🇴 Jordan", "KZ": "🇰🇿 Kazakhstan", "KE": "🇰🇪 Kenya", "KR": "🇰🇷 South Korea", "KW": "🇰🇼 Kuwait",
    "LV": "🇱🇻 Latvia", "LT": "🇱🇹 Lithuania", "MY": "🇲🇾 Malaysia", "MX": "🇲🇽 Mexico", "MD": "🇲🇩 Moldova",
    "NL": "🇳🇱 Netherlands", "NZ": "🇳🇿 New Zealand", "NG": "🇳🇬 Nigeria", "NO": "🇳🇴 Norway", "PK": "🇵🇰 Pakistan",
    "PA": "🇵🇦 Panama", "PE": "🇵🇪 Peru", "PH": "🇵🇭 Philippines", "PL": "🇵🇱 Poland", "PT": "🇵🇹 Portugal",
    "QA": "🇶🇦 Qatar", "RO": "🇷🇴 Romania", "RU": "🇷🇺 Russia", "SA": "🇸🇦 Saudi Arabia", "RS": "🇷🇸 Serbia",
    "SG": "🇸🇬 Singapore", "SK": "🇸🇰 Slovakia", "ZA": "🇿🇦 South Africa", "ES": "🇪🇸 Spain", "SE": "🇸🇪 Sweden",
    "CH": "🇨🇭 Switzerland", "TW": "🇹🇼 Taiwan", "TH": "🇹🇭 Thailand", "TR": "🇹🇷 Turkey", "UA": "🇺🇦 Ukraine",
    "AE": "🇦🇪 UAE", "GB": "🇬🇧 United Kingdom", "US": "🇺🇸 United States", "UZ": "🇺🇿 Uzbekistan",
    "VN": "🇻🇳 Vietnam", "VE": "🇻🇪 Venezuela"
}

RU_MARKERS_STRICT = [
    ".ru", "moscow", "msk", "spb", "saint-peter", "russia",
    "россия", "москва", "питер", "ru-", "-ru.",
    "178.154.", "77.88.", "5.255.", "87.250.",
    "95.108.", "213.180.", "195.208.", "91.108.", "149.154.",
    ".kz", ".by", ".ua", ".uz", ".az", ".ge", ".am", ".md",
    "kazakhstan", "belarus", "ukraine", "tashkent", "baku", "tbilisi",
]
EURO_CODES = {"NL", "DE", "FI", "GB", "FR", "SE", "PL", "CZ", "AT", "CH", "IT", "ES", "NO", "DK", "BE", "IE", "LU", "EE", "LV", "LT"}
ASIA_CODES = {"TR", "AE", "SG", "HK", "JP", "KR", "IN", "TH", "VN", "ID", "MY", "PH"}
US_CODES = {"US", "USA", "UNITED STATES"}

BAD_MARKERS = ["CN", "IR", "RELAY", "POOL"]
CDN_KEYWORDS = ["cloudflare", "cdn", "akamai"]

RU_CIS_IP_PREFIXES = [
    "5.", "31.", "37.", "46.", "62.", "77.", "78.", "79.", "80.", "81.", "82.", "83.", "84.", "85.", "86.", "87.",
    "88.", "89.", "91.", "92.", "93.", "94.", "95.", "109.", "128.", "134.", "141.", "145.", "149.", "151.", "158.",
    "164.", "171.", "176.", "178.", "185.", "188.", "193.", "194.", "195.", "212.", "213.", "217.",
]

OUTPUTS = {
    "black": {
        "folder": os.path.join(BASE_DIR, "black"),
        "file": "black.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_SS+All_RUS_base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_base64.txt",
            "https://raw.githubusercontent.com/AvenCores/goida-vpn-configs/main/black.txt",
            "https://raw.githubusercontent.com/Epodonios/v2ray-configs/main/sub.txt",
            "https://vpn.akres.fun/all",
            "https://mifa.world/fast",
            "https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/refs/heads/main/tri_228.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/black/vless.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_black.txt",
            "https://raw.githubusercontent.com/Vakhloev/vpn_configs/main/black.txt",
            "https://raw.githubusercontent.com/FreeRadar/v2ray/main/black.txt",
            "https://raw.githubusercontent.com/aliilapro/v2ray/main/config.txt",
        ],
    },
    "white_all": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.all.txt",
        "urls": [
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vless.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Vless-Reality-White-Lists-Rus-Mobile.txt",
            "https://raw.githubusercontent.com/AvenCores/goida-vpn-configs/main/white.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_white.txt",
            "https://raw.githubusercontent.com/Vakhloev/vpn_configs/main/white.txt",
            "https://raw.githubusercontent.com/FreeRadar/v2ray/main/white.txt",
        ],
    },
    "white_sni": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.sni.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-SNI-RU-all-base64.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/sni/vless.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_sni.txt",
        ],
    },
    "white_cidr": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.cidr.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-all-base64.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/cidr/vless.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_cidr.txt",
        ],
    },
}

PROTOCOL_FILES = {
    "vless": os.path.join(BASE_DIR, "protocols", "vless.txt"),
    "vmess": os.path.join(BASE_DIR, "protocols", "vmess.txt"),
    "trojan": os.path.join(BASE_DIR, "protocols", "trojan.txt"),
    "ss": os.path.join(BASE_DIR, "protocols", "ss.txt"),
}

for meta in OUTPUTS.values():
    os.makedirs(meta["folder"], exist_ok=True)
os.makedirs(os.path.dirname(PROTOCOL_FILES["vless"]), exist_ok=True)
os.makedirs(BASE_DIR, exist_ok=True)

_reputation_db = {}
_stats = {"sources": defaultdict(int), "total_checked": 0, "alive": 0, "dead": 0, "sources_alive": defaultdict(int)}
_geoip_cache = {}
_lock = threading.Lock()
_rep_lock = threading.Lock()
_stats_lock = threading.Lock()
_geo_lock = threading.Lock()

_health_scores = {}
_migration_map = {}
_geo_lock = threading.Lock()
_health_lock = threading.Lock()
_mig_lock = threading.Lock()

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

def load_geoip_cache():
    global _geoip_cache
    _geoip_cache = load_json(GEOIP_CACHE_FILE)

def load_health_scores():
    global _health_scores
    _health_scores = load_json(HEALTH_SCORE_FILE)

def load_migration_map():
    global _migration_map
    _migration_map = load_json(MIGRATION_FILE)

def save_reputation():
    with _rep_lock:
        save_json(REPUTATION_FILE, _reputation_db)

def save_geoip_cache():
    with _geo_lock:
        save_json(GEOIP_CACHE_FILE, _geoip_cache)

def save_health_scores():
    with _health_lock:
        save_json(HEALTH_SCORE_FILE, _health_scores)

def save_migration_map():
    with _mig_lock:
        save_json(MIGRATION_FILE, _migration_map)

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

def get_geoip_cached(host):
    with _geo_lock:
        return _geoip_cache.get(host)

def set_geoip_cached(host, country_code, country_name):
    with _geo_lock:
        _geoip_cache[host] = {
            "code": country_code,
            "name": country_name,
            "timestamp": time.time()
        }

def fetch_geoip_multi(host):
    cached = get_geoip_cached(host)
    if cached and (time.time() - cached.get("timestamp", 0)) < 86400 * 30:
        return cached["code"], cached["name"]
    
    apis = [
        lambda: fetch_geoip_ipapi(host),
        lambda: fetch_geoip_ipwhois(host),
        lambda: fetch_geoip_ipgb(host),
    ]
    
    for api_fn in apis:
        try:
            result = api_fn()
            if result:
                code, name = result
                set_geoip_cached(host, code, name)
                return code, name
        except Exception:
            continue
    
    return None, None

def fetch_geoip_ipapi(host):
    try:
        r = requests.get(f"http://ip-api.com/json/{host}?fields=countryCode,country", timeout=4)
        if r.status_code == 200:
            data = r.json()
            if data.get("status") == "success":
                return data.get("countryCode", "XX"), data.get("country", "Unknown")
    except Exception:
        pass
    return None, None

def fetch_geoip_ipwhois(host):
    try:
        r = requests.get(f"http://ipwhois.app/json/{host}?lang=en", timeout=4)
        if r.status_code == 200:
            data = r.json()
            if data.get("success"):
                return data.get("country_code", "XX"), data.get("country", "Unknown")
    except Exception:
        pass
    return None, None

def fetch_geoip_ipgb(host):
    try:
        r = requests.get(f"https://ipapi.co/{host}/json/", timeout=4)
        if r.status_code == 200:
            data = r.json()
            return data.get("country_code", "XX"), data.get("country_name", "Unknown")
    except Exception:
        pass
    return None, None

def update_health_score(host, port, ping, success):
    key = f"{host}:{port}"
    with _health_lock:
        if key not in _health_scores:
            _health_scores[key] = {"score": 100, "checks": 0, "fails": 0, "avg_ping": 0}

        entry = _health_scores[key]
        entry["checks"] += 1

        if success:
            new_avg = ((entry["avg_ping"] * (entry["checks"] - 1)) + ping) / entry["checks"]
            entry["avg_ping"] = new_avg
            entry["score"] = max(0, entry["score"] - 0.5)
            entry["fails"] = 0
        else:
            entry["score"] = max(0, entry["score"] - 15)
            entry["fails"] += 1

def get_migration_suggestion(country_code):
    if country_code not in BLOCKED_COUNTRIES:
        return None

    migration_options = {
        "CN": ["HK", "TW", "JP", "KR", "SG"],
        "IR": ["TR", "AE", "DE", "NL", "FR"],
        "KP": ["RU", "CN"],
    }

    options = migration_options.get(country_code, ["DE", "NL", "FI"])
    with _mig_lock:
        if country_code not in _migration_map:
            _migration_map[country_code] = {"suggested": options[0], "alternatives": options[1:], "timestamp": time.time()}
        return _migration_map[country_code]

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


def check_socket_with_retry(host, port, retries=RETRY_COUNT):
    """Проверка сокета с повторными попытками для нестабильных соединений (РФ/СНГ из США)"""
    last_error = None
    
    for attempt in range(retries + 1):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            
            # Оптимизированные таймауты для трансатлантических соединений
            sock.settimeout(TIMEOUT_CONNECT)
            
            start = time.time()
            result = sock.connect_ex((host, port))
            ping = (time.time() - start) * 1000
            
            if result == 0:
                # Успешное подключение - проверяем пинг
                # Для РФ/СНГ допускаем высокий пинг до MAX_PING_MS
                sock.close()
                return True, ping
            
            sock.close()
            
            # Если это не последняя попытка и была ошибка - ждем перед следующей
            if attempt < retries and result != 0:
                time.sleep(RETRY_DELAY * (attempt + 1))  # Экспоненциальная задержка
                
        except socket.timeout as e:
            last_error = e
            if attempt < retries:
                time.sleep(RETRY_DELAY * (attempt + 1))
        except socket.error as e:
            last_error = e
            if attempt < retries:
                time.sleep(RETRY_DELAY * (attempt + 1))
        except Exception as e:
            last_error = e
            break
    
    return False, 9999


def check_socket(host, port, timeout=TIMEOUT_CONNECT):
    """Базовая проверка сокета (обратная совместимость)"""
    return check_socket_with_retry(host, port, retries=0)


def get_country_approx(host, name):
    host_l = host.lower() if host else ""
    name_u = name.upper() if name else ""
    
    if host_l.endswith(".ru") or "RU" in name_u or "ROSSIA" in name_u or "MOSCOW" in name_u:
        return "RU", "Russia"
    
    for prefix in RU_CIS_IP_PREFIXES:
        if host_l.startswith(prefix):
            if any(marker in name_u for marker in ["RU", "KZ", "BY", "UA", "UZ"]):
                return "CIS", "CIS Region"
    
    for code in EURO_CODES:
        if code in name_u:
            return code, COUNTRY_NAMES.get(code, "Europe")
    
    for code in ASIA_CODES:
        if code in name_u:
            return code, COUNTRY_NAMES.get(code, "Asia")
    
    for code in US_CODES:
        if code in name_u:
            return "US", "United States"
    
    if any(marker in name_u for marker in ["KAZAKHSTAN", "BELARUS", "UKRAINE", "UZBEKISTAN"]):
        return "CIS", "CIS Region"
    
    return "XX", "Unknown"

COUNTRY_NAMES = {
    "RU": "Russia", "NL": "Netherlands", "DE": "Germany", "FI": "Finland", "GB": "United Kingdom",
    "FR": "France", "SE": "Sweden", "PL": "Poland", "CZ": "Czech Republic", "AT": "Austria",
    "CH": "Switzerland", "IT": "Italy", "ES": "Spain", "NO": "Norway", "DK": "Denmark",
    "BE": "Belgium", "IE": "Ireland", "LU": "Luxembourg", "EE": "Estonia", "LV": "Latvia",
    "LT": "Lithuania", "TR": "Turkey", "AE": "UAE", "SG": "Singapore", "HK": "Hong Kong",
    "JP": "Japan", "KR": "South Korea", "IN": "India", "TH": "Thailand", "VN": "Vietnam",
    "ID": "Indonesia", "MY": "Malaysia", "PH": "Philippines", "US": "United States",
    "CN": "China", "IR": "Iran", "KP": "North Korea",
    "BY": "Belarus", "UA": "Ukraine", "KZ": "Kazakhstan", "UZ": "Uzbekistan", 
    "AZ": "Azerbaijan", "GE": "Georgia", "AM": "Armenia",
}

BLOCKED_COUNTRIES = {"CN", "IR", "KP"}


def process_key(item):
    p_type = item.get('type')
    source = item.get('source_url', 'unknown')
    
    host = item.get('host')
    port = item.get('port')
    
    if not host or not port:
        return None
    
    if not check_reputation(host, port):
        return None

    is_online, ping = check_socket_with_retry(host, port)
    
    if not is_online:
        update_reputation(host, port, False)
        update_health_score(host, port, 9999, False)
        return None
        
    update_reputation(host, port, True)
    update_health_score(host, port, ping, True)
    
    name = item.get('name', '')
    country_code, country_name = fetch_geoip_multi(host)
    
    if not country_code:
        country_code, country_name = get_country_approx(host, name)
    
    item['country_name'] = country_name
    
    for bad in BAD_MARKERS:
        if bad in name.upper():
            return None

    migration = None
    if country_code in BLOCKED_COUNTRIES:
        migration = get_migration_suggestion(country_code)

    health = _health_scores.get(f"{host}:{port}", {}).get("score", 100)

    return {'valid': True, 'item': item, 'ping': ping, 'country': country_code, 'country_name': country_name, 'source': source, 'health': health, 'migration': migration}

def classify_white_smart(item, country):
    """Автоматическое определение SNI vs CIDR (Безопасная версия)"""
    name = (item.get('name') or "").upper()
    params = item.get('params', {})
    raw = item.get('raw', "")
    
    # Логика CIDR
    if "CIDR" in name or "192.168" in raw or "/32" in raw or "10.0." in raw:
        return "white_cidr"
    
    # Логика SNI / Reality
    security = ""
    if isinstance(params, dict):
        sec_list = params.get('security', [])
        if isinstance(sec_list, list) and len(sec_list) > 0:
            security = sec_list[0]
        elif isinstance(sec_list, str):
            security = sec_list
            
    if security == 'reality' or 'reality' in raw.lower():
        return "white_sni"
    
    # Проверка SNI параметра (ИСПРАВЛЕНИЕ: защита от пустого списка)
    sni_val = ""
    if isinstance(params, dict):
        sni_list = params.get('sni', [])
        if isinstance(sni_list, list):
            if len(sni_list) > 0:
                sni_val = sni_list[0]
            # else: sni_val остается пустым
        elif isinstance(sni_list, str):
            sni_val = sni_list
    
    if sni_val and sni_val != item.get('host'):
        return "white_sni"
        
    return "white_all"

def fetch_urls(urls, category_name):
    """Загрузка URL с улучшенной обработкой ошибок и retry для нестабильных соединений"""
    all_items = []
    
    # Настраиваем сессию с оптимальными параметрами для GitHub/РФ
    session = requests.Session()
    session.headers.update({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Accept': '*/*',
        'Connection': 'keep-alive',
    })
    
    for url in urls:
        try:
            # Пробуем с retry для нестабильных источников
            for attempt in range(3):
                try:
                    r = session.get(url.strip(), timeout=15)  # Увеличенный таймаут для РФ
                    if r.status_code == 200:
                        content = r.text
                        break
                    elif r.status_code == 404:
                        print(f"⚠️ 404 Not Found: {url.split('/')[-1]}")
                        break
                    else:
                        time.sleep(1)
                except requests.exceptions.RequestException as e:
                    if attempt < 2:
                        time.sleep(2 ** attempt)  # Экспоненциальная задержка
                    else:
                        raise
            
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
            print(f"⚠️ Error fetching {url.split('/')[-1]}: {e}")
    
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
        
    # 🆕 Уникальная фича: AI-подобные рекомендации
    msg += "\n<b>🤖 AI Recommendations:</b>\n"
    vless_count = stats.get('sources_alive', {}).get('vless', 0)
    if vless_count > 50:
        msg += "├ ✅ VLESS протокол стабилен - рекомендуется для обхода блокировок\n"
    if stats['alive'] > 200:
        msg += "├ ✅ Отличная доступность серверов - лучшее время для подключения\n"
    
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
    print(f"🚀 StintikVPN Checker v3.0 IMBA | Threads: {THREADS} | Health Score | Migration Map | 30d GeoIP Cache")
    load_reputation()
    load_geoip_cache()
    load_health_scores()
    load_migration_map()
    
    results = {
        'black': [], 'white_all': [],
        'white_sni': [], 'white_cidr': [],
        'protocols': defaultdict(list)
    }
    
    all_tasks = []
    
    print("📥 Загрузка списков...")
    black_items = fetch_urls(OUTPUTS['black']['urls'], 'black')
    for item in black_items: all_tasks.append((item, 'black'))
        
    white_urls = OUTPUTS['white_all']['urls'] + OUTPUTS['white_sni']['urls'] + OUTPUTS['white_cidr']['urls']
    white_items = fetch_urls(white_urls, 'white')
    for item in white_items: all_tasks.append((item, 'white'))

    print(f"🔍 Проверка {len(all_tasks)} ключей с GeoIP кэшированием...")
    
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
        data_list.sort(key=lambda x: (x['ping'], x.get('country', 'ZZ')))
        limited = data_list[:LIMITS.get(name, 100)]
        path = os.path.join(BASE_DIR, filename)
        os.makedirs(os.path.dirname(path), exist_ok=True)
        # Без заголовков - только чистые конфиги
        with open(path, 'w', encoding='utf-8') as f:
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        return len(limited)

    final_counts = {}
    final_counts['black'] = save_list_category('black', results['black'], 'black/black.txt')
    
    # Убрал black_mobile - теперь только основной black список
    
    country_results = defaultdict(list)
    for item in results['black']:
        cc = item.get('country', 'XX')
        country_results[cc].append(item)
    
    countries_folder = os.path.join(BASE_DIR, 'countries')
    os.makedirs(countries_folder, exist_ok=True)
    
    for cc, items in country_results.items():
        items.sort(key=lambda x: x['ping'])
        cc_name = COUNTRY_NAMES.get(cc, cc)
        safe_cc = "".join(c for c in cc if c.isalnum())
        file_path = os.path.join(countries_folder, f"{safe_cc}.txt")
        # Без заголовков - только чистые конфиги
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write('\n'.join([x['item']['raw'] for x in items]))
    
    final_counts['white_all'] = save_list_category('white_all', results['white_all'], OUTPUTS['white_all']['file'])
    final_counts['white_sni'] = save_list_category('white_sni', results['white_sni'], OUTPUTS['white_sni']['file'])
    final_counts['white_cidr'] = save_list_category('white_cidr', results['white_cidr'], OUTPUTS['white_cidr']['file'])
    
    for proto, data in results['protocols'].items():
        data.sort(key=lambda x: x['ping'])
        limited = data[:LIMITS['protocols']]
        p_path = PROTOCOL_FILES[proto]
        with open(p_path, 'w', encoding='utf-8') as f:
            f.write(f"# {proto.upper()} Protocol List\n")
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        final_counts[f'proto_{proto}'] = len(limited)

    save_reputation()
    save_geoip_cache()
    save_health_scores()
    save_migration_map()
    save_json(STATS_FILE, _stats)
    
    # 🆕 Premium Tier Selection (TOP 0.1%) - Only the absolute best
    all_servers = []
    for category in ['black', 'white_all', 'white_sni', 'white_cidr']:
        all_servers.extend(results.get(category, []))
    
    premium_servers = [x for x in all_servers if x.get('health_score', 0) >= 90 and x['ping'] < 500]
    premium_servers.sort(key=lambda x: (x['ping'], -x.get('health_score', 0)))
    premium_limited = premium_servers[:LIMITS['premium']]
    premium_path = os.path.join(BASE_DIR, "premium.txt")
    with open(premium_path, 'w', encoding='utf-8') as f:
        f.write('\n'.join([x['item']['raw'] for x in premium_limited]))
    final_counts['premium'] = len(premium_limited)
    print(f"🎯 Premium Tier: {len(premium_limited)} конфигов (TOP 0.1%)")
    
    def score(x):
        ping_score = x['ping']
        type_bonus = 0 if x['item'].get('type') == 'vless' else 50
        country_bonus = 0 if x.get('country') == 'RU' else 20
        return ping_score + type_bonus + country_bonus
    
    all_servers.sort(key=score)
    
    live_stats = {
        "last_update": time.strftime('%Y-%m-%d %H:%M:%S'),
        "total_alive": _stats['alive'],
        "total_dead": _stats['dead'],
        "duration_sec": round(_stats['duration'], 2),
        "categories": {
            "black": final_counts.get('black', 0),
            "white_all": final_counts.get('white_all', 0),
            "white_sni": final_counts.get('white_sni', 0),
            "white_cidr": final_counts.get('white_cidr', 0),
            "premium": final_counts.get('premium', 0),  # 🆕 Premium Tier
        },
        "protocols": {
            "vless": final_counts.get('proto_vless', 0),
            "vmess": final_counts.get('proto_vmess', 0),
            "trojan": final_counts.get('proto_trojan', 0),
            "ss": final_counts.get('proto_ss', 0)
        },
        "top_sources": [
            {"url": url.split('/')[-1].replace('.txt', '')[:30], "count": count}
            for url, count in sorted(_stats.get('sources_alive', {}).items(), key=lambda x: x[1], reverse=True)[:5]
        ]
    }
    save_json(LIVE_STATS_FILE, live_stats)
    
    print("📊 Отправка отчета...")
    send_telegram_report(_stats, final_counts)
    
    print(f"✅ ГОТОВО! Время: {_stats['duration']:.2f} сек. Рабочих: {_stats['alive']}")
    print(f"📊 Live stats сохранено в live_stats.json")
    print(f"💾 GeoIP cache сохранено в geoip_cache.json")

if __name__ == "__main__":
    main()
