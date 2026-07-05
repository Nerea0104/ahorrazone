import Link from "next/link";

// Plain flex header (not Bootstrap's .navbar, which forces nowrap with navbar-expand
// and overflows on narrow screens). Wraps cleanly on small viewports.
export default function Navigation({ lang, dict }) {
  const other = lang === "es" ? "en" : "es";
  const linkStyle = { color: "#6f42c1", fontWeight: 500 };
  return (
    <header className="bg-white shadow-sm">
      <div className="container d-flex flex-wrap align-items-center justify-content-between gap-2 py-2">
        <Link href={`/${lang}`} className="d-flex align-items-center">
          <span
            style={{
              fontWeight: 700,
              fontSize: "1.5rem",
              color: "#6f42c1",
              marginRight: "8px",
              letterSpacing: "-0.5px",
            }}
          >
            Ahorrazone
          </span>
          <span style={{ fontSize: "1.5rem" }}>💰</span>
        </Link>

        <nav className="d-flex align-items-center gap-3">
          <Link href={`/${lang}/ofertas`} style={linkStyle}>
            {dict.ofertas}
          </Link>
          <Link href={`/${lang}/privacy`} style={linkStyle}>
            {dict.privacy}
          </Link>
          <Link
            href={`/${other}`}
            style={{
              color: "#6f42c1",
              fontWeight: 600,
              border: "1px solid #6f42c1",
              borderRadius: "8px",
              padding: "2px 10px",
              fontSize: "0.85rem",
            }}
          >
            {other.toUpperCase()}
          </Link>
        </nav>
      </div>
    </header>
  );
}
