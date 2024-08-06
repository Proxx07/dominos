export interface IUser {
  id?: string
  firstName: string
  lastName: string
  middleName: string

  phone1: string
  phone1Code?: string

  phone2: string
  email: string
  address: string
  birthDate: string
  regionId?: number
  language?: number
}
