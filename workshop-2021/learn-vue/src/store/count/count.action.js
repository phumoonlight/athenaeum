import {
  increaseCountMutation,
  decreaseCountMutation,
  setIsLoadingMutation,
} from './count.mutation'

let countAsyncTimer

export const increaseCountAction = (context, value = 5) => {
  clearTimeout(countAsyncTimer)
  context.commit(setIsLoadingMutation.name, true)
  countAsyncTimer = setTimeout(() => {
    context.commit(increaseCountMutation.name, value)
    context.commit(setIsLoadingMutation.name, false)
  }, 1000)
}

export const decreaseCountAction = (context, value = 5) => {
  context.commit(decreaseCountMutation.name, value)
}
