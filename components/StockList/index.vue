<script setup lang="ts">
import type { IStock } from '~/composables/useStocks/types';

defineProps<{
  title?: string
  list: IStock[]
}>();
</script>

<template>
  <h2 v-if="title">
    {{ title }}
  </h2>

  <div class="stocks-list">
    <stock-list-item
      v-for="item in list"
      :key="item.title"
      :item="item"
    />
  </div>
</template>

<style scoped>
h2 {
  margin-bottom: 1.5rem;
}
.stocks-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}
</style>
