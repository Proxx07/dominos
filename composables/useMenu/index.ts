import { useDebounceFn } from '@vueuse/core';
import { useMenuStore } from '~/store/menu';
import { useLocationStorage } from '~/composables/useLocationStorage';

export function useMenu() {
  const menuStore = useMenuStore();

  const { storage: location } = useLocationStorage();
  const query = computed(() => location.value);

  const getMenuByLocation = async () => {
    const result = await $fetch('/api/menu', { query: query.value });

    console.log(result);
  };

  const mapMoveHandler = useDebounceFn((longLat: [number, number]) => {
    location.value.Longitude = longLat[0];
    location.value.Latitude = longLat[1];
  }, 500);

  return {
    location,
    query,

    mapMoveHandler,

    menuStore,
    getMenuByLocation,
  };
}
