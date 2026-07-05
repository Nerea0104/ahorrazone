import { getDictionary } from "../../lib/i18n";

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
  const dict = await getDictionary(lang);
  const t = dict.home;
  const p = t.preview;

  return (
    <>
      <section
        className="az-hero d-flex align-items-center"
        style={{ minHeight: "calc(100dvh - 62px)" }}
      >
        <span
          className="az-blob"
          style={{ width: 380, height: 380, top: -90, right: -70, background: "#6f42c1" }}
        />
        <span
          className="az-blob"
          style={{ width: 320, height: 320, bottom: -100, left: -80, background: "#0dcaf0" }}
        />

        <div className="w-100">
          <div className="container py-5">
            <div className="row align-items-center g-4 g-lg-5">
            {/* LEFT: phone mockup (the "image") */}
            <div className="col-lg-6 order-2 order-lg-1 d-flex justify-content-center">
              <div className="az-phone az-float">
                <div className="az-phone-header">
                  <span className="az-phone-avatar">🤖</span>
                  <div>
                    <div style={{ fontWeight: 700, lineHeight: 1.1 }}>{p.bot}</div>
                    <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                      {p.label}
                    </div>
                  </div>
                </div>
                <div className="az-alert mt-3">
                  <div style={{ fontWeight: 700, color: "#6f42c1" }}>{p.badge}</div>
                  <div className="mt-2" style={{ fontWeight: 600 }}>
                    📌 {p.product}
                  </div>
                  <div className="mt-1 d-flex align-items-center gap-2 flex-wrap">
                    <span className="text-muted text-decoration-line-through">{p.was}</span>
                    <span style={{ fontWeight: 700 }}>{p.now}</span>
                    <span className="badge" style={{ backgroundColor: "#198754" }}>
                      {p.pct}
                    </span>
                  </div>
                  <a
                    href="https://t.me/Ahorrazone_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-sm w-100 mt-3"
                    style={{ backgroundColor: "#6f42c1", color: "#fff", fontWeight: 600 }}
                  >
                    {p.cta}
                  </a>
                </div>
              </div>
            </div>

            {/* RIGHT: copy + CTAs */}
            <div className="col-lg-6 order-1 order-lg-2 az-fade-up">
              <p
                style={{
                  textTransform: "uppercase",
                  letterSpacing: "0.15em",
                  fontSize: "0.75rem",
                  color: "#6f42c1",
                  marginBottom: "16px",
                  fontWeight: 600,
                }}
              >
                {t.eyebrow}
              </p>

              <h1 className="az-h1">
                {t.h1Line1}
                <br />
                <span style={{ color: "#6f42c1" }}>{t.h1Line2}</span>
              </h1>

              <p className="mt-4 text-muted" style={{ fontSize: "1.1rem" }}>
                <strong>Ahorrazone</strong> {t.lead}
              </p>

              <div className="d-flex flex-wrap gap-3 mt-4">
                <a
                  href="https://t.me/Ahorrazone_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg az-lift"
                  style={{
                    backgroundColor: "#6f42c1",
                    border: "none",
                    color: "#fff",
                    boxShadow: "0 10px 20px rgba(111,66,193,0.3)",
                  }}
                >
                  {t.ctaTelegram}
                </a>
                <a
                  href="https://t.me/ahorrazonehunters"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-lg az-lift"
                  style={{
                    backgroundColor: "#fff",
                    border: "2px solid #6f42c1",
                    color: "#6f42c1",
                    fontWeight: 600,
                  }}
                >
                  {t.ctaChannel}
                </a>
              </div>

              <p className="text-muted mt-3" style={{ fontSize: "0.95rem" }}>
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
        </div>
        </div>
      </section>

      {/* How it works */}
      <section className="py-5" style={{ backgroundColor: "#fff" }}>
        <div className="container py-4">
          <h2 className="text-center" style={{ fontWeight: 700, marginBottom: "40px" }}>
            {t.stepsTitle}
          </h2>
          <div className="row g-4">
            {t.steps.map((s) => (
              <div className="col-md-4" key={s.h}>
                <div className="d-flex align-items-start gap-3">
                  <span className="az-step-num">{s.icon}</span>
                  <div>
                    <h5 style={{ fontWeight: 600 }}>{s.h}</h5>
                    <p className="text-muted mb-0">{s.p}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
