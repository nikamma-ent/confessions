CREATE TABLE IF NOT EXISTS confessions (
    id         SERIAL PRIMARY KEY,
    text       TEXT NOT NULL,
    word       TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS confessions_created_at_idx ON confessions (created_at DESC);
