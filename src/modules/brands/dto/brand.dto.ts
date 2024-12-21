import { BaseDto } from '@/modules/base/base.dto'
import { Type } from 'class-transformer'
import { CreateBrandDto } from './create-brand.dto'

export class BrandDto {
    @Type(() => BaseDto)
    baseDto: BaseDto

    @Type(() => BrandDto)
    createBrandDto: CreateBrandDto
}
