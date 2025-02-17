import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { VariantsService } from '../services/variants.service'
import { CreateVariantDto } from '../dto/create-variant.dto'

@Controller('products/:productId/attributes/:attributeId/variants')
export class VariantsController {
    constructor(private readonly variantsService: VariantsService) {}

    @Get()
    getAllVariantOptions(
        @Param('productId') productId: string,
        @Param('attributeId') attributeId: string,
    ) {
        return this.variantsService.findAll(productId, attributeId)
    }

    @Get(':id')
    getVariantOptionById(
        @Param('productId') productId: string,
        @Param('attributeId') attributeId: string,
        @Param('id') id: string,
    ) {
        return this.variantsService.findById(productId, attributeId, id)
    }

    @Post()
    createVariantOption(
        @Param('productId') productId: string,
        @Param('attributeId') attributeId: string,
        @Body() createVariantDto: CreateVariantDto,
    ) {
        return this.variantsService.create(
            productId,
            attributeId,
            createVariantDto,
        )
    }
}
