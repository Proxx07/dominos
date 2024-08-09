import type { IOrderDate } from './types';
import { deliveryAddressName, restName } from './models';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useDelivery } from '~/composables/useDeliveries';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { usePayment } from '~/composables/usePayment';

export function useOrder() {
  const userStore = useUserStore();
  const cartStore = useCartStore();
  const workTimeStore = useWorkTimeStore();
  const { $request } = useNuxtApp();
  const $toast = useToastStore();

  const { activeDelivery } = useDelivery();
  const { location, currentLocationAddress } = useLocationStorage();
  const { currentRestName, getRestaurants } = useMapAddresses();
  const { activePayment, paymentList, getPaymentList } = usePayment();


  const orderDate = ref<IOrderDate>(workTimeStore.resultList[0]);
  const comment = ref<string>('');

  const orderData = computed(() => {
    return {
      contactName: userStore.user?.firstName ?? '',
      phone1: `${userStore.user?.phone1Code}${userStore.user?.phone1}` ?? '',
      address: activeDelivery.value === 0 ? currentLocationAddress.value : currentRestName.value,
      addressComment: '',
      longitude: `${location.value.Longitude}`,
      latitude: `${location.value.Latitude}`,
      paymentTypeId: activePayment.value,
      plannedDateTime: `${orderDate.value.day}T${orderDate.value.name.split(' - ')[1]}:00`,
      plannedDateType: 0,
      order: {
        regionId: location.value.RegionId,
        restaurantId: location.value.RestaurantId,
        orderTypeId: activeDelivery.value,
        customerId: userStore.user?.id ?? '',
        notes: comment.value,
        orderItems: cartStore.cartList.map(prod => ({ productId: prod.id, quantity: prod.amount, price: prod.price })),
        //payByCard: 0, // editable
        /*promo: {
          promoId: 0,
          promoCode: '',
          discount: 0,
          view: 0,
        },*/
      },
    };
  });

  async function postOrder() {
    try {
      await $request('/api/delivery/Create', {
        method: 'POST',
        body: orderData.value,
      });
      $toast.success('Заказ оформлен!', 'Ура');
      cartStore.clearCart();
    }
    catch (e: any) {
      if (e.data.error) {
        $toast.error('Ошибка!', e.data.error);
        return;
      }
      $toast.error('Ошибка на сервере!', 'Не получилось оформить заказ');
    }
  }

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
    comment,
    orderData,

    headLine,
    activeDelivery,

    activePayment,
    paymentList,

    orderDate,
    workTimeStore,
    postOrder,
  };
}
