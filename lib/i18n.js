import { dictionaries } from "./dictionaries";

export const locales = ["es", "en"];
export const defaultLocale = "es";

export function isLocale(value) {
  return locales.includes(value);
}

// Server-side dictionary lookup. Falls back to the default locale for unknown langs.
export async function getDictionary(lang) {
  return dictionaries[lang] ?? dictionaries[defaultLocale];
}
