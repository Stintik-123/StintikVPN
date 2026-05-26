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

BASE_DIR = "checked_tg"
TIMEOUT_CONNECT = 4.0
TIMEOUT_SSL = 3.0
MAX_PING_MS = 5000
RETRY_COUNT = 2
RETRY_DELAY = 0.5
THREADS = 600
BATCH_SIZE = 50

LIMITS = {
    "tg_proxy": 500,
    "tg_mobile": 100,
}

TG_SOURCES = [
    "https://raw.githubusercontent.com/TelegramProxy/proxy-list/main/proxies.txt",
    "https://raw.githubusercontent.com/mtproto-proxy-list/free-proxies/main/list.txt",
    "https://t.me/publicproxies",
    "https://raw.githubusercontent.com/kort0881/tg-proxy-list/main/proxies.txt",
]

GEOIP_CACHE_FILE = os.path.join(BASE_DIR, "geoip_cache.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")
LIVE_STATS_FILE = os.path.join(BASE_DIR, "live_stats.json")

BAD_MARKERS = ["CN", "IR", "KP"]
RU_CIS_IP_PREFIXES = [
    "5.", "31.", "37.", "46.", "62.", "77.", "78.", "79.", "80.", "81.", "82.", "83.", "84.", "85.", "86.", "87.",
    "88.", "89.", "91.", "92.", "93.", "94.", "95.", "109.", "128.", "134.", "141.", "145.", "149.", "151.", "158.",
    "164.", "171.", "176.", "178.", "185.", "188.", "193.", "194.", "195.", "212.", "213.", "217.",
]

os.makedirs(BASE_DIR, exist_ok=True)

_geoip_cache = {}
_stats = {"sources": defaultdict(int), "total_checked": 0, "alive": 0, "dead": 0}
_lock = threading.Lock()
_geo_lock = threading.Lock()

def load_geoip_cache():
    global _geoip_cache
    if os.path.exists(GEOIP_CACHE_FILE):
        try:
            with open(GEOIP_CACHE_FILE, "r", encoding="utf-8") as f:
                _geoip_cache = json.load(f)
        except Exception:
            _geoip_cache = {}

def save_geoip_cache():
    with _geo_lock:
        os.makedirs(os.path.dirname(GEOIP_CACHE_FILE), exist_ok=True)
        with open(GEOIP_CACHE_FILE, "w", encoding="utf-8") as f:
            json.dump(_geoip_cache, f, ensure_ascii=False, indent=2)

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

def parse_tg_proxy(line, source_url=""):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    if line.startswith("tg://proxy"):
        return {"type": "tg_proxy", "raw": line, "host": None, "port": None, "source_url": source_url}
    
    if line.startswith("https://t.me/proxy"):
        return {"type": "tg_proxy", "raw": line, "host": None, "port": None, "source_url": source_url}
    
    if line.startswith("http://t.me/proxy"):
        return {"type": "tg_proxy", "raw": line.replace("http://", "https://"), "host": None, "port": None, "source_url": source_url}
    
    return None

def check_socket_with_retry(host, port, retries=RETRY_COUNT):
    last_error = None
    
    for attempt in range(retries + 1):
        try:
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
            sock.settimeout(TIMEOUT_CONNECT)
            
            start = time.time()
            result = sock.connect_ex((host, port))
            ping = (time.time() - start) * 1000
            
            if result == 0:
                sock.close()
                return True, ping
            
            sock.close()
            
            if attempt < retries and result != 0:
                time.sleep(RETRY_DELAY * (attempt + 1))
                
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

def get_country_approx(host, name):
    host_l = host.lower() if host else ""
    name_u = name.upper() if name else ""
    
    if host_l.endswith(".ru") or "RU" in name_u or "ROSSIA" in name_u or "MOSCOW" in name_u:
        return "RU", "Russia"
    
    for prefix in RU_CIS_IP_PREFIXES:
        if host_l.startswith(prefix):
            if any(marker in name_u for marker in ["KZ", "BY", "UA", "UZ", "AZ", "GE", "AM", "MD"]):
                return "CIS", "CIS Region"
            return "RU", "Russia"
    
    return None, None

def process_tg_proxy(item):
    raw = item.get("raw", "")
    source_url = item.get("source_url", "")
    
    if "tg://" in raw or "t.me/proxy" in raw:
        return {
            "item": item,
            "valid": True,
            "ping": 0,
            "country": "XX",
            "country_name": "Unknown",
            "source": source_url
        }
    
    return {"item": item, "valid": False, "ping": 9999, "source": source_url}

def fetch_tg_urls(urls):
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
                    parsed = parse_tg_proxy(line, source_url=url)
                    if parsed:
                        all_items.append(parsed)
                        valid_count += 1
                
                with _lock:
                    _stats["sources"][url] += valid_count
                    
        except Exception as e:
            print(f"⚠️ Error fetching {url.split('/')[-1]}: {e}")
    
    return all_items

def main():
    start_time = time.time()
    print(f"🚀 StintikVPN TG Proxy Checker | Threads: {THREADS}")
    load_geoip_cache()
    
    results = {'tg_proxy': [], 'tg_mobile': []}
    
    print("📥 Загрузка TG прокси...")
    tg_items = fetch_tg_urls(TG_SOURCES)
    
    print(f"🔍 Проверка {len(tg_items)} TG прокси...")
    
    alive_count = 0
    
    with ThreadPoolExecutor(max_workers=THREADS) as executor:
        futures = [executor.submit(process_tg_proxy, item) for item in tg_items]
        for future in as_completed(futures):
            res = future.result()
            if res and res.get('valid'):
                alive_count += 1
                results['tg_proxy'].append(res)
    
    end_time = time.time()
    _stats['alive'] = alive_count
    _stats['dead'] = len(tg_items) - alive_count
    _stats['total_checked'] = len(tg_items)
    _stats['duration'] = end_time - start_time
    
    print("💾 Сохранение результатов...")
    
    def save_list(name, data_list, filename, limit):
        data_list.sort(key=lambda x: x['ping'])
        limited = data_list[:limit]
        path = os.path.join(BASE_DIR, filename)
        header = f"# StintikVPN TG Proxy Auto-Generated: {time.strftime('%Y-%m-%d %H:%M')} | Count: {len(limited)}\n"
        with open(path, 'w', encoding='utf-8') as f:
            f.write(header)
            f.write('\n'.join([x['item']['raw'] for x in limited]))
        return len(limited)
    
    final_counts = {}
    final_counts['tg_proxy'] = save_list('tg_proxy', results['tg_proxy'], 'tg_proxy.txt', LIMITS['tg_proxy'])
    final_counts['tg_mobile'] = save_list('tg_mobile', results['tg_proxy'][:LIMITS['tg_mobile']], 'tg_mobile.txt', LIMITS['tg_mobile'])
    
    save_geoip_cache()
    save_json(STATS_FILE, _stats)
    
    live_stats = {
        "last_update": time.strftime('%Y-%m-%d %H:%M:%S'),
        "total_alive": _stats['alive'],
        "total_dead": _stats['dead'],
        "duration_sec": round(_stats['duration'], 2),
        "categories": {
            "tg_proxy": final_counts.get('tg_proxy', 0),
            "tg_mobile": final_counts.get('tg_mobile', 0),
        }
    }
    save_json(LIVE_STATS_FILE, live_stats)
    
    print(f"✅ ГОТОВО! Время: {_stats['duration']:.2f} сек. Рабочих: {_stats['alive']}")
    print(f"💾 GeoIP cache сохранено в {GEOIP_CACHE_FILE}")

def save_json(path, data):
    os.makedirs(os.path.dirname(path), exist_ok=True)
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    main()
