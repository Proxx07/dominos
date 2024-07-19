export interface ILocationData {
  RestaurantId: string
  RegionId: number
  Longitude: number
  Latitude: number
}

export interface IMarker {
  id: string
  coordinates: [number, number]
  title: string
  iconSrc: string
  regionID?: number
  address?: string
}
