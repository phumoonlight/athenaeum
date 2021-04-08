<template>
  <div class="counter-root">
    <div>Counter: {{ count }}</div>
    <div>Mapped Counter: {{ mappedCount }}</div>
    <button @click="onClickPlus">+</button>
    <button @click="onClickMinus">-</button>
    <div v-if="isLoading">Loading...</div>
    <div>{{ localCount }}</div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import { mapGetters, useStore } from 'vuex'
import {
  increaseCountAction,
  decreaseCountAction,
} from '../store/count/count.action'

export default defineComponent({
  name: 'counter',
  setup() {
    const store = useStore()
    console.log(store.state)
    return {
      localCount: '325',
    }
  },
  computed: {
    ...mapGetters({
      count: 'count/getCount',
      mappedCount: 'count/getMappedCount',
      isLoading: 'count/getLoadingStatus',
    }),
  },
  methods: {
    onClickPlus() {
      this.localCount = 5235
      this.$store.dispatch(`count/${increaseCountAction.name}`, 1)
      this.$emit('customEvent', this.localCount)
    },
    onClickMinus() {
      this.$store.dispatch(`count/${decreaseCountAction.name}`, 1)
    },
  },
})
</script>

<style scoped>
button {
  font-weight: bold;
  width: 50px;
  margin: 5px;
}
</style>
