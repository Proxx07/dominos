<script setup lang="ts">
import type { ICartItem } from '~/composables/useShopData/types';
import { useLocationStorage } from '~/composables/useLocationStorage';

const menuStore = useMenuStore();
const modalStore = useLocationModalStore();
const cartStore = useCartStore();
const { isLocationSaved } = useLocationStorage();

useSeoMeta({
  title: () => menuStore.folderName,
  description: () => menuStore.folderName,
});

function productHandler(product: ICartItem) {
  if (!isLocationSaved.value) {
    modalStore.openLocationModal();
  }
  else {
    cartStore.addToCart(product);
  }
}
</script>

<template>
  <div class="page-content">
    <main-slider v-if="false" />
    <div v-if="false" class="container">
      <stock-list title="Акции дня" :list="[]" />
    </div>

    <div class="products container">
      <div class="products__header">
        <h2>{{ menuStore.folderName }}</h2>
      </div>
      <div class="products__list">
        <transition-group name="fade-slow">
          <product
            v-for="product in menuStore.productList"
            :key="product.id"
            :product="product"
            class="product"
            @add-to-cart="productHandler"
          />
        </transition-group>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.products {
  &__header {
    margin-bottom: 2rem;
  }
  &__list {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 2rem;
    .fade-slow-leave-active {
      display: none !important;
    }
  }
}
</style>
