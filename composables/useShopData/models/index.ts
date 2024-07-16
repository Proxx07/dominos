import type { IMenuQuery } from '../types';

export const LongLat: [number, number] = [69.279790, 41.311184]; // Tashkent center point

export function setMenuQuery(query?: Partial<IMenuQuery>): IMenuQuery {
  return {
    ...(query?.RestaurantId && { RestaurantId: query.RestaurantId }),
    RegionId: query?.RegionId ?? 0,
    Longitude: query?.Longitude ?? LongLat[0],
    Latitude: query?.Latitude ?? LongLat[1],
    OrderTypeId: query?.OrderTypeId ?? 0,
  };
}
