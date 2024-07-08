// https://nuxt.com/docs/api/configuration/nuxt-config
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
    usePrimeVue: false,
    components: {
      include: ['Button', 'Select', 'Checkbox'],
    },
  },

  pinia: {
    storesDirs: ['./store/**'],
  },

  imports: {
    dirs: ['store'],
  },

  i18n: {
    vueI18n: './locales/config.ts',
  },

})
