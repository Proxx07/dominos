<script setup lang="ts">
import sliderImage from '@/assets/images/pictures/slider-image.jpg';

const images = ref([sliderImage, sliderImage, sliderImage, sliderImage]);
</script>

<template>
  <div class="container">
    <Carousel class="main-slider" :value="images" :num-visible="1" :num-scroll="1" circular :show-navigators="false" :autoplay-interval="3000">
      <template #item="slotProps">
        <img :src="slotProps.data" :alt="`slider-image-${slotProps.index + 1}`">
      </template>
    </Carousel>
  </div>
</template>

<style scoped lang="scss">
.main-slider {
  :deep(.p-carousel-indicator-list) {
    --p-carousel-indicator-list-gap: 2rem;
  }
  :deep(.p-carousel-indicator-button) {
    --p-carousel-indicator-width: .8rem;
    --p-carousel-indicator-height: .8rem;
  }
  :deep(.p-carousel-viewport) {
    border-radius: var(--radius-m);
    overflow: hidden;
  }
}
</style>
