-- PostgreSQL schema for aasite_db
-- Runs automatically on first container start via docker-entrypoint-initdb.d

CREATE TABLE IF NOT EXISTS countries (
    id          SERIAL PRIMARY KEY,
    name        VARCHAR(100) NOT NULL,
    code        VARCHAR(10)  NOT NULL,
    slug        VARCHAR(140) NOT NULL,
    created_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_countries_code UNIQUE (code),
    CONSTRAINT uq_countries_slug UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS states (
    id            SERIAL PRIMARY KEY,
    country_id    INT         NOT NULL REFERENCES countries(id),
    name          VARCHAR(100) NOT NULL,
    abbreviation  VARCHAR(10),
    slug          VARCHAR(140) NOT NULL,
    sort_order    INT         NOT NULL DEFAULT 0,
    created_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at    TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_states_country_slug UNIQUE (country_id, slug),
    CONSTRAINT uq_states_country_name UNIQUE (country_id, name)
);

CREATE INDEX IF NOT EXISTS ix_states_country_sort ON states(country_id, sort_order, name);

CREATE TABLE IF NOT EXISTS import_runs (
    id               SERIAL PRIMARY KEY,
    source_file      VARCHAR(260) NOT NULL,
    source_checksum  VARCHAR(128),
    started_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    finished_at      TIMESTAMPTZ,
    status           VARCHAR(30)  NOT NULL DEFAULT 'running',
    summary_json     TEXT,
    CONSTRAINT ck_import_runs_status CHECK (status IN ('running', 'succeeded', 'failed', 'partial'))
);

CREATE TABLE IF NOT EXISTS service_locations (
    id             SERIAL PRIMARY KEY,
    state_id       INT          NOT NULL REFERENCES states(id),
    city           VARCHAR(160) NOT NULL,
    region_label   VARCHAR(220),
    service_name   VARCHAR(260) NOT NULL,
    website_url    VARCHAR(500),
    notes          TEXT,
    raw_source     TEXT         NOT NULL,
    slug           VARCHAR(220) NOT NULL,
    source_key     VARCHAR(450) NOT NULL,
    import_run_id  INT REFERENCES import_runs(id),
    is_active      BOOLEAN      NOT NULL DEFAULT TRUE,
    created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_service_locations_raw_source CHECK (LENGTH(raw_source) > 0),
    CONSTRAINT uq_service_locations_source_key UNIQUE (source_key),
    CONSTRAINT uq_service_locations_state_slug UNIQUE (state_id, slug)
);

CREATE INDEX IF NOT EXISTS ix_service_locations_state_city
    ON service_locations(state_id, city, service_name);

CREATE TABLE IF NOT EXISTS contact_methods (
    id                   SERIAL PRIMARY KEY,
    service_location_id  INT          NOT NULL REFERENCES service_locations(id) ON DELETE CASCADE,
    label                VARCHAR(100) NOT NULL,
    value                VARCHAR(260) NOT NULL,
    type                 VARCHAR(40)  NOT NULL,
    sort_order           INT          NOT NULL DEFAULT 0,
    created_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at           TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_contact_methods_type CHECK (type IN ('phone', 'fax', 'tdd', 'email', 'website', 'other')),
    CONSTRAINT uq_contact_methods_location_label_value UNIQUE (service_location_id, label, value)
);

CREATE INDEX IF NOT EXISTS ix_contact_methods_location_sort
    ON contact_methods(service_location_id, sort_order, label);

CREATE TABLE IF NOT EXISTS content_pages (
    id               SERIAL PRIMARY KEY,
    slug             VARCHAR(180) NOT NULL,
    title            VARCHAR(220) NOT NULL,
    body             TEXT         NOT NULL,
    meta_title       VARCHAR(220),
    meta_description VARCHAR(320),
    source_file      VARCHAR(260),
    created_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    updated_at       TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_content_pages_slug UNIQUE (slug)
);

CREATE TABLE IF NOT EXISTS import_warnings (
    id              SERIAL PRIMARY KEY,
    import_run_id   INT REFERENCES import_runs(id),
    source_file     VARCHAR(260) NOT NULL,
    state_name      VARCHAR(100),
    raw_block       TEXT         NOT NULL,
    warning_type    VARCHAR(80)  NOT NULL,
    message         VARCHAR(1000) NOT NULL,
    created_at      TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT ck_import_warnings_raw_block CHECK (LENGTH(raw_block) > 0)
);

CREATE TABLE IF NOT EXISTS area_resources (
    id           SERIAL PRIMARY KEY,
    state_id     INT          NOT NULL REFERENCES states(id),
    area_number  VARCHAR(20)  NOT NULL,
    area_label   VARCHAR(200) NOT NULL,
    website_url  VARCHAR(500),
    sort_order   INT          NOT NULL DEFAULT 0,
    source_key   VARCHAR(200) NOT NULL,
    created_at   TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
    CONSTRAINT uq_area_resources_source_key UNIQUE (source_key)
);

CREATE INDEX IF NOT EXISTS ix_area_resources_state
    ON area_resources(state_id, sort_order);

-- Seed
INSERT INTO countries (name, code, slug)
VALUES ('United States', 'US', 'united-states')
ON CONFLICT (code) DO NOTHING;
