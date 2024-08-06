import {useRouter} from "#app";

export default defineNuxtRouteMiddleware(() => {
  if (import.meta.server) return;
  const router = useRouter();
  const isAuth = localStorage.getItem('user-id');
  const modalsStore = useLocationModalStore();

  if (!isAuth) {
    modalsStore.openAuthModal();
    return navigateTo('/');
  }
  return true;
});
