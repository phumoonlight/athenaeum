import 'reflect-metadata'

import { listen } from './app'
import { connectDatabase } from './database'

const PORT: number = 4000

listen(PORT)
connectDatabase()
