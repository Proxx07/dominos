<script setup lang="ts">
const props = defineProps<{
  icon: string
  noFill?: boolean
}>();
</script>

<template>
  <span :class="[noFill && 'no-fill']" v-html="props.icon" />
</template>

<style scoped lang="scss">
span {
  display: inline-block;
  font-size: 0;

  &:not(.no-fill) {
    :deep(svg) {
      path[fill] {
        fill: currentColor;
      }
      path[stroke] {
        stroke: currentColor;
      }
    }
  }
}
</style>
