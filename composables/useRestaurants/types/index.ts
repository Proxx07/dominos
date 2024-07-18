export interface IRestaurant {
  id: string
  regionId: number
  name: string
  longitude: number
  latitude: number
  address: string
  notWork: boolean
  startOfWorkingTime: number
  endOfWorkingTime: number
}

export interface IMarker {
  id: string
  coordinates: [number, number]
  title: string
  iconSrc: string
  regionID?: number
  address?: string
}
