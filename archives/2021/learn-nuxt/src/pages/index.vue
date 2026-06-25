<template>
  <div>
    <!-- <h1>Page: Index</h1>
    <ul>
      <li><NuxtLink to="/">home</NuxtLink></li>
      <li><NuxtLink to="/second">second</NuxtLink></li>
    </ul> -->
    <div class="title">
      <span>Athenauem</span>
      <span class="color-v">Nuxt</span>
    </div>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Home'
  },
}
</script>

<style scoped>
.title {
  text-align: center;
  font-family: sans-serif;
  font-weight: bold;
  font-size: 40px;
  margin-top: 5rem;
  margin-bottom: 5rem;
}
</style>