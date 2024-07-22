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
    <main-slider />

    <div class="container">
      <stock-list title="Акции дня" :list="[]" />
    </div>

    <div class="container">
      <div class="products">
        <div class="products__header">
          <h2>Пицца</h2>
          <div class="product-folders" />
        </div>
        <div class="products__list" />
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

</style>
