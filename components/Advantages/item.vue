<script setup lang="ts">
import type { IAdvantage } from './types';

defineProps<{
  item: IAdvantage
}>();
</script>

<template>
  <div class="item">
    <Icon :icon="item.image" no-fill class="icon" />
    <div class="title" v-html="item.title" />
    <div class="text" v-html="item.text" />
  </div>
</template>

<style scoped lang="scss">
.item {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  text-align: center;
  align-items: center;
  padding: 2rem 2rem 3rem;
  .icon {
    min-height: 48px;
    display: block;
  }
  .title {
    padding-top: 1rem;
    color: var(--secondary-500);
    font: var(--font-32-b);
  }

  .text {
    color: var(--primary-600);
  }
}
</style>
