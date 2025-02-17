import { Module } from '@nestjs/common'
import { ProductsService } from './services/products.service'
import { ProductsController } from './controllers/products.controller'
import { Product } from './entities/product.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { BrandsModule } from '../brands/brands.module'
import { CategoriesModule } from '../categories/categories.module'
import { Attribute } from './entities/attribute.entity'
import { Variant } from './entities/variant.entity'
import { AttributesController } from './controllers/attributes.controller'
import { VariantsController } from './controllers/variants.controller'
import { AttributesService } from './services/attributes.service'
import { VariantsService } from './services/variants.service'

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Attribute, Variant]),
        BrandsModule,
        CategoriesModule,
    ],
    controllers: [ProductsController, AttributesController, VariantsController],
    providers: [ProductsService, AttributesService, VariantsService],
})
export class ProductsModule {}
