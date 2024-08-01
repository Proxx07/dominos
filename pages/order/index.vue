<script setup lang="ts">
import { useOrder } from '~/composables/useOrder';

definePageMeta({
  middleware: 'order',
});
const { orderData } = useOrder();
const { $request } = useNuxtApp();

async function req() {
  try {
    const res = await $request('/api/delivery/Create', {
      method: 'POST',
      body: orderData.value,
    });
    console.log(res);
  }
  catch (e) {}
}

onMounted(() => {
  setTimeout(() => {
    req();
  }, 2000);
});
</script>

<template>
  <div class="container">
    <h1>
      Оформление заказа
    </h1>

    <pre>
      {{ orderData }}
    </pre>
  </div>
</template>

<style scoped lang="scss">

</style>
