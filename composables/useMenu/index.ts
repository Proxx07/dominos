import type { IEmits } from './types';
import { useLocationStorage } from '~/composables/useLocationStorage';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { useDelivery } from '~/composables/useDeliveries';
import type {ILocationData, IMarker} from '~/composables/useLocationStorage/types';
import type { IProcessedResponse } from '~/composables/useShopData/types';

export function useMenu(emit?: IEmits) {
  const $toast = useToastStore();
  const menuStore = useMenuStore();
  const { location, addressList, isLocationSaved, setLocationFromMarker, pushNewAddress } = useLocationStorage();

  const {
    markerCenterCoords,
    currentMarker,
    restMarksList, getRestaurants,
  } = useMapAddresses();

  const {activeDelivery, deliveryList, isDelivery } = useDelivery();

  const loading = ref<boolean>(false);

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

    loading.value = true;

    currentMarker.value = address;
    loading.value = false;
  };


  const query = computed<ILocationData>(() => {
    if (!currentMarker.value) return {...location.value};
    return {
      RestaurantId: isDelivery.value ? '' : currentMarker.value.id ,
      Longitude: currentMarker.value.coordinates[0],
      Latitude: currentMarker.value.coordinates[1],
      RegionId: currentMarker.value?.regionID ?? 0,
    };
  });

  const addressSelectHandle = (address: IMarker) => {
    setAddress(address);
    markerCenterCoords.value = (query.value.Longitude && query.value.Latitude) ? [query.value.Longitude, query.value.Latitude] : address.coordinates;
  };

  const isCorrectDeliveryAddress = computed(() => {
    return isDelivery.value ? query.value && !query.value.RestaurantId : query.value && query.value.RestaurantId;
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

    if (currentMarker.value) {
      setLocationFromMarker({...currentMarker.value, id: isDelivery.value ? '' : currentMarker.value.id})
    }

    if (emit) {
      await new Promise(resolve => setTimeout(resolve, 500));
      loading.value = false;
      emit('submit');
    }
  };

  return {
    location, addressList, isLocationSaved,
    setLocationFromMarker, pushNewAddress,

    markerCenterCoords, currentMarker, restMarksList,
    getRestaurants, addressMatchError,

    isDelivery, deliveryList, activeDelivery, addressSelectHandle, setAddress, submitMapHandler,

    loading, mapMoveHandler,
  };
}
