import Link from "next/link";

export default function Footer({ lang, dict }) {
  const year = new Date().getFullYear();
  const other = lang === "es" ? "en" : "es";

  const col = {
    fontWeight: 600,
    fontSize: "0.8rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    color: "rgba(255,255,255,0.45)",
    marginBottom: "14px",
  };
  const link = {
    color: "rgba(255,255,255,0.75)",
    fontSize: "0.95rem",
    display: "block",
    marginBottom: "10px",
    transition: "color 0.15s",
  };
  const storeChip = {
    display: "inline-flex",
    alignItems: "center",
    gap: "6px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.12)",
    borderRadius: "8px",
    padding: "6px 12px",
    color: "rgba(255,255,255,0.75)",
    fontSize: "0.88rem",
    marginBottom: "8px",
    marginRight: "8px",
  };

  return (
    <footer style={{ background: "#100d1f", color: "rgba(255,255,255,0.6)" }}>
      {/* Main grid */}
      <div className="container" style={{ padding: "56px 12px 40px" }}>
        <div className="row g-4 g-lg-5">
          {/* Brand column */}
          <div className="col-12 col-sm-6 col-lg-4">
            <Link
              href={`/${lang}`}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
                fontWeight: 700,
                fontSize: "1.35rem",
                color: "#fff",
                marginBottom: "14px",
              }}
            >
              Ahorrazone <span>💰</span>
            </Link>
            <p style={{ fontSize: "0.95rem", lineHeight: 1.6, maxWidth: "260px" }}>
              {dict.tagline}
            </p>
            <a
              href="https://t.me/Ahorrazone_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                marginTop: "8px",
                background: "#6f42c1",
                color: "#fff",
                borderRadius: "10px",
                padding: "9px 18px",
                fontWeight: 600,
                fontSize: "0.9rem",
                transition: "background 0.15s",
              }}
            >
              ✈ {dict.linkBot}
            </a>
          </div>

          {/* Explore */}
          <div className="col-6 col-sm-3 col-lg-2">
            <p style={col}>{dict.colExplore}</p>
            <Link href={`/${lang}/ofertas`} style={link}>{dict.linkDeals}</Link>
            <Link href={`/${lang}/privacy`} style={link}>{dict.linkPrivacy}</Link>
            <Link
              href={`/${other}`}
              style={{
                ...link,
                background: "rgba(255,255,255,0.07)",
                border: "1px solid rgba(255,255,255,0.12)",
                borderRadius: "6px",
                display: "inline-block",
                padding: "3px 10px",
                fontSize: "0.85rem",
                marginTop: "4px",
              }}
            >
              {other.toUpperCase()}
            </Link>
          </div>

          {/* Community */}
          <div className="col-6 col-sm-3 col-lg-2">
            <p style={col}>{dict.colCommunity}</p>
            <a
              href="https://t.me/Ahorrazone_bot"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              {dict.linkBot}
            </a>
            <a
              href="https://t.me/ahorrazonehunters"
              target="_blank"
              rel="noopener noreferrer"
              style={link}
            >
              {dict.linkChannel}
            </a>
          </div>

          {/* Stores */}
          <div className="col-12 col-lg-4">
            <p style={col}>{dict.colStores}</p>
            <div>
              <span style={storeChip}>🛒 Amazon</span>
              <span style={storeChip}>🛍 AliExpress</span>
              <span style={storeChip}>🏬 El Corte Inglés</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          borderTop: "1px solid rgba(255,255,255,0.08)",
          padding: "20px 12px",
        }}
      >
        <div className="container">
          <div className="d-flex flex-wrap gap-3 align-items-start justify-content-between">
            <p style={{ margin: 0, fontSize: "0.83rem" }}>
              © {year} {dict.copyright}
            </p>
            <p
              style={{
                margin: 0,
                fontSize: "0.8rem",
                maxWidth: "560px",
                lineHeight: 1.55,
                opacity: 0.6,
              }}
            >
              {dict.affiliate}
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
