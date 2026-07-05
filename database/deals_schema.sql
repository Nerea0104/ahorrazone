-- Ahorrazone deals catalog (Neon / PostgreSQL)
-- Append-only: dedup by (source, product_id). Never re-insert an existing pair.
-- Prices are historical ("detectado el X"), not live. Live price = CTA to store.

CREATE TABLE IF NOT EXISTS deals (
  id             BIGSERIAL    PRIMARY KEY,
  source         VARCHAR(20)  NOT NULL CHECK (source IN ('amazon', 'aliexpress', 'eci')),
  product_id     VARCHAR(200) NOT NULL,   -- ASIN, ali product_id, or ECI product code
  slug           VARCHAR(300) NOT NULL,   -- URL slug: "{source}-{title-words}-{product_id}"
  title          TEXT         NOT NULL,
  price          NUMERIC(10,2) NOT NULL,  -- price at detection time
  original_price NUMERIC(10,2),           -- crossed-out "was" price
  discount_pct   SMALLINT,
  currency       VARCHAR(5)   NOT NULL DEFAULT 'EUR',
  image_url      TEXT,
  affiliate_url  TEXT         NOT NULL,
  category       VARCHAR(100),
  locale         VARCHAR(5)   NOT NULL DEFAULT 'es',
  detected_at    TIMESTAMPTZ  NOT NULL DEFAULT NOW(),
  created_at     TIMESTAMPTZ  NOT NULL DEFAULT NOW(),

  CONSTRAINT deals_source_product_unique UNIQUE (source, product_id),
  CONSTRAINT deals_slug_unique           UNIQUE (slug)
);

CREATE INDEX IF NOT EXISTS deals_detected_at_idx ON deals (detected_at DESC);
CREATE INDEX IF NOT EXISTS deals_source_idx       ON deals (source);
CREATE INDEX IF NOT EXISTS deals_category_idx     ON deals (category);
CREATE INDEX IF NOT EXISTS deals_discount_idx     ON deals (discount_pct DESC NULLS LAST);
