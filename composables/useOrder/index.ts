import type { IOrderData } from './types';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useDelivery } from '~/composables/useDeliveries';

export function useOrder() {
  const userStore = useUserStore();
  const cartStore = useCartStore(); // cartList
  const { activeDelivery } = useDelivery();

  const { location } = useLocationStorage();

  const orderData = computed<IOrderData>(() => {
    return {
      contactName: userStore.user?.firstName ?? '',
      phone1: userStore.user?.phone1 ?? '',
      ...(userStore.user?.phone2 && { phone2: userStore.user.phone2 }),
      address: '', // editable
      addressComment: '', // editable
      longitude: location.value.Longitude,
      latitude: location.value.Latitude,
      paymentTypeId: 0, // editable
      plannedDateTime: '', // editable
      plannedDateType: 0, // editable
      order: {
        regionId: location.value.RegionId,
        restaurantId: location.value.RestaurantId,
        orderTypeId: activeDelivery.value,
        customerId: userStore.user?.id ?? '',
        notes: '', // editable
        orderItems: cartStore.cartList.map(prod => ({ productId: prod.id, quantity: prod.amount, price: prod.price })),
        payByCard: 0, // editable
        /* promo: {
          promoId: 0,
          promoCode: '',
          discount: 0,
          view: 0,
        }, */
      },
    };
  });

  return {
    orderData,
  };
}
