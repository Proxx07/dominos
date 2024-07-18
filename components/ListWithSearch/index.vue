<script setup lang="ts">
const props = defineProps<{
  search: string

  title: string
  subtitle?: string
  searchPlaceholder?: string

  list: Array<Record<string, any>>
  titleKey: string
  subtitleKey?: string
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'listItemClicked', value: any): void
}>();

const searchQuery = computed({
  get() {
    return props.search;
  },

  set(value: string) {
    emit('update:search', value);
  },
});
</script>

<template>
  <card class="transparent">
    <template #title>
      {{ title }}
    </template>

    <template v-if="subtitle" #content>
      {{ subtitle }}
    </template>
  </card>

  <IconField class="search-field">
    <InputText v-model="searchQuery" :placeholder="searchPlaceholder" fluid class="font-12-n" />
    <InputIcon v-show="searchQuery" class="pi pi-times cursor-pointer" @click="searchQuery = ''" />
  </IconField>

  <div class="address-list">
    <card v-for="item in list" :key="item.id" class="secondary list-item cursor-pointer" @click="emit('listItemClicked', item)">
      <template #title>
        {{ item[titleKey] }}
      </template>

      <template v-if="subtitleKey" #content>
        {{ item[subtitleKey] }}
      </template>
    </card>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  margin-bottom: 2px;
  box-shadow: none;
}
</style>
