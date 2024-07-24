<script setup lang="ts">
import type { IProcessedProduct } from '~/composables/useShopData/types';

const props = defineProps<{
  modelValue: string
  options: IProcessedProduct[]
  optionLabel: string
  optionValue: string
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>();

const modID = computed({
  get() {
    return props.modelValue;
  },
  set(value: string) {
    emit('update:modelValue', value);
  },
});
</script>

<template>
  <select-button
    v-if="options.length"
    v-model="modID"
    :options="options"
    :option-label="optionLabel"
    :option-value="optionValue"
    aria-labelledby="basic"
    class="modifiers"
    :allow-empty="false"
  >
    <template #option="slotProps">
      <div class="modifiers__item">
        <i class="pi pi-icon" :class="[slotProps.option[optionValue] === modID ? 'pi-check' : 'pi-plus']" />
        <img v-if="slotProps.option.imageUrl" :src="slotProps.option.imageUrl" width="30">
        {{ slotProps.option[optionLabel] }}
      </div>
    </template>
  </select-button>
</template>

<style scoped lang="scss">
.modifiers {
  flex-direction: column;
  width: 100%;
  gap: .5rem;
  :deep(.p-togglebutton) {
    --p-togglebutton-background: var(--primary-50);
    --p-togglebutton-hover-background: var(--primary-50);
    --p-togglebutton-checked-background: var(--primary-50);
    --p-togglebutton-color: var(--primary-500);
    --p-togglebutton-content-checked-background: none;
    --p-togglebutton-content-checked-shadow: none;
    --p-togglebutton-padding: .3rem;
    --p-togglebutton-border-color: transparent;
    .p-togglebutton-content {
      width: 100%;
    }
  }
  &__item {
    display: flex;
    gap: .7rem;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    font: var(--font-14-n);
    .pi-icon {
      width: 3rem;
      font-size: 1.7rem;
      font-weight: bold;
      padding: .6rem;
      background: var(--primary-200);
      border-radius: var(--radius-s);
    }
  }
}
</style>
