import type { ICategory, IProduct } from '~/composables/useShopData/types';

export const useMenuStore = defineStore('menu-store', () => {
  const $route = useRoute();
  const productsForCart = ref<IProduct[]>([]);

  const categories = ref<ICategory[]>([]);

  const mainFolders = computed<ICategory[]>(() => {
    return categories.value.filter((folder: ICategory) => !folder.parentId);
  });

  const mainFoldersIds = computed<string[]>(() => {
    return mainFolders.value.map((i: ICategory) => i.id);
  });

  const folderNamesById = computed<Record<ICategory['id'], ICategory['name']>>(() => {
    return mainFolders.value.reduce((acc, curr) => {
      return { ...acc, [curr.id]: curr.name };
    }, {});
  });

  const products = computed(() => {
    return categories.value
      .filter(product => mainFolders.value.some(folder => product.parentId === folder.id))
      .map((product) => {
        return {
          ...product,
          modifiers: categories.value.filter(item => product.id === item.parentId),
        };
      })
      .map((product) => {
        return {
          ...product,
          modifiers: product.modifiers.map((mod) => {
            return {
              ...mod,
              subModifier: categories.value.filter(item => item.parentId === mod.id),
            };
          }),
        };
      });
  });

  const productList = computed(() => products.value.filter(product => activeFolder.value === product.parentId));

  const currentFolder = ref<string>($route.query.folder as string);
  const activeFolder = computed<string>(() => currentFolder.value ? currentFolder.value : mainFoldersIds.value[0]);

  const currentFolderName = computed<string>(() => {
    return folderNamesById.value[activeFolder.value];
  });

  return {
    productsForCart,
    categories,
    mainFolders,
    // mainFoldersIds,

    currentFolder,
    currentFolderName,

    products,
    productList,

    // modifierList,
    // modifierIds,
  };
});
