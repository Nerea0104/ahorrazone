import Link from "next/link";
import { notFound } from "next/navigation";
import { getDictionary } from "../../../../lib/i18n";
import { getDeal, getDealSlugs, SOURCE_CONFIG, fmtPrice, fmtDate } from "../../../../lib/deals";

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
  const description = `${dict.deal.detectedOn} ${fmtDate(deal.detected_at, lang)}: ${deal.original_price ? `${fmtPrice(deal.original_price, deal.currency, lang)} → ` : ""}${price}`;

  return {
    title,
    description,
    alternates: { canonical: `/${lang}/ofertas/${slug}` },
    openGraph: {
      title,
      description,
      type: "website",
      images: deal.image_url ? [{ url: deal.image_url, width: 800, height: 800 }] : [],
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
  const date = fmtDate(deal.detected_at, lang);

  const ctaLabel = deal.source === "amazon" ? t.ctaAmazon
    : deal.source === "aliexpress" ? t.ctaAli
    : t.ctaEci;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: deal.title,
    image: deal.image_url,
    offers: {
      "@type": "Offer",
      price: String(deal.price),
      priceCurrency: deal.currency,
      availability: "https://schema.org/InStock",
      url: deal.affiliate_url,
      priceValidUntil: new Date(new Date(deal.detected_at).setFullYear(new Date(deal.detected_at).getFullYear() + 1))
        .toISOString().split("T")[0],
    },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="container py-5" style={{ maxWidth: 900 }}>
        {/* Back */}
        <Link
          href={`/${lang}/ofertas`}
          style={{ color: "#6f42c1", fontWeight: 600, fontSize: "0.9rem", display: "inline-block", marginBottom: "28px" }}
        >
          {t.backToDeals}
        </Link>

        <div className="row g-4 g-lg-5 align-items-start">
          {/* Image */}
          <div className="col-md-5">
            <div
              className="az-card"
              style={{ aspectRatio: "1/1", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px", position: "relative" }}
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
              {/* Source badge */}
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
              {/* Discount badge */}
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
              <p style={{ fontSize: "0.78rem", fontWeight: 600, color: "#9163e8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "8px" }}>
                {deal.category}
              </p>
            )}
            <h1 style={{ fontWeight: 800, fontSize: "clamp(1.3rem, 3vw, 1.7rem)", lineHeight: 1.3, marginBottom: "20px", color: "#1a1033" }}>
              {deal.title}
            </h1>

            {/* Price block */}
            <div
              style={{
                background: "rgba(111,66,193,0.06)",
                border: "1px solid rgba(111,66,193,0.12)",
                borderRadius: "16px",
                padding: "20px 24px",
                marginBottom: "20px",
              }}
            >
              <p style={{ fontSize: "0.8rem", color: "#9163e8", fontWeight: 600, marginBottom: "8px" }}>
                {t.detectedOn} {date}
              </p>
              <div style={{ display: "flex", alignItems: "baseline", gap: "12px", flexWrap: "wrap" }}>
                {was && (
                  <span style={{ textDecoration: "line-through", color: "#aaa", fontSize: "1rem" }}>
                    {t.before} {was}
                  </span>
                )}
                <span style={{ fontWeight: 900, fontSize: "2rem", color: "#1a1033", lineHeight: 1 }}>{now}</span>
                {deal.discount_pct > 0 && (
                  <span style={{ background: "#198754", color: "#fff", fontWeight: 700, fontSize: "1rem", borderRadius: "8px", padding: "4px 10px" }}>
                    −{deal.discount_pct}%
                  </span>
                )}
              </div>
            </div>

            {/* Disclaimer */}
            <p style={{ fontSize: "0.8rem", color: "#aaa", marginBottom: "24px", lineHeight: 1.5 }}>
              ⚠️ {t.disclaimer}
            </p>

            {/* CTAs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
              <a
                href={deal.affiliate_url}
                target="_blank"
                rel="noopener noreferrer sponsored"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "linear-gradient(135deg, #6f42c1 0%, #7c3aed 100%)",
                  color: "#fff",
                  fontWeight: 700,
                  fontSize: "1rem",
                  padding: "14px 24px",
                  borderRadius: "12px",
                  boxShadow: "0 8px 24px rgba(111,66,193,0.3)",
                  transition: "all 0.2s",
                }}
              >
                {ctaLabel} →
              </a>
              <a
                href="https://t.me/Ahorrazone_bot"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "block",
                  textAlign: "center",
                  background: "#fff",
                  color: "#6f42c1",
                  fontWeight: 600,
                  fontSize: "0.95rem",
                  padding: "12px 24px",
                  borderRadius: "12px",
                  border: "2px solid rgba(111,66,193,0.25)",
                }}
              >
                🔔 {t.follow}
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
