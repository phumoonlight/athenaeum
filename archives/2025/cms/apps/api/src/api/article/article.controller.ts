import { Controller } from '@nestjs/common'
import { BaseController } from 'src/core/base-controller'
import { Article } from './article.entity'

@Controller('articles')
export class ArticleController extends BaseController {
  entity = Article
}
