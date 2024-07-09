<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();
const lang = computed({
  get() {
    return locale.value;
  },
  set(value: string) {
    setLocale(value);
  },
});
</script>

<template>
  <Select v-model="lang" :options="locales" option-label="name" option-value="code" />
</template>

<style scoped></style>
