<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapListener,
  YandexMapMarker,
  type YandexMapSettings,
  YandexMapZoomControl,
} from 'vue-yandex-maps';
import type { YMap, YMapControlsProps } from '@yandex/ymaps3-types';

import { LongLat } from '~/composables/useShopData/models';
import type { IMarker } from '~/composables/useRestaurants/types';

defineProps<{
  markers: IMarker[]
  centerFixedMarker: boolean
}>();

const emit = defineEmits<{
  (e: 'onMove', value: [number, number]): void
  (e: 'markerClick', value: IMarker): void
}>();

const mapSettings: YandexMapSettings = {
  location: {
    center: LongLat,
    zoom: 12,
  },
};

const controlSettings: YMapControlsProps = {
  position: 'left',
};

const map = ref<YMap>();
</script>

<template>
  <div ref="map" class="map">
    <YandexMap :settings="mapSettings" width="100%" height="500px">
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
      <YandexMapControls :settings="controlSettings">
        <YandexMapZoomControl />
      </YandexMapControls>
      <YandexMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :settings="marker"
        position="top-center left-center"
        style="width: 60px; height: 65px;"
      >
        <img :src="marker.iconSrc" style="cursor: pointer;" @click="emit('markerClick', marker)">
      </YandexMapMarker>
      <YandexMapListener
        :settings="{
          onUpdate: (e) => emit('onMove', [e.location.center[0], e.location.center[1]]),
        }"
      />
    </YandexMap>
    <i v-if="centerFixedMarker" class="fixed-center-marker pi pi-map-marker" />
  </div>
</template>

<style scoped>
.map {
  position: relative;
  cursor: grab;
}
.fixed-center-marker {
  --marker-size: 3rem;

  position: absolute;
  color: var(--secondary-500);

  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  font-size: var(--marker-size);
  margin-top: calc(var(--marker-size) / -2);
}
</style>
