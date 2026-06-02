# AA Site

Directory of AA service locations across the United States.

## Stack

- **PostgreSQL 16** — database
- **pgAdmin 4** — browser-based GUI for the other team (data entry, queries)
- **Next.js** — frontend (upcoming)
- **Docker Compose** — ties everything together

---

## Start everything

```powershell
# First time only: copy the env file
Copy-Item .env.example .env

docker compose up -d
```

That starts two containers:
- `aasite-postgres` — database on port `5432`
- `aasite-pgadmin` — web GUI at **http://localhost:5050**

The schema is applied automatically on the first start via `db/init/01_schema.sql`.

---

## pgAdmin GUI (for the other team)

1. Open **http://your-server-ip:5050** in a browser
2. Log in: `admin@aasite.local` / `Admin_Passw0rd!`  (change in `.env`)
3. The **AA Site DB** server is pre-configured — click it, enter the DB password: `AaSite_App_Passw0rd!`
4. Navigate **Servers → AA Site DB → aasite_db → Schemas → public → Tables**
5. Right-click any table → **View/Edit Data** to browse or edit rows

---

## Import Word file data

```powershell
# One-time setup (use the same Python you'll run the script with)
py -3.13 -m pip install -r scripts/requirements.txt

# Run the import (safe to re-run — uses upsert)
py -3.13 scripts/import_docx.py
```

> If you only have one Python version, `pip` / `python` works fine.

This parses `United_states_data.docx` and loads all ~800 service locations into:
- `states` — one row per US state/territory
- `service_locations` — org name, city, website per location
- `contact_methods` — all phone numbers per location

It also imports `aameeting_newcontent.docx` into `content_pages`.

Check `import_runs` and `import_warnings` tables afterward for a summary.

---

## Environment variables

| Variable | Default | Description |
|---|---|---|
| `POSTGRES_DB` | `aasite_db` | Database name |
| `POSTGRES_USER` | `aasite_app` | App DB user |
| `POSTGRES_PASSWORD` | `AaSite_App_Passw0rd!` | App DB password |
| `POSTGRES_HOST_PORT` | `5433` | Host port for Postgres (5432 if nothing else uses it) |
| `PGADMIN_EMAIL` | `admin@aasite.local` | pgAdmin login email |
| `PGADMIN_PASSWORD` | `Admin_Passw0rd!` | pgAdmin login password |
| `PGADMIN_HOST_PORT` | `5050` | Host port for pgAdmin |
| `DATABASE_URL` | *(see .env.example)* | Used by import script and Next.js |

---

## Schema overview

```
countries
  └─ states
       └─ service_locations  ←→  contact_methods (phone, fax, website…)

content_pages     (website copy imported from docx)
import_runs       (audit log of each import run)
import_warnings   (rows that couldn't be parsed cleanly)
```
