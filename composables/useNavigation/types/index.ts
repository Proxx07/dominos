export interface INavigation {
  name: string
  link: string

  icon?: string
}

export interface IFolder {
  id: string
  parentId: string
  name: string
  order: number
  imageUrl: string
  bigImageUrl: string
  tgImage: string
}
