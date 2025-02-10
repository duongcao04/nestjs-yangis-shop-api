import { PartialType, PickType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString } from 'class-validator'
import { BrandDto } from './brand.dto'

export class CreateBrandDto extends PickType(BrandDto, [
    'name',
    'slug',
    'logo',
] as const) {}
