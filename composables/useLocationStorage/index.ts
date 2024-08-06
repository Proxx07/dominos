import { useLocalStorage } from '@vueuse/core';
import type { ILocationData } from './types';
import { setLocation } from './models';
import type { IMarker } from '~/composables/useLocationStorage/types';

export function useLocationStorage() {
  const location = useLocalStorage<ILocationData>('location', setLocation());
  const addressList = useLocalStorage<IMarker[]>('addresses', []);

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

  const isLocationSaved = computed<boolean>(() => location.value.Latitude > 0 && location.value.Longitude > 0);

  const currentLocationAddress = computed<string>(() => {
    return addressList.value.filter(i => i.coordinates.join('') === `${location.value.Longitude}${location.value.Latitude}`)[0]?.title ?? '';
  });

  const pushNewAddress = (value: IMarker) => {
    if (existLocations.value.includes(value.coordinates.join())) return;
    addressList.value.push(value);
  };

  return {
    location,
    setLocationFromMarker,

    isLocationSaved,

    addressList,
    pushNewAddress,

    currentLocationAddress,
  };
}
