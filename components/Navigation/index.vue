<script setup lang="ts">
import type { INavigation } from '~/composables/useNavigation/types';
import type { ICategory } from '~/composables/useShopData/types';

const props = defineProps<{
  folders: ICategory[]
  pages?: INavigation[]
}>();

const localePath = useLocalePath();
const fullWidth = computed(() => (!props.pages || !props.pages.length) || (!props.folders || !props.folders.length));
</script>

<template>
  <nav :class="[fullWidth && 'full-width']">
    <Menubar v-if="folders.length" :model="folders">
      <template #item="{ item }">
        <nuxt-link class="link" :to="{ path: '/', query: { folder: item.id } }">
          {{ item.name }}
        </nuxt-link>
      </template>
    </Menubar>

    <Menubar v-if="pages && pages.length" :model="pages">
      <template #item="{ item }">
        <nuxt-link class="link" :to="localePath(item.link)">
          <icon v-if="item.icon" :icon="item.icon" no-fill />
          {{ $t(item.name) }}
        </nuxt-link>
      </template>
    </Menubar>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
  &.full-width {
    grid-template-columns: 1fr;
  }
}
.link {
  display: inline-flex;
  padding: 1rem;
  gap: .5rem;
  font: var(--font-14-n);
  align-items: center;
}
</style>
