import type { IEmits } from './types';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { useDelivery } from '~/composables/useDeliveries';
import type { ILocationData, IMarker } from '~/composables/useLocationStorage/types';
import type { IMenuResponse } from '~/composables/useShopData/types';
import $request from '~/api';

export function useMenu(emit?: IEmits) {
  const menuStore = useMenuStore();
  const $toast = useToastStore();
  const { location, addressList, setLocationCoords, setLocationFromMarker, pushNewAddress } = useLocationStorage();

  const {
    markerCenterCoords,
    currentMarker,
    restMarksList, getRestaurants,
  } = useMapAddresses();

  const { activeDelivery, deliveryList, isDelivery } = useDelivery();

  const loading = ref<boolean>(false);

  const isCorrectDeliveryAddress = computed(() => {
    return isDelivery.value ? location.value && !location.value.RestaurantId : location.value && location.value.RestaurantId;
  });

  const mapMoveHandler = () => {
    if (!isDelivery.value) return;
    loading.value = true;
  };

  const getMenuByLocation = async () => {
    loading.value = true;

    const query: ILocationData = {
      ...location.value,
      ...(isDelivery.value && { RestaurantId: '' }),
    };

    try {
      const result = await $request<IMenuResponse>('/api/menu', { query });
      if (result.error) {
        $toast.error('error.title', result.error);
        return { error: true };
      }

      menuStore.categories = result.categories;
      return { error: false };
    }

    catch (e) {
      $toast.error('error.title', 'error.fetch-error');
      return { error: true };
    }

    finally {
      loading.value = false;
    }
  };

  const addressMatchError = () => {
    $toast.error('errors.title', 'error.location-error');
    currentMarker.value = undefined;
  };

  const setAddress = (address: IMarker) => {
    loading.value = false;

    if (address.coordinates.join() === currentMarker.value?.coordinates.join()) return;
    if (!isDelivery) return;

    loading.value = true;
    setLocationFromMarker({ ...address, id: isDelivery.value ? '' : address.id });
    currentMarker.value = address;
    loading.value = false;
  };

  const addressSelectHandle = (address: IMarker) => {
    setAddress(address);
    markerCenterCoords.value = address.coordinates;
  };

  const submitMapHandler = async (): Promise<void> => {
    if (!isCorrectDeliveryAddress.value) {
      const warningText = isDelivery.value ? 'Сначала укажите адрес' : 'Сначала укажите точку выдачи';
      $toast.warning('Внимание', warningText);
      return;
    }

    const { error } = await getMenuByLocation();
    if (error) return;

    loading.value = true;

    if (isDelivery.value && currentMarker.value) {
      pushNewAddress(currentMarker.value);
    }

    if (emit) {
      await new Promise(resolve => setTimeout(resolve, 500));
      emit('submit');
    }
    loading.value = false;
  };

  return {
    location, addressList, setLocationCoords, setLocationFromMarker, pushNewAddress,

    markerCenterCoords, currentMarker, restMarksList, getRestaurants,
    addressMatchError, getMenuByLocation,

    activeDelivery, deliveryList, addressSelectHandle, setAddress, submitMapHandler,

    loading, mapMoveHandler,
  };
}
