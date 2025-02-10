import { Injectable } from '@nestjs/common'
import { CreateBrandDto } from './dto/create-brand.dto'
import { UpdateBrandDto } from './dto/update-brand.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Brand } from './entities/brand.entity'
import { Repository } from 'typeorm'

@Injectable()
export class BrandsService {
    constructor(
        @InjectRepository(Brand)
        private readonly brandRepository: Repository<Brand>,
    ) {}

    create(createBrandDto: CreateBrandDto) {
        const brand = new Brand()
        brand.name = createBrandDto.name
        brand.slug = createBrandDto.slug
        brand.logo = createBrandDto.logo

        return this.brandRepository.save(brand)
    }

    findAll() {
        return this.brandRepository.find()
    }

    findOne(id: string) {
        return this.brandRepository.findOne({ where: { id } })
    }

    update(id: number, updateBrandDto: UpdateBrandDto) {
        return `This action updates a #${id} brand`
    }

    remove(id: number) {
        return `This action removes a #${id} brand`
    }
}
