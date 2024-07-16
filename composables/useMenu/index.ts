import { useMenuStore } from '~/store/menu';
import { useLocationStorage } from '~/composables/useLocationStorage';

export function useMenu() {
  const menuStore = useMenuStore();

  const { storage: location } = useLocationStorage();
  const query = computed(() => ({ ...location.value }));

  let timeout: NodeJS.Timer;

  const getMenuByLocation = async () => {
    const result = await $fetch('/api/menu', { query: query.value });

    console.log(result);
  };

  const mapMoveHandler = (longLat: [number, number]) => {
    clearTimeout(timeout);

    timeout = setTimeout(() => {
      location.value.Longitude = longLat[0];
      location.value.Latitude = longLat[1];
    }, 600);
  };

  return {
    location,
    query,

    mapMoveHandler,

    menuStore,
    getMenuByLocation,
  };
}
