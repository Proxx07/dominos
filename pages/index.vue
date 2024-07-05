<script setup lang="ts">
const testStore = useTestStore();

const check = ref(false);
</script>

<template>
  <div>
    <h1>Main page {{ $t('title') }}</h1>
    <Button @click="testStore.increment" label="inc asd asd "/>

    <Button label="test 2" severity="secondary"/>

    <div class="square"/>
<div />
      <Checkbox v-model="check" inputId="ingredient1" value="Cheese" />
      <label for="ingredient1" class="ml-2"> Cheese </label>
  </div>
</template>

<style scoped>
.square {
  width: 30rem;
  height: 30rem;
}
</style>