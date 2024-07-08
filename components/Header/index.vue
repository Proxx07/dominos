<script setup lang="ts">
import logo from '@/assets/images/Logo.svg';
import { useLocale } from '@/composables/useLocale';

const { language, options, setLocale } = useLocale();

const phoneNumber = 7717;
</script>

<template>
  <header class="header">
    <NuxtLink to="/">
      <img :src="logo" alt="Domino's">
    </NuxtLink>

    <div class="delivery-info">
      30 минут доставка
    </div>

    <a :href="`tel:${phoneNumber}`" class="callback">
      {{ phoneNumber }}
    </a>

    <div class="header-right">
      <Select v-model="language" :options="options" option-label="name" option-value="value" @update:model-value="setLocale" />
    </div>
  </header>
  <navigation />
</template>

<style scoped>
header {
  width: 100%;
  margin: .5rem 0;
  border: 1px solid #000;
  min-height: 10rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.delivery-info {
  font: var(--font-24-b);
  color: var(--primary-500);
}
</style>
