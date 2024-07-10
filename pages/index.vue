<script setup lang="ts">
import { useStocks } from '~/composables/useStocks';

const { mockData } = useStocks();
</script>

<template>
  <div class="page-content">
    <main-slider />

    <div class="container">
      <stock-list title="Акции дня" :list="mockData" />
    </div>
  </div>
</template>

<style scoped>
</style>
