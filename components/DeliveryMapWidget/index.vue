<script setup lang="ts">
import { useMenu } from '~/composables/useMenu';
import type { IEmits } from '~/composables/useMenu/types';

const emit = defineEmits<IEmits>();

const {
  loading,
  addressList, setAddress, addressMatchError, getRestaurants,
  markerCenterCoords, currentMarker, restMarksList, mapMoveHandler,
  activeDelivery, deliveryList, addressSelectHandle, submitMapHandler,
} = useMenu(emit);

const mapHeight = 500;

onMounted(() => {
  getRestaurants();
});
</script>

<template>
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

      <Button
        :label="$t('map.submit-button')"
        fluid
        class="font-20-n"
        style="min-height: 46px"
        :loading="loading"
        loading-icon="pi pi-spin pi-spinner"
        @click="submitMapHandler"
      />
    </div>
    <map-component
      :markers="restMarksList"
      :center-fixed-marker="activeDelivery === 0"
      :height="mapHeight"
      :center-coords="markerCenterCoords"
      @on-move="mapMoveHandler"
      @marker-click="addressSelectHandle"
      @map-address-match="setAddress"
      @address-match-error="addressMatchError"
    />
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
  background: var(--white);
  max-height: var(--height);
  .address-item {
    border-bottom: 1px solid var(--accent-text);
    box-shadow: none;
    border-radius: 0;
  }
}
</style>
