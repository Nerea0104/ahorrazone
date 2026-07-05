import { getDictionary } from "../../../lib/i18n";

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.privacyTitle,
    alternates: { canonical: `/${lang}/privacy` },
    robots: { index: false },
  };
}

export default async function Privacy({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  const t = dict.privacy;

  return (
    <div
      style={{
        backgroundColor: "#f8f9fc",
        minHeight: "100vh",
        paddingTop: "50px",
        paddingBottom: "50px",
      }}
    >
      <div className="container">
        <div className="az-card" style={{ padding: "40px" }}>
          <h1 style={{ color: "#6f42c1", fontWeight: 700, marginBottom: "20px" }}>{t.title}</h1>
          <p style={{ fontSize: "1rem", color: "#555", marginBottom: "25px" }}>{t.intro}</p>

          {t.sections.map((s) => (
            <div key={s.h}>
              <h5 style={{ color: "#6f42c1", fontWeight: 600, marginTop: "25px" }}>{s.h}</h5>
              <p style={{ color: "#555" }}>{s.p}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
