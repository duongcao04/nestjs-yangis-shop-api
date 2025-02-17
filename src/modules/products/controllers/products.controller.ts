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

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}

    @Get()
    getAllProducts(
        @Query('fields') fields?: string,
        @Query('sort') sort?: string,
    ) {
        return this.productsService.findAll(fields)
    }

    @Post()
    createProduct(@Body() createProductDto: CreateProductDto) {
        return this.productsService.create(createProductDto)
    }

    @Get(':id')
    getProductById(@Param('id') id: string) {
        return this.productsService.findById(id)
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
