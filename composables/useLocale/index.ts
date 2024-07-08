import { useStorage } from '@vueuse/core';
import type { lang } from './types';
import { DEFAULT_LANGUAGE, langs } from './models';

export function useLocale() {
  const language = useStorage<lang>('lang', DEFAULT_LANGUAGE);

  const setLocale = (value: lang) => {
    if (language.value === value)
      return;
    language.value = value;
    if (window)
      window.location.reload();
  };

  const options = ref(langs);

  return {
    language,
    setLocale,

    DEFAULT_LANGUAGE,
    options,
  };
}
