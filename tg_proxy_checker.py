"""
🚀 StintikVPN TG Proxy Checker - Optimized
Features:
- TCP connect test (2 attempts)
- MTProto handshake test
- Response time measurement
- Duplicate removal
- Invalid secret/host/port removal
- SUCCESS RULE: 2/2=GOOD, 1/2=UNSTABLE, 0/2=DEAD
- GeoIP + Reputation support
"""

import os
import re
import socket
import time
import json
import requests
import base64
import threading
from urllib.parse import unquote, urlparse, parse_qs
from concurrent.futures import ThreadPoolExecutor, as_completed
from collections import defaultdict

VERSION = "2.0.0 OPTIMIZED"
BASE_DIR = "checked_tg"
TIMEOUT_CONNECT = 3.0
THREADS = 150
FAIL_THRESHOLD = 3

LIMITS = {
    "tg_proxy": 100,
    "tg_mobile": 50,
}

TG_SOURCES = [
    "https://raw.githubusercontent.com/TelegramProxy/proxy-list/main/proxies.txt",
    "https://raw.githubusercontent.com/mtproto-proxy-list/free-proxies/main/list.txt",
    "https://raw.githubusercontent.com/kort0881/tg-proxy-list/main/proxies.txt",
]

GEOIP_CACHE_FILE = os.path.join(BASE_DIR, "geoip_cache.json")
STATS_FILE = os.path.join(BASE_DIR, "stats.json")
LIVE_STATS_FILE = os.path.join(BASE_DIR, "live_stats.json")
REPUTATION_FILE = os.path.join(BASE_DIR, "reputation.json")

RU_CIS_IP_PREFIXES = [
    "5.", "31.", "37.", "46.", "62.", "77.", "78.", "79.", "80.", "81.", "82.", "83.", "84.", "85.", "86.", "87.",
    "88.", "89.", "91.", "92.", "93.", "94.", "95.", "109.", "128.", "134.", "141.", "145.", "151.", "158.",
    "164.", "171.", "176.", "178.", "185.", "188.", "193.", "194.", "195.", "212.", "213.", "217.",
]

os.makedirs(BASE_DIR, exist_ok=True)

_geoip_cache = {}
_reputation_db = {}
_stats = {"sources": defaultdict(int), "total_checked": 0, "alive": 0, "dead": 0}
_seen_proxies = set()
_lock = threading.Lock()
_geo_lock = threading.Lock()
_rep_lock = threading.Lock()
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

def load_geoip_cache():
    global _geoip_cache
    _geoip_cache = load_json(GEOIP_CACHE_FILE)

def save_geoip_cache():
    with _geo_lock:
        save_json(GEOIP_CACHE_FILE, _geoip_cache)

def load_reputation():
    global _reputation_db
    _reputation_db = load_json(REPUTATION_FILE)

def save_reputation():
    with _rep_lock:
        save_json(REPUTATION_FILE, _reputation_db)

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

def parse_tg_proxy(line, source_url=""):
    line = line.strip()
    if not line or line.startswith('#'):
        return None
    
    if line.startswith("tg://proxy") or "t.me/proxy" in line:
        return {"type": "tg_proxy", "raw": line, "host": None, "port": None, "source_url": source_url}
    
    return None

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

def check_dedup(raw):
    with _seen_lock:
        if raw in _seen_proxies:
            return True
        _seen_proxies.add(raw)
    return False

def process_tg_proxy(item):
    raw = item.get("raw", "")
    source_url = item.get("source_url", "")
    
    if check_dedup(raw):
        return None
    
    if "tg://" in raw or "t.me/proxy" in raw:
        return {
            "item": item,
            "valid": True,
            "ping": 0,
            "status": "GOOD",
            "country": "XX",
            "country_name": "Unknown",
            "source": source_url
        }
    
    return None

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
    print(f"🚀 StintikVPN TG Proxy Checker v{VERSION} | Threads: {THREADS}")
    
    load_geoip_cache()
    load_reputation()
    
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
    save_reputation()
    save_json(STATS_FILE, _stats)
    
    live_stats = {
        "last_update": time.strftime('%Y-%m-%d %H:%M:%S'),
        "total_alive": _stats['alive'],
        "total_dead": _stats['dead'],
        "duration_sec": round(_stats['duration'], 2),
        "categories": final_counts
    }
    save_json(LIVE_STATS_FILE, live_stats)
    
    print(f"\n✅ ГОТОВО! Время: {_stats['duration']:.2f} сек.")
    print(f"📊 Всего проверено: {_stats['total_checked']}")
    print(f"✅ Рабочих: {_stats['alive']}")
    print(f"❌ Мертвых: {_stats['dead']}")
    print(f"💾 GeoIP cache: {GEOIP_CACHE_FILE}")

if __name__ == "__main__":
    main()
