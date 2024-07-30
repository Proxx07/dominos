import type { IUser } from './types';
import { setUser } from './models';

export function useUser() {
  const { $request } = useNuxtApp();
  const $toast = useToastStore();

  const userID = useLocalStorage<string>('user-id', '');
  const user = ref<IUser>(setUser());

  const loading = ref<boolean>(false);
  const error = ref<boolean>(false);

  const getUser = async () => {
    if (!userID.value) return;
    loading.value = true;
    try {
      const result = $request('/api/customers/Get/', { query: { Id: userID.value } });
      console.log(result);
      error.value = false;
    }
    catch (e: any) {
      error.value = true;
      if (e.data.error) {
        $toast.error('error.title', e.data.error);
      }
      else {
        $toast.error('error.title', 'error.server-error');
      }
    }
    finally {
      loading.value = false;
    }
  };

  const createUser = async () => {
    loading.value = true;
    try {
      const result = $request('/api/customers/Create/', { method: 'POST', body: user.value });
      console.log(result);
      error.value = false;
    }
    catch (e: any) {
      error.value = true;
      if (e.data.error) {
        $toast.error('error.title', e.data.error);
      }
      else {
        $toast.error('error.title', 'error.server-error');
      }
    }
    finally {
      loading.value = false;
    }
  };

  return {
    userID,
    user,
    getUser,
    createUser,
  };
}
