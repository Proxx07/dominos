<script setup lang="ts">

</script>

<template>
  <div class="site-wrapper">
    <Header />
    <main class="main">
      <slot />
    </main>

    <footer class="footer">
      <h2>Footer</h2>
    </footer>
  </div>
</template>

<style scoped>
main, footer {
  width: 100%;
  text-align: center;
  margin: .5rem 0;
  border: 1px solid #000;
  min-height: 10rem;
}

.main {
  flex-grow: 1;
  display: grid;
  align-content: center;
  overflow-x: hidden;
}
</style>
