import { useLocalStorage } from '@vueuse/core';

export function useLocationStorage() {
  const storage = useLocalStorage('location', {
    RestaurantId: 0,
    RegionId: 0,
    Longitude: 0,
    Latitude: 0,
  });

  return {
    storage,
  };
}
