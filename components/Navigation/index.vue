<script setup lang="ts">
const list = [
  {
    name: "main",
    link: "/"
  },

  {
    name: "about",
    link: "/about"
  }
]
</script>

<template>
  <nav>
    <ul>
      <li v-for="item in list" :key="item.link">
        <nuxt-link class="link" :to="item.link">
          {{item.name}}
        </nuxt-link>
      </li>
    </ul>
  </nav>
</template>

<style scoped>
ul {
  font-size: 2rem;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  .link {
    display: inline-block;
    padding: 1rem;
  }
}
</style>