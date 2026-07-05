import { getDb } from "./db";

export const SOURCE_CONFIG = {
  amazon:    { label: "Amazon",          color: "#ff9900", bg: "#fff8f0", border: "#ffdba0" },
  aliexpress:{ label: "AliExpress",      color: "#e62e04", bg: "#fff5f5", border: "#ffc5be" },
  eci:       { label: "El Corte Inglés", color: "#006E3E", bg: "#f0faf5", border: "#9ddfc0" },
};

export async function getDeals({ limit = 48, source } = {}) {
  const sql = getDb();
  if (!sql) return [];
  try {
    if (source && source !== "all") {
      return await sql`
        SELECT slug, source, title, price, original_price, discount_pct,
               currency, image_url, category, detected_at
        FROM deals
        WHERE source = ${source}
        ORDER BY detected_at DESC
        LIMIT ${limit}
      `;
    }
    return await sql`
      SELECT slug, source, title, price, original_price, discount_pct,
             currency, image_url, category, detected_at
      FROM deals
      ORDER BY detected_at DESC
      LIMIT ${limit}
    `;
  } catch (e) {
    console.error("[deals] getDeals:", e.message);
    return [];
  }
}

export async function getDeal(slug) {
  const sql = getDb();
  if (!sql) return null;
  try {
    const rows = await sql`SELECT * FROM deals WHERE slug = ${slug}`;
    return rows[0] ?? null;
  } catch (e) {
    console.error("[deals] getDeal:", e.message);
    return null;
  }
}

export async function getDealSlugs() {
  const sql = getDb();
  if (!sql) return [];
  try {
    return await sql`SELECT slug FROM deals ORDER BY detected_at DESC LIMIT 500`;
  } catch (e) {
    console.error("[deals] getDealSlugs:", e.message);
    return [];
  }
}

export function fmtPrice(price, currency = "EUR", lang = "es") {
  return new Intl.NumberFormat(lang === "en" ? "en-GB" : "es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
  }).format(price);
}

export function fmtDate(date, lang = "es") {
  return new Date(date).toLocaleDateString(lang === "en" ? "en-GB" : "es-ES", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Build a slug: "amazon-robot-conga-b08l5tnjce"
export function buildSlug(source, productId, title) {
  const words = title
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, "")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 5)
    .join("-");
  return `${source}-${words}-${productId.toLowerCase()}`;
}
