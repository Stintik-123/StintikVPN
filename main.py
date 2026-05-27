import asyncio
import aiohttp
import re
import json
import os
import time
from urllib.parse import urlparse, parse_qs, unquote
from base64 import b64decode

# --- CONFIGURATION ---
LIMITS = {
    "black": 250,
    "black_mobile": 50,
    "white_all": 100,
    "white_sni": 100,
    "white_cidr": 100,
    "protocols": 100,
    "telegram": 100
}

TIMEOUT_CONNECT = 2.5
TIMEOUT_TOTAL = 3.0
MAX_RETRIES_GEOIP = 2

OUTPUT_DIR = "checked"
COUNTRIES_DIR = os.path.join(OUTPUT_DIR, "countries")
PROTOCOLS_DIR = os.path.join(OUTPUT_DIR, "protocols")
RESULTS_FILE = os.path.join(OUTPUT_DIR, "results_summary.json")

# Ensure directories exist
for d in [OUTPUT_DIR, COUNTRIES_DIR, PROTOCOLS_DIR]:
    os.makedirs(d, exist_ok=True)

# --- UTILS ---

def safe_b64decode(data):
    data += '=' * (-len(data) % 4)
    try:
        return b64decode(data).decode('utf-8', errors='ignore')
    except:
        return ""

def extract_ip(host):
    match = re.search(r'([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}|[a-zA-Z0-9.-]+)', host)
    return match.group(1) if match else host

async def get_geoip(ip, session):
    if not ip or ip == "unknown":
        return "XX", "Unknown"
    
    for attempt in range(MAX_RETRIES_GEOIP):
        try:
            async with session.get(f"http://ip-api.com/json/{ip}?fields=countryCode,country", timeout=aiohttp.ClientTimeout(total=2)) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    cc = data.get('countryCode', 'XX')
                    name = data.get('country', 'Unknown')
                    if cc != 'XX':
                        return cc, name
        except:
            pass
        
        try:
            async with session.get(f"https://ipwhois.app/json/{ip}?lang=en", timeout=aiohttp.ClientTimeout(total=2)) as resp:
                if resp.status == 200:
                    data = await resp.json()
                    cc = data.get('country_code', 'XX')
                    name = data.get('country', 'Unknown')
                    if cc != 'XX':
                        return cc, name
        except:
            pass
        
        await asyncio.sleep(0.5)
    
    return "XX", "Unknown"

# --- PARSING LOGIC ---

def parse_vless(line):
    try:
        if not line.startswith("vless://"): return None
        parts = line.replace("vless://", "").split("#")
        if len(parts) < 1: return None
        
        name = unquote(parts[1]) if len(parts) > 1 else "Server"
        main_part = parts[0].split("@")
        if len(main_part) != 2: return None
        
        uuid, rest = main_part
        # Basic UUID check relaxed to allow some variations, but strict is usually better
        # if not re.match(r'[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}', uuid, re.I):
        #     pass 

        host_port = rest.split("?")[0]
        if ":" not in host_port: return None
        host, port = host_port.rsplit(":", 1)
        
        params_str = rest.split("?")[1] if "?" in rest else ""
        params = parse_qs(params_str)
        
        return {
            "type": "vless",
            "uuid": uuid,
            "host": host,
            "port": int(port),
            "name": name,
            "security": params.get('security', ['none'])[0],
            "sni": params.get('sni', [host])[0],
            "fp": params.get('fp', ['chrome'])[0],
            "alpn": params.get('alpn', ['h2,http/1.1'])[0],
            "pbk": params.get('pbk', [''])[0],
            "sid": params.get('sid', [''])[0],
            "flow": params.get('flow', [''])[0],
            "path": params.get('path', ['/'])[0],
            "headerType": params.get('headerType', ['none'])[0],
            "encryption": params.get('encryption', ['none'])[0]
        }
    except Exception:
        return None

def parse_trojan(line):
    try:
        if not line.startswith("trojan://"): return None
        temp = line.replace("trojan://", "")
        parts = temp.split("#")
        name = unquote(parts[1]) if len(parts) > 1 else "Server"
        
        main = parts[0]
        if "@" not in main: return None
        password, rest = main.split("@", 1)
        
        host_port = rest.split("?")[0]
        if ":" not in host_port: return None
        host, port = host_port.rsplit(":", 1)
        
        params_str = rest.split("?")[1] if "?" in rest else ""
        params = parse_qs(params_str)
        
        return {
            "type": "trojan",
            "password": password,
            "host": host,
            "port": int(port),
            "name": name,
            "security": params.get('security', ['tls'])[0],
            "sni": params.get('sni', [host])[0],
            "alpn": params.get('alpn', ['h2,http/1.1'])[0],
            "fp": params.get('fp', ['chrome'])[0]
        }
    except Exception:
        return None

def parse_vmess(line):
    try:
        if not line.startswith("vmess://"): return None
        json_str = safe_b64decode(line.replace("vmess://", ""))
        if not json_str: return None
        data = json.loads(json_str)
        
        return {
            "type": "vmess",
            "uuid": data.get('id', ''),
            "host": data.get('add', ''),
            "port": int(data.get('port', 0)),
            "name": data.get('ps', 'Server'),
            "security": data.get('tls', ''),
            "sni": data.get('sni', data.get('add', '')),
            "path": data.get('path', '/'),
            "host_header": data.get('host', '')
        }
    except Exception:
        return None

def parse_ss(line):
    try:
        if not line.startswith("ss://"): return None
        temp = line.replace("ss://", "")
        if "#" in temp:
            info, name = temp.rsplit("#", 1)
            name = unquote(name)
        else:
            info = temp
            name = "Server"
        
        decoded = safe_b64decode(info.split("@")[0])
        if ":" in decoded and "@" in decoded:
            method_pass, host_port = decoded.split("@", 1)
            if ":" in method_pass:
                method, password = method_pass.split(":", 1)
                if ":" in host_port:
                    host, port = host_port.rsplit(":", 1)
                    return {
                        "type": "ss",
                        "method": method,
                        "password": password,
                        "host": host,
                        "port": int(port),
                        "name": name
                    }
    except Exception:
        return None
    return None

def parse_telegram_proxy(line):
    try:
        if "t.me/proxy" not in line and "tg://proxy" not in line:
            return None
        
        if "t.me/proxy" in line:
            parsed = urlparse(line)
            params = parse_qs(parsed.query)
        else:
            parsed = urlparse(line.replace("tg://proxy", "http://x"))
            params = parse_qs(parsed.query)

        server = params.get('server', [None])[0]
        port = params.get('port', [None])[0]
        secret = params.get('secret', [None])[0]
        
        if not secret:
            secret = params.get('udp', [''])[0]

        if not server or not port:
            return None

        return {
            "type": "mtproto",
            "host": server,
            "port": int(port),
            "secret": secret,
            "name": "TG Proxy"
        }
    except Exception:
        return None

def parse_line(line):
    line = line.strip()
    if not line or line.startswith("#"):
        return None
    
    if line.startswith("vless://"): return parse_vless(line)
    elif line.startswith("trojan://"): return parse_trojan(line)
    elif line.startswith("vmess://"): return parse_vmess(line)
    elif line.startswith("ss://"): return parse_ss(line)
    elif "t.me/proxy" in line or "tg://proxy" in line: return parse_telegram_proxy(line)
    
    return None

# --- CHECKER LOGIC ---

async def check_tcp(session, host, port, timeout=2.5):
    try:
        start = time.time()
        reader, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port),
            timeout=timeout
        )
        writer.close()
        await writer.wait_closed()
        latency = (time.time() - start) * 1000
        return True, latency
    except Exception:
        return False, 9999

async def check_mtproto(session, host, port, secret, timeout=2.5):
    try:
        start = time.time()
        reader, writer = await asyncio.wait_for(
            asyncio.open_connection(host, port),
            timeout=timeout
        )
        writer.close()
        await writer.wait_closed()
        latency = (time.time() - start) * 1000
        return True, latency
    except Exception:
        return False, 9999

async def process_config(config, session, semaphore, results, stats):
    async with semaphore:
        host = config.get('host')
        port = config.get('port')
        p_type = config.get('type')
        
        if not host or not port:
            return

        dedup_key = f"{host}:{port}"
        if p_type == 'mtproto':
            dedup_key += f":{config.get('secret')}"
        elif p_type == 'vless':
            dedup_key += f":{config.get('uuid')}"
        elif p_type == 'trojan':
            dedup_key += f":{config.get('password')}"
            
        if dedup_key in stats['seen']:
            return
        stats['seen'].add(dedup_key)

        ip = extract_ip(host)
        cc, country_name = await get_geoip(ip, session)
        
        if cc == "XX":
            stats['rejected_xx'] += 1
            return

        successes = 0
        total_latency = 0
        
        if p_type == 'mtproto':
            for _ in range(2):
                ok, lat = await check_mtproto(session, host, port, config.get('secret'))
                if ok:
                    successes += 1
                    total_latency += lat
        else:
            for _ in range(2):
                ok, lat = await check_tcp(session, host, port)
                if ok:
                    successes += 1
                    total_latency += lat

        avg_latency = total_latency / successes if successes > 0 else 9999

        status = "DEAD"
        if successes == 2:
            status = "GOOD"
            stats['good'] += 1
        elif successes == 1:
            status = "UNSTABLE"
            stats['unstable'] += 1
        else:
            stats['dead'] += 1
            return

        emoji = "".join([chr(ord(c) + 127397) for c in cc])
        final_name = f"{emoji} {country_name} | StintikVPN"
        
        config['name'] = final_name
        config['status'] = status
        config['latency'] = int(avg_latency)
        config['cc'] = cc

        results.append(config)

async def fetch_urls(file_path):
    if not os.path.exists(file_path):
        print(f"File {file_path} not found!")
        return {}
    
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    raw_lines = content.split('\n')
    section_map = {
        "BLACK": "black",
        "BLACK MOBILE": "black_mobile",
        "WHITE": "white_all",
        "WHITE SNI": "white_sni",
        "WHITE CIDR": "white_cidr",
        "TELEGRAM": "telegram"
    }
    
    current_cat = "black"
    collected = {k: [] for k in section_map.values()}
    
    for line in raw_lines:
        line = line.strip()
        if not line: continue
        
        header_match = re.match(r'#\s*(BLACK MOBILE|BLACK|WHITE SNI|WHITE CIDR|WHITE|TELEGRAM)', line, re.IGNORECASE)
        if header_match:
            key = header_match.group(1).upper()
            current_cat = section_map.get(key, "black")
            continue
            
        if line.startswith("#"): continue
        
        collected[current_cat].append(line)
        
    return collected

async def main():
    print("🚀 Starting Optimized Checker...")
    print("📂 Reading URLS.txt...")
    
    categories = await fetch_urls("URLS.txt")
    
    all_configs = []
    
    for cat, lines in categories.items():
        limit = LIMITS.get(cat, 100)
        count = 0
        for line in lines:
            if count >= limit:
                break
            cfg = parse_line(line)
            if cfg:
                cfg['category'] = cat
                all_configs.append(cfg)
                count += 1
    
    print(f"✅ Parsed {len(all_configs)} configs. Starting checks...")
    
    results = []
    stats = {
        'seen': set(),
        'good': 0,
        'unstable': 0,
        'dead': 0,
        'rejected_xx': 0
    }
    
    semaphore = asyncio.Semaphore(100)
    
    async with aiohttp.ClientSession() as session:
        tasks = [process_config(cfg, session, semaphore, results, stats) for cfg in all_configs]
        await asyncio.gather(*tasks)
    
    print(f"\n📊 Results:")
    print(f"   GOOD: {stats['good']}")
    print(f"   UNSTABLE: {stats['unstable']}")
    print(f"   DEAD: {stats['dead']}")
    print(f"   REJECTED (XX/Invalid): {stats['rejected_xx']}")
    print(f"   DUPLICATES REMOVED: {len(stats['seen'])}")
    
    by_country = {}
    for cfg in results:
        cc = cfg.get('cc', 'XX')
        if cc not in by_country:
            by_country[cc] = []
        by_country[cc].append(cfg)
    
    for cc, items in by_country.items():
        fname = os.path.join(COUNTRIES_DIR, f"{cc}.txt")
        with open(fname, 'w') as f:
            for item in items:
                f.write(json.dumps(item) + "\n")
        print(f"💾 Saved {len(items)} to {fname}")

    # FIX: Convert 'seen' set to length for JSON serialization
    stats_json_safe = {
        "total_good": stats['good'],
        "total_unstable": stats['unstable'],
        "total_dead": stats['dead'],
        "rejected_xx": stats['rejected_xx'],
        "unique_checked": len(stats['seen'])
    }

    with open(RESULTS_FILE, 'w') as f:
        json.dump({"total_results": len(results), "statistics": stats_json_safe}, f, indent=2)
        
    print("✅ Done!")

if __name__ == "__main__":
    try:
        asyncio.run(main())
    except KeyboardInterrupt:
        print("\n⛔ Stopped by user.")
