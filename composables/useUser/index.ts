import type { IUser } from './types';
import { setUser } from './models';

export function useUser() {
  const { $request } = useNuxtApp();
  const $toast = useToastStore();
  const $confirm = useConfirm();
  const userStore = useUserStore();

  const userID = useLocalStorage<string>('user-id', '');

  const user = ref<IUser>(setUser());

  const loading = ref<boolean>(false);
  const error = ref<boolean>(false);

  const getUser = async () => {
    if (!user.value.id) return;
    loading.value = true;
    try {
      const result = await $request<IUser>('/api/customers/Get/', { query: { Id: user.value.id } });
      error.value = false;
      userID.value = result.id;
      user.value = setUser(result);
      userStore.user = setUser(result);
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
      const result = await $request<{ customerId: string }>('/api/customers/Create/', { method: 'POST', body: user.value });
      user.value.id = result.customerId;
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

  const resetUser = () => {
    userStore.user = setUser();
    userID.value = '';
    user.value = setUser();
  };

  const logOut = () => {
    $confirm.require({
      message: 'Вы действительно хотите выйти из аккаунта?',
      header: 'Уточните!',
      rejectProps: {
        label: 'Отменить',
        severity: 'primary',
      },
      acceptProps: {
        label: 'Выйти',
        severity: 'secondary',
      },

      accept: () => {
        resetUser();
        $toast.info('Вы вышли из аккаунта');
      },
    });
  };

  onMounted(() => {
    if (userID.value) {
      user.value.id = userID.value;
      getUser();
    }
  });

  return {
    userID,
    user,
    loading,
    error,
    getUser,
    createUser,

    logOut,
    resetUser,
  };
}
