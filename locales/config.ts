import { en, ru, uz } from './langs';
import { defineI18nConfig } from '#i18n';
import { useLocale } from '@/composables/useLocale';

const { language, DEFAULT_LANGUAGE } = useLocale();

export default defineI18nConfig(() => ({
  locale: language.value,
  fallbackLocale: DEFAULT_LANGUAGE,
  messages: { en, ru, uz },
}));
