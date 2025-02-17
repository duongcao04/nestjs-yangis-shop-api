import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateVariantDto {
    @IsNotEmpty()
    @IsString()
    value: string

    @IsNotEmpty()
    @IsString()
    sku: string

    @IsNotEmpty()
    @IsNumber()
    price: number

    @IsNotEmpty()
    @IsNumber()
    stock: number
}
