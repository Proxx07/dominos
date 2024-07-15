import type { IMenuQuery } from '../types';

export function setMenuQuery(query?: Partial<IMenuQuery>): IMenuQuery {
  return {
    ...(query?.RestaurantId && { RestaurantId: query.RestaurantId }),
    RegionId: query?.RegionId ?? 0,
    Longitude: query?.Longitude ?? 69.259174,
    Latitude: query?.Latitude ?? 41.326077,
    OrderTypeId: query?.OrderTypeId ?? 0,
  };
}
