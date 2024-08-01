import type { IUser } from '~/composables/useUser/types';

export const useUserStore = defineStore('user', () => {
  const user = ref<IUser>();

  return {
    user,
  };
});
