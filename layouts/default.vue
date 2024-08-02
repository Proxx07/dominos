<script setup lang="ts">
import { useUser } from '~/composables/useUser';
import type { IUser } from '~/composables/useUser/types';
import { setUser } from '~/composables/useUser/models';

const modalsStore = useLocationModalStore();
const userStore = useUserStore();

const { user, getUser, createUser, error, loading, logOut } = useUser();
const $toast = useToastStore();

async function handleSubmit(val: Partial<IUser>) {
  user.value = setUser(val);
  if (user.value?.id) {
    await getUser();
    if (error.value) return;
  }
  else {
    await createUser();
    if (error.value) return;
    await getUser();
    if (error.value) return;
  }

  modalsStore.closeAuthModal();
  $toast.info('Уведомление', 'Вы успешно авторизовались');
}
</script>

<template>
  <div class="site-wrapper">
    <Header :user="userStore.user" @login="modalsStore.openAuthModal" @logout="logOut" />

    <main class="main" role="main">
      <slot />
    </main>

    <Footer />

    <Dialog v-model:visible="modalsStore.authModal" class="sm auth-dialog" modal :draggable="false" header="Регистрация">
      <auth-form :loading="loading" @submitted="handleSubmit" />
    </Dialog>

    <client-only>
      <Dialog v-model:visible="modalsStore.locationModal" class="md" modal :draggable="false" header="Выберите тип приема">
        <delivery-map-widget @submit="modalsStore.closeLocationModal" />
      </Dialog>
    </client-only>

    <ConfirmDialog class="xsm" />
  </div>
</template>

<style scoped>
.main {
  flex-grow: 1;
  min-height: 76rem;
  padding-bottom: 10rem;
  overflow-x: hidden;
  padding-top: 1.5rem;
  @media all and (max-width: 1024px) {
    padding-bottom: 5rem;
  }
}
</style>
