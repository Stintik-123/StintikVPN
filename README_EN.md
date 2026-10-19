<p align="center">
  <img src="https://raw.githubusercontent.com/Stintik-123/StintikVPN/main/images/IMG_20260716_095916_952.jpg" alt="StintikVPN" width="100%">
</p>

<p align="center">
  <a href="README.md">🇷🇺 Русский</a> ·
  <strong>🇬🇧 English</strong> ·
  <a href="README_CN.md">🇨🇳 中文</a> ·
  <a href="README_IR.md">🇮🇷 فارسی</a>
</p>

<p align="center">
  <a href="https://stintik-123.github.io/StintikVPN/"><img src="https://img.shields.io/badge/Site-GitHub%20Pages-0A0A0A?style=flat-square&logo=github" alt="Project site"></a>
  <a href="https://t.me/StintikVPN"><img src="https://img.shields.io/badge/Telegram-@StintikVPN-26A5E4?style=flat-square&logo=telegram" alt="Telegram channel"></a>
  <a href="https://github.com/Stintik-123/StintikVPN/actions/workflows/check-links.yml"><img src="https://github.com/Stintik-123/StintikVPN/actions/workflows/check-links.yml/badge.svg" alt="Link check"></a>
  <a href="https://github.com/Stintik-123/StintikVPN/blob/main/LICENSE"><img src="https://img.shields.io/github/license/Stintik-123/StintikVPN?style=flat-square&color=blue" alt="MIT license"></a>
  <img src="https://img.shields.io/github/last-commit/Stintik-123/StintikVPN?style=flat-square" alt="Last commit">
  <img src="https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square" alt="Stars">
  <img src="https://img.shields.io/github/forks/Stintik-123/StintikVPN?style=flat-square" alt="Forks">
</p>

# 🚀 StintikVPN — internet freedom is closer than it seems

**Free VPN subscriptions, Telegram proxies and guides for bypassing censorship.**
Copy a link → paste it into a client → you're online. No sign-up, no payment.

> [!WARNING]
> Configs are collected from public sources and their availability is **not
> guaranteed**. Don't transfer passwords or card details through them, and don't
> use them for banking or other critical services. See the
> [FAQ](#faq) for details.

---

## 📑 Contents

- [🚀 Quick start](#-quick-start)
- [📦 Subscriptions](#-subscriptions)
- [🤖 Telegram proxies](#-telegram-proxies)
- [📱 Clients](#-clients)
- [🏴 Black and white lists](#-black-and-white-lists)
- [📡 SNI and CIDR](#-sni-and-cidr)
- [🛠️ Protocols](#-protocols)
- [🛡️ Bypassing without a VPN](#-bypassing-without-a-vpn)
- [🧅 Tor bridges](#-tor-bridges)
- [🧰 Tools](#-tools)
- [🌀 WARP](#-warp)
- [🔗 Mirrors](#-mirrors)
- [❓ FAQ](#-faq)
- [🏗 How it works](#-how-it-works)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)
- [⭐ Support](#-support)

---

## 🚀 Quick start

1. Install a client from [Clients](#-clients) — **Hiddify** (Windows/Android) or
   **Streisand** (iPhone) are the easiest starting points.
2. Open [Subscriptions](#-subscriptions) and copy the link you need with the
   **Copy** button (the site also shows a QR code).
3. In your client choose "Add subscription" or "Import from clipboard".
4. Update the list → check the ping → pick a working node → connect.

If your regular connection works fine, use the **black lists**. If your ISP has
enabled "white lists", you need the **white lists**.

---

## 📦 Subscriptions

<!-- SUBS:START -->

| Subscription | Link |
|:-------|:-----------------|
| Black list (main) | `https://raw.githubusercontent.com/mahdibland/V2RayAggregator/master/sub/sub_merge.txt` |
| Black Mobile (phones) | `https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt` |
| White lists (main) | `https://gitverse.ru/api/repos/flaafix/AetrisVPN_white_list_lite/raw/branch/master/AetrisVPN.txt` |
| White lists (CIDR) | `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt` |
| White lists (SNI) | `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt` |

<!-- SUBS:END -->

---

## 🤖 Telegram proxies

<!-- PROXIES:START -->

Updated: 17.10.2026

| Proxy | Link |
|:-------|:-----------------|
| lumetra.mtproxy.zip | `https://t.me/proxy?server=lumetra.mtproxy.zip&port=443&secret=ee9af09f8b8dcfe282445cf1bc91854acb786170692e6f7a6f6e2e7275` |
| 85.192.34.18:9443 | `https://t.me/proxy?server=85.192.34.18&port=9443&secret=eef390d9757cb92d87826bcef28a6e75ed74676e6e2e6c697665` |
| proxy.tonservice.site | `https://t.me/proxy?server=proxy.tonservice.site&port=8443&secret=dd00000000000000000000000000000000` |
| 172.65.100.45:25565 | `https://t.me/proxy?server=172.65.100.45&port=25565&secret=ee1603010200010001fc030386e24c3add6d656469612e737465616d706f77657265642e636f6d` |
| cluster.mtproxy.cc | `https://t.me/proxy?server=cluster.mtproxy.cc&port=443&secret=ee499cbaa63a17e5071d5babf1ccba89f3636c75737465722e6d7470726f78792e6363` |

<!-- PROXIES:END -->

> Proxies are free, so they get blocked often. If one doesn't work, try another.

---

## 📱 Clients

| Device | Recommended | Alternative |
|:-------|:------------|:------------|
| **Windows** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayN](https://github.com/2dust/v2rayN/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android** | [Hiddify](https://play.google.com/store/apps/details?id=app.hiddify.com) | [v2rayNG](https://github.com/2dust/v2rayNG/releases) · [Happ](https://github.com/Happ-proxy/happ-android/releases) |
| **iPhone / iPad** | [Streisand](https://apps.apple.com/app/streisand/id6450534064) | [Happ](https://apps.apple.com/app/happ-proxy-utility/id6504287215) · [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **macOS** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Linux** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [Clash Verge](https://github.com/clash-verge-rev/clash-verge-rev/releases) · [Happ](https://github.com/Happ-proxy/happ-desktop/releases) |
| **Android TV** | [Hiddify](https://github.com/hiddify/hiddify-next/releases) | [v2rayNG](https://github.com/2dust/v2rayNG/releases) |

> **NekoRay and NekoBox are no longer maintained** and are not listed here.
> Use **Happ** instead.

---

## 🏴 Black and white lists

| Type | When to use |
|:-----|:------------|
| **Black** | Regular internet: home Wi-Fi, cable, 4G without hard blocking |
| **White** | Your ISP has enabled RKN "white lists" |

---

## 📡 SNI and CIDR

**SNI** and **CIDR** are not "filters" you can just swap around — they are
**two different ways of describing which traffic goes where**:

| | What it is | Example |
|:--|:-----------|:--------|
| **SNI** | Site name in TLS (a domain) | `youtube.com` |
| **CIDR** | Range of IP addresses | `173.194.0.0/16` |

Subscriptions marked SNI rely mostly on **domains**, those marked CIDR on
**IP ranges**. If the IP from a CIDR list is already cut by TSPU/DPI, switching
to "SNI" won't help with the same address: change the node, the subscription or
the way you bypass — don't treat SNI ↔ CIDR as a universal fix.

---

## 🛠️ Protocols

| Protocol | Note |
|:---------|:-----|
| **VLESS** | Often faster and more flexible, but in practice it hits blocking more often |
| **Trojan** | A universal everyday option |
| **VMess** | Usually more stable on old and finicky networks |
| **Shadowsocks** | Simple and often fast; for games check the ping of a specific node |

---

## 🛡️ Bypassing without a VPN

Sometimes censorship can be bypassed without a VPN at all.

### Zapret-discord-youtube (Windows)

1. Open the [Zapret-discord-youtube](https://github.com/Flowseal/zapret-discord-youtube) repository and download a release.
2. Unpack the archive and run `service.bat`.
3. Press 11 and choose "Run Tests", then select all `.bat` files for the check and tcp ping.
4. After the test the best bat file is shown — go back to the folder and run it.

### ByeByeDPI (Windows / Android)

1. Download the apk from the [ByeByeDPI](https://github.com/Valent-in/ByeByeDPI) repository.
2. Install the app and press "select".
3. After the test pick the line with the most matches (e.g. 5/60 is bad, 59/60 is good) and apply it.
4. Return to the main screen and press start.

### TG-WS-Proxy (local proxy for Telegram)

1. Download a build from [Flowseal/tg-ws-proxy](https://github.com/Flowseal/tg-ws-proxy).
2. Run `tgwsproxy.exe`.
3. Follow the instructions inside the app.

---

## 🧅 Tor bridges

For Tor Browser: **Settings → Bridges** → paste the lines from the list.

- Top 100: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_TOP100.txt`
- All: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_ALL.txt`
- Vanilla: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_VANILLA.txt`
- obfs4: `https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/main/TOR-BRIDGES/TOR_BRIDGES_OBFS4.txt`

---

## 🧰 Tools

| Tool | Why |
|:-----|:---|
| [Speedtest](https://www.speedtest.net/) | Speed check |
| [2ip](https://2ip.ru/) | IP and leak check |
| [Happ decoder](https://utils.docs.rw/cryptohapp) | Happ subscription decoder |
| [Clash converter](https://acl4ssr-sub.github.io/) | Subscription converter |

---

## 🌀 WARP

Cloudflare WARP configs are personal — generate your own and never share keys:
[WARP Generator](https://warp.llxi.pro/).

---

## 🔗 Mirrors

The repository is mirrored automatically after every push to `main`:

- [GitLab](https://gitlab.com/Stintik-123/StintikVPN)
- [Codeberg](https://codeberg.org/Stintik-123/StintikVPN)
- [GitVerse](https://gitverse.ru/Stintik-123/StintikHub)

If GitHub is unreachable, use a mirror — same history, same files.

---

## ❓ FAQ

<details>
<summary><strong>The subscription doesn't work / is very slow</strong></summary>

Subscriptions are free, so they may stop working when a lot of people use the
same nodes. Try another subscription or update the current one.
</details>

<details>
<summary><strong>How often are configs updated?</strong></summary>

Configs are updated daily by their authors. Links are checked automatically every
morning — if one is down, take another and report the dead one via
[an issue](https://github.com/Stintik-123/StintikVPN/issues/new?template=config_issue.yml).
</details>

<details>
<summary><strong>Why is StintikVPN free?</strong></summary>

It's an aggregator of free VPN subscriptions and proxies: the author spends
nothing and simply collects everything free available on the internet.
</details>

<details>
<summary><strong>The Telegram proxy doesn't connect</strong></summary>

Proxies are free, so they are often blocked by the RKN. They're updated when
possible — if one doesn't work, try another from the list.
</details>

<details>
<summary><strong>Which VPN client should I use if I'm not technical?</strong></summary>

**Hiddify** is the easiest option for Windows and Android. On iOS — **Streisand**
or **Happ**.
</details>

<details>
<summary><strong>Is any of this safe to use?</strong></summary>

Configs come from public sources and may not be safe. The main rule: don't pass
important data (passwords, etc.) through them and don't visit banking or other
critical services.
</details>

---

## 🏗 How it works

```
.
├── docs/                     # GitHub Pages site
│   ├── index.html            # markup: containers only, no hardcoded links
│   ├── style.css             # styles
│   ├── script.js             # logic: rendering, filters, QR, theme
│   └── data.json             # SINGLE SOURCE OF TRUTH: subscriptions and proxies
├── scripts/
│   └── sync_readme.py        # generates the link sections of the READMEs
├── .github/
│   ├── workflows/            # CI: link check, mirrors, README sync
│   ├── ISSUE_TEMPLATE/       # issue forms
│   └── PULL_REQUEST_TEMPLATE.md
├── README.md                 # русский
├── README_EN.md              # english
├── README_CN.md              # 中文
├── README_IR.md              # فارسی
├── CONTRIBUTING.md
├── CODE_OF_CONDUCT.md
├── SECURITY.md
└── LICENSE                   # MIT
```

**How it works:**

- `docs/data.json` is the single source of truth. Both the site and the READMEs
  read it — there are no hardcoded links in the code.
- The link sections of the READMEs are generated by `scripts/sync_readme.py` and
  refreshed by CI: edit `data.json` and the READMEs follow.
- CI checks every link daily and opens an issue labelled `dead-link` when one
  stops working.
- Every push to `main` is mirrored to GitLab, Codeberg and GitVerse.

Run the site locally:

```bash
cd docs
python3 -m http.server 8000
```

---

## 🤝 Contributing

Ideas and pull requests are welcome:

- 📘 [CONTRIBUTING.md](CONTRIBUTING.md) — how to contribute
- 🤝 [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) — code of conduct
- 🛡️ [SECURITY.md](SECURITY.md) — how to report a vulnerability
- 🐛 [Issue](https://github.com/Stintik-123/StintikVPN/issues/new/choose) — bugs,
  dead links and feature requests
- 💬 [Telegram channel](https://t.me/StintikVPN) — news and status updates

---

## 📄 License

[MIT](LICENSE) © StintikVPN. The subscriptions and proxies belong to their
authors, listed in `docs/data.json`.

---

## ⭐ Support

Give the repository a ⭐ — it's free and it helps the project a lot.

Development channel: [@StintikVPN](https://t.me/StintikVPN)

---

<p align="center"><em>StintikVPN — made by people for people</em></p>
