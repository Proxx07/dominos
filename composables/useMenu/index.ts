import type { Feature } from '@yandex/ymaps3-types';
import type { IDelivery } from './types';
import { deliveryTypes } from './models';
import { useMenuStore } from '~/store/menu';
import { useLocationStorage } from '~/composables/useLocationStorage';
import type { IMarker } from '~/composables/useRestaurants/types';
import { useToastStore } from '~/store/toasts';
import $request from '~/api';
import type { IMenuResponse } from '~/composables/useShopData/types';

export function useMenu() {
  const menuStore = useMenuStore();
  const { storage: location, localAddresses } = useLocationStorage();
  const $toast = useToastStore();

  const deliveryList = ref<IDelivery[]>(deliveryTypes);
  const activeDelivery = ref<number>(0);

  const currentDeliveryAddress = ref<IMarker>();

  const query = computed<Partial<typeof location.value>>(() => {
    return {
      ...(location.value.RestaurantId && { RestaurantId: location.value.RestaurantId }),
      Longitude: location.value.Longitude,
      Latitude: location.value.Latitude,
      RegionId: location.value.RegionId,
    };
  });

  const getMenuByLocation = async () => {
    const result = await $request<IMenuResponse>('/api/menu', { query: query.value });

    if (result.error) {
      $toast.error('Ошибка', result.error);
      return { error: true };
    }

    menuStore.categories = result.categories;

    return { error: false };
  };

  const mapMoveHandler = (longLat: [number, number]) => {
    location.value.Longitude = longLat[0];
    location.value.Latitude = longLat[1];
  };

  const markerClickHandler = (value: IMarker) => {
    if (activeDelivery.value === 0) return;
    location.value.RestaurantId = value.id;
    location.value.Longitude = value.coordinates[0];
    location.value.Latitude = value.coordinates[1];
    $toast.info('Выбран ресторан', value.title);
  };

  const addressMatchHandler = (value: Feature | void) => {
    if (!value) {
      $toast.error('Ошибка', 'Не удалось определить адрес');
    }
    else {
      currentDeliveryAddress.value = {
        id: `${Date.now()}`,
        title: value.properties.name,
        address: value.properties.description,
        coordinates: value.geometry?.coordinates as [number, number],
        iconSrc: '',
      };
    }
  };

  const deliverySubmition = async () => {
    if (!currentDeliveryAddress.value) {
      $toast.warning('Не удалось подтвердить', 'Для начала выберите адрес доставки');
      return;
    }
    location.value.RestaurantId = '';

    const { error } = await getMenuByLocation();
    if (!error) {
      localAddresses.value.push(currentDeliveryAddress.value);
    }
  };

  const selfDeliverySubmition = async () => {
    if (!location.value.RestaurantId) {
      $toast.warning('Не удалось подтвердить', 'Для начала выберите ресторан');
      return;
    }
    await getMenuByLocation();
  };

  const handleLocationSubmit = async () => {
    if (activeDelivery.value === 0) { // delivery
      await deliverySubmition();
    }

    if (activeDelivery.value === 1) { // self-delivery
      await selfDeliverySubmition();
    }
  };

  return {
    location,
    query,

    mapMoveHandler,
    markerClickHandler,
    handleLocationSubmit,
    addressMatchHandler,

    menuStore,
    getMenuByLocation,

    deliveryList,
    activeDelivery,
    localAddresses,
  };
}
