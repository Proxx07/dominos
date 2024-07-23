import type {ICategory, IProcessedProduct, IProduct} from '~/composables/useShopData/types';

export const useMenuStore = defineStore('menu-store', () => {
  const $route = useRoute();
  const productsForCart = ref<IProduct[]>([]);

  const products = ref<IProcessedProduct[]>([]);
  const folders = ref<ICategory[]>([]);

  const currentFolder = computed<ICategory>(() => {
    return $route.query.folder
      ? folders.value.filter(folder => folder.id === $route.query.folder)[0]
      : folders.value[0]
  });

  const folderName = computed<string>(() => {
    return currentFolder.value?.name ?? "Domino's"
  });

  const productList = computed<IProcessedProduct[]>(() => {
    return [...products.value].filter(product => currentFolder.value.id === product.parentId)
  });

  return {
    folders,
    products,
    productList,

    folderName,
    currentFolder,

    productsForCart,
  }

});
