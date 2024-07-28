export const useLocationModalStore = defineStore('location-modal', () => {
  const opened = ref<boolean>(false);

  const open = () => {
    opened.value = true
  }

  const close = () => {
    opened.value = false
  }

  return {
    opened,
    open,
    close
  }
});
