import { Module } from '@nestjs/common'
import { UsersModule } from './users/users.module'
import { LogModule } from './log/log.module'
import { ArticleModule } from './article/article.module'

@Module({
  imports: [UsersModule, LogModule, ArticleModule],
  controllers: [],
})
export class ApiModule { }
