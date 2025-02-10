import { IsNotEmpty, IsString } from 'class-validator'
import { BaseDto } from '@/modules/base/base.dto'

export class BrandDto extends BaseDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    slug: string

    @IsNotEmpty()
    @IsString()
    logo: string
}
