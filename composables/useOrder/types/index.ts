export interface IOrderModifier {
  modifierId: string
  count: number
}

export interface IOrderItemPromo {
  discount: number
  isFree: boolean
}

export interface IOrderProduct {
  productId: string
  quantity: number
  price: number
  modifiers?: IOrderModifier[]
  promo?: IOrderItemPromo
}

export interface IOrderPromo {
  promoId: number
  promoCode: string
  discount: number
  view: number
}

export interface IOrder {
  regionId: number
  restaurantId: string
  orderTypeId: number
  customerId: string
  notes: string
  orderItems: IOrderProduct[]
  payByCard: number
  promo?: IOrderPromo
}

export interface IOrderData {
  contactName: string
  phone1: string
  phone2?: string
  paymentPhone: string
  address: string
  addressComment: string
  longitude: string
  latitude: string
  paymentTypeId: number
  plannedDateTime: string
  plannedDateType: number
  order: IOrder
}
