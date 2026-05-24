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
# ⚙️ КОНФИГУРАЦИЯ И НАСТРОЙКИ
# ==========================================
BASE_DIR = "checked"
TIMEOUT = 2.5          # Таймаут подключения (баланс скорость/качество)
THREADS = 200          # Количество потоков (оптимизировано для скорости)
MAX_PING_MS = 2500     # Максимальный пинг для считания рабочим

# ЛИМИТЫ НА ВЫХОДЕ (Сортировка по пингу, лучшие сверху)
LIMITS = {
    "black": 250,
    "black_mobile": 50,
    "white_all": 50,
    "white_sni": 50,
    "white_cidr": 50,
    "tg_proxy": 50,
    "protocols": 100   # Для каждого протокола отдельно
}

# Файлы данных
HISTORY_FILE = os.path.join(BASE_DIR, "history.json")
REPUTATION_FILE = os.path.join(BASE_DIR, "reputation.json")
IP_CACHE_FILE = os.path.join(BASE_DIR, "ip_cache.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")

IP_CACHE_MAX_AGE_DAYS = 30
FAIL_THRESHOLD = 2     # Исключать сервер после 2 неудач подряд

# TELEGRAM CONFIG (Заполни своими данными или оставь пустым)
TG_BOT_TOKEN = ""      # Токен бота от @BotFather
TG_CHAT_ID = ""        # ID канала или чата (можно узнать у @userinfobot)

# ==========================================
# 🌍 ГЕО ДАННЫЕ И МАРКЕРЫ
# ==========================================
COUNTRY_FLAGS = {
    "RU": "🇷🇺", "NL": "🇳🇱", "DE": "🇩🇪", "FI": "🇫🇮", "GB": "🇬🇧",
    "FR": "🇫🇷", "SE": "🇸🇪", "PL": "🇵🇱", "CZ": "🇨🇿", "AT": "🇦🇹",
    "CH": "🇨🇭", "IT": "🇮🇹", "ES": "🇪🇸", "NO": "🇳🇴", "DK": "🇩🇰",
    "BE": "🇧🇪", "IE": "🇮🇪", "LU": "🇱🇺", "EE": "🇪🇪", "LV": "🇱🇻",
    "LT": "🇱🇹", "UA": "🇺🇦", "RO": "🇷🇴", "BG": "🇧🇬", "TR": "🇹🇷",
    "GR": "🇬🇷", "PT": "🇵🇹", "HU": "🇭🇺", "SK": "🇸🇰", "HR": "🇭🇷",
    "RS": "🇷🇸", "MD": "🇲🇩", "BY": "🇧🇾", "KZ": "🇰🇿", "UZ": "🇺🇿",
    "KG": "🇰🇬", "AM": "🇦🇲", "GE": "🇬🇪", "AZ": "🇦🇿", "AE": "🇦🇪",
    "SG": "🇸🇬", "HK": "🇭🇰", "JP": "🇯🇵", "KR": "🇰🇷", "CA": "🇨🇦",
    "US": "🇺🇸", "MX": "🇲🇽", "BR": "🇧🇷", "AU": "🇦🇺", "IN": "🇮🇳",
    "MY": "🇲🇾", "TH": "🇹🇭", "VN": "🇻🇳", "ID": "🇮🇩", "PH": "🇵🇭",
    "IL": "🇮🇱", "SA": "🇸🇦", "TM": "🇹🇲", "TJ": "🇹🇯",
}

BAD_MARKERS = ["CN", "IR", "KR", "BR", "IN", "RELAY", "POOL", "🇨🇳", "🇮🇷", "🇰🇷"]
RU_MARKERS_STRICT = [
    ".ru", "moscow", "msk", "spb", "saint-peter", "russia",
    "россия", "москва", "питер", "ru-", "-ru.",
    "178.154.", "77.88.", "5.255.", "87.250.",
    "95.108.", "213.180.", "195.208.", "91.108.", "149.154.",
]
EURO_CODES = {"NL", "DE", "FI", "GB", "FR", "SE", "PL", "CZ", "AT", "CH", "IT", "ES", "NO", "DK", "BE", "IE", "LU", "EE", "LV", "LT"}

# Детектор CDN/Anycast (для фильтрации мусора)
CDN_KEYWORDS = ["cloudflare", "cdn", "akamai", "fastly", "amazonaws"]
CF_IP_PREFIXES = ["104.", "172.", "173.", "108.", "162."]

# ==========================================
# 📂 ИСТОЧНИКИ ДАННЫХ (Без изменений структуры)
# ==========================================
OUTPUTS = {
    "black": {
        "folder": os.path.join(BASE_DIR, "black"),
        "file": "black.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_SS+All_RUS_base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_mobile_base64.txt",
            "https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/refs/heads/main/tri_228.txt",
            "https://raw.githubusercontent.com/opti4riponty-arch/VLESS-Co/refs/heads/main/VLESS%20%26%20Co",
            "https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt",
            "https://vpn.akres.fun/all",
            "https://mifa.world/fast",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/BLACK_VLESS_RUS_mobile.txt",
            "https://vpn.tgflovv.ru/free-speed/0056eddc-0993-4e14-911d-b3c0a0f91bd7",
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
            "https://raw.githubusercontent.com/nzea243/ikoV31tud_vpn/main/tri_228.txt",
            "https://raw.githubusercontent.com/opti4riponty-arch/VLESS-Co/main/VLESS%20%26%20Co",
            "https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt",
            "https://vpn.akres.fun/all",
            "https://mifa.world/fast",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Vless-Reality-White-Lists-Rus-Mobile.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/new/all_new.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vless.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/vmess.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/trojan.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-vless-configs-russia/main/githubmirror/clean/ss.txt",
            "https://raw.githubusercontent.com/Mihuil121/vpn-checker-backend-fox/main/checked/RU_Best/ru_white.txt",
            "https://raw.githubusercontent.com/kort0881/vpn-checker-backend/main/checked/RU_Best/ru_white_all_part2.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/Vless-Reality-White-Lists-Rus-Mobile.txt",
            "https://gist.githubusercontent.com/flaafix/c79a81037d15163360571c7a7331b153/raw/AetrisVPN.txt",
            "https://gitverse.ru/api/repos/nzea234/nzea234-kvn/raw/branch/main/tri_228.txt",
            "https://accargame.cfd/sub/8Gx8ud9CgviqXFBU",
        ],
    },
    "white_sni": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.sni.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-SNI-RU-all-base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/Vless-Reality-White-Lists-Rus-Mobile-base64.txt",
        ],
    },
    "white_cidr": {
        "folder": os.path.join(BASE_DIR, "white"),
        "file": "white.cidr.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-all-base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/WHITE-CIDR-RU-checked-base64.txt",
        ],
    },
    "tg_proxy": {
        "folder": os.path.join(BASE_DIR, "tg_proxy"),
        "file": "tg_proxy.txt",
        "urls": [
            "https://t.me/proxy?server=84.201.168.161&port=8443&secret=ddf7d43a5e2ca0a8fa4cec27829869cb6b",
            "https://t.me/proxy?server=85.192.34.153&port=8443&secret=dde3d3a09a31f5c857890cfc2a0bcab4c1",
            "https://t.me/proxy?server=jtproxy.life&port=443&secret=eef0050d30441bab41f60acae779df0c40766473696e612e7275",
            "https://t.me/proxy?server=public2.mtproxygram.lol&port=443&secret=eea4eaf1027f4b431bc2e711523e1f1b4062726f777365722e79616e6465782e636f6d",
            "https://t.me/proxy?server=now.tproxyru.click&port=8980&secret=ee104462821249bd7ac519130220c25d09617669746f2e7275",
            "https://t.me/proxy?server=hello.proxytg.space&port=443&secret=ee57b7509fe484325abedc85f18804843768656c6c6f2e70726f787974672e7370616365",
            "https://t.me/proxy?server=ark.proxytg.space&port=443&secret=eeb8df1294e7e13cd99e7a9144bae17db861726f726b2e70726f787974672e7370616365",
            "tg://proxy?server=super.its-work.ru&port=443&secret=ee726fbbbf8bc37222d0f92a6cac3aacf4636c6f7764666c6172652e636f6d",
            "tg://proxy?server=64.188.65.59&port=443&secret=ee67ddd226a29e40d7f3d9c81acb8596287765622e6d61782e7275",
            "https://t.me/proxy?server=158.160.188.98&port=8443&secret=dd73675b09ac6690ff559bffa7b39a94c8",
            "https://t.me/proxy?server=94.125.103.74&port=443&secret=7vro_FGyIICUjPE-Nc5nQoV0Zy5wYWxhbnRpcmJvdC54eXo",
            "https://t.me/proxy?server=tl.ch-moltisanti.ru&port=443&secret=7k159Jl_RfUhEYAKlwBNb09ydS5lLXNwZWN0YWN1bGFyLnJ1",
            "https://t.me/proxy?server=eno1.myrka.digital&port=228&secret=7hDtlNXW0mKhBYFcu-ASGP9yeXplbi5teXJrYS5kaWdpdGFs",
            "https://t.me/proxy?server=195.58.49.26&port=443&secret=7uAqXLtHlYLrtb0hgzq10kxydXR1YmUucnU",
            "https://t.me/proxy?server=kazan.tgproxyy.online&port=8443&secret=7nzxAmAVQrBXf2-VgBQxM3prYXphbi50Z3Byb3h5eS5vbmxpbmU",
            "https://t.me/proxy?server=piter.tgproxyy.online&port=443&secret=7tKKaimXPcSzyk2HlVeWsw9waXRlci50Z3Byb3h5eS5vbmxpbmU",
            "https://t.me/proxy?server=188.137.237.240&port=443&secret=ee09ca9424322894efa56ebc7e6c88f87b70696b612e70726f787974672e7370616365",
            "https://t.me/proxy?server=146.185.211.126&port=443&secret=ee1e36377253a29133d290f3d14ae0163873756e342d32302e757365726170692e636f6d",
            "https://t.me/proxy?server=foreignpayproxytg.top&port=443&secret=ee6d61782e7275e467763b2a1379ff21",
            "https://t.me/proxy?server=telegram.crocnet.ru&port=443&secret=eedb556b30e8aefc3443956f9a971bdcec74656c656c72616d2e63726f636e65742e7275",
            "https://t.me/proxy?server=proxy1.nhiaz.net&port=8443&secret=dd9641066cd9fbf8f4764dcf97cbddfb33",
            "https://t.me/proxy?server=max.telehelp.top&port=443&secret=ee27252638159317e07b706d5114d73e0b64726976652e676f6f676c652e636f6d",
            "https://t.me/proxy?server=s.rkn.tg&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=51.250.41.151&port=443&secret=ee5f8d0cc4df9d650d5b2231a867247d8b74672e74756e6e656c792e617070",
            "https://t.me/proxy?server=84.201.135.111&port=8443&secret=eea1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6676f6f676c652e636f6d",
            "https://t.me/proxy?server=akenai.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=alttg.oblivionvpn.ru&port=8443&secret=ee7665e821049470fc6c331d83208eee9d6e6c7467736e2e6f626c6976696f6e76706e2e7275",
            "https://t.me/proxy?server=predator-artist.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=b2.myrka.digital&port=775&secret=ee1111222e7f5904f3322ded8772202ea268322e6d79726b612e6469676974616c",
            "https://t.me/proxy?server=b1.myrka.digital&port=443&secret=ee6e2443fe7f5904ff5ceded8d76f02ea268312e6d79726b612e6469676974616c",
            "https://t.me/proxy?server=tg.voxiroxy.ru&port=8443&secret=eea1b2c3d4e5f6a7b8c9d0e1f2a3b4c5d6676f6f676c652e636f6d",
            "https://t.me/proxy?server=pika.proxytg.space&port=443&secret=ee09ca9424322894efa56ebc7e6c88f87b70696b612e70726f787974672e7370616365",
            "https://t.me/proxy?server=ru36.importmsk.ru&port=8443&secret=dde3d3a09a31f5c857890cfc2a0bcab4c1",
            "https://t.me/proxy?server=connect.tproxyru.click&port=8980&secret=ee104462821249bd7ac519130220c25d09617669746f2e7275",
            "https://t.me/proxy?server=free-finland.kimt.space&port=443&secret=7jOm3LQpwpUtgOAby64WkS9hZHMueDUucnU",
            "https://t.me/proxy?server=5.180.30.15&port=443&secret=7ulh6LtXRjr0tvn5xdK7_xFwYXRyaWFyY2hpYS5ydQ",
            "https://t.me/proxy?server=s5.proxyru.top&port=443&secret=eefe281d2bfa13f991ed6be43138e5e14c79612e7275",
            "https://t.me/proxy?server=5hu7-up-4nd-sell-me-mor3-th353-chocol47e5.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=calcium-credit.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=promo.palantirbot.xyz&port=443&secret=eefae8fc51b22080948cf13e35ce67428574672e70616c616e746972626f742e78797a",
            "https://t.me/proxy?server=tg5.656c797369756d.app&port=8888&secret=7my0Ue-481dzP-2oGqjoBmxydS1tc2szLmFwaS5taW5ldW5pb24ubmV0",
            "https://t.me/proxy?server=s.teleg.top&port=853&secret=ee4f4c5c34212ac9de89bcb7db982acf03732e3738393935362e78797a",
            "https://t.me/proxy?server=195.58.49.162&port=443&secret=eee02a5cbb479582ebb5bd21833ab5d24c617669746f2e7275",
            "https://t.me/proxy?server=tpr.webvirt.cloud&port=443&secret=ee938dd87467bc49301de2e9765cf20f4374656c2e776562766972742e636c6f7564",
            "https://t.me/proxy?server=clay.callsmeee.xyz&port=443&secret=7o_QggOjKZlzKo-xBzrxiGprb211cy5ydQ",
            "https://t.me/proxy?server=fear.callsmeee.xyz&port=443&secret=7h42N3JTopEz0pDz0UrgFjhzdW40LTIwLnVzZXJhcGkuY29t",
            "https://t.me/proxy?server=ctfd-is-shit.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=ru.telegram.crocnet.ru&port=443&secret=7ttVazDorvw0Q5Vvmpcb3Ox0ZWxlZ3JhbS5jcm9jbmV0LnJ1",
            "https://t.me/proxy?server=i-love-boobs.top&port=853&secret=ee54ce330e4690cc297d2b031ff3f288b06d742e616b656e61692e636c69636b",
            "https://t.me/proxy?server=max.ru.rightarion.ru&port=443&secret=dddcaae509a2455bbfc6165f1708fd5c58",
            "https://t.me/proxy?server=tg-proxy.soykavps.ru&port=5443&secret=2178e95a64ccce06f01ab93b3224b50d",
            "https://t.me/proxy?server=95.163.211.72&port=443&secret=ee973e178b06e6b204a3f6d8044dda69c774672e68656c6c6f6869726f2e7275",
            "https://t.me/proxy?server=tgnn.live&port=8443&secret=7p4d3g3gKi58ItEOL_-EEBN0Z25uLmxpdmU",
            "https://t.me/proxy?server=5.188.143.247&port=443&secret=ddabe0b41b37a8f24a07a62a1b84be2325",
            "https://t.me/proxy?server=146.185.210.203&port=8443&secret=ee3fdb0b25c9bc2b4e112b18876dfded9576696e796c2e63616c6c736d6565652e78797a",
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
# 🔧 ГЛОБАЛЬНЫЕ ПЕРЕМЕННЫЕ И БЛОКИРОВКИ
# ==========================================
for meta in OUTPUTS.values():
    os.makedirs(meta["folder"], exist_ok=True)
os.makedirs(os.path.dirname(PROTOCOL_FILES["vless"]), exist_ok=True)
os.makedirs(BASE_DIR, exist_ok=True)

_disk_ip_cache = {}
_reputation_db = {}
_geo_request_times = []
_ip_api_disabled = False
_stats = {"sources": defaultdict(int), "total_checked": 0, "alive": 0, "dead": 0, "sources_alive": defaultdict(int)}

_lock = threading.Lock()
_cache_lock = threading.Lock()
_host_lock = threading.Lock()
_geo_lock = threading.Lock()
_rep_lock = threading.Lock()
_stats_lock = threading.Lock()

# ==========================================
# 🧠 ФУНКЦИИ КЭШИРОВАНИЯ И РЕПУТАЦИИ
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

def load_ip_cache():
    global _disk_ip_cache
    _disk_ip_cache = load_json(IP_CACHE_FILE)
    cutoff = time.time() - IP_CACHE_MAX_AGE_DAYS * 86400
    _disk_ip_cache = {k: v for k, v in _disk_ip_cache.items() if v.get("time", 0) > cutoff}

def save_ip_cache():
    save_json(IP_CACHE_FILE, _disk_ip_cache)

def load_reputation():
    global _reputation_db
    _reputation_db = load_json(REPUTATION_FILE)

def save_reputation():
    with _rep_lock:
        save_json(REPUTATION_FILE, _reputation_db)

def check_reputation(host, port):
    """Проверяет, не помечен ли сервер как мертвый много раз подряд"""
    key = f"{host}:{port}"
    with _rep_lock:
        entry = _reputation_db.get(key)
        if entry and entry.get("fails", 0) >= FAIL_THRESHOLD:
            return False
    return True

def update_reputation(host, port, success):
    """Обновляет статистику успехов/неудач сервера"""
    key = f"{host}:{port}"
    with _rep_lock:
        if key not in _reputation_db:
            _reputation_db[key] = {"fails": 0, "last_success": 0}
        
        if success:
            _reputation_db[key]["fails"] = 0
            _reputation_db[key]["last_success"] = time.time()
        else:
            _reputation_db[key]["fails"] += 1

# ==========================================
# 🌐 СЕТЕВЫЕ ФУНКЦИИ И GEOIP
# ==========================================
def resolve_host(host):
    with _host_lock:
        try:
            ip = socket.gethostbyname(host)
            return ip
        except Exception:
            return None

def _geo_api_wait_slot():
    global _ip_api_disabled
    if _ip_api_disabled:
        return False
    with _geo_lock:
        now = time.time()
        cutoff = now - GEO_API_WINDOW
        while _geo_request_times and _geo_request_times[0] < cutoff:
            _geo_request_times.pop(0)
        if len(_geo_request_times) >= GEO_API_RATE_LIMIT:
            sleep_time = GEO_API_WINDOW - (now - _geo_request_times[0]) + 0.1
            if sleep_time > 0:
                time.sleep(sleep_time)
        _geo_request_times.append(time.time())
    return True

def detect_exit_country_via_http(ip):
    """Определяет страну по IP через API с кэшированием"""
    if not ip:
        return "UNKNOWN"
    
    # Проверка диска кэша
    with _cache_lock:
        cached = _disk_ip_cache.get(ip)
    if cached:
        return cached.get("country", "UNKNOWN")
    
    if _ip_api_disabled:
        return "UNKNOWN"
    
    if not _geo_api_wait_slot():
        return "UNKNOWN"
    
    try:
        r = requests.get(f"http://ip-api.com/json/{ip}?fields=countryCode", timeout=TIMEOUT)
        if r.status_code == 429:
            _ip_api_disabled = True
            return "UNKNOWN"
        if r.status_code == 200:
            code = r.json().get("countryCode", "UNKNOWN") or "UNKNOWN"
            with _cache_lock:
                _disk_ip_cache[ip] = {"country": code, "time": time.time()}
            return code
    except Exception:
        pass
    return "UNKNOWN"

def get_country_fast(host, key_name):
    """Быстрое определение страны по домену или имени ключа"""
    try:
        host_l = host.lower() if host else ""
        name_u = key_name.upper() if key_name else ""
        
        if host_l.endswith(".ru"): return "RU"
        if host_l.endswith(".de"): return "DE"
        if host_l.endswith(".nl"): return "NL"
        if host_l.endswith(".uk") or host_l.endswith(".co.uk"): return "GB"
        if host_l.endswith(".fr"): return "FR"
        
        for code in EURO_CODES:
            if code in name_u:
                return code
    except Exception:
        pass
    return "UNKNOWN"

def is_russian_exit(key_str, host, country):
    """Определяет, является ли выход российским"""
    if country == "RU":
        return True
    
    host_lower = host.lower() if host else ""
    key_upper = key_str.upper() if key_str else ""
    
    if host_lower.endswith(".ru"):
        return True
        
    count = 0
    for marker in RU_MARKERS_STRICT:
        if marker.lower() in host_lower or marker.upper() in key_upper:
            count += 1
            if count >= 2:
                return True
    return False

def is_cdn_or_fake(host, ip):
    """Smart Anycast Detector: Фильтрует CDN и фейки"""
    if not host: return False
    host_l = host.lower()
    
    for kw in CDN_KEYWORDS:
        if kw in host_l:
            return True
            
    if ip:
        for prefix in CF_IP_PREFIXES:
            if ip.startswith(prefix):
                # Можно добавить исключения, но пока помечаем как CDN
                pass 
    return False

# ==========================================
# 🕵️ ПАРСИНГ И ПРОВЕРКА
# ==========================================
def parse_proxy_line(line, source_url=""):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    # TG Proxy
    if line.startswith("https://t.me/proxy") or line.startswith("tg://proxy"):
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

def process_key(item):
    """Основная логика проверки одного ключа"""
    raw = item.get('raw')
    p_type = item.get('type')
    source = item.get('source_url', 'unknown')
    
    if p_type == 'tg_proxy':
        # TG прокси считаем рабочими по умолчанию (или можно добавить проверку подключения)
        return {'valid': True, 'item': item, 'ping': 0, 'country': 'XX', 'source': source}

    host = item.get('host')
    port = item.get('port')
    
    if not host or not port:
        return None
    
    # 1. Проверка репутации
    if not check_reputation(host, port):
        return None

    # 2. DNS Resolve
    ip = resolve_host(host)
    if not ip:
        update_reputation(host, port, False)
        return None
    
    # 3. Smart Filter (опционально)
    # if is_cdn_or_fake(host, ip):
    #    pass 

    # 4. Socket Check
    is_online, ping = check_socket(ip, port)
    
    if not is_online:
        update_reputation(host, port, False)
        return None
        
    # Если онлайн - обновляем репутацию
    update_reputation(host, port, True)
    
    # 5. Определение страны
    fast_country = get_country_fast(host, item.get('name', ''))
    final_country = fast_country
    if final_country == "UNKNOWN":
        final_country = detect_exit_country_via_http(ip)
    
    # Проверка на плохие маркеры
    name_upper = (item.get('name') or "").upper()
    for bad in BAD_MARKERS:
        if bad in name_upper:
            return None

    return {'valid': True, 'item': item, 'ping': ping, 'country': final_country, 'source': source}

def classify_white_smart(item, country):
    """Автоматическое определение SNI vs CIDR"""
    name = (item.get('name') or "").upper()
    params = item.get('params', {})
    raw = item.get('raw', "")
    
    # Логика CIDR
    if "CIDR" in name or "192.168" in raw or "/32" in raw or "10.0." in raw:
        return "white_cidr"
    
    # Логика SNI / Reality
    security = ""
    if isinstance(params, dict):
        # Для VLESS/Trojan
        sec_list = params.get('security', [])
        security = sec_list[0] if isinstance(sec_list, list) else sec_list
    elif isinstance(params, str):
        # Для VMess (если там есть security)
        security = params.get('scy', '') if isinstance(params, dict) else ''
        
    if security == 'reality' or 'reality' in raw.lower():
        return "white_sni"
    
    # Проверка SNI параметра
    sni_val = ""
    if isinstance(params, dict):
        sni_list = params.get('sni', [])
        sni_val = sni_list[0] if isinstance(sni_list, list) else sni_list
    
    if sni_val and sni_val != item['host']:
        return "white_sni"
        
    return "white_all"

def fetch_urls(urls, category_name):
    """Скачивает и парсит ссылки, возвращает список задач"""
    all_items = []
    for url in urls:
        try:
            r = requests.get(url.strip(), timeout=10)
            if r.status_code == 200:
                content = r.text
                # Попытка декодировать Base64
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
        return
    
    msg = f"🚀 **StintikVPN Checker Report**\n\n"
    msg += f"✅ Живых: {stats['alive']}\n"
    msg += f"❌ Мертвых/Отсеянных: {stats['dead']}\n"
    msg += f"📊 Всего проверено: {stats['total_checked']}\n\n"
    
    msg += "**Лимиты соблюдены:**\n"
    for cat, count in counts.items():
        limit = LIMITS.get(cat, 0)
        if limit > 0:
            msg += f"- {cat}: {count}/{limit}\n"
    
    msg += "\n🏆 **Топ источников (живые):**\n"
    # Сортируем по количеству живых (нужно собрать статистику живых по источникам)
    # В данной реализации _stats['sources_alive'] заполняется в процессе
    sorted_sources = sorted(stats.get('sources_alive', {}).items(), key=lambda x: x[1], reverse=True)[:5]
    
    if not sorted_sources:
        # Фоллбэк на общее количество найденных
        sorted_sources = sorted(stats['sources'].items(), key=lambda x: x[1], reverse=True)[:5]

    for url, count in sorted_sources:
        short_url = url.split('/')[-1].replace('.txt', '')
        msg += f"- {short_url}: {count} живых\n"
        
    url_req = f"https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage"
    try:
        requests.post(url_req, json={
            "chat_id": TG_CHAT_ID,
            "text": msg,
            "parse_mode": "Markdown"
        })
    except Exception as e:
        print(f"TG Error: {e}")

# ==========================================
# 🚀 ОСНОВНАЯ ФУНКЦИЯ
# ==========================================
def main():
    print(f"🚀 StintikVPN Smart Checker Started (Threads: {THREADS})")
    load_ip_cache()
    load_reputation()
    
    results = {
        'black': [],
        'black_mobile': [],
        'white_all': [],
        'white_sni': [],
        'white_cidr': [],
        'tg_proxy': [],
        'protocols': defaultdict(list)
    }
    
    all_tasks = []
    
    print("📥 Загрузка Black списков...")
    black_items = fetch_urls(OUTPUTS['black']['urls'], 'black')
    for item in black_items:
        all_tasks.append((item, 'black'))
        
    print("📥 Загрузка White списков...")
    # Объединяем все white источники для проверки, а потом разделим
    white_urls = OUTPUTS['white_all']['urls'] + OUTPUTS['white_sni']['urls'] + OUTPUTS['white_cidr']['urls']
    white_items = fetch_urls(white_urls, 'white')
    for item in white_items:
        all_tasks.append((item, 'white'))
        
    print("📥 Загрузка TG прокси...")
    tg_items = fetch_urls(OUTPUTS['tg_proxy']['urls'], 'tg')
    for item in tg_items:
        results['tg_proxy'].append({'valid': True, 'item': item, 'ping': 0, 'country': 'XX', 'source': item.get('source_url')})

    print(f"🔍 Начата проверка {len(all_tasks)} ключей...")
    
    alive_count = 0
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        futures = [executor.submit(process_key, item) for item, _ in all_tasks]
        for future in as_completed(futures):
            res = future.result()
            if res and res.get('valid'):
                alive_count += 1
                item = res['item']
                source = res['source']
                
                # Обновляем статистику живых по источникам
                with _stats_lock:
                    if source not in _stats['sources_alive']:
                        _stats['sources_alive'][source] = 0
                    _stats['sources_alive'][source] += 1
                
                # Распределение по категориям
                # Находим исходную категорию задачи (через маппинг URL или просто по типу)
                # Проще проверить URL источника
                src_url = item.get('source_url', '')
                is_white_source = any(u == src_url for u in white_urls)
                
                if not is_white_source:
                    # Это Black
                    results['black'].append(res)
                else:
                    # Это White - определяем подтип
                    sub_cat = classify_white_smart(item, res['country'])
                    results[sub_cat].append(res)
                    results['white_all'].append(res) # Дублируем в общий
                
                # Протоколы
                p_type = item['type']
                if p_type in ['vless', 'vmess', 'trojan', 'ss']:
                    results['protocols'][p_type].append(res)
            else:
                pass # Dead

    _stats['alive'] = alive_count
    _stats['dead'] = len(all_tasks) - alive_count
    _stats['total_checked'] = len(all_tasks)

    print("💾 Сохранение результатов с учетом лимитов...")
    
    def save_list_category(name, data_list, filename):
        # Сортировка по пингу
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
    final_counts['black_mobile'] = save_list_category('black_mobile', results['black'], OUTPUTS['black_mobile']['file']) # Берем из лучших black
    
    final_counts['white_all'] = save_list_category('white_all', results['white_all'], OUTPUTS['white_all']['file'])
    final_counts['white_sni'] = save_list_category('white_sni', results['white_sni'], OUTPUTS['white_sni']['file'])
    final_counts['white_cidr'] = save_list_category('white_cidr', results['white_cidr'], OUTPUTS['white_cidr']['file'])
    
    # TG
    tg_path = OUTPUTS['tg_proxy']['file']
    tg_data = results['tg_proxy']
    tg_data.sort(key=lambda x: x['ping']) # Сортировка если бы был пинг
    limited_tg = tg_data[:LIMITS['tg_proxy']]
    with open(tg_path, 'w', encoding='utf-8') as f:
        f.write(f"# TG Proxies Updated: {time.strftime('%Y-%m-%d')}\n")
        f.write('\n'.join([x['item']['raw'] for x in limited_tg]))
    final_counts['tg_proxy'] = len(limited_tg)
    
    # Protocols
    for proto, data in results['protocols'].items():
        data.sort(key=lambda x: x['ping'])
        limited = data[:LIMITS['protocols']]
        p_path = PROTOCOL_FILES[proto]
        with open(p_path, 'w', encoding='utf-8') as f:
            f.write(f"# {proto.upper()} Protocol List\n")
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        final_counts[f'proto_{proto}'] = len(limited)

    save_ip_cache()
    save_reputation()
    save_json(STATS_FILE, _stats)
    
    print("📊 Отправка отчета в Telegram...")
    send_telegram_report(_stats, final_counts)
    
    print(f"✅ Готово! Проверено: {_stats['total_checked']}, Рабочих: {_stats['alive']}")
    print(f"📂 Результаты в папке {BASE_DIR}/")

if __name__ == "__main__":
    main()
