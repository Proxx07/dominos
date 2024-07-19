// import type { Feature } from '@yandex/ymaps3-types';
// import type { IDelivery } from './types';
// import { deliveryTypes } from './models';
// import { useMenuStore } from '~/store/menu';
// import { useLocationStorage } from '~/composables/useLocationStorage';
// import type { IMarker } from '~/composables/useLocationStorage/types';
// import { useToastStore } from '~/store/toasts';
// import $request from '~/api';
// import type { IMenuResponse } from '~/composables/useShopData/types';
//
// export function useMenu() {
//   const menuStore = useMenuStore();
//   const { location, addressList } = useLocationStorage();
//   const $toast = useToastStore();
//
//   const deliveryList = ref<IDelivery[]>(deliveryTypes);
//   const activeDelivery = ref<number>(0);
//
//   const currentDeliveryAddress = ref<IMarker>();
//
//   const query = computed<Partial<typeof location.value>>(() => {
//     return {
//       ...(location.value.RestaurantId && { RestaurantId: location.value.RestaurantId }),
//       Longitude: location.value.Longitude,
//       Latitude: location.value.Latitude,
//       RegionId: location.value.RegionId,
//     };
//   });
//
//   const getMenuByLocation = async () => {
//     const result = await $request<IMenuResponse>('/api/menu', { query: query.value });
//
//     if (result.error) {
//       $toast.error('Ошибка', result.error);
//       return { error: true };
//     }
//
//     menuStore.categories = result.categories;
//
//     return { error: false };
//   };
//
//   const mapMoveHandler = (longLat: [number, number]) => {
//     location.value.Longitude = longLat[0];
//     location.value.Latitude = longLat[1];
//   };
//
//   const markerClickHandler = (value: IMarker) => {
//     if (activeDelivery.value === 0) return;
//     location.value.RestaurantId = value.id as string;
//     location.value.Longitude = value.coordinates[0];
//     location.value.Latitude = value.coordinates[1];
//     $toast.info('Выбран ресторан', value.title);
//   };
//
//   const addressMatchHandler = (value: Feature | void) => {
//     if (!value) {
//       $toast.error('Ошибка', 'Не удалось определить адрес');
//     }
//     else {
//       currentDeliveryAddress.value = {
//         id: `${Date.now()}`,
//         title: value.properties.name,
//         address: value.properties.description,
//         coordinates: value.geometry?.coordinates as [number, number],
//         iconSrc: '',
//       };
//     }
//   };
//
//   const deliverySubmition = async () => {
//     if (!currentDeliveryAddress.value) {
//       $toast.warning('Не удалось подтвердить', 'Для начала выберите адрес доставки');
//       return;
//     }
//     location.value.RestaurantId = '';
//
//     const { error } = await getMenuByLocation();
//     if (error) return;
//     const isCoordExist = addressList.value.filter(marker => marker.coordinates.join() === currentDeliveryAddress.value?.coordinates.join()).length > 0;
//     if (isCoordExist) return;
//
//     addressList.value.push(currentDeliveryAddress.value);
//   };
//
//   const selfDeliverySubmition = async () => {
//     if (!location.value.RestaurantId) {
//       $toast.warning('Не удалось подтвердить', 'Для начала выберите ресторан');
//       return;
//     }
//     await getMenuByLocation();
//   };
//
//   const handleLocationSubmit = async () => {
//     if (activeDelivery.value === 0) { // delivery
//       await deliverySubmition();
//     }
//
//     if (activeDelivery.value === 1) { // self-delivery
//       await selfDeliverySubmition();
//     }
//   };
//
//   return {
//     location,
//     mapMoveHandler,
//     markerClickHandler,
//     handleLocationSubmit,
//     addressMatchHandler,
//
//     menuStore,
//     getMenuByLocation,
//
//     deliveryList,
//     activeDelivery,
//     localAddresses,
//   };
// }

import { useLocationStorage } from '~/composables/useLocationStorage';
import { useMapAddresses } from '~/composables/useMapAddresses';
import { useDelivery } from '~/composables/useDeliveries';
import type { ILocationData, IMarker } from '~/composables/useLocationStorage/types';
import type { IMenuResponse } from '~/composables/useShopData/types';
import $request from '~/api';
import { useToastStore } from '~/store/toasts';

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
        $toast.error('Ошибка', result.error);
        return { error: true };
      }
      menuStore.categories = result.categories;
      return { error: false };
    }
    catch (e) {
      $toast.error('Ошибка', 'Не удалось загрузить данные!');
      return { error: true };
    }
  };

  const setAddress = (address: IMarker) => {
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
    if (isDelivery) {
      pushNewAddress(currentMarker.value);
    }
  };

  return {
    location, addressList, setLocationCoords, setLocationFromMarker, pushNewAddress,

    mapCoords, markerCenterCoords, currentMarker, restMarksList, getRestaurants, setMapCoords,

    activeDelivery, deliveryList, addressSelectHandle, setAddress, submitMapHandler,
  };
}
