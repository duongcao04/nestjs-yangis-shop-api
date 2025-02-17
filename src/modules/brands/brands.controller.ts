import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
} from '@nestjs/common'
import { BrandsService } from './brands.service'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'

@Controller('brands')
export class BrandsController {
    constructor(private readonly brandsService: BrandsService) {}

    @Get()
    getAllBrands() {
        return this.brandsService.findAll()
    }

    @Get(':id')
    getBrandById(@Param('id') id: string) {
        return this.brandsService.findById(id)
    }

    @Post()
    createBrand(@Body() createBrandDto: CreateBrandDto) {
        return this.brandsService.create(createBrandDto)
    }

    @Patch(':id')
    updateById(
        @Param('id') id: string,
        @Body() updateBrandDto: UpdateBrandDto,
    ) {
        return this.brandsService.update(+id, updateBrandDto)
    }

    @Delete(':id')
    deleteById(@Param('id') id: string) {
        return this.brandsService.remove(id)
    }
}
