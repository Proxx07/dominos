export interface ICategory {
  id: string
  parentId: string
  name: string
  order: number
  imageUrl: string
  bigImageUrl: string
  tgImage: string
}

export interface IModifier {
  id: string
  name: string
  modiGroup: number
  modiGroupName: string
  downLimit: number
  upLimit: number
  isDefault: boolean
  price: number
  orgPrice: number
  maxOneDish: number
  imageUrl: string
  bigImageUrl: string
}

export interface IProduct {
  id: string
  name: string
  category: ICategory
  subCategory?: ICategory
  description: string
  imageUrl: string
  bigImageUrl: string
  price: number
  order: number
  isCombo: boolean
  isSet: boolean
  modifiers: IModifier[]
  tgImage: string
  mxik: string
  tax: string
  packageCode: string
  unit: number
  measure: number
  isCatchweight: boolean
  weightQuantum: number
  promoId: string
  discount: number
}

export interface IMenuResponse {
  restaurantId: string
  restaurantName: string
  orderTypeId: number
  priceOfDelivery: number
  deliveryDuration: number
  categories: ICategory[]
  products: IProduct[]

  error?: string
}

export interface IMenuQuery {
  RestaurantId?: string

  RegionId: number
  Longitude: number
  Latitude: number
  OrderTypeId: number

  Language?: number
}
export interface IProcessedProduct extends ICategory {
  modifiers?: IProcessedProduct[]
}
export interface IProcessedResponse {
  folders: ICategory[]
  products: IProcessedProduct[]

  productsForCart: IProduct[]
  priceOfDelivery: number
  deliveryDuration: number

  error?: string
}

export interface ICartItem {
  id: string,
  amount: number
}

export interface IProductInCart extends IProduct{
  amount: number
}
