import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { AttributesService } from '../services/attributes.service'
import { CreateAttributeDto } from '../dto/create-attribute.dto'
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto'
import { AttributeValuesService } from '../services/attribute-values.service'

@Controller('attributes')
export class AttributesController {
    constructor(
        private readonly attributesService: AttributesService,
        private readonly attributeValuesService: AttributeValuesService,
    ) {}

    @Get()
    getAllAttributes() {
        return this.attributesService.findAll()
    }

    @Post()
    createAttribute(@Body() createAttributeDto: CreateAttributeDto) {
        return this.attributesService.createAttribute(createAttributeDto)
    }

    @Get(':attributeId/attribute-values')
    getAllAttributeValuesByAttributeId(@Param() attributeId: string) {
        return this.attributeValuesService.findAll(attributeId)
    }

    @Post(':attributeId/attribute-values')
    createAttributeValue(
        @Param('attributeId') attributeId: string,
        @Body() createAttributeValueDto: CreateAttributeValueDto,
    ) {
        return this.attributeValuesService.createAttributeValue(
            attributeId,
            createAttributeValueDto,
        )
    }
}
