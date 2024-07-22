<script setup lang="ts">
import { useMenu } from '~/composables/useMenu';

const menuStore = useMenuStore();

const modal = ref<boolean>(true);

const { getMenuByLocation } = useMenu();

useSeoMeta({
  title: () => menuStore.currentFolderName,
  description: () => menuStore.currentFolderName,
});

onMounted(() => {
  getMenuByLocation();
});
</script>

<template>
  <div class="page-content">
    <!--    <main-slider /> -->

    <div v-if="false" class="container">
      <stock-list title="Акции дня" :list="[]" />
    </div>

    <div class="container">
      <div class="products">
        <div class="products__header">
          <h2>{{ menuStore.currentFolderName }}</h2>
        </div>
        <div class="products__list">
          <transition-group name="slideY">
            <div v-for="product in menuStore.productList" :key="product.id" class="product">
              <Image :src="product.bigImageUrl" :alt="product.name" preview />
              <div class="product__name">
                {{ product.name }}
              </div>
            </div>
          </transition-group>
        </div>
      </div>
    </div>

    <client-only>
      <Dialog v-model:visible="modal" class="md" modal :draggable="false" header="Выберите тип приема">
        <delivery-map-widget @submit="modal = false" />
      </Dialog>
    </client-only>
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
  }
}

.product {
  background: var(--white);
  padding: 1.6rem;
  border-radius: var(--radius-l);
  box-shadow: var(--shadow);
  &__name {
    font: var(--font-18-b);
    color: var(--accent-text);
    text-align: center;
  }
}
</style>
