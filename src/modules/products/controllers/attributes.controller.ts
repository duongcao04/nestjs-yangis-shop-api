import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AttributesService } from '../services/attributes.service'
import { CreateAttributeDto } from '../dto/create-attribute.dto'

@Controller('products/:productId/attributes')
export class AttributesController {
    constructor(private readonly attributesService: AttributesService) {}

    @Get()
    getAllVariants(@Param('productId') productId: string) {
        return this.attributesService.findAll(productId)
    }

    @Post()
    createVariant(
        @Param('productId') productId: string,
        @Body() createAttributeDto: CreateAttributeDto,
    ) {
        return this.attributesService.create(productId, createAttributeDto)
    }

    @Get(':id')
    getVariantById(@Param('id') id: string) {
        return this.attributesService.findById(id)
    }
}
