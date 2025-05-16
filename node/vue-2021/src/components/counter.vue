<template>
  <div class="component-counter">
    <div>Counter: {{ count }}</div>
    <div>Mapped Counter: {{ mappedCount }}</div>
    <button @click="onClickPlus">+</button>
    <button @click="onClickMinus">-</button>
    <div v-if="isLoading">Loading...</div>
    <div>{{ localCount }}</div>
    <slot name="me" />
  </div>
</template>

<script>
import { computed, ref, onMounted } from 'vue'
import { useStore } from 'vuex'
import {
  increaseCountAction,
  decreaseCountAction,
} from '../store/count/count.action'

export default {
  setup(props, context) {
    const localCount = ref(325)
    const store = useStore()

    const count = computed(() => store.state.count.count)
    const mappedCount = computed(() => store.state.count.count + 10)
    const isLoading = computed(() => store.state.count.isLoading)

    const onClickPlus = () => {
      localCount.value = 5235
      store.dispatch(`count/${increaseCountAction.name}`, 1)
      context.emit('customEvent', localCount.value)
    }

    const onClickMinus = () => {
      store.dispatch(`count/${decreaseCountAction.name}`, 1)
    }

    onMounted(() => {
      console.info('counter mounted')
    })

    return {
      count,
      mappedCount,
      isLoading,
      localCount,
      onClickPlus,
      onClickMinus,
    }
  },
}
</script>

<style scoped>
button {
  font-weight: bold;
  width: 50px;
  margin: 5px;
}
</style>
