import { IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { BaseDto } from '../../base/base.dto'

export class CreateCategoryDto {
    @IsNotEmpty()
    @IsString()
    name: string

    @IsNotEmpty()
    @IsString()
    thumbnail: string

    @IsNotEmpty()
    @IsString()
    icon: string

    @IsOptional()
    @IsString()
    description: string
}
