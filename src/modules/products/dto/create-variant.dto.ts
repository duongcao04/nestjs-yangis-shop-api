import {
    IsBoolean,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from 'class-validator'

export class CreateVariantDto {
    @IsNotEmpty()
    attribute_value_ids: string[]

    @IsNotEmpty()
    @IsString()
    SKU: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsOptional()
    @IsNumber()
    stock_quantity: number

    @IsOptional()
    @IsBoolean()
    is_active: boolean
}
