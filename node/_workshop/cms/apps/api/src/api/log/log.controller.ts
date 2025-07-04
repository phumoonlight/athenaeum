import { Controller } from '@nestjs/common'
import { BaseController } from 'src/core/base-controller'

@Controller('log')
export class LogController extends BaseController {
  wat = 'logx'

}
