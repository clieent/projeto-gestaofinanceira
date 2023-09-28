import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import * as path from 'path'
import { NestExpressApplication } from '@nestjs/platform-express'

async function bootstrap() {
    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
        abortOnError: false,
        cors: true,
    })
    app.useStaticAssets(path.join(__dirname, '../uploads'))
    await app.listen(process.env.APP_PORT || 3000)
}
bootstrap()
