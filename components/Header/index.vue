<script setup lang="ts">
import logo from '@/assets/images/Logo.svg';
import { useNavigation } from '~/composables/useNavigation';

const { folders, NavigationPages } = useNavigation();

const phoneNumber = 7717;
const options = ref(['Ташкент']);
const city = ref('Ташкент');
const localePath = useLocalePath();
</script>

<template>
  <header class="header">
    <div class="header__top container">
      <NuxtLink :to="localePath('/')">
        <img :src="logo" alt="Domino's">
      </NuxtLink>

      <div class="delivery-info">
        {{ $t("header.delivery") }}
      </div>

      <a :href="`tel:${phoneNumber}`" class="callback">
        {{ phoneNumber }}
      </a>

      <div class="header-right">
        <lang-switcher />
        <Select v-model="city" :options="options" />
        <Button :label="$t('header.login')" />
      </div>
    </div>

    <div class="header__menu container">
      <navigation :folders="folders" :pages="NavigationPages" />
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding-top: 3.2rem;
  padding-bottom: 3.2rem;
  &__top {
    width: 100%;
    min-height: 10rem;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
  }
}

.delivery-info {
  font: var(--font-24-b);
  color: var(--primary-500);
}
</style>
