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
    const res = await $request('/api/delivery/Create', {
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
    $toast.error('Не получилось оформить заказ!', 'не знаю почем ');
  }
}
</script>

<template>
  <div class="container">
    <h1>
      Оформление заказа
    </h1>

    <Button class="order" @click="req">
      Оформить заказ
    </Button>
    <client-only>
      <pre style="padding-top: 20px;"> {{ orderData }} </pre>
    </client-only>
  </div>
</template>

<style scoped lang="scss">
.order {
  font-size: 2rem;
}
</style>
