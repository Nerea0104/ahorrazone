import "bootstrap/dist/css/bootstrap.min.css";
import "../globals.css";

import Navigation from "../../components/Navigation";
import { getDictionary, isLocale, locales } from "../../lib/i18n";

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export const metadata = {
  metadataBase: new URL("https://ahorrazone.vercel.app"),
  icons: { icon: "/favicon.png", apple: "/favicon.png" },
};

export const viewport = {
  themeColor: "#6f42c1",
};

export default async function LangLayout({ children, params }) {
  const { lang } = await params;
  const locale = isLocale(lang) ? lang : "es";
  const dict = await getDictionary(locale);
  return (
    <html lang={locale}>
      <body>
        <Navigation lang={locale} dict={dict.nav} />
        {children}
      </body>
    </html>
  );
}
