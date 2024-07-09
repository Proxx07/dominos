<script setup lang="ts">
import type { IStock } from '~/composables/useStocks/types';

defineProps<{
  item: IStock
}>();
</script>

<template>
  <div class="item">
    <div class="image">
      <img :src="item.image" :alt="item.title">
    </div>

    <div class="details">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="text">
        {{ item.text }}
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.item {
  padding: .5rem;
  border-radius: var(--radius-m);
  display: flex;
  gap: 1rem;
  background: var(--white);
  .image {
    min-width: 12.6rem;
    height: 12.6rem;
    font-size: 0;
    img {
      max-width: 100%;
      max-height: 12.6rem;
      border-radius: var(--radius-m);
    }
  }
  .title {
    font: var(--font-16-n);
  }
  .text {
    font: var(--font-14-n);
    color: var(--black);
    opacity: 0.6;
  }
}
</style>
