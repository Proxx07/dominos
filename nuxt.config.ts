// https://nuxt.com/docs/api/configuration/nuxt-config
import { DEFAULT_LANGUAGE } from './utils/constatns';
import { options } from './plugins/PrimveVue/config';

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-07-03',

  app: {
    pageTransition: { name: 'page', mode: 'out-in' },
  },

  css: [
    './primeicons/primeicons.css',
    '~/assets/styles/main.scss',
  ],

  modules: [
    '@vueuse/nuxt',
    '@nuxtjs/i18n',
    '@pinia/nuxt',
    '@primevue/nuxt-module',
  ],

  primevue: {
    autoImport: false,
    options,
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  imports: {
    dirs: ['store'],
  },

  i18n: {
    lazy: true,
    langDir: 'locales',
    strategy: 'prefix_except_default',
    defaultLocale: DEFAULT_LANGUAGE,
    vueI18n: './locales/config.ts',
    locales: [
      {
        code: 'ru',
        iso: 'ru-RU',
        name: 'Русский',
        file: 'ru.json',
      },
      {
        code: 'en',
        iso: 'en-US',
        name: 'English',
        file: 'en.json',
      },
      {
        code: 'uz',
        iso: 'uz-UZ',
        name: 'O`zbekcha',
        file: 'uz.json',
      },
    ],
  },

});
