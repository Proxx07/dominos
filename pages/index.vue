<script setup lang="ts">
import { YandexMap, YandexMapDefaultSchemeLayer, YandexMapListener } from 'vue-yandex-maps';
import { LongLat } from '~/composables/useShopData/models';
import { useMenu } from '~/composables/useMenu';

const menuStore = useMenuStore();

const { mapMoveHandler } = useMenu();

useSeoMeta({
  title: () => menuStore.currentFolderName,
  description: () => menuStore.currentFolderName,
});
</script>

<template>
  <div class="page-content">
    <main-slider />

    <client-only>
      <YandexMap
        v-if="false"
        :settings="{
          location: {
            center: LongLat,
            zoom: 10,
          },
        }"
        width="100%"
        height="500px"
      >
        <YandexMapDefaultSchemeLayer />
        <YandexMapListener
          :settings="{
            onUpdate: (e) => mapMoveHandler([e.location.center[0], e.location.center[1]]),
          }"
        />
      </YandexMap>
    </client-only>

    <hr>
    <pre>
      {{ menuStore.productList }}
    </pre>

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
  </div>
</template>

<style scoped>
.container pre {
  font-size: 1rem;
}
</style>
