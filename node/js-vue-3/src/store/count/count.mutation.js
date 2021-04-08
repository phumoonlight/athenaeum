export const increaseCountMutation = (state, value) => {
  state.count += value
}

export const decreaseCountMutation = (state, value) => {
  state.count -= value
}

export const setIsLoadingMutation = (state, value) => {
  state.isLoading = value
}
