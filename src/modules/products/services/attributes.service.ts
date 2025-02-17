import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { ProductsService } from './products.service'
import { Attribute } from '../entities/attribute.entity'
import { CreateAttributeDto } from '../dto/create-attribute.dto'

@Injectable()
export class AttributesService {
    constructor(
        @InjectRepository(Attribute)
        private readonly attributesRepository: Repository<Attribute>,
        private readonly productsService: ProductsService,
    ) {}

    async create(
        productId: string,
        createAttributeDto: CreateAttributeDto,
    ): Promise<Attribute> {
        const variant = new Attribute()

        variant.name = createAttributeDto.name

        const product = await this.productsService.findById(productId)
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        variant.product = product

        return await this.attributesRepository.save(variant)
    }

    async findAll(productId: string): Promise<Attribute[]> {
        return await this.attributesRepository.find({
            where: { product: { id: productId } },
            relations: ['product', 'variants'],
        })
    }

    async findById(id: string): Promise<Attribute> {
        return await this.attributesRepository.findOne({
            where: { id },
            relations: ['product', 'variants'],
        })
    }
}
