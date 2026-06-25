import { addListItemMutation, removeListItemMutation } from './list.mutation'

export const addListItem = (context, value = {}) => {
  context.commit(addListItemMutation.name, value)
}

export const removeListItem = (context, id) => {
  context.commit(removeListItemMutation.name, id)
}
