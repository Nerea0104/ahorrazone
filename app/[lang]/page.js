import Link from "next/link";
import { getDictionary } from "../../lib/i18n";
import { getDeals } from "../../lib/deals";
import DealCard from "../../components/DealCard";
import HeroCarousel from "../../components/HeroCarousel";
import Reveal from "../../components/Reveal";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.homeTitle,
    description: dict.meta.homeDescription,
    alternates: { canonical: `/${lang}` },
    openGraph: {
      title: dict.meta.homeTitle,
      description: dict.meta.homeDescription,
      type: "website",
    },
  };
}

export default async function Home({ params }) {
  const { lang } = await params;
  const [dict, deals] = await Promise.all([getDictionary(lang), getDeals({ limit: 8 })]);
  const t = dict.home;

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────────── */}
      <section
        className="az-hero d-flex align-items-center"
        style={{ minHeight: "calc(100dvh - 62px)" }}
      >
        <span
          className="az-blob"
          style={{ width: 420, height: 420, top: -110, right: -80, background: "#6f42c1" }}
        />
        <span
          className="az-blob"
          style={{ width: 340, height: 340, bottom: -120, left: -90, background: "#0dcaf0" }}
        />
        <span
          className="az-blob"
          style={{ width: 200, height: 200, top: "40%", right: "30%", background: "#7c3aed", opacity: 0.15 }}
        />

        <div className="w-100">
          <div className="container py-5">
            <div className="row align-items-center g-4 g-lg-5">
              {/* LEFT: animated phone carousel */}
              <div className="col-lg-6 order-2 order-lg-1 d-flex justify-content-center">
                <HeroCarousel
                  slides={t.slides}
                  label={t.preview.label}
                  ctaLabel={t.preview.cta}
                />
              </div>

              {/* RIGHT: copy + CTAs */}
              <div className="col-lg-6 order-1 order-lg-2 az-fade-up">
                <p
                  style={{
                    textTransform: "uppercase",
                    letterSpacing: "0.14em",
                    fontSize: "0.73rem",
                    color: "#6f42c1",
                    marginBottom: "12px",
                    fontWeight: 700,
                  }}
                >
                  {t.eyebrow}
                </p>

                <h1 className="az-h1">
                  {t.h1Line1}
                  <br />
                  <span
                    style={{
                      background: "linear-gradient(135deg, #6f42c1 0%, #7c3aed 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {t.h1Line2}
                  </span>
                </h1>

                <p className="mt-3 text-muted" style={{ fontSize: "1.08rem", lineHeight: 1.65 }}>
                  <strong>Ahorrazone</strong> {t.lead}
                </p>

                <div className="d-flex flex-wrap gap-3 mt-4">
                  <a
                    href="https://t.me/Ahorrazone_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-primary az-lift"
                  >
                    ✈ {t.ctaTelegram}
                  </a>
                  <a
                    href="https://t.me/ahorrazonehunters"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="az-btn-outline az-lift"
                  >
                    {t.ctaChannel}
                  </a>
                </div>

                <p className="text-muted mt-3" style={{ fontSize: "0.9rem" }}>
                  {t.channelNote}
                </p>

                <div className="d-flex flex-wrap gap-2 mt-3">
                  {t.trust.map((c) => (
                    <span key={c} className="az-chip">
                      <span style={{ color: "#198754" }}>✓</span> {c}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Scroll hint */}
            <div className="text-center mt-5 pb-2 d-none d-lg-block">
              <span className="az-scroll-hint">↓</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ────────────────────────────────────────────────────── */}
      <section style={{ background: "#fff", borderBottom: "1px solid #f0ecfb" }}>
        <div className="container py-5">
          <div className="row g-4 text-center">
            {t.stats.map((s, i) => (
              <Reveal key={s.label} className="col-6 col-md-4" delay={i * 100}>
                <div className="az-stat-num">{s.num}</div>
                <div
                  className="text-muted mt-1"
                  style={{ fontSize: "0.9rem", fontWeight: 500 }}
                >
                  {s.label}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── LIVE DEALS ───────────────────────────────────────────────────── */}
      {deals.length > 0 && (
        <section style={{ background: "#fff", borderBottom: "1px solid #f0ecfb" }}>
          <div className="container py-5">
            <Reveal>
              <div className="d-flex flex-column flex-sm-row align-items-sm-end justify-content-sm-between gap-3 mb-5">
                <div>
                  <span
                    style={{
                      display: "inline-block",
                      background: "rgba(111,66,193,0.08)",
                      border: "1px solid rgba(111,66,193,0.18)",
                      borderRadius: "999px",
                      color: "#6f42c1",
                      fontSize: "0.75rem",
                      fontWeight: 700,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      padding: "4px 14px",
                      marginBottom: "12px",
                    }}
                  >
                    {t.dealsEyebrow}
                  </span>
                  <h2 className="az-section-title" style={{ marginBottom: "6px" }}>
                    {t.dealsTitle}
                  </h2>
                  <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>
                    {t.dealsSubtitle}
                  </p>
                </div>
                <Link
                  href={`/${lang}/ofertas`}
                  className="az-btn-outline"
                  style={{ whiteSpace: "nowrap", padding: "10px 22px", fontSize: "0.92rem" }}
                >
                  {t.dealsCta}
                </Link>
              </div>
            </Reveal>

            <div className="row row-cols-1 row-cols-sm-2 row-cols-lg-4 g-4">
              {deals.map((deal, i) => (
                <Reveal key={deal.slug} className="col" delay={i * 60}>
                  <DealCard deal={deal} dict={dict.deal} lang={lang} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── HOW IT WORKS ─────────────────────────────────────────────────── */}
      <section style={{ background: "#f8f9fc" }}>
        <div className="container py-5">
          <Reveal>
            <h2 className="az-section-title text-center" style={{ marginBottom: "48px" }}>
              {t.stepsTitle}
            </h2>
          </Reveal>
          <div className="row g-4">
            {t.steps.map((s, i) => (
              <Reveal key={s.h} className="col-md-4" delay={i * 120}>
                <div className="az-step-card">
                  <div className="d-flex align-items-center gap-3 mb-3">
                    <span className="az-step-num">{s.icon}</span>
                    <span
                      style={{
                        fontWeight: 800,
                        fontSize: "0.75rem",
                        color: "rgba(111,66,193,0.4)",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                      }}
                    >
                      0{i + 1}
                    </span>
                  </div>
                  <h5 style={{ fontWeight: 700, marginBottom: "8px" }}>{s.h}</h5>
                  <p className="text-muted mb-0" style={{ lineHeight: 1.65 }}>{s.p}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── CHANNEL CTA ──────────────────────────────────────────────────── */}
      <section className="az-channel-section">
        <div className="container py-5" style={{ position: "relative", zIndex: 1 }}>
          <Reveal>
            {/* Header */}
            <div className="text-center mb-5">
              <p className="az-channel-eyebrow">{t.channelCta.eyebrow}</p>
              <h2
                style={{
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 4vw, 2.6rem)",
                  letterSpacing: "-0.3px",
                  marginBottom: "12px",
                }}
              >
                {t.channelCta.h}
              </h2>
              <p
                style={{
                  color: "rgba(255,255,255,0.75)",
                  fontSize: "1.05rem",
                  maxWidth: "500px",
                  margin: "0 auto",
                  lineHeight: 1.65,
                }}
              >
                {t.channelCta.lead}
              </p>
            </div>

            {/* Features grid */}
            <div className="row g-3 mb-4">
              {t.channelCta.features.map((f, i) => (
                <div key={i} className="col-12 col-sm-6 col-lg-4">
                  <div
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "1px solid rgba(255,255,255,0.15)",
                      borderRadius: "14px",
                      padding: "16px 20px",
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      backdropFilter: "blur(8px)",
                    }}
                  >
                    <span style={{ fontSize: "1.4rem", flexShrink: 0 }}>{f.icon}</span>
                    <span style={{ color: "rgba(255,255,255,0.9)", fontSize: "0.9rem", fontWeight: 500, lineHeight: 1.4 }}>
                      {f.text}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Participation callout */}
            <div
              style={{
                background: "rgba(255,255,255,0.12)",
                border: "1px solid rgba(255,255,255,0.2)",
                borderRadius: "20px",
                padding: "28px 32px",
                marginBottom: "40px",
                backdropFilter: "blur(10px)",
              }}
            >
              <div className="row align-items-center g-3">
                <div className="col-lg-8">
                  <h4 style={{ color: "#fff", fontWeight: 700, marginBottom: "8px" }}>
                    👇 {t.channelCta.participateH}
                  </h4>
                  <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 0, lineHeight: 1.65, fontSize: "0.95rem" }}>
                    {t.channelCta.participateP}
                  </p>
                </div>
                <div className="col-lg-4 text-lg-end">
                  <div style={{ display: "flex", gap: "12px", flexWrap: "wrap", justifyContent: "flex-start" }} className="d-lg-flex justify-content-lg-end">
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>1</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>punto / post</div>
                    </div>
                    <div style={{ width: "1px", background: "rgba(255,255,255,0.2)", margin: "0 4px" }} />
                    <div style={{ textAlign: "center" }}>
                      <div style={{ fontSize: "2rem", fontWeight: 900, color: "#fff", lineHeight: 1 }}>100</div>
                      <div style={{ fontSize: "0.75rem", color: "rgba(255,255,255,0.6)", marginTop: "2px" }}>pts = regalo 🎁</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="text-center">
              <a
                href="https://t.me/ahorrazonehunters"
                target="_blank"
                rel="noopener noreferrer"
                className="az-channel-btn"
              >
                📢 {t.channelCta.cta}
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
