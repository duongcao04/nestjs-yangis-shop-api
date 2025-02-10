import { OmitType, PickType } from '@nestjs/mapped-types'
import { ProductDto } from './product.dto'
import { IsNotEmpty } from 'class-validator'

export class CreateProductDto extends OmitType(ProductDto, [
    'id',
    'created_at',
    'categories',
    'updated_at',
    'deleted_at',
] as const) {
    @IsNotEmpty()
    category_ids: string[]
}
