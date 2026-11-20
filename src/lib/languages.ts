/**
 * Languages offered in the site's language picker: English plus the four most
 * spoken first languages in the EU. Names are written in their own language.
 */
export const languages = [
  { code: "en", name: "English", short: "EN" },
  { code: "de", name: "Deutsch", short: "DE" },
  { code: "fr", name: "Français", short: "FR" },
  { code: "es", name: "Español", short: "ES" },
  { code: "it", name: "Italiano", short: "IT" },
] as const;

export type LanguageCode = (typeof languages)[number]["code"];

export const defaultLanguage: LanguageCode = "en";

/** Cookie that remembers the visitor's choice (read by the server once pages are translated). */
export const languageCookie = "clippy-lang";
