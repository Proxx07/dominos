import type { EventHandlerRequest, H3Event } from 'h3';
import { getQuery, setCookie } from 'h3';
import type {
  ICategory,
  IMenuQuery,
  IMenuResponse,
  IProcessedProduct,
  IProcessedResponse,
} from '~/composables/useShopData/types';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const runtimeConfig = useRuntimeConfig();

  const { token } = await $fetch<{ token: string }>(`${runtimeConfig.public.API_URL}/api/account/token`, {
    method: 'POST',
    body: {
      userName: 'admin',
      password: 'P@ssw0rd',
    },
  });

  const query = getQuery<IMenuQuery>(event);

  const result = (query?.RestaurantId || (query.Longitude && query.Latitude))
    ? await $fetch<IMenuResponse>(`${runtimeConfig.public.API_URL}/api/menu`, {
      query: {
        ...query,
        regionId: query.RegionId ?? 0,
        Language: query.Language ?? 2,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    : await $fetch<IMenuResponse>(`${runtimeConfig.public.API_URL}/api/regionmenu`, {
      query: {
        regionId: query.RegionId ?? 0,
        Language: query.Language ?? 2,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  const mainFolders: ICategory[] = !result.error ? result.categories.filter(folder => !folder.parentId) : [];
  const productList: IProcessedProduct[] = !result.error
    ? result.categories
      .filter((product: ICategory) => mainFolders.some(folder => product.parentId === folder.id))
      .map((product: ICategory) => ({ ...product, modifiers: result.categories.filter(item => product.id === item.parentId) }))
      .map((product: IProcessedProduct) => {
        return {
          ...product,
          modifiers: !product.modifiers
            ? []
            : product.modifiers.map((modifier: IProcessedProduct) => {
              return {
                ...modifier,
                modifiers: result.categories.filter(item => item.parentId === modifier.id),
              };
            }),
        };
      })
    : [];

  setCookie(event, 'token', token);

  const response: IProcessedResponse = {
    folders: mainFolders,
    products: productList,

    productsForCart: result?.products ?? [],
    priceOfDelivery: result?.priceOfDelivery ?? 0,
    deliveryDuration: result?.deliveryDuration ?? 0,

    error: result?.error || '',
  };

  return response;
});
