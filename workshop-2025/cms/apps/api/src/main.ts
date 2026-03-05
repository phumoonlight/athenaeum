import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { testDatabaseConn } from './database/client'
import { SERVER_CONFIG } from './config'

const bootstrap = async () => {
  await testDatabaseConn()
  const app = await NestFactory.create(AppModule, {
    cors: true,
  })
  await app.listen(SERVER_CONFIG.port, () => {
    console.log(`Application is running on: http://localhost:${SERVER_CONFIG.port}`)
  })
}

void bootstrap()
