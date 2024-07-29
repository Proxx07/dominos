<script setup lang="ts">
import type { LangTypes } from '~/utils/constatns';
import { useLocationStorage } from '~/composables/useLocationStorage';
import type { IProcessedResponse } from '~/composables/useShopData/types';

const { location, isLocationSaved } = useLocationStorage();
const locale = useCookie('lang');

const query = { Language: ln[(locale?.value ?? DEFAULT_LANGUAGE) as LangTypes] };
const menuStore = useMenuStore();

async function getNewMenu() {
  const data = await $fetch<IProcessedResponse>('/api/shop', { query: { ...query, ...location.value } });
  menuStore.setMenu(data);
}

const { data } = await useFetch('/api/shop', { query });
menuStore.setMenu(data?.value as IProcessedResponse);

onMounted(() => {
  if (isLocationSaved.value) {
    getNewMenu();
  }
  else {
    $fetch('/api/token/');
  }
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
