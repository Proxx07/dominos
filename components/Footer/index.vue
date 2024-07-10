<script setup lang="ts">
import { useNavigation } from '~/composables/useNavigation';

const { NavigationPages } = useNavigation();
</script>

<template>
  <div class="site-bottom">
    <advantages />

    <div class="container">
      <footer class="footer">
        <navigation :folders="[...NavigationPages, ...NavigationPages]" />
      </footer>
    </div>
  </div>
</template>

<style scoped>
.site-bottom {
  background: var(--white);
}
</style>
