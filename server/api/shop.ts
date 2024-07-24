import type { EventHandlerRequest, H3Event } from 'h3';
import { getQuery } from 'h3';
import type { ICategory, IMenuResponse, IProcessedProduct, IProcessedResponse } from '~/composables/useShopData/types';

export default defineEventHandler(async (event: H3Event<EventHandlerRequest>) => {
  const runtimeConfig = useRuntimeConfig();
  const { token } = await $fetch<{ token: string }>(`${runtimeConfig.public.API_URL}/api/account/token`, {
    method: 'POST',
    body: {
      userName: 'admin',
      password: 'P@ssw0rd',
    },
  });

  const query = getQuery(event);

  const result = await $fetch<IMenuResponse>(`${runtimeConfig.public.API_URL}/api/regionmenu`, {
    query: {
      regionId: query.regionId ?? 0,
      Language: query.Language ?? 2,
    },
    headers: {
      Authorization: `Bearer ${token}`,
      Token: token,
    },
  });

  const mainFolders: ICategory[] = result.categories.filter(folder => !folder.parentId);
  const productList: IProcessedProduct[] = result.categories
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
    });

  const response: IProcessedResponse = {
    folders: mainFolders,
    products: productList,

    productsForCart: result.products,
    priceOfDelivery: result.priceOfDelivery,
    deliveryDuration: result.deliveryDuration,
  };

  return response;
});
