import { Module } from '@nestjs/common'
import { ArticleController } from './article.controller'

@Module({
  controllers: [ArticleController],
  providers: [],
})
export class ArticleModule { }
