import { Controller } from '@nestjs/common'
import { BaseController } from 'src/core/base-controller'
import { Log } from './entities/log.entity'

@Controller('logs')
export class LogController extends BaseController {
  entity = Log
}
