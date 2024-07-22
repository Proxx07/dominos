import { useLocalStorage } from '@vueuse/core';
import type { ILocationData } from './types';
import { setLocation } from './models';
import type { IMarker } from '~/composables/useLocationStorage/types';

export function useLocationStorage() {
  const location = useLocalStorage<ILocationData>('location', setLocation());
  const addressList = useLocalStorage<IMarker[]>('addresses', []);

  const setLocationCoords = (longLat: [number, number]) => {
    location.value.Longitude = longLat[0];
    location.value.Latitude = longLat[1];
  };

  const setLocationFromMarker = (marker: IMarker) => {
    const loc: ILocationData = {
      RestaurantId: marker?.id ?? '',
      Longitude: marker.coordinates[0],
      Latitude: marker.coordinates[1],
      RegionId: marker?.regionID ?? 0,
    };

    location.value = setLocation(loc);
  };

  const existLocations = computed(() => addressList.value.map(loc => loc.coordinates.join()));

  const pushNewAddress = (value: IMarker) => {
    if (existLocations.value.includes(value.coordinates.join())) return;
    addressList.value.push(value);
  };

  return {
    location,
    setLocationCoords,
    setLocationFromMarker,

    addressList,
    pushNewAddress,
  };
}
