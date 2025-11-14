import { Controller } from '@nestjs/common'
import { BaseController } from 'src/core/base-controller'
import { User } from './entities/user.entity'

@Controller('users')
export class UsersController extends BaseController {
  entity = User
}
