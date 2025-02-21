import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    Query,
} from '@nestjs/common'
import { ProductsService } from '../services/products.service'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { CommentsService } from '../../comments/comments.service'
import { VariantsService } from '../services/variants.service'
import { CreateVariantDto } from '../dto/create-variant.dto'

@Controller('products')
export class ProductsController {
    constructor(
        private readonly productsService: ProductsService,
        private readonly commentsService: CommentsService,
        private readonly variantsService: VariantsService,
    ) {}

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    @Get()
    getAllProducts(
        @Query('slug') slug?: string,
        @Query('fields') fields?: string,
        @Query('sort') sort?: string,
    ) {
        if (slug) {
            return this.productsService.findBySlug(slug)
        }

        return this.productsService.findAll(fields, sort)
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.findById(id)
    }

    @Get(':productId/comments')
    getAllCommentsOfProduct(@Param('productId') productId: string) {
        return this.commentsService.findAllByProductId(productId)
    }

    @Get(':productId/attributes')
    getProductAttributeValues(@Param('productId') productId:string){
        return this.productsService.getProductAttributeValues(productId)
    }

    @Get(':productId/variants')
    getAllProductsOfProduct(@Param('productId') productId: string) {
        return this.variantsService.findAllByProductId(productId)
    }

    @Post(':productId/variants')
    createProductVariant(
        @Param('productId') productId: string,
        @Body() createVariantDto: CreateVariantDto,
    ) {
        return this.variantsService.createVariant(productId, createVariantDto)
    }

    @Patch(':id')
    updateProductById(
        @Param('id') id: string,
        @Body() updateProductDto: UpdateProductDto,
    ) {
        return this.productsService.update(+id, updateProductDto)
    }

    @Delete(':id')
    deleteProductById(@Param('id') id: string) {
        return this.productsService.remove(+id)
    }
}
