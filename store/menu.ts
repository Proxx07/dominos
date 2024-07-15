import { useMenu } from '~/composables/useMenu';

export const useMenuStore = defineStore('menu-store', () => {
  const { products, categories } = useMenu();

  return {
    products,
    categories,
  };
});
