export type LangTypes = 'ru' | 'en' | 'uz';
export const DEFAULT_LANGUAGE: LangTypes = 'ru';

export const ln: Record<LangTypes, number> = {
  uz: 1,
  ru: 2,
  en: 3,
};

export function stringQueryCheck(query: string, string?: string) {
  const q = query;
  return (s: string | void = string) => {
    if (!s) return true;
    return s.toLowerCase().includes(q.toLowerCase());
  };
}
