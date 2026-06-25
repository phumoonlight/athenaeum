import { getLoadingStatus } from './list.getter'
import { addListItem, removeListItem } from './list.action'
import {
  addListItemMutation,
  removeListItemMutation,
  setIsLoadingMutation,
} from './list.mutation'

export const listModule = {
  namespaced: true,
  state: {
    count: 0,
    isLoading: false,
  },
  getters: {
    getLoadingStatus,
  },
  actions: {
    addListItem,
    removeListItem,
  },
  mutations: {
    addListItemMutation,
    removeListItemMutation,
    setIsLoadingMutation,
  },
}
