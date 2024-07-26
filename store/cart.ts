import { useLocalStorage } from '@vueuse/core';
import {useMenuStore} from "~/store/menu";
import type {IProduct, ICartItem} from "~/composables/useShopData/types";

export const useCartStore = defineStore('cart', () => {
  const menuStore = useMenuStore();
  const cartStorage = useLocalStorage<ICartItem[]>('cart', []);

  const cartStorageList = computed(() => [...cartStorage.value]);

  const cartList = computed<IProduct[]>(() => {
    return menuStore.productsForCart.filter(product => cartStorage.value.some(item => item.id === product.id));
  });

  const addToCart = (product: ICartItem) => {
    if (!cartStorageList.value.some(item => item.id === product.id)) {
      cartStorage.value.push(product)
    }

    else {
      cartStorage.value = cartStorageList.value.map(item => product.id === item.id ? product : item)
    }
  }

  const removeFromCart = (id: string) => {
    cartStorage.value = cartStorage.value.filter(item => item.id !== id)
  }

  return {
    cartList,
    cartStorageList,

    addToCart,
    removeFromCart,
  }
});
