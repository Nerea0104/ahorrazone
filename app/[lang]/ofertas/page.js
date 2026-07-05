import { getDictionary } from "../../../lib/i18n";
import { getDeals, getDealsToday } from "../../../lib/deals";
import DealsGrid from "../../../components/DealsGrid";
import DealsFeatured from "../../../components/DealsFeatured";

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
  const [dict, todayDeals, deals] = await Promise.all([
    getDictionary(lang),
    getDealsToday({ fallbackLimit: 6 }),
    getDeals({ limit: 48 }),
  ]);
  const t = dict.ofertas;

  // Detect if the featured deals are actually from today
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const isToday =
    todayDeals.length > 0 &&
    todayDeals[0].detected_at &&
    new Date(todayDeals[0].detected_at).toISOString().slice(0, 10) === todayStr;

  return (
    <div style={{ minHeight: "60vh" }}>
      {/* Featured deals strip */}
      <DealsFeatured deals={todayDeals} dict={dict} lang={lang} isToday={isToday} />

      {/* Header */}
      <div
        style={{
          background: "linear-gradient(135deg, rgba(111,66,193,0.06) 0%, rgba(13,202,240,0.04) 100%)",
          borderBottom: "1px solid rgba(111,66,193,0.08)",
          padding: "36px 0 28px",
        }}
      >
        <div className="container">
          <h1
            style={{
              fontWeight: 800,
              fontSize: "clamp(1.6rem, 3.5vw, 2.2rem)",
              marginBottom: "6px",
              color: "#1a1033",
            }}
            id="grid"
          >
            {t.title}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.97rem", margin: 0 }}>{t.subtitle}</p>
        </div>
      </div>

      {/* Grid */}
      <div className="container py-5">
        <DealsGrid deals={deals} dict={dict} lang={lang} />
      </div>
    </div>
  );
}
