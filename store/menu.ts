import { useMenu } from '~/composables/useMenu';

export const useMenuStore = defineStore('menu-store', () => {
  const { getMenu, list } = useMenu();
  const folders = ref<any>([]);
  const products = ref<any>([]);

  const getShopData = async () => {
    await getMenu();
    folders.value = list.value;
  };

  return {
    folders,
    products,

    getShopData,
  };
});
