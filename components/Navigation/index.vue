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
    <ul>
      <li v-for="item in folders" :key="item.link">
        <nuxt-link class="link" :to="localePath(item.link)">
          {{ $t(item.name) }}
        </nuxt-link>
      </li>
    </ul>

    <ul v-if="pages && pages.length">
      <li v-for="item in pages" :key="item.link">
        <nuxt-link class="link" :to="localePath(item.link)">
          {{ $t(item.name) }}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped lang="scss">
nav {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: .5rem;
}
ul {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  .link {
    display: inline-block;
    padding: 1rem;
    font: var(--font-14-n);
  }
}
</style>
