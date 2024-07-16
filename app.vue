<script setup lang="ts">
import { useShopData } from '~/composables/useShopData';

const { loginMockUser, getShopData } = useShopData();
await loginMockUser();
await getShopData();

const $route = useRoute();

const menuStore = useMenuStore();

watch(() => $route.query.folder as string, (value) => {
  menuStore.currentFolder = value || '';
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <Toast />
</template>
