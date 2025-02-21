import { forwardRef, Module } from '@nestjs/common'
import { ProductsService } from './services/products.service'
import { ProductsController } from './controllers/products.controller'
import { Product } from './entities/product.entity'
import { AttributeValue } from './entities/attribute-value.entity'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Attribute } from './entities/attribute.entity'
import { Variant } from './entities/variant.entity'
import { VariantsController } from './controllers/variants.controller'
import { AttributesService } from './services/attributes.service'
import { VariantsService } from './services/variants.service'

import { BrandsModule } from '@/modules/brands/brands.module'
import { CategoriesModule } from '@/modules/categories/categories.module'
import { CommentsModule } from '@/modules/comments/comments.module'
import { AttributeValuesService } from './services/attribute-values.service'
import { AttributesController } from './controllers/attributes.controller'

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Attribute, AttributeValue, Variant]),
        forwardRef(() => BrandsModule),
        forwardRef(() => CategoriesModule),
        forwardRef(() => CommentsModule),
    ],
    controllers: [ProductsController, AttributesController, VariantsController],
    providers: [
        ProductsService,
        AttributesService,
        AttributeValuesService,
        VariantsService,
    ],
    exports: [ProductsService],
})
export class ProductsModule {}
