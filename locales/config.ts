import {defineI18nConfig} from "#i18n";
import {en, ru, uz} from './langs'

const DEFAULT_LANG = 'ru';

export default defineI18nConfig(() => ({
  locale: DEFAULT_LANG,
  fallbackLocale: DEFAULT_LANG,
  messages: {en, ru, uz},
}));