import { PartialType } from '@nestjs/mapped-types'
import { BrandDto } from './brand.dto'

export class UpdateBrandDto extends PartialType(BrandDto) {}
