<script setup lang="ts">

</script>

<template>
  <div class="site-wrapper">
    <Header />
    <main class="main container">
      <slot />
    </main>

    <footer class="footer container">
      <h2>Footer</h2>
    </footer>
  </div>
</template>

<style scoped>
.main {
  display: flex;
  flex-grow: 1;
  align-items: flex-start;
  justify-content: center;
}
</style>
