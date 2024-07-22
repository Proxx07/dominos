import { useLocalStorage } from '@vueuse/core';
import type { IDelivery } from './types';
import { deliveries } from './models';
import type { IMarker } from '~/composables/useLocationStorage/types';

export function useDelivery() {
  const activeDelivery = useLocalStorage<number>('delivery', 0);
  const deliveryList = ref<IDelivery[]>(deliveries);
  const deliveryAddress = ref<IMarker>();

  const isDelivery = computed<boolean>(() => activeDelivery.value === 0);

  return {
    activeDelivery,
    deliveryList,
    isDelivery,
    deliveryAddress,
  };
}
