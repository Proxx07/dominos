<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import { logo, phone, timer } from '~/assets/images';
import { useNavigation } from '~/composables/useNavigation';
import type { IUser } from '~/composables/useUser/types';

const props = defineProps<{
  user?: IUser
}>();

const emit = defineEmits<{
  (e: 'login'): void
  (e: 'logout'): void
}>();

const { t } = useI18n({ useScope: 'global' });

const { NavigationPages } = useNavigation();
const phoneNumber = 7717;
const localePath = useLocalePath();
const menuStore = useMenuStore();

function handleLogin() {
  if (props.user?.id) {
    emit('logout');
    return;
  }
  emit('login');
}

const buttonText = computed(() => props.user?.firstName ? props.user?.firstName : t('header.login'));
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

        <client-only>
          <Button :label="buttonText" class="login" @click="handleLogin" />
          <template #fallback>
            <Skeleton width="11rem" height="4rem" />
          </template>
        </client-only>
      </div>
    </div>
    <div class="header__menu container">
      <navigation :folders="menuStore.folders" :pages="NavigationPages" class="navigation" />

      <client-only>
        <mini-cart />
        <template #fallback>
          <Skeleton width="13rem" height="4.5rem" />
        </template>
      </client-only>
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
  justify-content: flex-end;
  .login {
    min-width: 11rem;
  }
}
</style>
