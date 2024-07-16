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

  const currentFolder = ref<string>($route.query.folder as string);

  const activeFolder = computed(() => currentFolder.value ? currentFolder.value : mainFoldersIds.value[0]);

  const productList = computed(() => categories.value.filter((folder: ICategory) => {
    return mainFoldersIds.value.includes(folder.parentId) && folder.parentId === activeFolder.value;
  }));

  const folderNamesById = computed<Record<ICategory['id'], ICategory['name']>>(() => {
    return mainFolders.value.reduce((acc, curr) => {
      return { ...acc, [curr.id]: curr.name };
    }, {});
  });

  const currentFolderName = computed<string>(() => {
    return folderNamesById.value[activeFolder.value];
  });

  return {
    productsForCart,
    categories,
    mainFolders,
    mainFoldersIds,

    productList,
    currentFolder,
    currentFolderName,
  };
});
