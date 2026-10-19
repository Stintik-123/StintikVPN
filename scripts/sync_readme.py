#!/usr/bin/env python3
"""Синхронизирует разделы со ссылками в README с единым источником данных.

Источник правды — docs/data.json. Разделы README между маркерами
<!-- SUBS:START --> / <!-- SUBS:END --> и <!-- PROXIES:START --> / <!-- PROXIES:END -->
генерируются из этого файла, чтобы ссылки не расходились между сайтом и README.

    python3 scripts/sync_readme.py           # обновить README
    python3 scripts/sync_readme.py --check   # проверить (код 1, если нужна синхронизация)
"""

from __future__ import annotations

import argparse
import json
import pathlib
import re
import sys

ROOT = pathlib.Path(__file__).resolve().parent.parent
DATA_FILE = ROOT / "docs" / "data.json"

# README -> язык разметки
TARGETS = {
    "README.md": "ru",
    "README_EN.md": "en",
    "README_CN.md": "cn",
    "README_IR.md": "ir",
}

LABELS = {
    "ru": {
        "sub_table": ("Подписка", "Ссылка"),
        "proxy_table": ("Прокси", "Ссылка"),
        "updated": "Обновлено",
        "subs": {
            "black-main": "Чёрные списки (основной)",
            "black-mobile": "Black Mobile (для телефонов)",
            "white-main": "Белые списки (основные)",
            "white-cidr": "Белые списки (CIDR)",
            "white-sni": "Белые списки (SNI)",
        },
    },
    "en": {
        "sub_table": ("Subscription", "Link"),
        "proxy_table": ("Proxy", "Link"),
        "updated": "Updated",
        "subs": {
            "black-main": "Black list (main)",
            "black-mobile": "Black Mobile (phones)",
            "white-main": "White lists (main)",
            "white-cidr": "White lists (CIDR)",
            "white-sni": "White lists (SNI)",
        },
    },
    "cn": {
        "sub_table": ("订阅", "链接"),
        "proxy_table": ("代理", "链接"),
        "updated": "更新于",
        "subs": {
            "black-main": "黑名单（主）",
            "black-mobile": "Black Mobile（手机）",
            "white-main": "白名单（主）",
            "white-cidr": "白名单（CIDR）",
            "white-sni": "白名单（SNI）",
        },
    },
    "ir": {
        "sub_table": ("اشتراک", "لینک"),
        "proxy_table": ("پروکسی", "لینک"),
        "updated": "آخرین به‌روزرسانی",
        "subs": {
            "black-main": "فهرست سیاه (اصلی)",
            "black-mobile": "Black Mobile (موبایل)",
            "white-main": "فهرست سفید (اصلی)",
            "white-cidr": "فهرست سفید (CIDR)",
            "white-sni": "فهرست سفید (SNI)",
        },
    },
}


def build_table(header: tuple[str, str], rows: list[tuple[str, str]]) -> str:
    out = [f"| {header[0]} | {header[1]} |", "|:-------|:-----------------|"]
    out += [f"| {name} | `{url}` |" for name, url in rows]
    return "\n".join(out)


def build_subs(data: dict, lang: str) -> str:
    labels = LABELS[lang]
    rows = []
    for sub in data.get("subscriptions", []):
        name = labels["subs"].get(sub.get("id", ""), sub.get("title", ""))
        rows.append((name, sub["url"]))
    return build_table(labels["sub_table"], rows)


def build_proxies(data: dict, lang: str) -> str:
    labels = LABELS[lang]
    rows = [(p["addr"], p["url"]) for p in data.get("proxies", [])]
    updated = data.get("updated", "")
    stamp = f"{labels['updated']}: {updated}" if updated else ""
    return "\n\n".join([stamp, build_table(labels["proxy_table"], rows)])


def replace_block(text: str, marker: str, content: str) -> str:
    pattern = re.compile(rf"(<!-- {marker}:START -->).*?(<!-- {marker}:END -->)", re.S)
    if not pattern.search(text):
        raise SystemExit(f"ОШИБКА: в README нет маркеров <!-- {marker}:START --> / <!-- {marker}:END -->")
    return pattern.sub(lambda m: f"{m.group(1)}\n\n{content}\n\n{m.group(2)}", text)


def main() -> int:
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--check", action="store_true", help="только проверить, ничего не записывать")
    args = parser.parse_args()

    data = json.loads(DATA_FILE.read_text(encoding="utf-8"))
    changed: list[str] = []

    for name, lang in TARGETS.items():
        path = ROOT / name
        if not path.exists():
            print(f"ПРОПУЩЕНО: {name} не найден")
            continue

        original = path.read_text(encoding="utf-8")
        updated = replace_block(original, "SUBS", build_subs(data, lang))
        updated = replace_block(updated, "PROXIES", build_proxies(data, lang))

        if updated == original:
            print(f"OK: {name} синхронизирован")
            continue

        changed.append(name)
        if args.check:
            print(f"РАСХОЖДЕНИЕ: {name} не совпадает с docs/data.json")
        else:
            path.write_text(updated, encoding="utf-8")
            print(f"ОБНОВЛЁН: {name}")

    if args.check and changed:
        print("\nЗапустите: python3 scripts/sync_readme.py")
        return 1
    return 0


if __name__ == "__main__":
    sys.exit(main())
