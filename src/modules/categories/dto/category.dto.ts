import { Type } from 'class-transformer'
import { BaseDto } from '../../base/base.dto'
import { CreateCategoryDto } from './create-category.dto'

export class CategoryDto {
    @Type(() => BaseDto)
    baseDto: BaseDto

    @Type(() => CreateCategoryDto)
    createCategoryDto: CreateCategoryDto
}
