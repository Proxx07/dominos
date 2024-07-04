<script setup lang="ts">
const testStore = useTestStore();
</script>

<template>
  <div class="wrapper">
    <h1>About page {{ $t('title') }}</h1>
    <h2>{{testStore.count}}</h2>
  </div>
</template>

<style scoped>

</style>