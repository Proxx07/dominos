<script setup lang="ts">
const emit = defineEmits<{
  (e: 'intersected'): void
}>();

const intersector = ref();

const observer = window && new IntersectionObserver(callback, {});

function callback(entries: IntersectionObserverEntry[]) {
  if (!entries[0].isIntersecting) return;
  emit('intersected');
}

onMounted(() => {
  if (!observer) return;
  observer.observe(intersector.value);
});
onBeforeUnmount(() => {
  if (!observer) return;
  observer.unobserve(intersector.value);
});
</script>

<template>
  <div ref="intersector" class="intersection">
    <slot />
  </div>
</template>

<style scoped lang="scss">

</style>
