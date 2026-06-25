import { usersMock } from './user.mock'
import { User } from './user.type'

export const getUsers = async (): Promise<User[]> => {
  return usersMock
}

export const getUserById = async (id: string): Promise<User | undefined> => {
  const user: User | undefined = usersMock.find((user) => {
    return user.id === id
  })
  return user
}

export const createUser = async (user: User): Promise<User> => {
  usersMock.push(user)
  return usersMock[usersMock.length - 1]
}
