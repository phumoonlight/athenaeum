import { Router, Request, Response } from 'express'
import { v4 as getId } from 'uuid'

import { User } from './user.type'
import { getUsers, getUserById, createUser } from './user.service'

export const userController: Router = Router()

userController.get(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const users = await getUsers()
    res.status(200)
    res.json(users)
  }
)

userController.get(
  '/:id',
  async (req: Request, res: Response): Promise<void> => {
    const id: string = req.params.id
    const user: User | undefined = await getUserById(id)
    res.status(200)
    res.json(user ?? null)
  }
)

userController.post(
  '/',
  async (req: Request, res: Response): Promise<void> => {
    const user: User = await createUser({
      id: getId(),
      age: req.body.age,
      name: req.body.name,
    })
    res.status(201)
    res.json(user)
  }
)
