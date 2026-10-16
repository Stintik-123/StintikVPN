# StintikVPN

<p align="center">
  <a href="README.md">RU</a> ·
  <b>EN</b>
</p>

<p align="center">
  <a href="https://stintik-123.github.io/StintikVPN/"><img src="https://img.shields.io/badge/Site-GitHub%20Pages-111111?style=flat-square&logo=github" alt="Site"></a>
  <a href="https://t.me/StintikVPN"><img src="https://img.shields.io/badge/Telegram-@StintikVPN-26A5E4?style=flat-square&logo=telegram" alt="Telegram"></a>
  <img src="https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square" alt="Stars">
</p>

**StintikVPN** is a short list of free public VPN subscription links for popular clients.  
Not a hosted VPN service — an aggregator of open sources. Uptime is not guaranteed.

**Updated:** 2026-10-16

---

## Quick start

1. Install a client (table below).
2. Copy **one** subscription URL.
3. In the app: Add subscription / Import from clipboard.
4. Refresh → Ping → pick a live node → connect.

---

## Clients

| Platform | Preferred | Also fine |
|:---------|:----------|:----------|
| **Windows** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayN](https://github.com/2dust/v2rayN/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android** | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) | [Happ](https://github.com/Happ-proxy/happ-android/releases) · [v2rayNG](https://github.com/2dust/v2rayNG/releases) |
| **iOS** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [Happ](https://apps.apple.com/app/happ-proxy-utility/id6504287215) |
| **macOS** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |
| **Linux** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) |

Not sure which to pick: **Hiddify** (Windows/Android) or **Streisand** (iOS).

---

## Subscription modes

| Mode | When |
|:-----|:-----|
| **Blacklist routing** | Normal home / mobile internet |
| **Whitelist routing** | ISP allows only a small set of destinations |

SNI vs CIDR are different ways to describe routes. If one list fails, try another subscription — not endless toggling of labels.

---

## Subscriptions

Links that returned HTTP 200 when this file was updated.

### Blacklist

```
https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt
```

```
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt
```

### Whitelist

```
https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt
```

```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt
```

```
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt
```

Free nodes die often. Switch URL or refresh the subscription in the client.

---

## Telegram proxies

Open in Telegram. If one fails, try the next.

1. https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363  
2. https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000  
3. https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665  

---

## Without a full VPN

Local DPI workarounds (see upstream docs):

- [ByeDPI](https://github.com/dovecoteescape/byedpi)  
- zapret-based Windows builds  
- [tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy)  

---

## Tor bridges

[Tor Browser](https://www.torproject.org/download/) → Settings → Bridges → paste:

- [Top 100](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt)  
- [All](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt)  
- [obfs4](https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt)  

---

## Mirrors

- [Site](https://stintik-123.github.io/StintikVPN/)  
- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)  
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)  

Backup of the previous full tree: branch [`backup/pre-overhaul-2026-10-16`](https://github.com/Stintik-123/StintikVPN/tree/backup/pre-overhaul-2026-10-16).

---

## Safety

Public configs are **not** for banking or sensitive accounts.  
Do not use for illegal activity. No warranty.

---

## Support

Star the repo. Channel: [@StintikVPN](https://t.me/StintikVPN)

<p align="center"><em>StintikVPN — one place, less noise</em></p>
