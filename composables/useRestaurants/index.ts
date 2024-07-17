import type { IMarker, IRestaurant } from './types';
import { markerIcon, setRestaurant } from './models';
import $request from '~/api';

export function useRestaurants() {
  const restaurantsList = ref<IRestaurant[]>([]);

  const getRestaurants = async () => {
    const result = await $request<IRestaurant[]>('/api/restaurants/List');

    restaurantsList.value = [...result.map(i => setRestaurant(i))];
  };

  const markers = computed<IMarker[]>(() => restaurantsList.value.map((item) => {
    return {
      id: item.id,
      coordinates: [item.longitude, item.latitude],
      title: item.name,
      iconSrc: markerIcon,
      regionID: item.regionId,
    };
  }));

  return {
    restaurantsList,
    markers,
    getRestaurants,
  };
}
