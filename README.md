# 🚀 StintikVPN - Ultimate VPN Config Checker

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/igareck/stintikvpn?style=for-the-badge)
![GitHub forks](https://img.shields.io/github/forks/igareck/stintikvpn?style=for-the-badge)
![GitHub issues](https://img.shields.io/github/issues/igareck/stintikvpn?style=for-the-badge)
![License](https://img.shields.io/github/license/igareck/stintikvpn?style=for-the-badge)

**Advanced Multi-Protocol VPN Configuration Checker with GeoIP Intelligence**

[Features](#-features) • [Quick Start](#-quick-start) • [Protocols](#-protocols) • [API](#-api) • [FAQ](#-faq)

</div>

---

## 🌟 Features

### 🔥 Core Capabilities

- **Multi-Protocol Support**: VLESS, VMess, Trojan, Shadowsocks, Telegram Proxy
- **Smart GeoIP Detection**: 30-day cache with 3 API providers (ip-api.com, ipwhois.app, ipapi.co)
- **Health Score System**: Dynamic server scoring (0-100) based on performance history
- **Smart Migration Map**: Automatic country migration suggestions for blocked regions
- **High Performance**: 800 concurrent threads with smart retry logic
- **Reputation Database**: Tracks failed servers to avoid repeated checks

### 🌍 Blocked Countries Detection

Automatic detection and migration suggestions for:
- 🇷🇺 Russia → Finland, Estonia, Latvia, Lithuania, Poland
- 🇨🇳 China → Hong Kong, Taiwan, Japan, Korea, Singapore
- 🇮🇷 Iran → Turkey, UAE, Germany, Netherlands, France
- 🇧🇾 Belarus → Poland, Lithuania, Latvia, Germany

### ⚡ Performance Optimizations

- **Connection Retry**: Exponential backoff for unstable networks
- **Adaptive Timeouts**: Optimized for transatlantic connections (US → RU/CIS)
- **Multi-API GeoIP**: Fallback chain ensures maximum availability
- **Smart Caching**: 30-day GeoIP cache reduces API calls by 95%

---

## 🚀 Quick Start

### Installation

```bash
git clone https://github.com/igareck/stintikvpn.git
cd stintikvpn
pip install -r requirements.txt
```

### Usage

```bash
# Run main VPN checker
python main.py

# Run Telegram proxy checker (separate)
python tg_proxy_checker.py
```

### Output Structure

```
checked/
├── black/
│   ├── black.txt           # 2500 working blacklisted servers
│   └── black.mobile.txt    # 50 best mobile-optimized
├── white/
│   ├── white.all.txt       # 100 clean servers
│   ├── white.sni.txt       # 100 SNI whitelisted
│   └── white.cidr.txt      # 100 CIDR whitelisted
├── protocols/
│   ├── vless.txt           # 150 VLESS configs
│   ├── vmess.txt           # 150 VMess configs
│   ├── trojan.txt          # 150 Trojan configs
│   └── ss.txt              # 150 Shadowsocks configs
├── countries/              # Servers grouped by country
│   ├── RU.txt              # Russia servers
│   ├── US.txt              # USA servers
│   ├── DE.txt              # Germany servers
│   └── ...                 # Other countries
├── live_stats.json         # Real-time statistics
├── geoip_cache.json        # 30-day GeoIP cache
├── health_scores.json      # Server health scores
└── migration_map.json      # Country migration suggestions

checked_tg/
├── tg_proxy.txt            # 500 Telegram proxies
└── tg_mobile.txt           # 100 mobile-optimized
```

---

## 📋 Protocols

### VLESS (Recommended)
- **Best for**: High-speed streaming, gaming
- **Encryption**: TLS 1.3 with Reality support
- **Evasion**: Excellent censorship resistance
- **File**: `protocols/vless.txt`

### VMess
- **Best for**: General browsing, social media
- **Encryption**: AES-256-GCM
- **Evasion**: Good obfuscation capabilities
- **File**: `protocols/vmess.txt`

### Trojan
- **Best for**: HTTPS camouflage, corporate networks
- **Encryption**: TLS with domain fronting
- **Evasion**: Looks like regular HTTPS traffic
- **File**: `protocols/trojan.txt`

### Shadowsocks (SS)
- **Best for**: Legacy clients, low-resource devices
- **Encryption**: ChaCha20-Poly1305, AES-256-GCM
- **Evasion**: Basic obfuscation
- **File**: `protocols/ss.txt`

### Telegram Proxy (MTProto)
- **Best for**: Telegram access in restricted regions
- **Type**: Separate checker (`tg_proxy_checker.py`)
- **Files**: `checked_tg/tg_proxy.txt`, `checked_tg/tg_mobile.txt`

---

## 📊 Live Statistics

Real-time statistics available in `checked/live_stats.json`:

```json
{
  "last_update": "2024-01-15 14:30:45",
  "total_alive": 3847,
  "total_dead": 12153,
  "duration_sec": 68.42,
  "categories": {
    "black": 2500,
    "black_mobile": 50,
    "white_all": 100,
    "white_sni": 100,
    "white_cidr": 100
  },
  "protocols": {
    "vless": 150,
    "vmess": 150,
    "trojan": 150,
    "ss": 150
  },
  "top_sources": [
    {"url": "BLACK_SS+All_RUS_base64", "count": 847},
    {"url": "BLACK_VLESS_RUS_base64", "count": 623}
  ]
}
```

---

## 🔧 Configuration

### Environment Variables

```bash
export TG_BOT_TOKEN="your_bot_token"
export TG_CHAT_ID="your_chat_id"
```

### Custom Limits

Edit `LIMITS` dictionary in `main.py`:

```python
LIMITS = {
    "black": 2500,        # Black list servers
    "black_mobile": 50,   # Mobile-optimized (subset of black)
    "white_all": 100,     # Clean servers
    "white_sni": 100,     # SNI whitelisted
    "white_cidr": 100,    # CIDR whitelisted
    "protocols": 150,     # Per protocol limit
}
```

### Thread Count

Adjust based on your system:

```python
THREADS = 800  # Recommended for GitHub Actions
```

---

## 🌐 GeoIP System

### Architecture

```
Server IP → Check Cache (30 days)
    ↓ (miss)
    → ip-api.com (primary)
    ↓ (fail)
    → ipwhois.app (secondary)
    ↓ (fail)
    → ipapi.co (tertiary)
    ↓ (all fail)
    → Heuristic detection (IP prefixes, domain names)
```

### Cache Format

```json
{
  "185.143.220.1": {
    "code": "RU",
    "name": "Russia",
    "timestamp": 1705320645.123
  }
}
```

### Supported Regions

- **RU/CIS**: Russia, Belarus, Kazakhstan, Ukraine, Uzbekistan, etc.
- **EU**: Netherlands, Germany, Finland, UK, France, etc.
- **ASIA**: Turkey, UAE, Singapore, Japan, Korea, etc.
- **Blocked**: China, Iran, North Korea (with migration suggestions)

---

## 🏆 Health Score System

Each server receives a dynamic score (0-100):

- **+0**: Successful connection (minor decay)
- **-15**: Failed connection
- **Reset**: Success resets failure counter
- **Threshold**: Servers with score < 20 are deprioritized

Formula:
```
score = max(0, previous_score - penalty)
avg_ping = weighted_average(all_successful_pings)
```

---

## 🔄 Smart Migration

When a country is detected as blocked:

1. **Detection**: Country code matched against BLOCKED_COUNTRIES
2. **Suggestion**: Primary alternative country recommended
3. **Alternatives**: List of 3-5 backup countries
4. **Timestamp**: Suggestion cached for 24 hours

Example:
```json
{
  "RU": {
    "suggested": "FI",
    "alternatives": ["EE", "LV", "LT", "PL"],
    "timestamp": 1705320645
  }
}
```

---

## 📱 Telegram Integration

Enable automated reports:

```python
TG_BOT_TOKEN = "YOUR_BOT_TOKEN"
TG_CHAT_ID = "-100XXXXXXXXXXXXX"
```

Report format:
```
🚀 StintikVPN Checker Report

✅ Живых: 3847
❌ Мертвых: 12153
⏱ Время работы: 68.4 сек

Лимиты соблюдены:
├ black: 2500/2500
├ black_mobile: 50/50
├ white_all: 100/100

🏆 Топ источников:
├ BLACK_SS+All_RUS_base64: 847
├ BLACK_VLESS_RUS_base64: 623
```

---

## ❓ FAQ

### Why are some servers marked as dead?
Servers fail if they don't respond within timeout (5s connect + 3 retries). This is normal for free configs.

### How often should I run the checker?
Recommended: Every 30-60 minutes on GitHub Actions for fresh configs.

### Can I use this on my own server?
Yes! The checker works on any Linux/Windows/Mac system with Python 3.8+.

### Why separate TG proxy checker?
Telegram proxies use MTProto protocol, requiring different parsing and validation logic.

### How does the 30-day cache work?
GeoIP data is stored locally with timestamps. Entries older than 30 days are automatically refreshed.

### What if all GeoIP APIs fail?
Fallback heuristics analyze IP prefixes and server names to estimate country.

---

## 📄 License

MIT License - feel free to use, modify, and distribute.

---

<div align="center">

**Made with ❤️ for unrestricted internet access**

[Report Issue](https://github.com/igareck/stintikvpn/issues) • [Request Feature](https://github.com/igareck/stintikvpn/issues)

</div>
