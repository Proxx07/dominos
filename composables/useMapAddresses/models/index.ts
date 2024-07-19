import type { IRestaurant } from '../types';
import icon from '@/assets/images/icons/marker.svg';
import type { IMarker } from '~/composables/useLocationStorage/types';

export const markerIcon = icon;

export function setRestaurant(restaurant: IRestaurant): IRestaurant {
  return {
    ...restaurant,
    longitude: +restaurant.longitude, // initially it returns as string
    latitude: +restaurant.latitude, // initially it returns as string
  };
};

export function setMarkerFromRestaurant(restaurant: IRestaurant): IMarker {
  return {
    id: restaurant.id,
    coordinates: [restaurant.longitude, restaurant.latitude],
    title: restaurant.name,
    iconSrc: markerIcon,
    address: restaurant.address,
    regionID: restaurant.regionId,
  };
}
