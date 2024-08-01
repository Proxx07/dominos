import { useLocalStorage } from '@vueuse/core';
import { useMenuStore } from '~/store/menu';
import type { ICartItem, IProductInCart } from '~/composables/useShopData/types';

export const useCartStore = defineStore('cart', () => {
  const menuStore = useMenuStore();
  const cartStorage = useLocalStorage<ICartItem[]>('cart', []);

  const cartStorageList = computed<ICartItem[]>(() => [...cartStorage.value]);

  const cartList = computed<IProductInCart[]>(() => {
    return menuStore.productsForCart
      .filter(product => cartStorageList.value.some(item => item.id === product.id))
      .map((product) => {
        const prod = cartStorageList.value.find(item => item.id === product.id);
        return {
          ...product,
          amount: prod?.amount ?? 0,
        };
      });
  });

  const totalAmount = computed<number>(() => {
    return [...cartStorageList.value].reduce((acc, product) => acc += product.amount, 0);
  });

  const totalPrice = computed<number>(() => {
    return [...cartList.value].reduce((acc, product) => acc = acc + (product.amount * product.price), 0);
  });

  const removeFromCart = (id: string) => {
    cartStorage.value = cartStorageList.value.filter(item => item.id !== id);
  };

  const addToCart = (product: ICartItem) => {
    if (product.amount < 1) {
      removeFromCart(product.id);
      return;
    }

    if (!cartStorageList.value.some(item => item.id === product.id)) {
      cartStorage.value.push(product);
    }

    else {
      cartStorage.value = cartStorageList.value.map(item => product.id === item.id ? product : item);
    }
  };

  const clearCart = () => {
    cartStorage.value = [];
  };

  return {
    cartList,
    cartStorageList,
    totalPrice,
    totalAmount,

    addToCart,
    removeFromCart,
    clearCart,
  };
});
