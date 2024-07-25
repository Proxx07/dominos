<script setup lang="ts">
const menuStore = useMenuStore();
const modal = ref<boolean>(true);

useSeoMeta({
  title: () => menuStore.folderName,
  description: () => menuStore.folderName,
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
          <h2>{{ menuStore.folderName }}</h2>
        </div>
        <div class="products__list">
          <transition-group name="fade-slow">
            <product v-for="product in menuStore.productList" :key="product.id" :product="product" class="product" />
          </transition-group>
        </div>
      </div>
    </div>

    <client-only>
      <Dialog v-model:visible="modal" class="md" modal :draggable="false" header="Выберите тип приема">
        <delivery-map-widget @submit="modal = true" />
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
    .fade-slow-leave-active {
      display: none !important;
    }
  }
}
</style>
