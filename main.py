"""
🚀 StintikVPN Ultimate - Simplified Core
Features:
- Normalized params for deduplication (type, security, sni, host, path, alpn, fp, pbk, sid, flow, serviceName, mode, headerType, seed, quicSecurity, key, encryption)
- DEDUP BY: normalized config string, host+port+uuid, host+port+pbk, host+port+password
- REMOVE: malformed UUID, empty host, invalid port, configs without tls/reality, broken reality params, duplicates
- TCP TESTS: 2 TCP CONNECT TESTS (2.5-3s timeout)
- SUCCESS RULE: 2/2=GOOD, 1/2=UNSTABLE, 0/2=DEAD
- CLOUDFLARE FILTERING: detect Cloudflare ASN/IP ranges, CDN/proxy endpoints
- GeoIP + Reputation (remove dead servers after 3 failures)
"""

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
from datetime import datetime

VERSION = "9.0.0 OPTIMIZED"
BASE_DIR = "checked"
THREADS = 150
TIMEOUT_CONNECT = 3.0
TIMEOUT_SSL = 2.5
FAIL_THRESHOLD = 3

TG_BOT_TOKEN = "8645441777:AAH7kWlfGqIEggu6SuhgtHCcd0ifNtiSz50"
TG_CHAT_ID = "-1003884045475"

LIMITS = {
    "black": 250,
    "black_mobile": 50,
    "white_all": 100,
    "white_sni": 100,
    "white_cidr": 100,
    "protocols": 100,
}

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

BAD_MARKERS = ["CN", "IR", "KP", "RELAY", "POOL", "ANYCAST"]
CDN_KEYWORDS = ["cloudflare", "cdn", "akamai", "anycast"]
CLOUDFLARE_IP_PREFIXES = ["104.", "172.64.", "173.", "190.", "197.", "198.", "203.", "24."]

RU_CIS_IP_PREFIXES = [
    "5.", "31.", "37.", "46.", "62.", "77.", "78.", "79.", "80.", "81.", "82.", "83.", "84.", "85.", "86.", "87.",
    "88.", "89.", "91.", "92.", "93.", "94.", "95.", "109.", "128.", "134.", "141.", "145.", "151.", "158.",
    "164.", "171.", "176.", "178.", "185.", "188.", "193.", "194.", "195.", "212.", "213.", "217.",
]

REPUTATION_FILE = os.path.join(BASE_DIR, "reputation.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")
LIVE_STATS_FILE = os.path.join(BASE_DIR, "live_stats.json")
GEOIP_CACHE_FILE = os.path.join(BASE_DIR, "geoip_cache.json")

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
    "black_mobile": {
        "folder": os.path.join(BASE_DIR, "black"),
        "file": "black_mobile.txt",
        "urls": [
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_SS+All_RUS_base64.txt",
            "https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/Base64/BLACK_VLESS_RUS_base64.txt",
            "https://raw.githubusercontent.com/AvenCores/goida-vpn-configs/main/black.txt",
            "https://vpn.akres.fun/all",
            "https://mifa.world/fast",
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
_seen_configs = set()
_lock = threading.Lock()
_rep_lock = threading.Lock()
_stats_lock = threading.Lock()
_geo_lock = threading.Lock()
_seen_lock = threading.Lock()

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

def save_reputation():
    with _rep_lock:
        save_json(REPUTATION_FILE, _reputation_db)

def save_geoip_cache():
    with _geo_lock:
        save_json(GEOIP_CACHE_FILE, _geoip_cache)

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
        _geoip_cache[host] = {"code": country_code, "name": country_name, "timestamp": time.time()}

def fetch_geoip_multi(host):
    cached = get_geoip_cached(host)
    if cached and (time.time() - cached.get("timestamp", 0)) < 86400 * 30:
        return cached["code"], cached["name"]
    
    apis = [lambda: fetch_geoip_ipapi(host), lambda: fetch_geoip_ipwhois(host)]
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
        r = requests.get(f"http://ip-api.com/json/{host}?fields=countryCode,country", timeout=3)
        if r.status_code == 200:
            data = r.json()
            if data.get("status") == "success":
                return data.get("countryCode", "XX"), data.get("country", "Unknown")
    except Exception:
        pass
    return None, None

def fetch_geoip_ipwhois(host):
    try:
        r = requests.get(f"http://ipwhois.app/json/{host}?lang=en", timeout=3)
        if r.status_code == 200:
            data = r.json()
            if data.get("success"):
                return data.get("country_code", "XX"), data.get("country", "Unknown")
    except Exception:
        pass
    return None, None

def is_cloudflare_ip(ip):
    for prefix in CLOUDFLARE_IP_PREFIXES:
        if ip.startswith(prefix):
            return True
    return False

def is_cloudflare_asn(geo_data):
    return False

def tcp_test(host, port, timeout=TIMEOUT_CONNECT):
    try:
        sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
        sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
        sock.settimeout(timeout)
        start = time.perf_counter()
        result = sock.connect_ex((host, port))
        ping_ms = (time.perf_counter() - start) * 1000
        sock.close()
        if result == 0:
            return True, ping_ms
        return False, 9999
    except Exception:
        return False, 9999

def tcp_test_double(host, port):
    results = []
    for attempt in range(2):
        success, ping = tcp_test(host, port)
        results.append({"success": success, "ping": ping, "attempt": attempt + 1})
    
    successful = [r for r in results if r["success"]]
    
    if len(successful) == 2:
        avg_ping = sum(r["ping"] for r in successful) / 2
        return "GOOD", avg_ping, results
    elif len(successful) == 1:
        avg_ping = successful[0]["ping"]
        return "UNSTABLE", avg_ping, results
    else:
        return "DEAD", 9999, results

def normalize_config_params(item):
    params = item.get('params', {})
    p_type = item.get('type', '')
    host = (item.get('host') or '').lower().strip()
    port = item.get('port')
    
    security = ''
    if isinstance(params, dict):
        sec_list = params.get('security', [])
        security = sec_list[0] if isinstance(sec_list, list) and sec_list else sec_list
    security = (security or '').lower().strip()
    
    sni = ''
    if isinstance(params, dict):
        sni_list = params.get('sni', [])
        sni = sni_list[0] if isinstance(sni_list, list) and sni_list else sni_list
    sni = (sni or host).lower().strip()
    
    def get_param(name):
        val = params.get(name, []) if isinstance(params, dict) else []
        return val[0] if isinstance(val, list) and val else val
    
    normalized = {
        'type': p_type,
        'security': security,
        'sni': sni,
        'host': host,
        'path': get_param('path') or '',
        'alpn': get_param('alpn') or '',
        'fp': get_param('fp') or '',
        'pbk': get_param('pbk') or '',
        'sid': get_param('sid') or '',
        'flow': get_param('flow') or '',
        'serviceName': get_param('serviceName') or '',
        'mode': get_param('mode') or '',
        'headerType': get_param('headerType') or '',
        'seed': get_param('seed') or '',
        'quicSecurity': get_param('quicSecurity') or '',
        'key': get_param('key') or '',
        'encryption': get_param('encryption') or '',
    }
    
    item['normalized'] = normalized
    dedup_string = f"{p_type}|{host}|{port}|{security}|{sni}|{normalized['pbk']}|{normalized['sid']}|{normalized['flow']}"
    return dedup_string

def is_valid_uuid(uuid_str):
    if not uuid_str:
        return False
    uuid_pattern = re.compile(r'^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$')
    return bool(uuid_pattern.match(uuid_str))

def parse_proxy_line(line, source_url=""):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    if line.startswith("vless://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            params = parse_qs(parsed.query)
            item = {"type": "vless", "host": host, "port": port, "name": name, "raw": line, "params": params, "source_url": source_url}
            normalize_config_params(item)
            return item
        except Exception:
            return None
    
    if line.startswith("vmess://"):
        try:
            decoded = base64.b64decode(line[8:] + '==').decode('utf-8')
            data = json.loads(decoded)
            host = data.get('add', '')
            port = data.get('port', '')
            name = data.get('ps', '')
            item = {"type": "vmess", "host": host, "port": int(port) if str(port).isdigit() else None, "name": name, "raw": line, "params": data, "source_url": source_url}
            normalize_config_params(item)
            return item
        except Exception:
            return None
    
    if line.startswith("trojan://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            params = parse_qs(parsed.query)
            item = {"type": "trojan", "host": host, "port": port, "name": name, "raw": line, "params": params, "source_url": source_url}
            normalize_config_params(item)
            return item
        except Exception:
            return None
    
    if line.startswith("ss://"):
        try:
            parsed = urlparse(line)
            host = parsed.hostname
            port = parsed.port
            name = unquote(parsed.fragment)
            userinfo = parsed.username + ':' + parsed.password if parsed.password else parsed.username
            try:
                decoded = base64.b64decode(userinfo + '==').decode('utf-8')
            except Exception:
                decoded = userinfo
            item = {"type": "ss", "host": host, "port": port, "name": name, "raw": line, "params": {"method_password": decoded}, "source_url": source_url}
            normalize_config_params(item)
            return item
        except Exception:
            return None
    
    return None

def validate_config(item):
    if not item:
        return False, "empty"
    
    host = item.get('host')
    port = item.get('port')
    
    if not host or not str(host).strip():
        return False, "empty_host"
    
    if not port or not str(port).isdigit() or int(port) <= 0 or int(port) > 65535:
        return False, "invalid_port"
    
    params = item.get('params', {})
    security = ''
    if isinstance(params, dict):
        sec_list = params.get('security', [])
        security = sec_list[0] if isinstance(sec_list, list) and sec_list else sec_list
    security = (security or '').lower().strip()
    
    if security not in ['tls', 'reality']:
        return False, "no_tls_reality"
    
    if security == 'reality':
        pbk = params.get('pbk', [])
        if isinstance(pbk, list):
            pbk = pbk[0] if pbk else ''
        if not pbk:
            return False, "broken_reality_no_pbk"
    
    if item.get('type') == 'vless':
        uuid = item.get('raw', '').split('://')[1].split('@')[0] if '@' in item.get('raw', '') else ''
        if uuid and not is_valid_uuid(uuid):
            return False, "malformed_uuid"
    
    return True, "valid"

def check_dedup(item):
    host = (item.get('host') or '').lower().strip()
    port = item.get('port')
    params = item.get('params', {})
    normalized = item.get('normalized', {})
    
    dedup_keys = []
    
    norm_string = f"{item.get('type')}|{host}|{port}|{normalized.get('security')}|{normalized.get('sni')}|{normalized.get('pbk')}|{normalized.get('sid')}|{normalized.get('flow')}"
    dedup_keys.append(norm_string)
    
    uuid = ''
    if item.get('type') == 'vless' and '@' in item.get('raw', ''):
        uuid = item.get('raw', '').split('://')[1].split('@')[0]
    if uuid:
        dedup_keys.append(f"{host}|{port}|{uuid}")
    
    pbk = normalized.get('pbk', '')
    if pbk:
        dedup_keys.append(f"{host}|{port}|{pbk}")
    
    password = ''
    if item.get('type') == 'trojan':
        password = item.get('raw', '').split('://')[1].split('@')[0] if '@' in item.get('raw', '') else ''
    elif item.get('type') == 'ss':
        pm = params.get('method_password', '')
        if ':' in str(pm):
            password = pm.split(':')[-1]
    if password:
        dedup_keys.append(f"{host}|{port}|{password}")
    
    with _seen_lock:
        for key in dedup_keys:
            if key in _seen_configs:
                return True
        for key in dedup_keys:
            _seen_configs.add(key)
    
    return False

def process_config(item):
    host = item.get('host')
    port = item.get('port')
    source_url = item.get('source_url', '')
    
    valid, reason = validate_config(item)
    if not valid:
        return None
    
    if check_dedup(item):
        return None
    
    if not check_reputation(host, port):
        return None
    
    status, ping, details = tcp_test_double(host, port)
    
    if status == "DEAD":
        update_reputation(host, port, False)
        return None
    
    update_reputation(host, port, True)
    
    geo_code, geo_name = fetch_geoip_multi(str(host))
    if not geo_code:
        geo_code = "XX"
        geo_name = "Unknown"
    
    cf_ip = is_cloudflare_ip(str(host))
    
    country_flag = COUNTRY_NAMES.get(geo_code, f"🌐 {geo_code}")
    original_name = item.get('name', '')
    new_name = f"{country_flag} | StintikVPN"
    
    raw = item.get('raw', '')
    if '#' in raw:
        base = raw.rsplit('#', 1)[0]
        item['raw'] = f"{base}#{new_name}"
    else:
        item['raw'] = f"{raw}#{new_name}"
    
    return {
        "item": item,
        "valid": True,
        "ping": ping,
        "status": status,
        "country": geo_code,
        "country_name": geo_name,
        "cloudflare": cf_ip,
        "source": source_url
    }

def fetch_urls(urls):
    all_items = []
    for url in urls:
        try:
            print(f"📥 Загрузка: {url.split('/')[-1]}")
            r = requests.get(url, timeout=15)
            if r.status_code == 200:
                content = r.text
                if "base64" in url.lower() or len(content) > 10000:
                    try:
                        decoded = base64.b64decode(content).decode('utf-8')
                        content = decoded
                    except Exception:
                        pass
                lines = content.split('\n')
                valid_count = 0
                for line in lines:
                    parsed = parse_proxy_line(line, source_url=url)
                    if parsed:
                        all_items.append(parsed)
                        valid_count += 1
                with _lock:
                    _stats["sources"][url] += valid_count
        except Exception as e:
            print(f"⚠️ Error fetching {url.split('/')[-1]}: {e}")
    return all_items

def send_telegram_message(message):
    try:
        url = f"https://api.telegram.org/bot{TG_BOT_TOKEN}/sendMessage"
        data = {"chat_id": TG_CHAT_ID, "text": message, "parse_mode": "HTML"}
        requests.post(url, json=data, timeout=5)
    except Exception:
        pass

def main():
    start_time = time.time()
    print(f"🚀 StintikVPN Ultimate v{VERSION} | Threads: {THREADS}")
    
    load_reputation()
    load_geoip_cache()
    
    results = {key: [] for key in OUTPUTS.keys()}
    protocol_results = {key: [] for key in PROTOCOL_FILES.keys()}
    
    for category, meta in OUTPUTS.items():
        print(f"\n📂 Обработка {category}...")
        items = fetch_urls(meta["urls"])
        print(f"🔍 Проверка {len(items)} конфигов...")
        
        alive_count = 0
        with ThreadPoolExecutor(max_workers=THREADS) as executor:
            futures = [executor.submit(process_config, item) for item in items]
            for future in as_completed(futures):
                res = future.result()
                if res and res.get('valid'):
                    alive_count += 1
                    results[category].append(res)
                    proto = res['item'].get('type', '')
                    if proto in protocol_results:
                        protocol_results[proto].append(res)
        
        print(f"✅ Найдено рабочих: {alive_count}")
        with _stats_lock:
            _stats['alive'] += alive_count
            _stats['total_checked'] += len(items)
    
    end_time = time.time()
    _stats['dead'] = _stats['total_checked'] - _stats['alive']
    _stats['duration'] = end_time - start_time
    
    print("\n💾 Сохранение результатов...")
    
    def save_list(name, data_list, filename, limit):
        data_list.sort(key=lambda x: x['ping'])
        limited = data_list[:limit]
        folder = OUTPUTS.get(name, {}).get("folder", BASE_DIR)
        os.makedirs(folder, exist_ok=True)
        path = os.path.join(folder, filename)
        header = f"# StintikVPN Auto-Generated: {time.strftime('%Y-%m-%d %H:%M')} | Count: {len(limited)}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        return len(limited)
    
    final_counts = {}
    for key in OUTPUTS.keys():
        final_counts[key] = save_list(key, results[key], OUTPUTS[key]["file"], LIMITS.get(key, 100))
    
    for proto, items in protocol_results.items():
        items.sort(key=lambda x: x['ping'])
        path = PROTOCOL_FILES[proto]
        os.makedirs(os.path.dirname(path), exist_ok=True)
        header = f"# {proto.upper()} Servers: {time.strftime('%Y-%m-%d %H:%M')} | Count: {min(len(items), LIMITS.get('protocols', 100))}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write('\n'.join([x['item']['raw'] for x in items[:LIMITS.get('protocols', 100)]]))
    
    country_results = defaultdict(list)
    for cat_results in results.values():
        for item in cat_results:
            cc = item.get('country', 'XX')
            country_results[cc].append(item)
    
    countries_dir = os.path.join(BASE_DIR, "countries")
    os.makedirs(countries_dir, exist_ok=True)
    for cc, items in country_results.items():
        items.sort(key=lambda x: x['ping'])
        path = os.path.join(countries_dir, f"{cc}.txt")
        header = f"# {COUNTRY_NAMES.get(cc, cc)} Servers: {time.strftime('%Y-%m-%d %H:%M')} | Count: {len(items)}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write('\n'.join([x['item']['raw'] for x in items]))
    
    save_reputation()
    save_geoip_cache()
    save_json(STATS_FILE, _stats)
    
    live_stats = {
        "last_update": time.strftime('%Y-%m-%d %H:%M:%S'),
        "total_alive": _stats['alive'],
        "total_dead": _stats['dead'],
        "duration_sec": round(_stats['duration'], 2),
        "categories": final_counts
    }
    save_json(LIVE_STATS_FILE, live_stats)
    
    summary = f"""
✅ <b>StintikVPN Checker Complete!</b>

⏱️ Duration: {_stats['duration']:.2f}s
📊 Total Checked: {_stats['total_checked']}
✅ Alive: {_stats['alive']}
❌ Dead: {_stats['dead']}

📁 Results:
"""
    for cat, count in final_counts.items():
        summary += f"• {cat}: {count}\n"
    
    send_telegram_message(summary)
    
    print(f"\n✅ ГОТОВО! Время: {_stats['duration']:.2f} сек.")
    print(f"📊 Всего проверено: {_stats['total_checked']}")
    print(f"✅ Рабочих: {_stats['alive']}")
    print(f"❌ Мертвых: {_stats['dead']}")
    print(f"💾 GeoIP cache: {GEOIP_CACHE_FILE}")
    print(f"💾 Reputation: {REPUTATION_FILE}")

if __name__ == "__main__":
    main()
