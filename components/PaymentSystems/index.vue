<script setup lang="ts">
defineProps<{
  list: string[]
}>();
</script>

<template>
  <div class="payment-systems">
    <img
      v-for="payment in list"
      :key="payment"
      :alt="payment.split('/').at(-1)"
      :src="payment"
    >
  </div>
</template>

<style scoped>
.payment-systems {
  display: flex;
  flex-wrap: wrap;
  font-size: 0;
  align-items: center;
  img {
    width: auto;
    max-width: 80px;
    height: auto;
  }
}
</style>
