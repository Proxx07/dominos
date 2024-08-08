<script setup lang="ts">
defineProps<{
  label?: string
}>();
</script>

<template>
  <div class="field">
    <label v-if="label" class="field-title">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped lang="scss">
.field {
  .field-title {
    display: block;
    margin-bottom: .5rem;
    font: var(--font-12-n);
    color: var(--accent-text);
  }
}
</style>
