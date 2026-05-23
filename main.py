import os
import re
import socket
import ssl
import time
import json
import requests
import base64
import websocket
import shutil
import threading
from urllib.parse import unquote, urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

BASE_DIR = "checked"
TIMEOUT = 2
socket.setdefaulttimeout(TIMEOUT)
THREADS = 150
MAX_TOP = 50
MAX_PING_MS = 2000
MAX_KEYS_TO_CHECK = 3000
HISTORY_FILE = os.path.join(BASE_DIR, "history.json")
IP_CACHE_FILE = os.path.join(BASE_DIR, "ip_cache.json")
IP_CACHE_MAX_AGE_DAYS = 30
GEO_API_RATE_LIMIT = 50
GEO_API_WINDOW = 60.0
MAX_HISTORY_AGE = 2 * 24 * 3600
MY_CHANNEL = "@StintikVPN"

# Memory geo-cache optimization
_geo_memory_cache = {}
GEO_MEMORY_CACHE_MAX_SIZE = 10000
_geo_mem_lock = threading.Lock()

COUNTRY_NAMES_RU = {
    "RU": "Россия", "NL": "Нидерланды", "DE": "Германия", "FI": "Финляндия",
    "GB": "Великобритания", "FR": "Франция", "SE": "Швеция", "PL": "Польша",
    "CZ": "Чехия", "AT": "Австрия", "CH": "Швейцария", "IT": "Италия",
    "ES": "Испания", "NO": "Норвегия", "DK": "Дания", "BE": "Бельгия",
    "IE": "Ирландия", "LU": "Люксембург", "EE": "Эстония", "LV": "Латвия",
    "LT": "Литва", "UA": "Украина", "RO": "Румыния", "BG": "Болгария",
    "TR": "Турция", "GR": "Греция", "PT": "Португалия", "HU": "Венгрия",
    "SK": "Словакия", "HR": "Хорватия", "RS": "Сербия", "MD": "Молдова",
    "BY": "Беларусь", "KZ": "Казахстан", "UZ": "Узбекистан", "KG": "Киргизия",
    "AM": "Армения", "GE": "Грузия", "AZ": "Азербайджан", "AE": "ОАЭ",
    "SG": "Сингапур", "HK": "Гонконг", "JP": "Япония", "KR": "Южная Корея",
    "CA": "Канада", "US": "США", "MX": "Мексика", "BR": "Бразилия",
    "AU": "Австралия", "IN": "Индия", "MY": "Малайзия", "TH": "Таиланд",
    "VN": "Вьетнам", "ID": "Индонезия", "PH": "Филиппины", "IL": "Израиль",
    "SA": "Саудовская Аравия", "TM": "Туркменистан", "TJ": "Таджикистан",
}

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

def country_to_title_ru(code: str) -> str:
    return COUNTRY_NAMES_RU.get(code.upper(), code or "UNKNOWN")

def country_to_flag(code: str) -> str:
    return COUNTRY_FLAGS.get(code.upper(), "🌐")

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

BAD_MARKERS = ["CN", "IR", "KR", "BR", "IN", "RELAY", "POOL", "🇨🇳", "🇮🇷", "🇰🇷"]
RU_MARKERS_STRICT = [
    ".ru", "moscow", "msk", "spb", "saint-peter", "russia",
    "россия", "москва", "питер", "ru-", "-ru.",
    "178.154.", "77.88.", "5.255.", "87.250.",
    "95.108.", "213.180.", "195.208.",
    "91.108.", "149.154.",
]
EURO_CODES = {"NL", "DE", "FI", "GB", "FR", "SE", "PL", "CZ", "AT", "CH", "IT", "ES", "NO", "DK", "BE", "IE", "LU", "EE", "LV", "LT"}

for meta in OUTPUTS.values():
    os.makedirs(meta["folder"], exist_ok=True)
os.makedirs(os.path.dirname(PROTOCOL_FILES["vless"]), exist_ok=True)
os.makedirs(BASE_DIR, exist_ok=True)

_disk_ip_cache = {}
_host_to_ip = {}
_geo_request_times = []
_ip_api_disabled = False
_geo_stats = defaultdict(int)
_err_stats = defaultdict(int)
_lock = threading.Lock()
_cache_lock = threading.Lock()
_host_lock = threading.Lock()
_geo_lock = threading.Lock()
_err_lock = threading.Lock()

def _inc_geo_stat(key):
    with _lock:
        _geo_stats[key] += 1

def _inc_err(kind):
    with _err_lock:
        _err_stats[kind] += 1

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

def resolve_host(host):
    with _host_lock:
        if host in _host_to_ip:
            return _host_to_ip[host]
    try:
        ip = socket.gethostbyname(host)
        with _host_lock:
            _host_to_ip[host] = ip
        return ip
    except Exception:
        with _host_lock:
            _host_to_ip[host] = None
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

def detect_exit_country_via_http(proxy_host):
    global _ip_api_disabled
    ip = resolve_host(proxy_host)
    if not ip:
        return "UNKNOWN"
    
    # Check memory cache first (optimization)
    with _geo_mem_lock:
        if ip in _geo_memory_cache:
            _inc_geo_stat("mem_cache")
            return _geo_memory_cache[ip]
    
    with _cache_lock:
        cached = _disk_ip_cache.get(ip)
    if cached:
        _inc_geo_stat("cache")
        country = cached.get("country", "UNKNOWN")
        # Add to memory cache
        with _geo_mem_lock:
            if len(_geo_memory_cache) < GEO_MEMORY_CACHE_MAX_SIZE:
                _geo_memory_cache[ip] = country
        return country
    
    if _ip_api_disabled:
        return "UNKNOWN"
    
    if not _geo_api_wait_slot():
        return "UNKNOWN"
    
    try:
        r = requests.get(f"http://ip-api.com/json/{ip}?fields=countryCode", timeout=4)
        if r.status_code == 429:
            _ip_api_disabled = True
            return "UNKNOWN"
        if r.status_code == 200:
            code = r.json().get("countryCode", "UNKNOWN") or "UNKNOWN"
            with _cache_lock:
                _disk_ip_cache[ip] = {"country": code, "time": time.time()}
            # Add to memory cache
            with _geo_mem_lock:
                if len(_geo_memory_cache) < GEO_MEMORY_CACHE_MAX_SIZE:
                    _geo_memory_cache[ip] = code
            _inc_geo_stat("api")
            return code
    except Exception:
        pass
    return "UNKNOWN"

def get_country_fast(host, key_name):
    try:
        host_l = host.lower()
        name_u = key_name.upper()
        if host_l.endswith(".ru"):
            return "RU"
        if host_l.endswith(".de"):
            return "DE"
        if host_l.endswith(".nl"):
            return "NL"
        if host_l.endswith(".uk") or host_l.endswith(".co.uk"):
            return "GB"
        if host_l.endswith(".fr"):
            return "FR"
        for code in EURO_CODES:
            if code in name_u:
                return code
    except Exception:
        pass
    return "UNKNOWN"

def _has_many_ru_markers(host, key_name):
    count = 0
    host_lower = host.lower()
    key_upper = key_name.upper()
    for marker in RU_MARKERS_STRICT:
        if marker.lower() in host_lower or marker.upper() in key_upper:
            count += 1
            if count >= 2:
                return True
    return False

def is_russian_exit(key_str, host, country):
    if country == "RU":
        return True
    host_lower = host.lower()
    if host_lower.endswith(".ru"):
        return True
    if _has_many_ru_markers(host, key_str):
        return True
    return False

def decode_base64_safe(s):
    try:
        s = s.strip()
        missing_padding = len(s) % 4
        if missing_padding:
            s += '=' * (4 - missing_padding)
        decoded = base64.b64decode(s).decode('utf-8', errors='ignore')
        return decoded
    except Exception:
        return ""

def parse_vless(uri):
    try:
        if not uri.startswith("vless://"):
            return None
        uri = uri[8:]
        if '#' in uri:
            uri, fragment = uri.split('#', 1)
        else:
            fragment = ""
        if '?' in uri:
            main_part, query = uri.split('?', 1)
        else:
            return None
        parts = main_part.split('@')
        if len(parts) != 2:
            return None
        uuid = parts[0]
        host_port = parts[1]
        if ':' not in host_port:
            return None
        host, port = host_port.rsplit(':', 1)
        params = parse_qs(query)
        sni = params.get('sni', [None])[0]
        fp = params.get('fp', [None])[0]
        alpn = params.get('alpn', [None])[0]
        pbk = params.get('pbk', [None])[0]
        sid = params.get('sid', [None])[0]
        spx = params.get('spx', [None])[0]
        path = params.get('path', ['/'])[0]
        security = params.get('security', ['none'])[0]
        proto = params.get('type', ['tcp'])[0]
        return {
            'protocol': 'vless',
            'uuid': uuid,
            'host': host,
            'port': int(port),
            'sni': sni,
            'fp': fp,
            'alpn': alpn,
            'pbk': pbk,
            'sid': sid,
            'spx': spx,
            'path': path,
            'security': security,
            'type': proto,
            'name': unquote(fragment) if fragment else f"{host}:{port}",
            'original': 'vless://' + uri + ('#' + fragment if fragment else '')
        }
    except Exception:
        return None

def parse_vmess(uri):
    try:
        if not uri.startswith("vmess://"):
            return None
        b64_part = uri[8:]
        decoded = decode_base64_safe(b64_part)
        if not decoded:
            return None
        data = json.loads(decoded)
        return {
            'protocol': 'vmess',
            'host': data.get('add', ''),
            'port': int(data.get('port', 0)),
            'id': data.get('id', ''),
            'aid': data.get('aid', 0),
            'net': data.get('net', 'tcp'),
            'type': data.get('type', 'none'),
            'host_header': data.get('host', ''),
            'path': data.get('path', '/'),
            'tls': data.get('tls', ''),
            'sni': data.get('sni', ''),
            'name': data.get('ps', f"{data.get('add')}:{data.get('port')}"),
            'original': uri
        }
    except Exception:
        return None

def parse_trojan(uri):
    try:
        if not uri.startswith("trojan://"):
            return None
        uri = uri[9:]
        if '#' in uri:
            uri, fragment = uri.split('#', 1)
        else:
            fragment = ""
        if '?' in uri:
            main_part, query = uri.split('?', 1)
        else:
            main_part = uri
            query = ""
        password = main_part.split('@')[0]
        host_port = main_part.split('@')[1] if '@' in main_part else ""
        if ':' not in host_port:
            return None
        host, port = host_port.rsplit(':', 1)
        params = parse_qs(query)
        sni = params.get('sni', [None])[0]
        alpn = params.get('alpn', [None])[0]
        fp = params.get('fp', [None])[0]
        path = params.get('path', ['/'])[0]
        security = params.get('security', ['tls'])[0]
        return {
            'protocol': 'trojan',
            'password': password,
            'host': host,
            'port': int(port),
            'sni': sni,
            'alpn': alpn,
            'fp': fp,
            'path': path,
            'security': security,
            'name': unquote(fragment) if fragment else f"{host}:{port}",
            'original': 'trojan://' + uri + ('#' + fragment if fragment else '')
        }
    except Exception:
        return None

def parse_ss(uri):
    try:
        if not uri.startswith("ss://"):
            return None
        uri = uri[5:]
        if '#' in uri:
            uri, fragment = uri.split('#', 1)
        else:
            fragment = ""
        if '@' in uri:
            method_pass, host_port = uri.split('@', 1)
            try:
                decoded = decode_base64_safe(method_pass)
                if ':' in decoded:
                    method, password = decoded.split(':', 1)
                else:
                    method, password = "aes-256-gcm", decoded
            except Exception:
                method, password = "aes-256-gcm", method_pass
        else:
            decoded = decode_base64_safe(uri)
            if '@' in decoded:
                method_pass, host_port = decoded.split('@', 1)
                if ':' in method_pass:
                    method, password = method_pass.split(':', 1)
                else:
                    method, password = "aes-256-gcm", method_pass
            else:
                return None
        if ':' not in host_port:
            return None
        host, port = host_port.rsplit(':', 1)
        return {
            'protocol': 'ss',
            'method': method,
            'password': password,
            'host': host,
            'port': int(port),
            'name': unquote(fragment) if fragment else f"{host}:{port}",
            'original': 'ss://' + uri + ('#' + fragment if fragment else '')
        }
    except Exception:
        return None

def parse_line(line):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    if line.startswith("vless://"):
        return parse_vless(line)
    elif line.startswith("vmess://"):
        return parse_vmess(line)
    elif line.startswith("trojan://"):
        return parse_trojan(line)
    elif line.startswith("ss://"):
        return parse_ss(line)
    return None

def check_socket(host, port, timeout=TIMEOUT):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.settimeout(timeout)
        start = time.time()
        result = sock.connect_ex((host, port))
        elapsed = (time.time() - start) * 1000
        sock.close()
        if result == 0 and elapsed < MAX_PING_MS:
            return True, elapsed
        return False, elapsed
    except Exception:
        return False, 9999

def check_key(config):
    try:
        host = config.get('host', '')
        port = config.get('port', 0)
        if not host or not port:
            return False, 9999, "UNKNOWN", "no_host_port"
        
        # Fast path: check markers first before any network call
        country = get_country_fast(host, config.get('name', ''))
        if country != "UNKNOWN":
            if country in BAD_MARKERS:
                return False, 0, country, "bad_country_fast"
            # If we already know it's RU/EU from name, skip socket check for some categories
            # But still verify connectivity
        
        resolved_ip = resolve_host(host)
        if not resolved_ip:
            return False, 9999, "UNKNOWN", "dns_fail"
        
        ok, ping = check_socket(resolved_ip, port)
        if not ok:
            return False, ping, "UNKNOWN", "socket_fail"
        
        if country == "UNKNOWN":
            country = detect_exit_country_via_http(host)
        
        if country in BAD_MARKERS:
            return False, ping, country, "bad_country"
        
        return True, ping, country, "ok"
    except Exception as e:
        return False, 9999, "UNKNOWN", str(e)

def fetch_urls(urls):
    all_lines = []
    for url in urls:
        try:
            r = requests.get(url.strip(), timeout=10)
            if r.status_code == 200:
                content = r.text
                decoded = decode_base64_safe(content)
                if decoded:
                    lines = decoded.split('\n')
                else:
                    lines = content.split('\n')
                for line in lines:
                    if line.strip():
                        all_lines.append(line.strip())
        except Exception:
            continue
    return all_lines

def process_category(cat_name, meta):
    print(f"[+] Processing category: {cat_name}")
    urls = meta.get('urls', [])
    folder = meta.get('folder', BASE_DIR)
    filename = meta.get('file', 'output.txt')
    
    os.makedirs(folder, exist_ok=True)
    output_path = os.path.join(folder, filename)
    
    lines = fetch_urls(urls)
    print(f"  Fetched {len(lines)} lines from {len(urls)} sources")
    
    configs = []
    seen = set()
    for line in lines:
        cfg = parse_line(line)
        if cfg:
            key = f"{cfg['protocol']}:{cfg['host']}:{cfg['port']}"
            if key not in seen:
                seen.add(key)
                configs.append(cfg)
    
    print(f"  Parsed {len(configs)} unique configs")
    
    valid_configs = []
    checked = 0
    
    # Use ThreadPoolExecutor for parallel checking
    def check_wrapper(cfg):
        ok, ping, country, reason = check_key(cfg)
        return (cfg, ok, ping, country)
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        futures = {executor.submit(check_wrapper, cfg): cfg for cfg in configs[:MAX_KEYS_TO_CHECK]}
        
        for i, future in enumerate(as_completed(futures), 1):
            try:
                cfg, ok, ping, country = future.result()
                if ok:
                    valid_configs.append((cfg, ping, country))
            except Exception:
                pass
            
            if i % 500 == 0:
                print(f"  Checked {i}/{len(futures)}...")
    
    valid_configs.sort(key=lambda x: x[1])
    
    with open(output_path, 'w', encoding='utf-8') as f:
        for cfg, ping, country in valid_configs:
            f.write(cfg['original'] + '\n')
    
    print(f"  Saved {len(valid_configs)} valid configs to {output_path}")
    return valid_configs

def process_tg_proxies(meta):
    print(f"[+] Processing Telegram proxies")
    urls = meta.get('urls', [])
    folder = meta.get('folder', BASE_DIR)
    filename = meta.get('file', 'tg_proxy.txt')
    
    os.makedirs(folder, exist_ok=True)
    output_path = os.path.join(folder, filename)
    
    proxies = []
    for url in urls:
        url = url.strip()
        if url.startswith('https://t.me/proxy') or url.startswith('tg://proxy'):
            proxies.append(url)
    
    print(f"  Found {len(proxies)} TG proxy links")
    
    valid_proxies = []
    
    def check_proxy_wrapper(proxy_url):
        try:
            parsed = urlparse(proxy_url)
            if parsed.scheme == 'https':
                params = parse_qs(parsed.query)
                server = params.get('server', [''])[0]
                port = int(params.get('port', ['0'])[0])
            else:
                params = parse_qs(parsed.query)
                server = params.get('server', [''])[0]
                port = int(params.get('port', ['0'])[0])
            
            if server and port:
                ok, ping = check_socket(server, port, timeout=2)
                if ok:
                    return (proxy_url, ping)
        except Exception:
            pass
        return None
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        futures = [executor.submit(check_proxy_wrapper, p) for p in proxies]
        for future in as_completed(futures):
            result = future.result()
            if result:
                valid_proxies.append(result)
    
    valid_proxies.sort(key=lambda x: x[1])
    
    with open(output_path, 'w', encoding='utf-8') as f:
        for proxy_url, ping in valid_proxies:
            f.write(proxy_url + '\n')
    
    print(f"  Saved {len(valid_proxies)} valid TG proxies to {output_path}")
    return valid_proxies

def distribute_to_protocols(all_valid_configs):
    print("[+] Distributing configs by protocol")
    protocol_data = defaultdict(list)
    
    for cfg, ping, country in all_valid_configs:
        proto = cfg.get('protocol', 'unknown')
        if proto in PROTOCOL_FILES:
            protocol_data[proto].append(cfg['original'])
    
    for proto, lines in protocol_data.items():
        path = PROTOCOL_FILES.get(proto)
        if path:
            os.makedirs(os.path.dirname(path), exist_ok=True)
            with open(path, 'w', encoding='utf-8') as f:
                for line in lines:
                    f.write(line + '\n')
            print(f"  Saved {len(lines)} {proto.upper()} configs to {path}")

def update_history(stats):
    history = load_json(HISTORY_FILE)
    now = time.time()
    cutoff = now - MAX_HISTORY_AGE
    history = {k: v for k, v in history.items() if float(k) > cutoff}
    history[str(now)] = stats
    save_json(HISTORY_FILE, history)

def main():
    print("="*60)
    print(f"StintikVPN Checker | Channel: {MY_CHANNEL}")
    print("="*60)
    
    load_ip_cache()
    
    all_valid_configs = []
    
    for cat_name, meta in OUTPUTS.items():
        if cat_name == 'tg_proxy':
            process_tg_proxies(meta)
        else:
            valid = process_category(cat_name, meta)
            all_valid_configs.extend(valid)
    
    distribute_to_protocols(all_valid_configs)
    
    save_ip_cache()
    
    stats = {
        "total_checked": len(all_valid_configs),
        "geo_stats": dict(_geo_stats),
        "err_stats": dict(_err_stats),
        "timestamp": time.time()
    }
    update_history(stats)
    
    print("="*60)
    print("✅ Done!")
    print(f"Total valid configs: {len(all_valid_configs)}")
    print(f"Geo API calls: {_geo_stats.get('api', 0)}, Cache hits: {_geo_stats.get('cache', 0) + _geo_stats.get('mem_cache', 0)}")
    print("="*60)

if __name__ == "__main__":
    main()
