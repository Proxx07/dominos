// https://nuxt.com/docs/api/configuration/nuxt-config
import process from 'node:process';
import { DEFAULT_LANGUAGE } from './utils/constatns';
import { options } from './plugins/PrimveVue/config';

export default defineNuxtConfig({
  devtools: { enabled: false },
  compatibilityDate: '2024-07-03',

  app: {
    pageTransition: { name: 'fade-slow', mode: 'out-in' },
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
    'vue-yandex-maps/nuxt',
  ],

  runtimeConfig: {
    public: {
      API_URL: process.env.API_BASE_URL,
      MAP_SUGGEST_KEY: process.env.MAPS_SEARCH_API_KEY,
    },
  },

  yandexMaps: {
    apikey: process.env.MAPS_API_KEY,
  },

  primevue: {
    autoImport: false,
    components: {
      include: [
        'Button', 'ConfirmDialog', 'Dialog', 'Toast', 'Card', 'InputNumber', 'Chip',
        'InputText', 'InputGroup', 'InputGroupAddon', 'InputIcon', "Skeleton", 'Badge',
        'InputMask', 'Select', 'SelectButton', 'Message', 'Menubar', 'ProgressSpinner',
        'Popover', 'TextArea',
      ]
    },
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
