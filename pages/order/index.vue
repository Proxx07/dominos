<script setup lang="ts">
import { useOrder } from '~/composables/useOrder';

definePageMeta({
  middleware: 'order',
});

const cartStore = useCartStore();

const { orderData, headLine, paymentList, activePayment, comment } = useOrder();
const { $request } = useNuxtApp();
const $toast = useToastStore();

async function req() {
  try {
    await $request('/api/delivery/Create', {
      method: 'POST',
      body: orderData.value,
    });
    $toast.success('Заказ оформлен!', 'Ура');
    cartStore.clearCart();
  }
  catch (e: any) {
    if (e.data.error) {
      $toast.error('Не получилось оформить заказ!', e.data.error);
      return;
    }
    $toast.error('Не получилось оформить заказ!', 'не знаю поч ');
  }
}
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
          <div class="field">
            <input-group>
              <input-group-addon class="underlined">
                дата дата
              </input-group-addon>
              <Select class="underlined" fluid />
            </input-group>
          </div>

          <div class="field">
            <label class="field-title">Ваш комментарий</label>
            <Textarea v-model="comment" auto-resize fluid />
          </div>
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
          fluid
        />

        <Button fluid severity="secondary" @click="req">
          Оформить заказ
        </Button>
      </div>

      <client-only>
        <pre style="padding-top: 20px;"> {{ orderData }} </pre>
      </client-only>
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
  .field {
    .field-title {
      display: block;
      margin-bottom: .5rem;
      font: var(--font-12-n);
      color: var(--accent-text);

    }
  }
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
</style>
