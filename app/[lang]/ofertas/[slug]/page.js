import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../../lib/i18n";
import { getDeal, getDealSlugs, SOURCE_CONFIG, fmtPrice, fmtDate, fmtDateTime } from "../../../../lib/deals";

export const dynamicParams = true;
export const revalidate = 86400;

export async function generateStaticParams() {
  const slugs = await getDealSlugs();
  return slugs.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const deal = await getDeal(slug);
  if (!deal) return {};
  const dict = await getDictionary(lang);
  const src = SOURCE_CONFIG[deal.source] ?? SOURCE_CONFIG.amazon;
  const price = fmtPrice(deal.price, deal.currency, lang);
  const pct = deal.discount_pct ? ` −${deal.discount_pct}%` : "";
  const title = `${deal.title}${pct} — ${src.label} | Ahorrazone`;
  const description =
    deal.description ||
    `${dict.deal.detectedOn} ${fmtDate(deal.detected_at, lang)}: ${
      deal.original_price ? `${fmtPrice(deal.original_price, deal.currency, lang)} → ` : ""
    }${price}`;

  const images = deal.image_url ? [{ url: deal.image_url, width: 800, height: 800, alt: deal.title }] : [];
  return {
    title,
    description,
    alternates: { canonical: `/${lang}/ofertas/${slug}` },
    openGraph: { title, description, type: "website", images },
    twitter: {
      card: deal.image_url ? "summary_large_image" : "summary",
      title,
      description,
      images: deal.image_url ? [deal.image_url] : [],
    },
  };
}

export default async function DealPage({ params }) {
  const { lang, slug } = await params;
  const [dict, deal] = await Promise.all([getDictionary(lang), getDeal(slug)]);
  if (!deal) notFound();

  const t = dict.deal;
  const src = SOURCE_CONFIG[deal.source] ?? SOURCE_CONFIG.amazon;
  const now = fmtPrice(deal.price, deal.currency, lang);
  const was = deal.original_price ? fmtPrice(deal.original_price, deal.currency, lang) : null;
  const date = fmtDateTime(deal.detected_at, lang);
  const savingsAmt =
    deal.original_price && deal.original_price > deal.price
      ? fmtPrice(deal.original_price - deal.price, deal.currency, lang)
      : null;

  const ctaLabel =
    deal.source === "amazon"
      ? t.ctaAmazon
      : deal.source === "aliexpress"
      ? t.ctaAli
      : t.ctaEci;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    image: deal.image_url,
    description: deal.description || undefined,
    offers: {
      "@type": "Offer",
      price: String(deal.price),
      priceCurrency: deal.currency,
      availability: "https://schema.org/InStock",
      url: deal.affiliate_url,
      priceValidUntil: new Date(
        new Date(deal.detected_at).setFullYear(new Date(deal.detected_at).getFullYear() + 1)
      )
        .toISOString()
        .split("T")[0],
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── Hero section ─────────────────────────────────────────────────── */}
      <div style={{ background: "linear-gradient(160deg, #f8f5ff 0%, #fff 60%)", paddingTop: "48px", paddingBottom: "64px" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <Link
            href={`/${lang}/ofertas`}
            style={{ color: "#6f42c1", fontWeight: 600, fontSize: "0.9rem", display: "inline-block", marginBottom: "28px" }}
          >
            {t.backToDeals}
          </Link>

          <div className="row g-4 g-lg-5 align-items-center">
            {/* Image */}
            <div className="col-md-5">
              <div
                style={{
                  background: "#fff",
                  borderRadius: "20px",
                  boxShadow: "0 4px 24px rgba(111,66,193,0.10)",
                  aspectRatio: "1/1",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "28px",
                  position: "relative",
                }}
              >
                {deal.image_url ? (
                  <img
                    src={deal.image_url}
                    alt={deal.title}
                    style={{ width: "100%", height: "100%", objectFit: "contain" }}
                  />
                ) : (
                  <span style={{ fontSize: "5rem", opacity: 0.15 }}>🛒</span>
                )}
                <span
                  style={{
                    position: "absolute", top: 14, right: 14,
                    background: src.bg, color: src.color,
                    border: `1px solid ${src.border}`,
                    fontWeight: 700, fontSize: "0.78rem",
                    borderRadius: "8px", padding: "4px 10px",
                  }}
                >
                  {src.label}
                </span>
                {deal.discount_pct > 0 && (
                  <span
                    style={{
                      position: "absolute", top: 14, left: 14,
                      background: "#198754", color: "#fff",
                      fontWeight: 700, fontSize: "0.85rem",
                      borderRadius: "8px", padding: "4px 10px",
                    }}
                  >
                    −{deal.discount_pct}%
                  </span>
                )}
              </div>
            </div>

            {/* Info */}
            <div className="col-md-7">
              {deal.category && (
                <p style={{ fontSize: "0.78rem", fontWeight: 700, color: "#9163e8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "10px" }}>
                  {deal.category}
                </p>
              )}
              <h1 style={{ fontWeight: 800, fontSize: "clamp(1.25rem, 3vw, 1.65rem)", lineHeight: 1.3, marginBottom: "24px", color: "#1a1033" }}>
                {deal.title}
              </h1>

              {/* Price block */}
              <div
                style={{
                  background: "rgba(111,66,193,0.06)",
                  border: "1px solid rgba(111,66,193,0.15)",
                  borderRadius: "16px",
                  padding: "20px 24px",
                  marginBottom: "12px",
                }}
              >
                <p style={{ fontSize: "0.8rem", color: "#9163e8", fontWeight: 600, marginBottom: "10px" }}>
                  {t.detectedOn} {date}
                </p>
                <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                  {was && (
                    <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "1rem" }}>
                      {t.before} {was}
                    </span>
                  )}
                  <span style={{ fontWeight: 900, fontSize: "2.2rem", color: "#1a1033", lineHeight: 1 }}>
                    {now}
                  </span>
                  {deal.discount_pct > 0 && (
                    <span style={{ background: "#198754", color: "#fff", fontWeight: 700, fontSize: "1rem", borderRadius: "8px", padding: "4px 10px" }}>
                      −{deal.discount_pct}%
                    </span>
                  )}
                </div>
                {savingsAmt && (
                  <p style={{ marginTop: "8px", fontSize: "0.85rem", color: "#198754", fontWeight: 600 }}>
                    {t.savings} {savingsAmt}
                  </p>
                )}
              </div>

              <p style={{ fontSize: "0.78rem", color: "#bbb", marginBottom: "24px", lineHeight: 1.5 }}>
                ⚠️ {t.disclaimer}
              </p>

              {/* CTAs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                <a
                  href={deal.affiliate_url}
                  target="_blank"
                  rel="noopener noreferrer sponsored"
                  style={{
                    display: "block", textAlign: "center",
                    background: "linear-gradient(135deg, #6f42c1 0%, #7c3aed 100%)",
                    color: "#fff", fontWeight: 700, fontSize: "1.05rem",
                    padding: "15px 24px", borderRadius: "12px",
                    boxShadow: "0 8px 24px rgba(111,66,193,0.30)",
                  }}
                >
                  {ctaLabel} →
                </a>
                <a
                  href="https://t.me/Ahorrazone_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: "block", textAlign: "center",
                    background: "#fff", color: "#6f42c1",
                    fontWeight: 600, fontSize: "0.95rem",
                    padding: "13px 24px", borderRadius: "12px",
                    border: "2px solid rgba(111,66,193,0.25)",
                  }}
                >
                  🔔 {t.follow}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── AI Description ───────────────────────────────────────────────── */}
      {deal.description && (
        <div style={{ background: "#fff", padding: "64px 0 48px" }}>
          <div className="container" style={{ maxWidth: 960 }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.35rem", color: "#1a1033", marginBottom: "16px" }}>
              {t.aboutH}
            </h2>
            <p style={{ fontSize: "1.05rem", color: "#444", lineHeight: 1.75, maxWidth: "680px" }}>
              {deal.description}
            </p>
          </div>
        </div>
      )}

      {/* ── Why good deal ────────────────────────────────────────────────── */}
      {savingsAmt && (
        <div style={{ background: "#f8fdf9", borderTop: "1px solid #d3f0df", borderBottom: "1px solid #d3f0df", padding: "56px 0" }}>
          <div className="container" style={{ maxWidth: 960 }}>
            <h2 style={{ fontWeight: 800, fontSize: "1.35rem", color: "#1a1033", marginBottom: "12px" }}>
              {t.whyH}
            </h2>
            <p style={{ color: "#555", lineHeight: 1.7, maxWidth: "640px", marginBottom: "28px" }}>
              {t.whyLead}
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "16px" }}>
              <div
                style={{
                  background: "#fff", border: "1px solid #b8e9cc",
                  borderRadius: "14px", padding: "20px 28px",
                  display: "flex", alignItems: "center", gap: "14px",
                }}
              >
                <span style={{ fontSize: "1.8rem" }}>💰</span>
                <div>
                  <p style={{ margin: 0, fontWeight: 700, fontSize: "1.5rem", color: "#198754" }}>
                    {savingsAmt}
                  </p>
                  <p style={{ margin: 0, fontSize: "0.85rem", color: "#555" }}>
                    {t.savings} vs {was}
                  </p>
                </div>
              </div>
              {deal.discount_pct > 0 && (
                <div
                  style={{
                    background: "#fff", border: "1px solid #b8e9cc",
                    borderRadius: "14px", padding: "20px 28px",
                    display: "flex", alignItems: "center", gap: "14px",
                  }}
                >
                  <span style={{ fontSize: "1.8rem" }}>🏷️</span>
                  <div>
                    <p style={{ margin: 0, fontWeight: 700, fontSize: "1.5rem", color: "#198754" }}>
                      −{deal.discount_pct}%
                    </p>
                    <p style={{ margin: 0, fontSize: "0.85rem", color: "#555" }}>
                      {t.detectedOn} {date}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Track price steps ────────────────────────────────────────────── */}
      <div style={{ background: "#fff", padding: "72px 0" }}>
        <div className="container" style={{ maxWidth: 960 }}>
          <h2 style={{ fontWeight: 800, fontSize: "1.35rem", color: "#1a1033", marginBottom: "8px" }}>
            {t.trackH}
          </h2>
          <p style={{ color: "#777", marginBottom: "40px", maxWidth: "500px" }}>{t.trackLead}</p>
          <div className="row g-3">
            {t.trackSteps.map((step, i) => (
              <div key={i} className="col-12 col-md-4">
                <div
                  style={{
                    background: "linear-gradient(135deg, #f8f5ff 0%, #fff 100%)",
                    border: "1px solid rgba(111,66,193,0.12)",
                    borderRadius: "16px",
                    padding: "28px 24px",
                    height: "100%",
                  }}
                >
                  <div
                    style={{
                      width: "44px", height: "44px",
                      background: "rgba(111,66,193,0.10)",
                      borderRadius: "12px",
                      display: "flex", alignItems: "center", justifyContent: "center",
                      fontSize: "1.3rem", marginBottom: "16px",
                    }}
                  >
                    {step.icon}
                  </div>
                  <p style={{ fontWeight: 700, fontSize: "1rem", color: "#1a1033", marginBottom: "6px" }}>
                    {i + 1}. {step.h}
                  </p>
                  <p style={{ fontSize: "0.9rem", color: "#666", margin: 0, lineHeight: 1.55 }}>
                    {step.p}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: "32px" }}>
            <a
              href="https://t.me/Ahorrazone_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex", alignItems: "center", gap: "8px",
                background: "linear-gradient(135deg, #6f42c1 0%, #7c3aed 100%)",
                color: "#fff", fontWeight: 700, fontSize: "1rem",
                padding: "14px 28px", borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(111,66,193,0.25)",
              }}
            >
              ✈️ {t.follow}
            </a>
          </div>
        </div>
      </div>

      {/* ── Community CTA ────────────────────────────────────────────────── */}
      <div
        style={{
          background: "linear-gradient(135deg, #1a1033 0%, #2d1b69 100%)",
          color: "#fff",
          padding: "72px 0",
        }}
      >
        <div className="container" style={{ maxWidth: 960 }}>
          <div className="row align-items-center g-4">
            <div className="col-lg-7">
              <p style={{ fontSize: "0.85rem", fontWeight: 700, color: "#a78bfa", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "12px" }}>
                Ahorrazone Hunters
              </p>
              <h2 style={{ fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 1.9rem)", marginBottom: "16px", lineHeight: 1.3 }}>
                {t.communityH}
              </h2>
              <p style={{ color: "rgba(255,255,255,0.7)", lineHeight: 1.7, marginBottom: "0", maxWidth: "520px" }}>
                {t.communityP}
              </p>
            </div>
            <div className="col-lg-5 d-flex flex-column gap-3">
              {["🏷️ Mejores ofertas del día", "🔥 Mínimos históricos", "🏆 Ranking semanal de hunters", "🎁 Sorteos para la comunidad"].map((f, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: "10px", fontSize: "0.9rem", color: "rgba(255,255,255,0.8)" }}>
                  <span>{f}</span>
                </div>
              ))}
              <a
                href="https://t.me/ahorrazonehunters"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: "8px", marginTop: "8px",
                  background: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
                  color: "#fff", fontWeight: 700, fontSize: "1rem",
                  padding: "14px 28px", borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(124,58,237,0.40)",
                }}
              >
                {t.communityCta}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
