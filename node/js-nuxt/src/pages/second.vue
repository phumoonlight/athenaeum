<template>
  <div>
    <h1>Page: Second</h1>
    <ul>
      <li><NuxtLink to="/">home</NuxtLink></li>
      <li><NuxtLink to="/second">second</NuxtLink></li>
    </ul>
  </div>
</template>

<script>
export default {
  head: {
    title: 'Second'
  },
  layout: 'other'
}
</script>
