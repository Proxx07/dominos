<script setup lang="ts">
const props = defineProps<{
  icon: string
}>();
</script>

<template>
  <span v-html="props.icon" />
</template>

<style scoped lang="scss">
span {
  display: inline-block;
  font-size: 0;

  :deep(svg path[stroke]) {
    stroke: currentColor;
  }

  &:not(.no-fill) {
    :deep(svg path[fill]) {
      fill: currentColor;
    }
  }
}
</style>
