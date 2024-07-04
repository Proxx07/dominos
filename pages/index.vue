<script setup lang="ts">
const testStore = useTestStore();

const check = ref(false)
</script>

<template>
  <div>
    <h1>Main page {{ $t('title') }}</h1>
    <Button @click="testStore.increment" label="inc" class="pi pi-check" style="font-size: 20px"/>
<div></div>
    <Checkbox v-model="check" inputId="ingredient1" name="pizza" value="Cheese" style="font-size: 20px"/>
    <label for="ingredient1" class="ml-2"> Check </label>
  </div>
</template>

<style scoped>

</style>