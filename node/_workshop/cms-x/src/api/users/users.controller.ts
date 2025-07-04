import { Controller } from '@nestjs/common'
import { BaseController } from 'src/core/base-controller'

@Controller('users')
export class UsersController extends BaseController {
  wat = 'usersx'

}
