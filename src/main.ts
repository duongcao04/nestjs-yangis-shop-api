import { NestFactory } from '@nestjs/core'
import {
    ClassSerializerInterceptor,
    UseInterceptors,
    ValidationPipe,
} from '@nestjs/common'
import { AppModule } from '@/app.module'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)

    UseInterceptors(ClassSerializerInterceptor)
    app.enableCors({
        credentials: true,
        origin: process.env.FRONTEND_URL,
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    })
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    app.setGlobalPrefix('api/v1', { exclude: [''] })
    app.use(cookieParser())

    const port = process.env.PORT ?? 8000
    await app.listen(port, () => {
        console.log(`Application running on port:::${port}`)
    })
}
bootstrap()
