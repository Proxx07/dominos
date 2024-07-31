<script setup lang="ts">
import { useUser } from '~/composables/useUser';
import type { IUser } from '~/composables/useUser/types';

const modalsStore = useLocationModalStore();

const { user, getUser, createUser } = useUser();

async function handleSubmit(val: IUser) {
  user.value = val;
  await createUser();
  // modalsStore.closeAuthModal();
}
</script>

<template>
  <div class="site-wrapper">
    <Header />

    <main class="main" role="main">
      <slot />
    </main>

    <Footer />

    <Dialog v-model:visible="modalsStore.authModal" class="sm auth-dialog" modal :draggable="false" header="Регистрация">
      <auth-form @submitted="handleSubmit" />
    </Dialog>
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
