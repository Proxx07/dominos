<script setup lang="ts">
import { useStocks } from '~/composables/useStocks';

const { mockData } = useStocks();
</script>

<template>
  <div class="main-page-content">
    <div class="slider">
      <img src="@/assets/images/pictures/slider-image.jpg" alt="1">
    </div>

    <stock-list title="Акции дня" :list="mockData" />
  </div>
</template>

<style scoped>
img {
  border-right: var(--radius-m);
}
</style>
