import { getCount, getMappedCount, getLoadingStatus } from './count.getter'
import { increaseCountAction, decreaseCountAction } from './count.action'
import { increaseCountMutation, decreaseCountMutation, setIsLoadingMutation } from './count.mutation'

export const countModule = {
  namespaced: true,
  state: {
    count: 0,
    isLoading: false,
  },
  getters: {
    getCount,
    getMappedCount,
    getLoadingStatus,
  },
  actions: {
    increaseCountAction,
    decreaseCountAction,
  },
  mutations: {
    increaseCountMutation,
    decreaseCountMutation,
    setIsLoadingMutation,
  },
}
