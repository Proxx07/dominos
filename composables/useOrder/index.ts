import type { IOrderData } from './types';
import { deliveryAddressName, restName } from './models';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useDelivery } from '~/composables/useDeliveries';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { usePayment } from '~/composables/usePayment';

export function useOrder() {
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const { activeDelivery } = useDelivery();
  const { location, currentLocationAddress } = useLocationStorage();
  const { currentRestName, getRestaurants } = useMapAddresses();
  const { activePayment, paymentList, getPaymentList } = usePayment();

  const comment = ref<string>('');

  const date = ref<Date>(new Date());

  const orderDate = computed({
    get() {
      return date.value;
    },

    set(value: Date) {
      date.value = value;
    },
  });

  const orderData = computed<IOrderData>(() => {
    return {
      contactName: userStore.user?.firstName ?? '',
      phone1: userStore.user?.phone1 ?? '',
      // ...(userStore.user?.phone2 && { phone2: userStore.user.phone2 }),
      address: activeDelivery.value === 0 ? currentLocationAddress.value : currentRestName.value,
      addressComment: '',
      longitude: `${location.value.Longitude}`,
      latitude: `${location.value.Latitude}`,
      paymentTypeId: activePayment.value,
      plannedDateTime: null,
      plannedDateType: 0,
      order: {
        regionId: location.value.RegionId,
        restaurantId: location.value.RestaurantId,
        orderTypeId: activeDelivery.value,
        customerId: userStore.user?.id ?? '',
        notes: comment.value,
        orderItems: cartStore.cartList.map(prod => ({ productId: prod.id, quantity: prod.amount, price: prod.price })),
        payByCard: 0, // editable
        promo: {
          promoId: 0,
          promoCode: '',
          discount: 0,
          view: 0,
        },
      },
    };
  });

  const fetchData = async () => {
    await getRestaurants();
    await getPaymentList();
  };

  const headLine = computed(() => {
    return activeDelivery.value === 200 ? restName : deliveryAddressName;
  });

  onBeforeMount(() => {
    fetchData();
  });

  return {
    orderDate,
    comment,

    orderData,

    headLine,
    activeDelivery,

    activePayment,
    paymentList,
  };
}
