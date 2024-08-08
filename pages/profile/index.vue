<script setup lang="ts">
import {useUser} from '~/composables/useUser';
import {useLocationStorage} from "~/composables/useLocationStorage";

const {user} = useUser();
const {addressList} = useLocationStorage();
</script>

<template>
  <div class="container profile-page">
    <div class="left">
      <h1> Профиль </h1>

      <div class="page-card user-form">
        <h3>Личные данные</h3>

        <form-field label="Имя">
          <input-text
            v-model="user.firstName"
            placeholder="Введите ваше имя"
            class="underlined"
            fluid
          />
        </form-field>

        <form-field label="Телефон">
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
        </form-field>
      </div>

      <div class="page-card address">
        <h3> Адрес доставки </h3>

        <client-only>
          {{addressList}}
        </client-only>
      </div>
    </div>
    <div class="right">
      <h2>История заказов</h2>
      <div class="page-card"/>
    </div>
  </div>
</template>

<style scoped lang="scss">
.profile-page {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 2.4rem;
}

.left, .right {
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
}
h2 {
  margin-bottom: 2rem;
}
.user-form {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  padding-bottom: 5rem;
}

</style>
