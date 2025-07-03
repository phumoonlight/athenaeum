import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { UsersModule } from './api/users/users.module'
import { LogModule } from './api/log/log.module'

@Module({
  imports: [UsersModule, LogModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
