<script setup lang="ts">
import { useOrder } from '~/composables/useOrder';
import FormField from "~/components/FormField.vue";

definePageMeta({
  middleware: 'order',
});

const cartStore = useCartStore();

const { orderData, orderDate, headLine, paymentList, activePayment, comment, workTimeStore, postOrder } = useOrder();


</script>

<template>
  <div class="container order-page-wrapper">
    <div class="left-part">
      <h1> Оформление заказа </h1>

      <div class="page-card">
        <div class="location-info">
          <client-only>
            <h3> {{ headLine }} </h3>
            <div class="font-16-n">
              {{ orderData.address }}
            </div>
            <template #fallback>
              <Skeleton width="100%" height="6.9rem" />
            </template>
          </client-only>
        </div>

        <h3> Информация </h3>

        <div class="fields-wrapper">
          <form-field label="Дата">
            <input-group>
              <input-group-addon class="underlined" style="padding-left: 0;">
                {{orderDate.day}}
              </input-group-addon>
              <Select v-model="orderDate" class="underlined" fluid :options="workTimeStore.resultList" option-label="name"/>
            </input-group>
          </form-field>

          <form-field label="Комментарий">
            <Textarea v-model="comment" auto-resize fluid />
          </form-field>
        </div>

        <div class="order-price">
          <client-only fallback="Сумма заказа:">
            Сумма заказа: {{ cartStore.totalPrice.toLocaleString().replaceAll(',', ' ') }} сум
          </client-only>
        </div>
        <h3> Способ оплаты </h3>

        <Select
          v-model="activePayment"
          :options="paymentList"
          option-label="name"
          option-value="id"
          class="underlined"
          fluid
        />

        <Button fluid severity="secondary" @click="postOrder" class="order-button">
          Оформить заказ
        </Button>
      </div>
    </div>

    <div class="right-part">
      <h2> Ваш заказ </h2>
      <client-only>
        <div class="cart-list">
          <transition-group name="slideY">
            <mini-cart-product
              v-for="product in cartStore.cartList"
              :key="product.id"
              :product="product"
              :show-image="true"
              @add-to-cart="cartStore.addToCart"
              @remove-from-cart="cartStore.removeFromCart"
            />
          </transition-group>
        </div>
        <template #fallback>
          <div class="wrapper">
            <Skeleton v-for="i in 3" :key="i" width="100%" height="18rem" style="margin-bottom: 1.2rem;" />
          </div>
        </template>
      </client-only>
    </div>
  </div>
</template>

<style scoped lang="scss">
.location-info {
  margin-bottom: 2rem;
}
.order-page-wrapper {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 2.4rem;
}

.fields-wrapper {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  //.field {
  //  .field-title {
  //    display: block;
  //    margin-bottom: .5rem;
  //    font: var(--font-12-n);
  //    color: var(--accent-text);
  //
  //  }
  //}
}

.order-price {
  text-align: center;
  font: var(--font-16-n);
  color: var(--accent-text);
  padding: 2rem 0;
}

.right-part {
  h2 {
    margin-bottom: 2rem;
  }

  .cart-list {
    display: flex;
    flex-direction: column;
    gap: 1.2rem;
  }
}

.order-button {
  margin-top: 3rem;
}
</style>
