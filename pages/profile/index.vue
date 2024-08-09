<script setup lang="ts">
import {useMenu} from "~/composables/useMenu";
import {useUser} from '~/composables/useUser';
import type {IMarker} from "~/composables/useLocationStorage/types";

const {user} = useUser();
const {
  isDelivery, addressList, restMarksList, submitMapHandler,
  currentMarker, addressSelectHandle, getRestaurants,
} = useMenu();

onBeforeMount(() => {
  getRestaurants();
});

const addressHandler = async (value: IMarker) => {
  addressSelectHandle(value);
  await submitMapHandler();
}
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


        <client-only>
          <h3> {{ isDelivery ? 'Адрес доставки' : 'Ресторан для самовывоза' }} </h3>
          <list-with-search
            v-if="isDelivery"
            :list="addressList"
            :current-item="currentMarker"
            title-key="title"
            subtitle-key="address"
            active-key="title"
            :disable-search="true"
            @list-item-clicked="addressHandler"
          />

          <list-with-search
            v-else
            :list="restMarksList"
            :current-item="currentMarker"
            title-key="title"
            subtitle-key="address"
            active-key="title"
            :disable-search="true"
            @list-item-clicked="addressHandler"
          />
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
