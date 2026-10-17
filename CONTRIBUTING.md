# Contributing to StintikVPN

Thanks for your interest! 🚀

## How to help

- ⭐ Star the repo — it's free and helps a lot.
- 🐛 Found a dead link or a bug? [Open an issue](https://github.com/Stintik-123/StintikVPN/issues/new/choose) using the Bug template.
- 📡 Know a good free subscription or proxy? Open an issue with the "New subscription" template.
- 🌍 Translations and README improvements are welcome via pull requests.

## Project structure

```
├── docs/            # GitHub Pages site (index.html, script.js, style.css, data.json)
│   └── data.json   # single source of truth: subscriptions + TG proxies + updated date
├── README.md       # Russian (main)
├── README_EN.md    # English
├── README_CN.md    # Chinese
├── README_IR.md    # Persian
├── LICENSE         # MIT
└── .github/
    ├── ISSUE_TEMPLATE/
    └── workflows/  # mirror.yml, check-links.yml
```

## Rules

1. **Subscription links live in `docs/data.json` and in the README blocks.** If you change a link, update `docs/data.json` first, then the READMEs (all 4 languages) so they stay in sync.
2. Don't add paid or cracked services — free and public only.
3. Keep the site dependency-free (plain HTML/CSS/JS).
4. One PR = one logical change. Keep diffs small and reviewable.
5. For site changes: `docs/` only. Don't touch other files unless needed.

## Link health

Subscription links are checked automatically every day by `.github/workflows/check-links.yml`. If a link dies, an issue is created automatically — that's the signal to find a replacement.
