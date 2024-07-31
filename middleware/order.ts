import { useUserStore } from '~/store/user';

export default defineNuxtRouteMiddleware(async () => {
  if (import.meta.server) return;

  const userStore = useUserStore();
  const modalsStore = useLocationModalStore();

  if (!userStore.user?.id) {
    modalsStore.openAuthModal();
    return abortNavigation();
  }
  return true;
});
