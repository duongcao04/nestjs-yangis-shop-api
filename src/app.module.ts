import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import configuration from '@/config'
import { AppController } from '@/app.controller'
import { AppService } from '@/app.service'
import { TypeOrmModule } from '@nestjs/typeorm'
import { ProductsModule } from '@/modules/products/products.module'
import { UsersModule } from '@/modules/users/users.module'
import { CategoriesModule } from '@/modules/categories/categories.module'
import { BrandsModule } from '@/modules/brands/brands.module'
import { AuthModule } from '@/modules/auth/auth.module'

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            load: [configuration],
            envFilePath: ['.env.development', '.env.production'],
        }),
        TypeOrmModule.forRootAsync({
            imports: [ConfigModule],
            useFactory: (configService: ConfigService) =>
                configService.get('database'),
            inject: [ConfigService],
        }),
        ProductsModule,
        CategoriesModule,
        BrandsModule,
        UsersModule,
        AuthModule,
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
