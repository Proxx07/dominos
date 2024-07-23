<script setup lang="ts">
import { cart, logo, phone, timer } from '~/assets/images';
import { useNavigation } from '~/composables/useNavigation';

const { NavigationPages } = useNavigation();

const phoneNumber = 7717;
const options = ref(['Ташкент']);
const city = ref('Ташкент');
const localePath = useLocalePath();

const menuStore = useMenuStore();
</script>

<template>
  <header class="header">
    <div class="header__top container">
      <NuxtLink :to="localePath('/')">
        <img :src="logo" alt="Domino's">
      </NuxtLink>

      <div class="icon-text">
        <icon :icon="timer" />
        {{ $t("header.delivery") }}
      </div>

      <div class="phone-wrapper">
        <a :href="`tel:${phoneNumber}`" class="icon-text">
          <icon :icon="phone" />
          {{ phoneNumber }}
        </a>
      </div>

      <div class="header-right">
        <lang-switcher />
<!--        <Select v-model="city" :options="options" />-->
        <Button :label="$t('header.login')" class="login" />
      </div>
    </div>
    <div class="header__menu container">
      <navigation :folders="menuStore.folders" :pages="NavigationPages" class="navigation" />
      <Button icon="pi pi-shopping-cart" severity="secondary" class="cart-button" label="Корзина 0 сум">
        <template #icon>
          <icon :icon="cart" />
        </template>
      </Button>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 3.2rem 0;
  display: grid;
  grid-template-columns: 1fr;
  gap: 4rem;
  background: var(--white);
  margin-bottom: 1.5rem;
  &__top {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    align-items: start;
  }

  &__menu {
    display: flex;
    .navigation {
      flex-grow: 1;
    }
    .cart-button {
      min-width: 13rem;
    }
  }
}

.icon-text {
  font: var(--font-24-b);
  color: var(--primary-500);
  display: inline-flex;
  align-items: center;
  gap: 1rem;
}

.header-right {
  display: flex;
  gap: .7rem;
  .login {
    min-width: 11rem;
  }
}
</style>
