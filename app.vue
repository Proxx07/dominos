<script setup lang="ts">
import type { LangTypes } from '~/utils/constatns';
import { useLocationStorage } from '~/composables/useLocationStorage';
import type { IProcessedResponse } from '~/composables/useShopData/types';
import { useDelivery } from '~/composables/useDeliveries';
// import {setLocation} from "~/composables/useLocationStorage/models";

const { location, isLocationSaved } = useLocationStorage();
const { activeDelivery } = useDelivery();
const { locale } = useI18n();

const query = { Language: ln[(locale?.value ?? DEFAULT_LANGUAGE) as LangTypes] };
const menuStore = useMenuStore();

async function getNewMenu() {
  const data = await $fetch<IProcessedResponse>('/api/shop', { query: { ...query, ...location.value, OrderTypeId: activeDelivery.value } });
  if (!data.error) {
    //location.value = setLocation();
    menuStore.setMenu(data);
  }
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
  <client-only>
    <Toast />
  </client-only>
</template>
