<script setup lang="ts">
import { YandexMap, YandexMapDefaultSchemeLayer } from 'vue-yandex-maps';
import { useMenu } from '~/composables/useMenu';

const { loginMockUser, getMenu, products, categories } = useMenu();

await loginMockUser();
await getMenu();
</script>

<template>
  <div class="page-content">
    <main-slider />

    <client-only>
      <YandexMap
        v-if="false"
        :settings="{
          location: {
            center: [69.279723, 41.311344],
            zoom: 10,
          },
        }"
        width="100%"
        height="500px"
      >
        <YandexMapDefaultSchemeLayer />
      </YandexMap>
    </client-only>

    <pre>
      {{ products }}
    </pre>
    <hr>
    <pre>
      {{ categories }}
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
