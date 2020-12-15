<template>
  <div class="page-root">
    <img src="/images/logo.png" alt="v-logo" />
    <Title />
    <Example />
  </div>
</template>

<script>
import Example from '../components/example'
import Title from '../components/title'

export default {
  components: {
    Example,
    Title,
  },
}
</script>
