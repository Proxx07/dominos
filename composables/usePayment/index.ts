import type { IPayment } from './types';
import { useToastStore } from '~/store/toasts';

export function usePayment() {
  const $toast = useToastStore();
  const { $request } = useNuxtApp();

  const paymentList = ref<IPayment[]>([]);

  const activePayment = ref<number>(0);

  const getPaymentList = async () => {
    try {
      paymentList.value = await $request<IPayment[]>('/api/paytypes/List');
    }
    catch (e: any) {
      if (e.data.error) {
        $toast.error('Ошибка!', e.data.error);
        return;
      }
      $toast.error('Ошибка!', 'Не удалось загрузить способы оплаты');
    }
  };

  return {
    paymentList,
    activePayment,
    getPaymentList,
  };
}
