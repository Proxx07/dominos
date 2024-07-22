<script setup lang="ts">
import { useMenu } from '~/composables/useMenu';

const menuStore = useMenuStore();
const mapHeight = 500;
const {
  location, addressList, setAddress, addressMatchError,
  markerCenterCoords, currentMarker, restMarksList, getRestaurants, setMapCoords,
  activeDelivery, deliveryList, addressSelectHandle, submitMapHandler,
} = useMenu();

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
            :option-label="(e) => $t(e.name)"
            option-value="value"
            aria-labelledby="basic"
            fluid
            :allow-empty="false"
          />
          <div class="delivery-body">
            <Transition name="slideX">
              <div v-if="activeDelivery === 0" class="delivery-item">
                <list-with-search
                  :title="$t('map.delivery-title')"
                  :subtitle="$t('map.delivery-subtitle')"
                  :search-placeholder="$t('shared.search')"
                  :list="addressList"
                  :current-item="currentMarker"
                  title-key="title"
                  subtitle-key="address"
                  active-key="title"
                  @list-item-clicked="addressSelectHandle"
                />
              </div>
            </Transition>

            <Transition name="slideX">
              <div v-if="activeDelivery === 1" class="delivery-item">
                <list-with-search
                  :title="$t('map.self-delivery-title')"
                  :subtitle="$t('map.self-delivery-subtitle')"
                  :search-placeholder="$t('shared.search')"
                  :list="restMarksList"
                  :current-item="currentMarker"
                  title-key="title"
                  subtitle-key="address"
                  active-key="title"
                  @list-item-clicked="addressSelectHandle"
                />
              </div>
            </Transition>
          </div>

          <Button fluid class="font-20-n" style="min-height: 46px" @click="submitMapHandler">
            Подтвердить
          </Button>
        </div>
        <map-component
          :markers="restMarksList"
          :center-fixed-marker="activeDelivery === 0"
          :height="mapHeight"
          :center-coords="markerCenterCoords"
          @on-move="setMapCoords"
          @marker-click="addressSelectHandle"
          @map-address-match="setAddress"
          @address-match-error="addressMatchError"
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
    padding-right: .5rem;
  }

  .delivery-item {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    width: 100%;
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
