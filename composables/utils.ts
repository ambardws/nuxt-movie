import LANGUAGES from "../constant/languages";

export function formatLang(iso: string) {
  const fullLang = LANGUAGES.find((lang) => lang.iso_639_1 === iso);

  if (fullLang) return fullLang.english_name;

  return iso;
}
