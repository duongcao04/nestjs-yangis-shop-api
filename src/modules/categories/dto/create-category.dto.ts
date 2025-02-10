import { OmitType, PickType } from '@nestjs/mapped-types'
import { CategoryDto } from './category.dto'

export class CreateCategoryDto extends OmitType(CategoryDto, [
    'id',
    'created_at',
    'updated_at',
    'deleted_at',
] as const) {}
