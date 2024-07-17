import type { IRestaurant } from '../types';
import icon from '@/assets/images/icons/marker.svg';

export function setRestaurant(restaurant: IRestaurant): IRestaurant {
  return {
    ...restaurant,
    longitude: +restaurant.longitude, // initially it returns as string
    latitude: +restaurant.latitude, // initially it returns as string
  };
}

export const markerIcon = icon;
