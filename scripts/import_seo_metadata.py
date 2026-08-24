#!/usr/bin/env python3
"""
Apply a client-supplied SEO spreadsheet (title / description / H1 / slug
renames) to the states and service_locations tables.

Usage (from project root):
    pip install -r scripts/requirements.txt
    cp .env.example .env          # edit if needed
    python scripts/import_seo_metadata.py --csv scripts/data/florida_seo.csv

Expected CSV columns (header names are matched case-insensitively, trimmed):
    Urls                    - live URL of the page being updated
    New Meta Title          - full literal <title> text to render
    New Meta Descrption     - full literal meta description text
    Urls Change             - new slug/path if the URL itself is being renamed (optional)
    h1                      - new on-page H1 text (location pages only, optional)

Rows for the state root (e.g. https://site.com/florida) update the `states`
table; rows one level deeper (https://site.com/florida/some-location) update
`service_locations`, matched by the CURRENT slug in the URL so a slug rename
in the same row still resolves correctly.

Safe to re-run: every update is a plain UPDATE keyed by state/location id.
"""

import argparse
import csv
import os
import sys
from pathlib import Path
from urllib.parse import urlparse

import psycopg2
from dotenv import load_dotenv

load_dotenv()

ROOT = Path(__file__).parent.parent


def normalize_key(key: str) -> str:
    return key.strip().lower()


def load_rows(csv_path: Path) -> list[dict]:
    with open(csv_path, newline="", encoding="utf-8-sig") as f:
        reader = csv.DictReader(f)
        rows = []
        for raw in reader:
            row = {normalize_key(k): (v or "").strip() for k, v in raw.items() if k}
            rows.append(row)
        return rows


def parse_url_path(url: str) -> list[str]:
    path = urlparse(url).path.strip("/")
    return [p for p in path.split("/") if p] if path else []


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--csv", required=True, help="Path to the SEO CSV export")
    parser.add_argument(
        "--dry-run", action="store_true", help="Print what would change without writing"
    )
    args = parser.parse_args()

    csv_path = Path(args.csv)
    if not csv_path.is_absolute():
        csv_path = ROOT / csv_path
    if not csv_path.exists():
        print(f"ERROR: CSV not found: {csv_path}", file=sys.stderr)
        sys.exit(1)

    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL not set. Copy .env.example to .env.", file=sys.stderr)
        sys.exit(1)

    rows = load_rows(csv_path)
    print(f"Loaded {len(rows)} rows from {csv_path.name}")

    conn = psycopg2.connect(db_url)
    conn.autocommit = False
    cur = conn.cursor()

    updated_states = 0
    updated_locations = 0
    renamed = []
    not_found = []

    for row in rows:
        url = row.get("urls", "")
        seo_title = row.get("new meta title") or None
        meta_description = row.get("new meta descrption") or row.get("new meta description") or None
        url_change = row.get("urls change") or None
        h1 = row.get("h1") or None

        parts = parse_url_path(url)
        if not parts:
            print(f"  SKIP (no path): {url!r}")
            continue

        state_slug = parts[0]

        if len(parts) == 1:
            # State root page
            cur.execute(
                """
                UPDATE states
                SET seo_title = %s, meta_description = %s, updated_at = NOW()
                WHERE slug = %s
                RETURNING id
                """,
                (seo_title, meta_description, state_slug),
            )
            if cur.fetchone():
                updated_states += 1
            else:
                not_found.append(url)
            continue

        location_slug = parts[1]

        cur.execute(
            """
            SELECT sl.id FROM service_locations sl
            JOIN states s ON s.id = sl.state_id
            WHERE s.slug = %s AND sl.slug = %s
            """,
            (state_slug, location_slug),
        )
        result = cur.fetchone()
        if not result:
            not_found.append(url)
            continue
        location_id = result[0]

        new_slug = location_slug
        if url_change:
            # "Urls Change" may be a full path ("/florida/new-slug") or a
            # bare relative path ("florida/new-slug") — take the last segment.
            new_slug = url_change.strip("/").split("/")[-1]

        cur.execute(
            """
            UPDATE service_locations
            SET seo_title = %s, meta_description = %s, h1_override = %s,
                slug = %s, updated_at = NOW()
            WHERE id = %s
            """,
            (seo_title, meta_description, h1, new_slug, location_id),
        )
        updated_locations += 1
        if new_slug != location_slug:
            renamed.append((f"/{state_slug}/{location_slug}", f"/{state_slug}/{new_slug}"))

    if args.dry_run:
        conn.rollback()
        print("\nDRY RUN — no changes written.")
    else:
        conn.commit()

    cur.close()
    conn.close()

    print(f"\nStates updated:    {updated_states}")
    print(f"Locations updated: {updated_locations}")

    if renamed:
        print(f"\nSlug renames ({len(renamed)}) — add 301 redirects for these in next.config.ts:")
        for old, new in renamed:
            print(f"  {old}  ->  {new}")

    if not_found:
        print(f"\nWARNING: {len(not_found)} URL(s) had no matching row in the database:")
        for url in not_found:
            print(f"  {url}")


if __name__ == "__main__":
    main()
