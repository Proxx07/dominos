<script setup lang="ts">
import { useImage } from '@vueuse/core';

const props = defineProps<{
  src: string
  width?: number // px
  alt?: string
}>();

const { isLoading } = useImage({ src: props.src });
</script>

<template>
  <div class="image" :style="{ '--width': width ? `${width}px` : '100%' }">
    <progress-spinner v-if="isLoading" class="spinner" />
    <transition name="fade">
      <img v-if="!isLoading" :src="props.src" :alt="alt ?? 'image'" loading="lazy">
    </transition>
  </div>
</template>

<style scoped lang="scss">
.image {
  position: relative;
  padding-bottom: 100%;
  width: var(--width);
  display: flex;
  justify-content: center;
  align-items: center;
  img, .spinner {
    position: absolute;
    inset: 0;
    object-fit: contain;
    object-position: center;
    max-width: 100%;
    max-height: 100%;
    margin: auto;
  }
}
</style>
