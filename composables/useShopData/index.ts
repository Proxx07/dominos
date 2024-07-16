import type { IMenuQuery, IMenuResponse } from './types';
import { setMenuQuery } from './models';
import $request from '~/api';
import { useMenuStore } from '~/store/menu';

export function useShopData() {
  const menuStore = useMenuStore();
  const cookie = useCookie('token');
  const query = ref<IMenuQuery>(setMenuQuery());

  const loginMockUser = async () => {
    cookie.value = '';
    const { data: result } = await useAsyncData('token', () => $request<{ token: string }>('/api/account/token', {
      method: 'POST',
      body: {
        userName: 'admin',
        password: 'P@ssw0rd',
      },
    }));
    cookie.value = result?.value?.token ?? '';
  };

  const getShopData = async () => {
    const { data: result } = await useAsyncData('menu', () => $request<IMenuResponse>('/api/regionmenu', {
      query: {
        regionId: 0,
      },
      headers: {
        Authorization: `Bearer ${cookie.value}`,
      },
    }));

    menuStore.productsForCart = result.value?.products ?? [];
    menuStore.categories = result.value?.categories ?? [];
  };

  return {
    loginMockUser,
    getShopData,
  };
}
