import { Controller, Get, Post, Body, Param } from '@nestjs/common'
import { VariantsService } from '../services/variants.service'
import { CreateVariantDto } from '../dto/create-variant.dto'

@Controller('variants')
export class VariantsController {
    constructor(private readonly variantsService: VariantsService) {}

    @Get()
    getAllVariants() {
        return this.variantsService.findAll()
    }
}
