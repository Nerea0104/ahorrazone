import Link from "next/link";
import { SOURCE_CONFIG, fmtPrice, fmtDate } from "../lib/deals";

export default function DealCard({ deal, dict, lang }) {
  const src = SOURCE_CONFIG[deal.source] ?? SOURCE_CONFIG.amazon;
  const now = fmtPrice(deal.price, deal.currency, lang);
  const was = deal.original_price ? fmtPrice(deal.original_price, deal.currency, lang) : null;
  const date = fmtDate(deal.detected_at, lang);

  return (
    <Link href={`/${lang}/ofertas/${deal.slug}`} className="az-deal-card az-card" style={{ display: "flex", flexDirection: "column" }}>
      {/* Image */}
      <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", borderRadius: "16px 16px 0 0", background: "#f8f9fc" }}>
        {deal.image_url ? (
          <img
            src={deal.image_url}
            alt={deal.title}
            style={{ width: "100%", height: "100%", objectFit: "contain", padding: "12px" }}
            loading="lazy"
          />
        ) : (
          <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "3rem", opacity: 0.2 }}>
            🛒
          </div>
        )}
        {/* Discount badge */}
        {deal.discount_pct > 0 && (
          <span style={{
            position: "absolute", top: 10, left: 10,
            background: "#198754", color: "#fff",
            fontWeight: 700, fontSize: "0.8rem",
            borderRadius: "8px", padding: "3px 8px",
          }}>
            −{deal.discount_pct}%
          </span>
        )}
        {/* Source badge */}
        <span style={{
          position: "absolute", top: 10, right: 10,
          background: src.bg, color: src.color,
          border: `1px solid ${src.border}`,
          fontWeight: 600, fontSize: "0.72rem",
          borderRadius: "6px", padding: "3px 8px",
        }}>
          {src.label}
        </span>
      </div>

      {/* Body */}
      <div style={{ padding: "16px", flex: 1, display: "flex", flexDirection: "column", gap: "8px" }}>
        <p style={{
          margin: 0, fontWeight: 600, fontSize: "0.92rem", lineHeight: 1.4,
          color: "#1a1033",
          display: "-webkit-box", WebkitLineClamp: 2,
          WebkitBoxOrient: "vertical", overflow: "hidden",
        }}>
          {deal.title}
        </p>

        {/* Price row */}
        <div style={{ display: "flex", alignItems: "baseline", gap: "8px", flexWrap: "wrap", marginTop: "auto" }}>
          {was && (
            <span style={{ textDecoration: "line-through", color: "#999", fontSize: "0.85rem" }}>{was}</span>
          )}
          <span style={{ fontWeight: 800, fontSize: "1.15rem", color: "#1a1033" }}>{now}</span>
        </div>

        {/* Detected on */}
        <p style={{ margin: 0, fontSize: "0.75rem", color: "#aaa" }}>
          {dict.detectedOn} {date}
        </p>

        {/* CTA */}
        <div
          style={{
            marginTop: "4px",
            background: "linear-gradient(135deg, #6f42c1 0%, #7c3aed 100%)",
            color: "#fff",
            fontWeight: 700,
            fontSize: "0.9rem",
            borderRadius: "10px",
            padding: "10px 14px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            boxShadow: "0 4px 12px rgba(111,66,193,0.25)",
          }}
        >
          {dict.view}
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </Link>
  );
}
