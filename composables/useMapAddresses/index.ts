import type { IRestaurant } from './types';
import { setMarkerFromRestaurant, setRestaurant } from './models';
import type { IMarker } from '~/composables/useLocationStorage/types';
import { useToastStore } from '~/store/toasts';
import { useLocationStorage } from '~/composables/useLocationStorage';

export function useMapAddresses() {
  const $toast = useToastStore();
  const { $request } = useNuxtApp();

  const { location } = useLocationStorage();

  const mapCoords = ref <[number, number]>();
  const markerCenterCoords = ref<[number, number]>();

  const currentMarker = ref<IMarker>();

  const restaurantsList = ref<IRestaurant[]>([]);

  const getRestaurants = async () => {
    try {
      const result = await $request<IRestaurant[]>('/api/restaurants/List');
      restaurantsList.value = result.map(i => setRestaurant(i));
    }
    catch (e) {
      $toast.error('error.title', 'error.fetch-error');
    }
  };

  const setMapCoords = (value: [number, number]) => {
    mapCoords.value = value;
  };

  const restMarksList = computed<IMarker[]>(() => restaurantsList.value.map(item => setMarkerFromRestaurant(item)));

  const currentRestName = computed<string>(() => {
    return restMarksList.value.filter(i => i.coordinates.join('') === `${location.value.Longitude}${location.value.Latitude}`)[0]?.title ?? '';
  });

  return {
    mapCoords,
    currentMarker,
    markerCenterCoords,

    restMarksList,
    restaurantsList,
    getRestaurants,

    setMapCoords,

    currentRestName,
  };
}
