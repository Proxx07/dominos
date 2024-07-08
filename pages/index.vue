<script setup lang="ts">
const testStore = useTestStore()

const check = ref(false)

const selectVal = ref('')
const cities = ref([
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
  { name: 'New York', code: 'NY' },
  { name: 'Rome', code: 'RM' },
  { name: 'London', code: 'LDN' },
  { name: 'Istanbul', code: 'IST' },
  { name: 'Paris', code: 'PRS' },
])
</script>

<template>
  <div>
    <h1>Main page {{ $t('title') }}</h1>
    <Button label="inc asd asd " @click="testStore.increment" />

    <Button label="test 2" severity="secondary" />

    <div />
    <Checkbox v-model="check" input-id="ingredient1" value="Cheese" />
    <label for="ingredient1" class="ml-2"> Cheese </label>

    <div />
    {{ selectVal }}
    <br>

    <Select v-model="selectVal" :options="cities" option-label="name" option-value="code" placeholder="Placeholder text" />
  </div>
</template>
