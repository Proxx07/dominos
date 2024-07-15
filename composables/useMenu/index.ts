import type { ICategory, IMenuQuery, IMenuResponse, IProduct } from './types';
import { setMenuQuery } from './models';
import $request from '~/api';

export function useMenu() {
  const cookie = useCookie('token');

  const query = ref<IMenuQuery>(setMenuQuery());

  const categories = ref<ICategory[]>([]);
  const products = ref<IProduct[]>([]);

  const loginMockUser = async () => {
    if (!window) {
      cookie.value = '';
      const result = await $request<{ token: string }>('/api/account/token', {
        method: 'POST',
        body: {
          userName: 'admin',
          password: 'P@ssw0rd',
        },
      });
      cookie.value = result.token;
    }
  };

  const getMenu = async () => {
    const { data: result } = await useAsyncData('menu', () => $request<IMenuResponse>('/api/menu', { query: query.value }));
    categories.value = result.value?.categories ?? [];
    products.value = result.value?.products ?? [];
  };

  return {
    getMenu,
    categories,
    products,

    loginMockUser,
  };
}
