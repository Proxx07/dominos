import type { IDelivery } from './types';
import { deliveries } from './models';
import type { IMarker } from '~/composables/useLocationStorage/types';

export function useDelivery() {
  const activeDelivery = ref<number>(0);
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
