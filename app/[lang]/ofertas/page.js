import { getDictionary } from "../../../lib/i18n";
import { getDeals } from "../../../lib/deals";
import DealsGrid from "../../../components/DealsGrid";

export const revalidate = 3600;

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const dict = await getDictionary(lang);
  return {
    title: dict.meta.ofertasTitle,
    description: dict.meta.ofertasDescription,
    alternates: { canonical: `/${lang}/ofertas` },
    openGraph: {
      title: dict.meta.ofertasTitle,
      description: dict.meta.ofertasDescription,
      type: "website",
    },
  };
}

export default async function OfertasPage({ params }) {
  const { lang } = await params;
  const [dict, deals] = await Promise.all([getDictionary(lang), getDeals({ limit: 96 })]);
  const t = dict.ofertas;

  return (
    <div style={{ minHeight: "60vh" }}>
      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(111,66,193,0.08) 0%, rgba(13,202,240,0.05) 100%)",
          borderBottom: "1px solid rgba(111,66,193,0.1)",
          padding: "48px 0 40px",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 4vw, 2.4rem)",
              marginBottom: "8px",
              color: "#1a1033",
            }}
          >
            {t.title}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "1rem", margin: 0 }}>{t.subtitle}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="container py-5">
        <DealsGrid deals={deals} dict={dict} lang={lang} />
      </div>
    </div>
  );
}
