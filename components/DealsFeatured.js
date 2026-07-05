import Link from "next/link";
import { SOURCE_CONFIG, fmtPrice } from "../lib/deals";

function FeaturedCard({ deal, dict, lang }) {
  const src = SOURCE_CONFIG[deal.source] ?? SOURCE_CONFIG.amazon;
  const now = fmtPrice(deal.price, deal.currency, lang);
  const was = deal.original_price ? fmtPrice(deal.original_price, deal.currency, lang) : null;

  return (
    <Link
      href={`/${lang}/ofertas/${deal.slug}`}
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#fff",
        borderRadius: "18px",
        overflow: "hidden",
        textDecoration: "none",
        color: "inherit",
        minWidth: "220px",
        width: "220px",
        flexShrink: 0,
        boxShadow: "0 8px 32px rgba(0,0,0,0.22)",
        transition: "transform 0.18s ease, box-shadow 0.18s ease",
      }}
      className="az-featured-card"
    >
      {/* Image */}
      <div
        style={{
          position: "relative",
          aspectRatio: "1/1",
          background: "#f8f9fc",
          overflow: "hidden",
        }}
      >
        {deal.image_url ? (
          <img
            src={deal.image_url}
            alt={deal.title}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "10px" }}
            loading="lazy"
          />
        ) : (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "2.5rem",
              opacity: 0.2,
            }}
          >
            🛒
          </div>
        )}
        {deal.discount_pct > 0 && (
          <span
            style={{
              position: "absolute",
              top: 10,
              left: 10,
              background: "#dc2626",
              color: "#fff",
              fontWeight: 800,
              fontSize: "0.85rem",
              borderRadius: "8px",
              padding: "3px 9px",
              letterSpacing: "-0.3px",
            }}
          >
            −{deal.discount_pct}%
          </span>
        )}
        <span
          style={{
            position: "absolute",
            top: 10,
            right: 10,
            background: src.bg,
            color: src.color,
            border: `1px solid ${src.border}`,
            fontWeight: 600,
            fontSize: "0.68rem",
            borderRadius: "6px",
            padding: "3px 7px",
          }}
        >
          {src.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "12px 14px 14px", flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
        <p
          style={{
            margin: 0,
            fontWeight: 600,
            fontSize: "0.84rem",
            lineHeight: 1.35,
            color: "#1a1033",
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {deal.title}
        </p>
        <div style={{ display: "flex", alignItems: "baseline", gap: "6px", marginTop: "auto" }}>
          {was && (
            <span style={{ textDecoration: "line-through", color: "#bbb", fontSize: "0.8rem" }}>
              {was}
            </span>
          )}
          <span style={{ fontWeight: 800, fontSize: "1.1rem", color: "#6f42c1" }}>{now}</span>
        </div>
      </div>
    </Link>
  );
}

export default function DealsFeatured({ deals, dict, lang, isToday }) {
  if (!deals || deals.length === 0) return null;
  const t = dict.ofertas;

  return (
    <div
      style={{
        background: "linear-gradient(135deg, #1a0533 0%, #4a1d96 55%, #6f42c1 100%)",
        position: "relative",
        overflow: "hidden",
        paddingBottom: "40px",
      }}
    >
      {/* Subtle dot texture */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(circle, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          pointerEvents: "none",
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Header row */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            paddingTop: "36px",
            paddingBottom: "24px",
            gap: "12px",
          }}
        >
          <div>
            <h2
              style={{
                color: "#fff",
                fontWeight: 800,
                fontSize: "clamp(1.4rem, 3vw, 1.9rem)",
                margin: "0 0 4px",
                letterSpacing: "-0.3px",
              }}
            >
              {isToday ? t.featuredTitle : t.featuredFallback}
            </h2>
            <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "0.88rem", margin: 0 }}>
              {isToday ? t.featuredSubtitle : ""}&nbsp;
              <span
                style={{
                  background: "rgba(255,255,255,0.12)",
                  border: "1px solid rgba(255,255,255,0.2)",
                  borderRadius: "999px",
                  padding: "2px 10px",
                  fontSize: "0.78rem",
                  fontWeight: 600,
                  color: "rgba(255,255,255,0.85)",
                  marginLeft: "4px",
                }}
              >
                {deals.length} ofertas
              </span>
            </p>
          </div>
          <Link
            href={`/${lang}/ofertas#grid`}
            style={{
              color: "rgba(255,255,255,0.75)",
              fontSize: "0.85rem",
              fontWeight: 600,
              textDecoration: "none",
              whiteSpace: "nowrap",
              border: "1px solid rgba(255,255,255,0.25)",
              borderRadius: "8px",
              padding: "6px 14px",
              transition: "all 0.18s",
            }}
          >
            {t.allDeals} →
          </Link>
        </div>

        {/* Horizontal scroll strip */}
        <div
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            paddingBottom: "8px",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {deals.map((deal) => (
            <FeaturedCard key={deal.slug} deal={deal} dict={dict} lang={lang} />
          ))}
        </div>
      </div>

      {/* Hide scrollbar in webkit */}
      <style>{`.az-featured-card:hover { transform: translateY(-4px) !important; box-shadow: 0 16px 40px rgba(0,0,0,0.32) !important; }`}</style>
    </div>
  );
}
