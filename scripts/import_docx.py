#!/usr/bin/env python3
"""
Parse United_states_data.docx + aameeting_newcontent.docx and load into PostgreSQL.

Usage (from project root):
    pip install -r scripts/requirements.txt
    cp .env.example .env          # edit if needed
    python scripts/import_docx.py

Safe to re-run: uses ON CONFLICT upsert so re-running updates existing rows.
"""

import hashlib
import json
import os
import re
import sys
from pathlib import Path

import psycopg2
from dotenv import load_dotenv

try:
    import docx
except ImportError:
    print("Missing dependency: pip install -r scripts/requirements.txt", file=sys.stderr)
    sys.exit(1)

load_dotenv()

# ---------------------------------------------------------------------------
# Paths
# ---------------------------------------------------------------------------
ROOT = Path(__file__).parent.parent
DIRECTORY_DOCX = ROOT / "United_states_data.docx"
CONTENT_DOCX = ROOT / "aameeting_newcontent.docx"

# ---------------------------------------------------------------------------
# State reference data
# ---------------------------------------------------------------------------
KNOWN_STATES = {
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado",
    "Connecticut", "Delaware", "District of Columbia", "Florida", "Georgia",
    "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota",
    "Mississippi", "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire",
    "New Jersey", "New Mexico", "New York", "North Carolina", "North Dakota",
    "Ohio", "Oklahoma", "Oregon", "Pennsylvania", "Puerto Rico", "Rhode Island",
    "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virgin Islands", "Virginia", "Washington", "West Virginia", "Wisconsin",
    "Wyoming",
}

STATE_ABBREVS = {
    "Alabama": "AL", "Alaska": "AK", "Arizona": "AZ", "Arkansas": "AR",
    "California": "CA", "Colorado": "CO", "Connecticut": "CT", "Delaware": "DE",
    "District of Columbia": "DC", "Florida": "FL", "Georgia": "GA", "Hawaii": "HI",
    "Idaho": "ID", "Illinois": "IL", "Indiana": "IN", "Iowa": "IA", "Kansas": "KS",
    "Kentucky": "KY", "Louisiana": "LA", "Maine": "ME", "Maryland": "MD",
    "Massachusetts": "MA", "Michigan": "MI", "Minnesota": "MN", "Mississippi": "MS",
    "Missouri": "MO", "Montana": "MT", "Nebraska": "NE", "Nevada": "NV",
    "New Hampshire": "NH", "New Jersey": "NJ", "New Mexico": "NM", "New York": "NY",
    "North Carolina": "NC", "North Dakota": "ND", "Ohio": "OH", "Oklahoma": "OK",
    "Oregon": "OR", "Pennsylvania": "PA", "Puerto Rico": "PR", "Rhode Island": "RI",
    "South Carolina": "SC", "South Dakota": "SD", "Tennessee": "TN", "Texas": "TX",
    "Utah": "UT", "Vermont": "VT", "Virgin Islands": "VI", "Virginia": "VA",
    "Washington": "WA", "West Virginia": "WV", "Wisconsin": "WI", "Wyoming": "WY",
}

# City line regex: "City Name, State Name"
# Sort multi-word states first so regex matches longest first
_state_alt = "|".join(re.escape(s) for s in sorted(KNOWN_STATES, key=len, reverse=True))
CITY_LINE_RE = re.compile(r"^(.+?)\s*,\s*(" + _state_alt + r")\s*$")

# ---------------------------------------------------------------------------
# Contact label parsing
# ---------------------------------------------------------------------------
# Ordered longest-first so "24 Hr Answering Svc" beats "24 Hr" etc.
CONTACT_LABELS = [
    "24 Hr Answering Svc",
    "24 Hr Toll Free",
    "24 Hr Hotline",
    "24 Hr Phone",
    "24 Hr",
    "Toll Free hotline",
    "Toll Free",
    "Spanish Hotline",
    "Local hotline",
    "Answering Service",
    "Service Office",
    "Group Phone",
    "Phone/FAX",
    "Helpline",
    "Hotline",
    "Business",
    "Main",
    "Cell",
    "FAX",
    "TDD",
    "TTY",
]
_label_alt = "|".join(re.escape(l) for l in CONTACT_LABELS)
DETAIL_SPLIT_RE = re.compile(r"(" + _label_alt + r"):\s*")

# Matches any non-whitespace token after "Site:" — bare domains like "d9area2ak.org" included
SITE_RE = re.compile(r"Site:\s*[\xa0 ]*(\S+)", re.I)

# Phone numbers that appear without a label (e.g. "(605)274-1450" directly after org name)
BARE_PHONE_RE = re.compile(r"(\(?\d{3}\)?[\s.\-]?\d{3}[\s.\-]?\d{4})")

# Lines that are section markers, not org details — skip them
_SKIP_EXACT = frozenset({
    "hide map", "show map",
    "statewide resource for finding a.a. meetings in state",
    "local area web site(s) that may have a.a. meeting information",
})

def is_skip_marker(line: str) -> bool:
    l = line.lower().strip()
    if l in _SKIP_EXACT:
        return True
    if re.match(r"^area\s+\d+\s*:", l):          # "Area 63: South Dakota"
        return True
    if re.match(r"^united states\s*[-–]", l): # "United States - Alabama"
        return True
    if re.match(r"^[A-Z][A-Z\s]{3,}$", line):     # "ILLINOIS", "NEW HAMPSHIRE"
        return True
    return False


def is_org_detail(line: str) -> bool:
    """True if the line looks like an org detail (has phone label, site, or bare phone)."""
    if is_skip_marker(line):
        return False
    return bool(
        SITE_RE.search(line)
        or DETAIL_SPLIT_RE.search(line)
        or BARE_PHONE_RE.search(line)
    )

LABEL_TO_TYPE = {
    "Main": "phone",
    "24 Hr Phone": "phone",
    "24 Hr Hotline": "phone",
    "24 Hr Answering Svc": "phone",
    "24 Hr Toll Free": "phone",
    "24 Hr": "phone",
    "Answering Service": "phone",
    "Hotline": "phone",
    "Helpline": "phone",
    "Toll Free": "phone",
    "Toll Free hotline": "phone",
    "Spanish Hotline": "phone",
    "Local hotline": "phone",
    "Group Phone": "phone",
    "Service Office": "phone",
    "Business": "phone",
    "Cell": "phone",
    "Phone/FAX": "phone",
    "FAX": "fax",
    "TDD": "tdd",
    "TTY": "tdd",
}


# ---------------------------------------------------------------------------
# Helpers
# ---------------------------------------------------------------------------

def slugify(text: str, max_len: int = 220) -> str:
    text = text.lower().strip()
    text = re.sub(r"[^\w\s-]", "", text)
    text = re.sub(r"[\s_]+", "-", text)
    text = re.sub(r"-{2,}", "-", text).strip("-")
    return text[:max_len]


def file_checksum(path: Path) -> str:
    return hashlib.sha256(path.read_bytes()).hexdigest()


def read_paragraphs(path: Path) -> list[str]:
    doc = docx.Document(str(path))
    return [p.text for p in doc.paragraphs]


def normalize(text: str) -> str:
    return text.replace("\xa0", " ").strip()


# ---------------------------------------------------------------------------
# Detail line parser
# ---------------------------------------------------------------------------

def parse_detail(raw: str) -> tuple[str, str | None, list[tuple]]:
    """
    Returns (service_name, website_url, contacts).
    contacts is a list of (label, value, contact_type).
    """
    line = normalize(raw)

    # Pull website out first so it doesn't confuse label splitting
    website_url = None
    site_m = SITE_RE.search(line)
    if site_m:
        url = site_m.group(1).strip().rstrip(".")
        website_url = url if url.startswith("http") else "https://" + url
        line = line[: site_m.start()].rstrip()

    parts = DETAIL_SPLIT_RE.split(line)
    # parts = [before_first_label, label1, value1, label2, value2, ...]
    service_name = parts[0].strip()

    contacts = []
    for i in range(1, len(parts) - 1, 2):
        label = parts[i].strip()
        value = parts[i + 1].strip().rstrip(",;").strip() if i + 1 < len(parts) else ""
        if label and value:
            contacts.append((label, value, LABEL_TO_TYPE.get(label, "other")))

    # Extract bare phone numbers embedded directly in the service_name (no label prefix)
    bare_phones = BARE_PHONE_RE.findall(service_name)
    if bare_phones:
        service_name = BARE_PHONE_RE.sub("", service_name).strip()
        for phone in bare_phones:
            contacts.insert(0, ("Main", phone.strip(), "phone"))

    return service_name, website_url, contacts


# ---------------------------------------------------------------------------
# Directory parser
# ---------------------------------------------------------------------------

def parse_directory(path: Path) -> tuple[list[dict], list[dict]]:
    """
    Returns (records, warnings).
    Each record: {state, city, service_name, website_url, contacts, raw_source}

    A city may have multiple org detail lines (e.g. English + Spanish intergroup).
    We collect ALL qualifying detail lines before the next city line.
    """
    paragraphs = read_paragraphs(path)
    lines = [normalize(p) for p in paragraphs]

    records: list[dict] = []
    warnings: list[dict] = []
    # (state, city_lower, service_name_lower) — deduplicate duplicated source sections
    seen: set[tuple] = set()

    i = 0
    while i < len(lines):
        line = lines[i]
        m = CITY_LINE_RE.match(line)

        if not m:
            i += 1
            continue

        city = m.group(1).strip().rstrip(",").strip()
        state = m.group(2).strip()

        # Scan forward: collect every org-detail line before the next city line
        j = i + 1
        org_lines: list[str] = []
        while j < len(lines):
            raw = lines[j]
            if not raw:
                j += 1
                continue
            if CITY_LINE_RE.match(raw):
                break                   # start of next city
            if is_org_detail(raw):
                org_lines.append(raw)
            # skip markers and junk are silently ignored
            j += 1

        if not org_lines:
            warnings.append({
                "state_name": state,
                "raw_block": line,
                "warning_type": "missing_detail",
                "message": f"City line not followed by any org detail: {line!r}",
            })
            i = j
            continue

        for detail_line in org_lines:
            service_name, website_url, contacts = parse_detail(detail_line)

            if not service_name:
                warnings.append({
                    "state_name": state,
                    "raw_block": f"{line}\n{detail_line}",
                    "warning_type": "empty_service_name",
                    "message": f"Could not extract service name: {detail_line[:120]!r}",
                })
                continue

            dedup_key = (state, city.lower(), service_name.lower())
            if dedup_key in seen:
                continue
            seen.add(dedup_key)
            records.append({
                "state": state,
                "city": city,
                "service_name": service_name,
                "website_url": website_url,
                "contacts": contacts,
                "raw_source": f"{line}\n{detail_line}",
            })

        i = j  # jump to the next city line

    return records, warnings


# ---------------------------------------------------------------------------
# Database helpers
# ---------------------------------------------------------------------------

def upsert_states(cur, country_id: int, state_names: list[str]) -> dict[str, int]:
    state_id_map: dict[str, int] = {}
    for sort_order, name in enumerate(sorted(state_names)):
        cur.execute(
            """
            INSERT INTO states (country_id, name, abbreviation, slug, sort_order)
            VALUES (%s, %s, %s, %s, %s)
            ON CONFLICT (country_id, name)
                DO UPDATE SET abbreviation = EXCLUDED.abbreviation,
                              slug        = EXCLUDED.slug,
                              sort_order  = EXCLUDED.sort_order,
                              updated_at  = NOW()
            RETURNING id
            """,
            (country_id, name, STATE_ABBREVS.get(name), slugify(name), sort_order),
        )
        state_id_map[name] = cur.fetchone()[0]
    return state_id_map


def insert_locations(cur, records: list[dict], state_id_map: dict[str, int], run_id: int):
    inserted = 0
    # Track (state_id, base_slug) -> counter for slug uniqueness within a state
    slug_counter: dict[tuple, int] = {}

    for rec in records:
        state_id = state_id_map.get(rec["state"])
        if not state_id:
            continue

        city_slug = slugify(rec["city"])
        name_slug = slugify(rec["service_name"])
        base_slug = f"{city_slug}-{name_slug}"[:200]

        key = (state_id, base_slug)
        n = slug_counter.get(key, 0)
        slug = base_slug if n == 0 else f"{base_slug}-{n}"
        slug_counter[key] = n + 1

        # source_key is the stable identity used for upsert
        source_key = f"{slugify(rec['state'])}/{city_slug}/{name_slug}"
        if n > 0:
            source_key = f"{source_key}-{n}"

        cur.execute(
            """
            INSERT INTO service_locations
                (state_id, city, service_name, website_url, raw_source,
                 slug, source_key, import_run_id)
            VALUES (%s, %s, %s, %s, %s, %s, %s, %s)
            ON CONFLICT (source_key)
                DO UPDATE SET service_name   = EXCLUDED.service_name,
                              website_url    = EXCLUDED.website_url,
                              raw_source     = EXCLUDED.raw_source,
                              import_run_id  = EXCLUDED.import_run_id,
                              updated_at     = NOW()
            RETURNING id
            """,
            (
                state_id,
                rec["city"],
                rec["service_name"],
                rec["website_url"],
                rec["raw_source"],
                slug,
                source_key,
                run_id,
            ),
        )
        loc_id = cur.fetchone()[0]
        inserted += 1

        for sort_order, (label, value, ctype) in enumerate(rec["contacts"]):
            cur.execute(
                """
                INSERT INTO contact_methods
                    (service_location_id, label, value, type, sort_order)
                VALUES (%s, %s, %s, %s, %s)
                ON CONFLICT (service_location_id, label, value) DO NOTHING
                """,
                (loc_id, label, value, ctype, sort_order),
            )

    return inserted


AREA_LINE_RE = re.compile(r"^Area\s+(\d+)\s*:\s*(.+)", re.I)


def parse_area_resources(path: Path) -> list[dict]:
    """
    Extract 'Area NN: Label  Site: url' lines and associate each with its state.
    Returns list of {state, area_number, area_label, website_url}.
    """
    paragraphs = read_paragraphs(path)
    # Collapse soft line breaks (\n) within paragraphs so Site: on next soft-line is found
    lines = [p.replace("\xa0", " ").replace("\n", " ").strip() for p in paragraphs]

    STATE_HEADER_RE = re.compile(r"^United States\s*[-–]\s*(.+)", re.I)

    current_state: str | None = None
    results: list[dict] = []
    seen: set[tuple] = set()

    for line in lines:
        # Track state from section headers
        sh = STATE_HEADER_RE.match(line)
        if sh:
            current_state = sh.group(1).strip()
            continue

        # Track state from city lines
        cm = CITY_LINE_RE.match(line)
        if cm:
            current_state = cm.group(2).strip()
            continue

        # Capture Area NN: entries
        am = AREA_LINE_RE.match(line)
        if am and current_state:
            area_number = am.group(1).strip()
            rest = am.group(2).strip()

            site_m = SITE_RE.search(rest)
            website_url = None
            if site_m:
                url = site_m.group(1).strip().rstrip(".")
                website_url = url if url.startswith("http") else "https://" + url
                area_label = rest[: site_m.start()].strip().rstrip("-–").strip()
            else:
                area_label = rest

            if not area_label:
                continue

            key = (current_state, area_number, area_label.lower())
            if key in seen:
                continue
            seen.add(key)
            results.append({
                "state": current_state,
                "area_number": area_number,
                "area_label": area_label,
                "website_url": website_url,
            })

    return results


def insert_area_resources(
    cur, resources: list[dict], state_id_map: dict[str, int]
) -> int:
    inserted = 0
    for sort_order, res in enumerate(resources):
        state_id = state_id_map.get(res["state"])
        if not state_id:
            continue
        source_key = f"area-resource/{slugify(res['state'])}/area-{res['area_number']}"
        cur.execute(
            """
            INSERT INTO area_resources
                (state_id, area_number, area_label, website_url, sort_order, source_key)
            VALUES (%s, %s, %s, %s, %s, %s)
            ON CONFLICT (source_key)
                DO UPDATE SET area_label  = EXCLUDED.area_label,
                              website_url = EXCLUDED.website_url,
                              sort_order  = EXCLUDED.sort_order
            """,
            (
                state_id,
                res["area_number"],
                res["area_label"],
                res["website_url"],
                sort_order,
                source_key,
            ),
        )
        inserted += 1
    return inserted


def insert_warnings(cur, warnings: list[dict], run_id: int, source_file: str):
    for w in warnings:
        cur.execute(
            """
            INSERT INTO import_warnings
                (import_run_id, source_file, state_name, raw_block, warning_type, message)
            VALUES (%s, %s, %s, %s, %s, %s)
            """,
            (
                run_id,
                source_file,
                w.get("state_name"),
                w["raw_block"],
                w["warning_type"],
                w["message"],
            ),
        )


def import_content_pages(cur, path: Path):
    paragraphs = read_paragraphs(path)
    lines = [normalize(p) for p in paragraphs if normalize(p)]
    if not lines:
        return

    title = lines[0]
    body = "\n\n".join(lines[1:])
    slug = slugify(title)

    cur.execute(
        """
        INSERT INTO content_pages (slug, title, body, source_file)
        VALUES (%s, %s, %s, %s)
        ON CONFLICT (slug)
            DO UPDATE SET title = EXCLUDED.title, body = EXCLUDED.body, updated_at = NOW()
        """,
        (slug, title, body, path.name),
    )
    print(f"  Content page: '{title}' (slug: {slug})")


# ---------------------------------------------------------------------------
# Main
# ---------------------------------------------------------------------------

def main():
    db_url = os.getenv("DATABASE_URL")
    if not db_url:
        print("ERROR: DATABASE_URL not set. Copy .env.example to .env.", file=sys.stderr)
        sys.exit(1)

    for p in (DIRECTORY_DOCX, CONTENT_DOCX):
        if not p.exists():
            print(f"ERROR: file not found: {p}", file=sys.stderr)
            sys.exit(1)

    conn = psycopg2.connect(db_url)
    cur = conn.cursor()

    # Start import run
    cur.execute(
        "INSERT INTO import_runs (source_file, source_checksum) VALUES (%s, %s) RETURNING id",
        (DIRECTORY_DOCX.name, file_checksum(DIRECTORY_DOCX)),
    )
    run_id = cur.fetchone()[0]
    conn.commit()

    try:
        print(f"Parsing {DIRECTORY_DOCX.name} ...")
        records, warnings = parse_directory(DIRECTORY_DOCX)
        print(f"  {len(records)} records  |  {len(warnings)} warnings")

        cur.execute("SELECT id FROM countries WHERE code = 'US'")
        row = cur.fetchone()
        if not row:
            print("ERROR: United States row missing from countries table.", file=sys.stderr)
            sys.exit(1)
        country_id = row[0]

        state_names = sorted(set(r["state"] for r in records))
        print(f"  Upserting {len(state_names)} states ...")
        state_id_map = upsert_states(cur, country_id, state_names)

        print("  Inserting service locations + contacts ...")
        inserted = insert_locations(cur, records, state_id_map, run_id)

        if warnings:
            print(f"  Logging {len(warnings)} warnings ...")
            insert_warnings(cur, warnings, run_id, DIRECTORY_DOCX.name)

        conn.commit()

        print("  Parsing and inserting area resources ...")
        area_resources = parse_area_resources(DIRECTORY_DOCX)
        area_inserted = insert_area_resources(cur, area_resources, state_id_map)
        conn.commit()
        print(f"  {area_inserted} area resources inserted")

        print(f"\nImporting content pages ...")
        import_content_pages(cur, CONTENT_DOCX)
        conn.commit()

        status = "partial" if warnings else "succeeded"
        summary = {
            "inserted": inserted,
            "area_resources": area_inserted,
            "warnings": len(warnings),
            "states": len(state_names),
        }
        cur.execute(
            "UPDATE import_runs SET finished_at = NOW(), status = %s, summary_json = %s WHERE id = %s",
            (status, json.dumps(summary), run_id),
        )
        conn.commit()

        print(f"\nDone — {inserted} locations, {len(state_names)} states, {len(warnings)} warnings.")
        if warnings:
            print("  Check the import_warnings table for details on skipped rows.")

    except Exception:
        cur.execute(
            "UPDATE import_runs SET finished_at = NOW(), status = 'failed' WHERE id = %s",
            (run_id,),
        )
        conn.commit()
        raise
    finally:
        cur.close()
        conn.close()


if __name__ == "__main__":
    main()
