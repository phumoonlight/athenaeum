import { createStore } from 'vuex'

import { countModule } from './store/count/count.module'
import { listModule } from './store/list/list.module'

export const store = createStore({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    count: countModule,
    list: listModule,
  },
})
