import { NextResponse } from "next/server";

import { defaultLocale, locales } from "./lib/i18n";

// Every page lives under /es or /en. Any path without a locale prefix is redirected
// to the default locale (Spanish, the main market). Static files and Next internals
// are excluded via the matcher below.
export function middleware(request) {
  const { pathname } = request.nextUrl;
  const hasLocale = locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`));
  if (hasLocale) return;

  request.nextUrl.pathname = `/${defaultLocale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  // Skip Next internals, the API, and anything with a file extension (favicon, etc.).
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
