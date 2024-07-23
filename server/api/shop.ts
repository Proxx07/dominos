import type { IMenuResponse } from '~/composables/useShopData/types';

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig();
  const { token } = await $fetch<{ token: string }>(`${runtimeConfig.public.API_URL}/api/account/token`, {
    method: 'POST',
    body: {
      userName: 'admin',
      password: 'P@ssw0rd',
    },
  });

  const result = await $fetch<IMenuResponse>(`${runtimeConfig.public.API_URL}/api/regionmenu`, {
    query: {
      regionId: 0,
      Language: 2,
    },
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = result.categories;

  const mainFolders = data.filter(folder => !folder.parentId);
  const productList = data
    .filter(product => mainFolders.some(folder => product.parentId === folder.id))
    .map((product) => {
      return {
        ...product,
        modifiers: data.filter(item => product.id === item.parentId),
      };
    })
    .map((product) => {
      return {
        ...product,
        modifiers: product.modifiers.map((mod) => {
          return {
            ...mod,
            subModifier: data.filter(item => item.parentId === mod.id),
          };
        }),
      };
    });

  const response = {
    // productsForCart: result.products,
    folders: mainFolders,
    products: productList,
  };

  return response;
});
