import { IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateSkuDto {
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
