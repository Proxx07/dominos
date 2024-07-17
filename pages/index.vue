<script setup lang="ts">
import { useMenu } from '~/composables/useMenu';
import { useRestaurants } from '~/composables/useRestaurants';
import type { IMarker } from '~/composables/useRestaurants/types';

const menuStore = useMenuStore();

const { mapMoveHandler, query } = useMenu();
const { markers, getRestaurants } = useRestaurants();

function markerClickHandler(marker: IMarker) {
  console.log(marker);
}

useSeoMeta({
  title: () => menuStore.currentFolderName,
  description: () => menuStore.currentFolderName,
});

onMounted(() => {
  getRestaurants();
});

const delivery = ref(0);
const deliveryTypes = ref([
  { name: 'Доставка', value: 0 },
  { name: 'Самовывоз', value: 1 },
]);
</script>

<template>
  <div class="page-content">
    <main-slider />

    <client-only>
      <div class="address-selection">
        <div class="delivery-types">
          <select-button
            v-model="delivery"
            :options="deliveryTypes"
            option-label="name"
            option-value="value"
            aria-labelledby="basic"
            class="delivery-select"
            :allow-empty="false"
          />

          <Transition name="slideX">
            <div v-if="delivery === 1" class="self-delivery">
              <h3>
                Откуда заберете заказ?
              </h3>

              <div>
                Выберите пункт выдачи на карте или используйте поиск
              </div>
            </div>
          </Transition>

          <Transition name="slideX">
            <div v-if="delivery === 0" class="delivery">
              <h3>
                Укажите ваш адрес
              </h3>
            </div>
          </Transition>
        </div>
        <map-component :markers="markers" :center-fixed-marker="delivery === 0" @on-move="mapMoveHandler" @marker-click="markerClickHandler" />
      </div>
    </client-only>

    <client-only>
      <pre>
        {{ markers }}
        <hr>
        {{ query }}
      </pre>
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
.delivery-types {
  position: relative;
  overflow: hidden;
}
.delivery-select {
  width: 100%;
}

.address-selection {
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
}
.container pre {
  font-size: 1rem;
}
</style>
