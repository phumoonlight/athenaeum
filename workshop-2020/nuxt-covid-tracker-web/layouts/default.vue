<template>
  <div class="app-root">
    <nuxt />
  </div>
</template>

<script>
import { DOCUMENT_TITLE, DOCUMENT_META } from '../src/config'
import 'element-ui/lib/theme-chalk/index.css'

export default {
  head: () => ({
    title: DOCUMENT_TITLE,
    meta: DOCUMENT_META,
    link: [
      {
        rel: 'stylesheet',
        href: 'https://fonts.googleapis.com/css2?family=Roboto&display=swap',
      },
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: 'favicon.ico',
      },
    ],
  }),
}
</script>

<style>
  .app-root {
    font-family: 'Roboto', sans-serif;
  }

  body {
    background: rgb(252, 252, 252);
  }
</style>
