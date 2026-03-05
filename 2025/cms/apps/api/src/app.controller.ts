import { Controller, Get } from '@nestjs/common'
import { getDatabaseSimpleMetadatas } from './core/content-metadata'

@Controller()
export class AppController {
  @Get()
  getHello() {
    return getDatabaseSimpleMetadatas()
  }
}
