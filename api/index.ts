import { type LangTypes, ln } from '~/utils/constatns';

const API_URL = 'https://cc.dominos.com.uz';

const $request = $fetch.create({
  baseURL: API_URL,

  onRequest(context) {
    const token = useCookie('token');
    const { locale } = useI18n();

    const query = { ...context.options.query };
    context.options.query = {
      ...query,
      Language: ln[(locale.value ?? 'ru') as LangTypes],
    };
    if (token.value) {
      context.options.headers = {
        'Authorization': `Bearer ${token.value}`,
        'Content-type': 'application/json',
      };
    }
  },
});

export default $request;
