<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();
const menuStore = useMenuStore();

const lang = computed({
  get() {
    return locale.value;
  },
  set(value: string) {
    setLocale(value);
    menuStore.getShopData();
  },
});
</script>

<template>
  <Select v-model="lang" :options="locales" option-label="name" option-value="code" />
</template>

<style scoped></style>
