export interface IOrder {
  orderId: string
  number: string
  dateTime: string
  payDateTime: string
  regionName: string
  restaurantName: string
  notes: string
  countOfItems: number
  sumOfItems: number
  paymentSum: number
  orderTypeId: number
  seqNumber: string
}

export interface IDeliveryOrderItem {
  plannedDateTime: string
  contactName: string
  phone1: string
  phone2: string
  address: string
  longitude: string
  latitude: string
  paymentTypeName: string
  priceOfDelivery: number
  driverName: string
  driverPhone: string
  statusName: string
  statusCode: number
  ratingProduct: number
  ratingService: number
  ratingDelivery: number
  callInfo: number
  order: IOrder
}

export interface IDeliveryQuery {
  customerId: string

  phone?: string
  onlyActive?: boolean
  skip?: number
  take?: number
}
