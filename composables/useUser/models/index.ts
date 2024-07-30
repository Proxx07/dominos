import type { IUser } from '../types';

export function setUser(user?: Partial<IUser>): IUser {
  return {
    ...(user?.id && { id: user.id }),
    firstName: user?.firstName ?? '',
    lastName: user?.lastName ?? '',
    middleName: user?.middleName ?? '',
    phone1: user?.phone1 ?? '',
    phone2: user?.phone2 ?? '',
    email: user?.email ?? '',
    address: user?.address ?? '',
    birthDate: user?.birthDate ?? '',
    // regionId?: number
    // language?: number
  };
}
