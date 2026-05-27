# 🚀 StintikVPN — 自由互联网其实比你想象的更近

<div align="center">

[🇷🇺 Русский](README.md) | [🇬🇧 English](ReadMe_EN.md) | **🇨🇳 中文** | [🇮🇷 فارسی](ReadMe_IR.md)

</div>

**StintikVPN** 是一个收集优质免费 VPN 订阅的项目。  
无需复杂设置 — 只需复制链接，导入到 VPN 客户端即可使用。

[![GitHub stars](https://img.shields.io/github/stars/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/network/members)
[![GitHub watchers](https://img.shields.io/github/watchers/Stintik-123/StintikVPN?style=flat-square)](https://github.com/Stintik-123/StintikVPN/watchers)

---

## 📑 导航

- [🚀 如何使用](#-如何使用)
- [📱 推荐 VPN 客户端](#-推荐-vpn-客户端)
- [🏴 黑名单与白名单](#-黑名单与白名单--什么时候使用)
- [📡 关于 SNI 与 CIDR 白名单](#-关于-sni-与-cidr-白名单)
- [🛠️ 协议介绍](#️-协议介绍)
- [📦 VPN 订阅](#-vpn-订阅)
- [🤖 Telegram 代理](#-telegram-代理-mtproto--socks5)
- [🔗 项目镜像](#-项目镜像)
- [❓ 常见问题 FAQ](#-常见问题-faq)
- [⚠️ 重要提示](#️-重要提示)
- [💰 支持项目](#-支持项目)

---

## 🚀 如何使用

1. 复制下方任意订阅链接。
2. 在 VPN 客户端中选择：
   - “添加订阅”
   - 或 “从剪贴板导入”
3. 点击 “Ping” → 选择可用服务器 → 连接。

---

## 📱 推荐 VPN 客户端

| 设备 | 客户端 | 下载 |
|:--|:--|:--|
| **Windows** | Hiddify / v2rayN | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [v2rayN](https://github.com/2dust/v2rayN/releases) |
| **Android** | Incy / NekoBox | [Incy](https://play.google.com/store/apps/details?id=com.glarimy.incy) / [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **Android TV** | NekoBox TV版 | [NekoBox](https://github.com/MatsuriDayo/NekoBoxForAndroid/releases) |
| **iOS / iPadOS** | Streisand / V2Box | [Streisand](https://apps.apple.com/app/streisand/id6450534064) / [V2Box](https://apps.apple.com/app/v2box/id6443654552) |
| **Linux** | Hiddify / NekoRay | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [NekoRay](https://github.com/MatsuriDayo/nekoray/releases) |
| **macOS** | Hiddify / Streisand | [Hiddify](https://github.com/hiddify/hiddify-next/releases) / [Streisand](https://apps.apple.com/app/streisand/id6450534064) |

---

## 🏴 黑名单与白名单 — 什么时候使用

- **🏴 黑名单** — 适用于普通网络环境（家庭 Wi-Fi、宽带、普通移动网络）。
- **🏳️ 白名单** — 适用于严格网络限制环境。

---

## 📡 关于 SNI 与 CIDR 白名单

- **White SNI** — 使用域名过滤流量（例如：youtube.com）。
- **White CIDR** — 使用 IP 地址段过滤流量（例如：173.194.0.0/16）。

**简单来说：**  
如果 SNI 无法使用，请尝试 CIDR。  
如果 CIDR 无法使用，请尝试 SNI。

---

## 🛠️ 协议介绍

- **VLESS** — 速度和伪装效果最佳，但近期稳定性较差。
- **Trojan** — 很好的伪装与稳定性。
- **VMess** — 最稳定的协议之一。
- **Shadowsocks** — 速度最快（推荐用于在线游戏）。

---

## 📦 VPN 订阅

### 🏴 黑名单（主）
https://gitverse.ru/api/repos/flaafix/AetrisVPN_Black_list/raw/branch/master/configs.txt

### 🏴 黑名单（备用）
https://vpn.akres.fun/all

### 👑 Black Mobile（20 个适合手机的最佳服务器）
https://gitverse.ru/api/repos/ru-wbl/wl/raw/branch/master/KvRuVPN/KvRuVPN.txt

### 🏳️ 白名单（主）
https://gitverse.ru/api/repos/flaafix/AetrisVPN/raw/branch/master/AetrisVPN.txt

### 🏳️ 白名单（CIDR）
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-CIDR-RU-checked.txt

### 🏳️ 白名单（SNI）
https://raw.githubusercontent.com/igareck/vpn-configs-for-russia/refs/heads/main/WHITE-SNI-RU-all.txt

---

## 🛠️ 按协议分类

- **VLESS**: https://mifa.world/vless
- **VMess**: https://mifa.world/vmess
- **Trojan**: https://mifa.world/trojan
- **Shadowsocks**: https://mifa.world/ss

---

## 🤖 Telegram 代理 (MTProto + SOCKS5)

> 最后更新：**27.05.2026**

**复制下方链接即可直接连接 Telegram**

### 1. SOCKS5
`84.201.182.112:1080`

- https://t.me/socks?server=84.201.182.112&port=1080&user=86XFhWe7j9&pass=e4GwQtyVaZ

### 2. MTProto
`46.243.235.29:853`

- https://t.me/proxy?server=46.243.235.29&port=853&secret=ee534adcf23a16f425cbae129c4cb574cb6164732e78352e7275

### 3. MTProto
`?`

- https://t.me/proxy?server=de4.kael.fuckrkn.net&port=443&secret=ee1a499af9a7a18282da82e30714402e157777772e6165726f666c6f742e7275

### 4. MTProto
`mtp1.sosproxy.space:443`

- https://t.me/proxy?server=mtp1.sosproxy.space&port=443&secret=ee806bfea72377dacb92438b5f330856b464726976652e676f6f676c652e636f6d

### 5. MTProto
`adsl.myrka.digital:443`

- https://t.me/proxy?server=adsl.myrka.digital&port=443&secret=ee6e2443fe7f5904ff5ceded8d76f02ea268312e6d79726b612e6469676974616c

### 6. MTProto
`95.163.176.204:2083`

- https://t.me/proxy?server=95.163.176.204&port=2083&secret=ee93143b0fadcd4c8a99164fd3e819987f636f666665652e73616d6172617765622e74656368

### 7. MTProto
`89.169.32.31:2083`

- https://t.me/proxy?server=89.169.32.31&port=2083&secret=eea2b102b138450e1e33e7dc460ad967e8636f666665652e73616d6172617765622e74656368

---

## 🔗 项目镜像

- **GitLab**: https://gitlab.com/Stintik-123/StintikVPN

---

## ❓ 常见问题 FAQ

### 1. 订阅无法使用或速度很慢
请在客户端中刷新订阅，尝试更换服务器或协议。

### 2. 配置多久更新一次？
配置由原作者每日更新。

### 3. 什么时候需要使用白名单？
当普通网络无法正常访问时使用。

### 4. 新手推荐哪个客户端？
推荐使用 **Hiddify**。

### 5. Telegram 代理失效怎么办？
代理经常失效，请尝试列表中的其他代理。

### 6. 一个订阅可以多设备使用吗？
通常可以，具体取决于服务器。

### 7. 是否安全？
配置来自公开来源，请不要通过公共节点传输敏感信息。

---

## ⚠️ 重要提示

所有配置均来自公开来源，无法保证 **100% 可用**。  
禁止用于非法用途，项目作者不对您的行为负责。

---

## 💰 支持项目

维护和更新 StintikVPN 需要大量时间与精力。  
如果您愿意支持项目，可以进行捐赠，或者给仓库点一个 ⭐ Star。

**银行卡:** `79960694715` (Ozon Bank)

---

*StintikVPN — 由人们打造，为人们服务*
