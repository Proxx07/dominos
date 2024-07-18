<script setup lang="ts">
const { locales, locale, setLocale } = useI18n();
const ln = useCookie('lang');

const lang = computed({
  get() {
    return locale.value;
  },

  set: async (value: string) => {
    await setLocale(value);
    ln.value = value;
    document.location.reload();
  },
});
</script>

<template>
  <Select v-model="lang" :options="locales" option-label="name" option-value="code" />
</template>

<style scoped></style>
