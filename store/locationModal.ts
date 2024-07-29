export const useLocationModalStore = defineStore('location-modal', () => {
  const locationModal = ref<boolean>(false);

  const openLocationModal = () => {
    locationModal.value = true;
  };

  const closeLocationModal = () => {
    locationModal.value = false;
  };

  const authModal = ref<boolean>(false);

  const openAuthModal = () => {
    authModal.value = true;
  };

  const closeAuthModal = () => {
    authModal.value = false;
  };
  return {
    locationModal,
    openLocationModal,
    closeLocationModal,

    authModal,
    openAuthModal,
    closeAuthModal,
  };
});
