export const removeListItemMutation = (state, value) => {
  state.list = state.list.filter((item) => item.id !== value)
}

export const addListItemMutation = (state, value) => {
  state.list = [...state.list, value]
}

export const setIsLoadingMutation = (state, value) => {
  state.isLoading = value
}
