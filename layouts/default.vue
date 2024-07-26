<script setup lang="ts"></script>

<template>
  <div class="site-wrapper">
    <Header />

    <main class="main" role="main">
      <slot />
    </main>

    <Footer />
  </div>
</template>

<style scoped>
.main {
  flex-grow: 1;
  min-height: 76rem;
  padding-bottom: 10rem;
  overflow-x: hidden;
  @media all and (max-width: 1024px) {
    padding-bottom: 5rem;
  }
}
</style>
