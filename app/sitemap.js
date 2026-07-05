import { getDealSlugs } from "../lib/deals";
import { locales } from "../lib/i18n";

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ahorrazone.es";
const PRIORITY_PAGE = 0.8;
const PRIORITY_DEAL = 0.6;

export default async function sitemap() {
  const slugRows = await getDealSlugs();

  const staticPages = locales.flatMap((lang) => [
    {
      url: `${SITE}/${lang}`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${SITE}/${lang}/ofertas`,
      lastModified: new Date(),
      changeFrequency: "hourly",
      priority: PRIORITY_PAGE,
    },
  ]);

  const dealPages = slugRows.flatMap(({ slug }) =>
    locales.map((lang) => ({
      url: `${SITE}/${lang}/ofertas/${slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: PRIORITY_DEAL,
    }))
  );

  return [...staticPages, ...dealPages];
}
