<script setup lang="ts">
import { useOrder } from '~/composables/useOrder';

definePageMeta({
  middleware: 'order',
});

const cartStore = useCartStore();

const { orderData } = useOrder();
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

async function paymentList() {
  try {
    const res = await $request('/api/paytypes/List');
    console.log(res);
    // $toast.success('Заказ оформлен!', 'Ура');
    // cartStore.clearCart();
  }
  catch (e: any) {
    if (e.data.error) {
      $toast.error('Не получилось список способов оплаты!', e.data.error);
      return;
    }
    $toast.error('Ошибка!', 'Ошибка на сервере');
  }
}

const date = ref<any>(new Date());
</script>

<template>
  <div class="container order-page-wrapper">
    <div class="left-part">
      <h1>
        Оформление заказа
      </h1>

      <Card class="order-card">
        <template #content>
          <h3 v-if="false">
            Ресторан
          </h3>

          <h3>
            Информация
          </h3>

          <date-picker v-model="date" show-time hour-format="24" date-format="dd/mm/yy" :manual-input="false" />
        </template>
      </Card>

      <Button class="order" @click="req">
        Оформить заказ
      </Button>
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
.order-card {
  --p-card-body-padding: 2rem;
  h3 {
    font: var(--font-24-n);
    color: var(--accent-text);
    margin-bottom: 2.4rem;
  }
}

.order-page-wrapper {
  display: grid;
  grid-template-columns: 7fr 5fr;
  gap: 2.4rem;
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

.order {
  font-size: 2rem;
}
</style>
