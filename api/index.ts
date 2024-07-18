import { useToastStore } from '~/store/toasts';
import type { LangTypes } from '~/utils/constatns';

const API_URL = 'https://cc.dominos.com.uz';

const $request = $fetch.create({
  baseURL: API_URL,

  onRequest(context) {
    const token = useCookie('token');
    const locale = useCookie('lang');

    const query = context.options.query ? context.options.query : {};

    context.options.query = {
      Language: ln[(locale?.value ?? 'ru') as LangTypes],
      ...query,
    };

    const headers = context.options.headers && { ...context.options.headers };
    context.options.headers = {
      ...(headers && headers),
      ...(token.value && { Authorization: `Bearer ${token.value}` }),
      'Content-type': 'application/json',
    };
  },

  onResponseError(context) {
    const $toast = useToastStore();
    if (context.response.status === 401) {
      $toast.error('Ошибка!', 'Не авторизованный пользователь');
    }
    else {
      $toast.error('Ошибка сервера', 'Что-то пошло не так.');
    }
  },
});

export default $request;
