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
  contactName: string // required
  phone1: string // required
  phone2?: string
  paymentPhone: string
  address: string // required
  addressComment: string
  longitude: string // required
  latitude: string // required
  paymentTypeId: number // from reference-books
  plannedDateTime: string | null//
  plannedDateType: number
  order: IOrder
}
