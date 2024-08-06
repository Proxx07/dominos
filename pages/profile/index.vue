<script setup lang="ts">
import { useUser } from '~/composables/useUser';

const { user } = useUser();
</script>

<template>
  <div class="container profile-page">
    <div class="left">
      <h1>
        Профиль
      </h1>
      <div class="page-card">
        <h3>Личные данные</h3>
        <input-text
          v-model="user.firstName"
          placeholder="Введите ваше имя"
          class="underlined"
          fluid
        />

        <input-group>
          <input-group-addon class="underlined">
            {{ user.phone1Code }}
          </input-group-addon>
          <input-mask
            v-model="user.phone1"
            mask="(99) 999-99-99"
            placeholder="(##) ###-##-##"
            class="underlined"
          />
        </input-group>
      </div>
    </div>
    <div class="right">
      <h2>История заказов</h2>
      <div class="page-card" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 2.4rem;
}
h2 {
  margin-bottom: 2rem;
}
</style>
