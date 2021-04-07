import { getCount, getMappedCount } from './count.getter'

export const countModule = {
  namespaced: true,
  state: () => ({
    globalCount: 0,
  }),
  getters: {
    getCount,
    getMappedCount,
  },
  actions: {
    countAction(context, val) {
      console.log(val)
      context.commit('mutateCount', val)
    },
  },
  mutations: {
    mutateCount(state, result) {
      console.log(result)
      state.globalCount += 5
    },
  },
}
