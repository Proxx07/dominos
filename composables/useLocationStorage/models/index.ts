import type { ILocationData } from '../types';

export function setLocation(location?: Partial<ILocationData>): ILocationData {
  return {
    RestaurantId: location?.RestaurantId ?? '',
    RegionId: location?.RegionId ?? 0,
    Longitude: location?.Longitude ?? 0,
    Latitude: location?.Latitude ?? 0,
  };
}
