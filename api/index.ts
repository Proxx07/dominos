import { type LangTypes, ln } from '~/utils/constatns';
import { useToastStore } from '~/store/toasts';

const API_URL = 'https://cc.dominos.com.uz';

const $request = $fetch.create({
  baseURL: API_URL,

  onRequest(context) {
    const token = useCookie('token');
    const { locale } = useI18n();

    if (context.options.query) {
      const query = { ...context.options.query };
      context.options.query = {
        ...query,
        Language: ln[(locale.value ?? 'ru') as LangTypes],
      };
    }

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
