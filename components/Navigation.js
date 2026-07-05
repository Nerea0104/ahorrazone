import Link from "next/link";

export default function Navigation({ lang, dict }) {
  const other = lang === "es" ? "en" : "es";

  return (
    <header className="az-nav">
      <div
        className="container d-flex flex-wrap align-items-center justify-content-between gap-2"
        style={{ padding: "10px 12px" }}
      >
        {/* Brand */}
        <Link href={`/${lang}`} className="az-nav-brand">
          <span className="az-nav-brand-text">Ahorrazone</span>
          <span style={{ fontSize: "1.3rem" }}>💰</span>
        </Link>

        {/* Nav + CTA */}
        <nav style={{ display: "flex", alignItems: "center", gap: "4px", flexWrap: "wrap" }}>
          <Link href={`/${lang}/ofertas`} className="az-nav-link">{dict.ofertas}</Link>
          <Link href={`/${lang}/privacy`} className="az-nav-link">{dict.privacy}</Link>
          <Link href={`/${other}`} className="az-nav-locale">{other.toUpperCase()}</Link>
          <a
            href="https://t.me/Ahorrazone_bot"
            target="_blank"
            rel="noopener noreferrer"
            className="az-nav-cta"
          >
            ✈ {dict.cta}
          </a>
        </nav>
      </div>
    </header>
  );
}
