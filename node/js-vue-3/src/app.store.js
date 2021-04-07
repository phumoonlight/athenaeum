import { createStore } from 'vuex'

import { countModule } from './store/count/count.module'

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    count: countModule,
  },
})
