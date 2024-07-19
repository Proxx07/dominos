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
