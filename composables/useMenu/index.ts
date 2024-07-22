import { useLocationStorage } from '~/composables/useLocationStorage';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { useDelivery } from '~/composables/useDeliveries';
import type { ILocationData, IMarker } from '~/composables/useLocationStorage/types';
import type { IMenuResponse } from '~/composables/useShopData/types';
import $request from '~/api';

export function useMenu() {
  const menuStore = useMenuStore();
  const $toast = useToastStore();
  const { location, addressList, setLocationCoords, setLocationFromMarker, pushNewAddress } = useLocationStorage();

  const {
    mapCoords, markerCenterCoords,
    currentMarker, restMarksList,
    setMapCoords, getRestaurants,
  } = useMapAddresses();

  const { activeDelivery, deliveryList, isDelivery } = useDelivery();

  const getMenuByLocation = async () => {
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
      $toast.error('errors.title', 'error.fetch-error');
      return { error: true };
    }
  };

  const addressMatchError = () => {
    $toast.error('errors.title', 'error.location-error');
    currentMarker.value = undefined;
  };

  const setAddress = (address: IMarker) => {
    if (address.coordinates.join() === currentMarker.value?.coordinates.join()) return;
    setLocationFromMarker({ ...address, id: isDelivery.value ? '' : address.id });
    currentMarker.value = address;
  };

  const addressSelectHandle = (address: IMarker) => {
    setAddress(address);
    markerCenterCoords.value = address.coordinates;
  };

  const submitMapHandler = async () => {
    const { error } = await getMenuByLocation();
    if (error) return;
    if (isDelivery && currentMarker.value) {
      pushNewAddress(currentMarker.value);
    }
  };

  return {
    location, addressList, setLocationCoords, setLocationFromMarker, pushNewAddress,

    mapCoords, markerCenterCoords, currentMarker, restMarksList, getRestaurants, setMapCoords,
    addressMatchError,

    activeDelivery, deliveryList, addressSelectHandle, setAddress, submitMapHandler,
  };
}
