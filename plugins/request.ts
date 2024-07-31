import type { LangTypes } from '~/utils/constatns';

export default defineNuxtPlugin((nuxtApp) => {
  const request = $fetch.create({
    baseURL: nuxtApp.$config.public.API_URL,

    async onRequest({ options }) {
      await $fetch('/api/token');
      const token = useCookie('token');
      const locale = useCookie('lang');

      const method = options.method?.toLowerCase() ?? 'get';

      if (method === 'get') {
        const query = options.query ? options.query : {};
        options.query = {
          Language: ln[(locale?.value ?? 'ru') as LangTypes],
          ...query,
        };
      }

      if (method === 'post' && options.body?.hasOwnProperty) {
        const body = options?.body ? options.body : {};
        options.body = {
          language: ln[(locale?.value ?? 'ru') as LangTypes],
          ...body as object,
        };
      }

      const headers = options.headers && { ...options.headers };
      options.headers = {
        ...(headers && headers),
        ...(token.value && { Authorization: `Bearer ${token.value}` }),
        'Content-type': 'application/json',
      };
    },

    // async onResponseError({ response }) {
    //   if (response.status === 401) {
    //     await nuxtApp.runWithContext(() => navigateTo('/login'));
    //   }
    // },
  });

  // Expose to useNuxtApp().$requests
  return { provide: { request } };
});
