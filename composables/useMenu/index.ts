import type { IEmits } from './types';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { useDelivery } from '~/composables/useDeliveries';
import type { IMarker } from '~/composables/useLocationStorage/types';
import type { IProcessedResponse } from '~/composables/useShopData/types';

export function useMenu(emit?: IEmits) {
  const $toast = useToastStore();
  const menuStore = useMenuStore();
  const { location, addressList, isLocationSaved, setLocationCoords, setLocationFromMarker, pushNewAddress } = useLocationStorage();

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
    markerCenterCoords.value = (location.value.Longitude && location.value.Latitude) ? [location.value.Longitude, location.value.Latitude] : address.coordinates;
  };

  const query = computed(() => {
    return {
      ...location.value,
      RestaurantId: isDelivery.value ? '' : location.value.RestaurantId,
      OrderTypeId: activeDelivery.value,
    };
  });

  const submitMapHandler = async (): Promise<void> => {
    if (!isCorrectDeliveryAddress.value) {
      const warningText = isDelivery.value ? 'Сначала укажите адрес' : 'Сначала укажите точку выдачи';
      $toast.warning('Внимание', warningText);
      return;
    }

    loading.value = true;
    const { data, error } = await useFetch<IProcessedResponse>('/api/shop', { query: query.value, server: false });
    loading.value = false;

    if (error.value || data.value?.error) {
      if (data.value?.error) return $toast.error('error.title', data.value.error);
      return $toast.error('error.title', 'error.fetch-error');
    }

    menuStore.folders = data.value?.folders ?? [];
    menuStore.products = data.value?.products ?? [];
    menuStore.productsForCart = data.value?.productsForCart ?? [];

    if (isDelivery.value && currentMarker.value) {
      loading.value = true;
      pushNewAddress(currentMarker.value);
    }

    if (emit) {
      await new Promise(resolve => setTimeout(resolve, 500));
      loading.value = false;
      emit('submit');
    }
  };

  return {
    location, addressList, isLocationSaved,
    setLocationCoords, setLocationFromMarker, pushNewAddress,

    markerCenterCoords, currentMarker, restMarksList,
    getRestaurants, addressMatchError,

    activeDelivery, isDelivery, deliveryList, addressSelectHandle, setAddress, submitMapHandler,

    loading, mapMoveHandler,
  };
}
