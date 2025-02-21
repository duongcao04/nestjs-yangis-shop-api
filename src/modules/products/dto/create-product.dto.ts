import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsNumber()
    price: number

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
    @IsBoolean()
    is_published: boolean

    @IsOptional()
    @IsNumber()
    view_count: number

    @IsNotEmpty()
    @IsString()
    brand_id: string

    @IsNotEmpty()
    category_ids: string[]

    @IsNotEmpty()
    attribute_ids: string[]
}
