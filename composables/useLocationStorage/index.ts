import { useLocalStorage } from '@vueuse/core';
import type { IMarker } from '~/composables/useRestaurants/types';

export function useLocationStorage() {
  const storage = useLocalStorage('location', {
    RestaurantId: '',
    RegionId: 0,
    Longitude: 0,
    Latitude: 0,
  });

  const localAddresses = useLocalStorage<IMarker[]>('addresses', []);

  return {
    storage,

    localAddresses,
  };
}
