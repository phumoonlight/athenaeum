import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

const bootstrap = async () => {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule)
  await app.listen(port, () => {
    console.log(`Application is running on: http://localhost:${port}`)
  })
}

void bootstrap()
