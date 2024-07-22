<script setup lang="ts">
const props = defineProps<{
  title: string
  subtitle?: string
  searchPlaceholder?: string

  list: Array<Record<string, any>>
  titleKey: string
  subtitleKey?: string
  activeKey?: string
  currentItem?: Record<string, any>
}>();

const emit = defineEmits<{
  (e: 'update:search', value: string): void
  (e: 'listItemClicked', value: any): void
}>();

const search = ref<string>('');
const filteredList = computed(() => props.list.filter((item) => {
  return item[props.titleKey].toLowerCase().includes(search.value.toLowerCase()) || (props.subtitleKey && item[props.subtitleKey]?.toLowerCase().includes(search.value.toLowerCase()));
}));
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
    <InputText v-model="search" :placeholder="searchPlaceholder" fluid class="font-12-n" />
    <InputIcon v-show="search" class="pi pi-times cursor-pointer" @click="search = ''" />
  </IconField>

  <div class="address-list">
    <TransitionGroup name="fade">
      <card
        v-for="item in filteredList"
        :key="item.id"
        class="secondary list-item cursor-pointer"
        :style="(activeKey && currentItem) && { '--border-color': item[activeKey] === currentItem[activeKey] ? 'var(--primary-500)' : 'transparent' }"
        @click="emit('listItemClicked', item)"
      >
        <template #title>
          <div v-html="item[titleKey]" />
        </template>

        <template v-if="subtitleKey && item[subtitleKey]" #content>
          <div v-if="subtitleKey && item[subtitleKey]" v-html="item[subtitleKey]" />
        </template>
      </card>
    </TransitionGroup>
  </div>
</template>

<style scoped lang="scss">
.list-item {
  margin-bottom: 2px;
  box-shadow: none;
}
</style>
