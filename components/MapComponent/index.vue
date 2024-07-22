<script setup lang="ts">
import {
  YandexMap,
  YandexMapControls,
  YandexMapDefaultFeaturesLayer,
  YandexMapDefaultSchemeLayer,
  YandexMapGeolocationControl,
  YandexMapListener,
  YandexMapMarker,
  YandexMapZoomControl,
} from 'vue-yandex-maps';
import type { Feature, YMap } from '@yandex/ymaps3-types';

import { useDebounceFn } from '@vueuse/core';
import type { YMapProps } from '@yandex/ymaps3-types/imperative/YMap';
import type { IMarker } from '~/composables/useLocationStorage/types';
import { LongLat } from '~/composables/useShopData/models';

const props = defineProps<{
  markers: IMarker[]
  centerFixedMarker: boolean
  height: number // px
  centerCoords?: [number, number]
}>();

const emit = defineEmits<{
  (e: 'onMove', value: [number, number]): void
  (e: 'markerClick', value: IMarker): void
  (e: 'mapAddressMatch', value: IMarker): void
  (e: 'addressMatchError'): void
}>();

const map = shallowRef<YMap>();
const adressTitle = ref<string>('');

const settings = computed<YMapProps>(() => {
  return {
    location: {
      center: props.centerCoords ?? LongLat,
      zoom: 12,
    },
  };
});

const moveHandler = useDebounceFn(async (longLat: [number, number]) => {
  emit('onMove', longLat);
  if (!props.centerFixedMarker) return;
  const searchResult = await ymaps3.search({ text: longLat.join(), bounds: map.value?.bounds });
  adressTitle.value = searchResult[0].properties.name;

  if (searchResult.length && searchResult) {
    const result = searchResult[0] as Feature;
    const marker: IMarker = {
      id: `${Date.now()}`,
      title: result.properties.name,
      coordinates: (result.geometry?.coordinates as [number, number]),
      address: result.properties?.description ?? '',
      iconSrc: '',
    };
    emit('mapAddressMatch', marker);
  }
  else {
    emit('addressMatchError');
  }
}, 500);

function markerClickHandler(value: IMarker) {
  if (props.centerFixedMarker) return;
  emit('markerClick', value);
}
</script>

<template>
  <div class="map">
    <YandexMap v-model="map" :settings="settings" width="100%" :height="`${height}px`" real-settings-location>
      <YandexMapDefaultSchemeLayer />
      <YandexMapDefaultFeaturesLayer />
      <YandexMapControls :settings="{ position: 'left' }">
        <YandexMapZoomControl />
      </YandexMapControls>
      <YandexMapControls :settings="{ position: 'right bottom' }">
        <YandexMapGeolocationControl />
      </YandexMapControls>

      <YandexMapMarker
        v-for="marker in markers"
        :key="marker.id"
        :settings="marker"
        position="top-center left-center"
        style="width: 60px; height: 65px;"
      >
        <img :src="marker.iconSrc" style="cursor: pointer;" @click="markerClickHandler(marker)">
      </YandexMapMarker>
      <YandexMapListener
        :settings="{
          onUpdate: (e) => moveHandler([e.location.center[0], e.location.center[1]]),
        }"
      />
    </YandexMap>
    <div v-if="centerFixedMarker && adressTitle" class="address-title font-16-b">
      {{ adressTitle }}
    </div>
    <i v-if="centerFixedMarker" class="fixed-center-marker pi pi-map-marker" />
    <Transition name="fade">
      <Message v-if="centerFixedMarker" severity="info" class="location-message">
        {{ $t('map.message') }}
      </Message>
    </Transition>
  </div>
</template>

<style scoped lang="scss">
.map {
  position: relative;
  cursor: grab;
  :deep(.ymaps3x0--control__background) {
    box-shadow: var(--shadow);
    border: 1px solid var(--primary-500);
    .ymaps3x0--zoom-control__in {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M11 5.992c0-.537.448-.992 1-.992.556 0 1 .444 1 .992V11h5.008c.537 0 .992.448.992 1 0 .556-.444 1-.992 1H13v5.008c0 .537-.448.992-1 .992-.556 0-1-.444-1-.992V13H5.992C5.455 13 5 12.552 5 12c0-.556.444-1 .992-1H11V5.992z' fill='rgb(0, 83, 122)'/%3E%3C/svg%3E");
    }

    .ymaps3x0--zoom-control__out {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24'%3E%3Cpath fill-rule='evenodd' clip-rule='evenodd' d='M5 12a1 1 0 0 1 1-1h12a1 1 0 1 1 0 2H6a1 1 0 0 1-1-1z' fill='rgb(0, 83, 122)'/%3E%3C/svg%3E");
    }

    .ymaps3x0--geolocation-control {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='14' height='14'%3E%3Cpath d='M1.315 6.73c-.482.227-.39.94.134 1.037l4.06.724.723 4.06c.098.525.81.617 1.037.135l4.675-9.9a.55.55 0 0 0-.732-.73l-9.9 4.674h.002z' fill='rgb(0, 83, 122)'/%3E%3C/svg%3E");
      &-is-loading {
        background: none;
      }
    }
  }
}
.address-title {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  text-align: center;
  pointer-events: none;
  padding: 1rem;
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
.location-message {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font: var(--font-16-b);
  pointer-events: none;
  :deep(.p-message-text) {
    font: inherit !important;
  }
}
</style>
