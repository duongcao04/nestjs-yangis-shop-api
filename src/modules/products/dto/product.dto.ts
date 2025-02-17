import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
    IsUUID,
} from 'class-validator'
import { BaseDto } from '@/modules/base/base.dto'

export class ProductDto extends BaseDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsOptional()
    @IsNumber()
    discount_percentage?: number

    @IsNotEmpty()
    @IsString()
    description: string

    @IsNotEmpty()
    @IsString()
    thumbnail: string

    @IsNotEmpty()
    @IsString()
    brand_id: string

    @IsNotEmpty()
    @IsBoolean()
    is_publish: boolean

    @IsNotEmpty()
    @IsNumber()
    view_count: number

    @IsNotEmpty()
    categories: string[] | string
}
