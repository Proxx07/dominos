<script setup lang="ts">
import type { INavigation } from '~/composables/useNavigation/types';

defineProps<{
  folders: INavigation[]
  pages?: INavigation[]
}>();

const localePath = useLocalePath();
</script>

<template>
  <nav>
    <Menubar :model="pages">
      <template #item="{ item }">
        <nuxt-link class="link" :to="localePath(item.link)">
          <icon v-if="item.icon" :icon="item.icon" no-fill />
          {{ $t(item.name) }}
        </nuxt-link>
      </template>
    </Menubar>
    <Menubar :model="pages">
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
}
.link {
  display: inline-flex;
  padding: 1rem;
  gap: .5rem;
  font: var(--font-14-n);
  align-items: center;
}
</style>
