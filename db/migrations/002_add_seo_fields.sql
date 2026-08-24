-- Adds SEO override columns for states and service_locations.
-- 01_schema.sql only runs on a fresh container (docker-entrypoint-initdb.d),
-- so run this by hand against any already-initialized database:
--   docker exec -i aasite-postgres psql -U aasite_app -d aasite_db < db/migrations/002_add_seo_fields.sql
-- Safe to re-run.

ALTER TABLE states
    ADD COLUMN IF NOT EXISTS seo_title        VARCHAR(300),
    ADD COLUMN IF NOT EXISTS meta_description VARCHAR(400);

ALTER TABLE service_locations
    ADD COLUMN IF NOT EXISTS seo_title        VARCHAR(300),
    ADD COLUMN IF NOT EXISTS meta_description VARCHAR(400),
    ADD COLUMN IF NOT EXISTS h1_override      VARCHAR(300);
