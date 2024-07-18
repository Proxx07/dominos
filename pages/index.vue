<script setup lang="ts">
import { useMenu } from '~/composables/useMenu';
import { useRestaurants } from '~/composables/useRestaurants';

const menuStore = useMenuStore();

const {
  deliveryList, activeDelivery, localAddresses,
  mapMoveHandler, markerClickHandler,
  addressMatchHandler, handleLocationSubmit,
} = useMenu();

const { markers, filteredMarkers, markerQuery, getRestaurants } = useRestaurants();

const mapHeight = 500;

useSeoMeta({
  title: () => menuStore.currentFolderName,
  description: () => menuStore.currentFolderName,
});

onMounted(() => {
  getRestaurants();
});
</script>

<template>
  <div class="page-content">
    <main-slider />

    <client-only>
      <div class="address-selection" :style="{ '--height': `${mapHeight}px` }">
        <div class="delivery-types">
          <select-button
            v-model="activeDelivery"
            :options="deliveryList"
            option-label="name"
            option-value="value"
            aria-labelledby="basic"
            fluid
            :allow-empty="false"
          />

          <div class="delivery-body">
            <Transition name="slideX">
              <div v-if="activeDelivery === 0" class="delivery-item">
                <list-with-search
                  v-model:search="markerQuery"
                  title="Укажите ваш адрес"
                  search-placeholder="Поиск"
                  :list="localAddresses"
                  title-key="title"
                  subtitle-key="address"
                />
              </div>
            </Transition>

            <Transition name="slideX">
              <div v-if="activeDelivery === 1" class="delivery-item">
                <list-with-search
                  v-model:search="markerQuery"
                  title="Откуда заберете заказ?"
                  subtitle="Выберите пункт выдачи на карте или используйте поиск"
                  search-placeholder="Поиск"
                  :list="filteredMarkers"
                  title-key="title"
                  subtitle-key="address"
                  @list-item-clicked="markerClickHandler"
                />
              </div>
            </Transition>
          </div>

          <Button fluid class="font-20-n" style="min-height: 46px" @click="handleLocationSubmit">
            Подтвердить
          </Button>
        </div>
        <map-component
          :markers="markers"
          :center-fixed-marker="activeDelivery === 0"
          :height="mapHeight"
          @on-move="mapMoveHandler"
          @marker-click="markerClickHandler"
          @map-address-match="addressMatchHandler"
          @address-match-error="addressMatchHandler"
        />
      </div>
    </client-only>

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

<style scoped lang="scss">
.delivery-types {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 2rem;
  max-height: var(--height);

  .delivery-body {
    position: relative;
    flex-grow: 1;
    overflow-y: auto;
    overflow-x: hidden;
  }

  .delivery-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    :deep(.search-field) {
      position: sticky;
      top: 0;
      left: 0;
      right: 0;
    }
  }
}

.address-selection {
  width: 100%;
  max-width: 128rem;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.6rem;
  max-height: calc(var(--height) + 2.2rem + 2.2rem);
  background: var(--white);
  padding: 2.2rem;
  .address-item {
    border-bottom: 1px solid var(--accent-text);
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
