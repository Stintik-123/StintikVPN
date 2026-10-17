# Contributing to StintikVPN

## Структура проекта

```
.
├── docs/                  # Сайт (GitHub Pages)
│   ├── index.html         # разметка, списки рендерятся из data.json
│   ├── script.js          # вся логика сайта
│   ├── data.json          # ЕДИНЫЙ ИСТОЧНИК ДАННЫХ: подписки и прокси
│   └── style.css          # стили
├── .github/workflows/
│   └── check-links.yml    # CI: ежедневная проверка ссылок
├── README.md              # русский
├── README_EN.md           # english
├── README_CN.md           # 中文
├── README_IR.md           # فارسی
├── CONTRIBUTING.md
└── LICENSE                # MIT
```

## Правила

1. **Сначала `docs/data.json`.** Подписки и Telegram-прокси добавляются/обновляются только там — сайт читает этот файл автоматически.
2. **Потом README.** После изменения `data.json` синхронизируйте разделы «VPN‑подписки» и «Telegram‑прокси» (и дату) во всех четырёх README.
3. **Не дублируйте URL в HTML.** В `docs/index.html` не должно быть хардкода ссылок на подписки/прокси — только контейнеры `#sub-list` и `#proxy-list`, которые наполняет `script.js`.
4. **Пол `updated`** в `data.json` меняется при обновлении прокси. Не подделывайте дату в JS — она берётся из `data.json`.
5. **Ссылки проверяются CI** (`.github/workflows/check-links.yml`) ежедневно в 06:00 UTC. Если ссылка мёртвая — CI создаст issue с меткой `dead-link`. Отреагируйте: замените ссылку или удалите её.
6. Язык коммитов: conventional commits (`feat:`, `fix:`, `docs:`, `chore:`).

## Проверка перед PR

- `docs/data.json` — валидный JSON.
- Все URL из `data.json` открываются.
- Сайт (`docs/`) корректно рендерится локально.
