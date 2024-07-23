<script setup lang="ts">
const locale = useCookie('lang');
const query = {Language: ln[(locale?.value ?? DEFAULT_LANGUAGE)]};
const menuStore = useMenuStore();

const { data } = await useFetch('/api/shop', { query });
menuStore.folders = data.value.folders
menuStore.products = data.value.products
menuStore.productsForCart = data.value.productsForCart
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
