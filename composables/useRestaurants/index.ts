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
      address: item.address,
      regionID: item.regionId,
    };
  }));

  const markerQuery = ref<string>('');

  const filteredMarkers = computed<IMarker[]>(() => {
    return markers.value.filter(mark => (mark.title.toLowerCase().includes(markerQuery.value.toLowerCase()) || mark.address?.toLowerCase().includes(markerQuery.value.toLowerCase())));
  });

  return {
    restaurantsList,
    markers,
    markerQuery,
    filteredMarkers,
    getRestaurants,
  };
}
