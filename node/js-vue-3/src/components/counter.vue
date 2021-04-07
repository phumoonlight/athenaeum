<template>
  <div class="counter-root">
    <div>Counter: {{ storeCount }}</div>
    <div>Mapped Counter: {{ mappedCount }}</div>
    <button @click="handleClick">click</button>
    <button>click</button>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters } from 'vuex'

export default defineComponent({
  name: 'counter',
  setup() {

  },
  computed: {
    ...mapGetters({
      storeCount: 'count/getCount',
      mappedCount: 'count/getMappedCount',
    }),
  },
  methods: {
    handleClick() {
      this.$store.dispatch('count/countAction', 535)
    },
  },
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
