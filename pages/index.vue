<script setup lang="ts">
import { useStocks } from '~/composables/useStocks';

const { mockData } = useStocks();
const menuStore = useMenuStore();

menuStore.getShopData();
</script>

<template>
  <div class="page-content">
    <main-slider />

    <div class="container">
      <pre>
categories: {{ menuStore.folders.categories }}
       </pre>
      <hr>
      <pre>
products: {{ menuStore.folders.products }}
       </pre>
    </div>
    <div class="container">
      <stock-list title="Акции дня" :list="mockData" />
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
  </div>
</template>

<style scoped>
</style>
