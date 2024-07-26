<script setup lang="ts">
import type { LangTypes } from '~/utils/constatns';

const locale = useCookie('lang');
const query = { Language: ln[(locale?.value ?? DEFAULT_LANGUAGE) as LangTypes] };
const menuStore = useMenuStore();

const { data } = await useFetch('/api/shop', { query });
menuStore.folders = data.value?.folders ?? [];
menuStore.products = data.value?.products ?? [];
menuStore.productsForCart = data.value?.productsForCart ?? [];
onBeforeMount(() => {
  $fetch('/api/token/')
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
