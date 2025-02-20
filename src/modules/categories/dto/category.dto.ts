import { BaseDto } from '@/modules/base/base.dto'
import { IsNotEmpty, IsOptional, IsString } from 'class-validator'

export class CategoryDto extends BaseDto {
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
    thumbnail: string

    @IsOptional()
    @IsString()
    description: string
}
