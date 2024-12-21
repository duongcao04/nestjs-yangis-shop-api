import { NestFactory } from '@nestjs/core'
import { ValidationPipe } from '@nestjs/common'
import { AppModule } from '@/app.module'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.useGlobalPipes(
        new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    )
    app.setGlobalPrefix('api/v1', { exclude: [''] })
    await app.listen(process.env.APP_PORT ?? 8000,()=>{
        console.log(`Application running on port:::${process.env.APP_PORT}`)
    })
}
bootstrap()
