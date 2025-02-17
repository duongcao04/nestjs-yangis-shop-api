import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { AttributesService } from './attributes.service'
import { Variant } from '../entities/variant.entity'
import { CreateVariantDto } from '../dto/create-variant.dto'
import { ProductsService } from './products.service'

@Injectable()
export class VariantsService {
    constructor(
        @InjectRepository(Variant)
        private readonly variantRepository: Repository<Variant>,
        private readonly productsService: ProductsService,
        private readonly attributesService: AttributesService,
    ) {}

    async create(
        productId: string,
        attributeId: string,
        createVariantDto: CreateVariantDto,
    ): Promise<Variant> {
        const option = new Variant()

        option.value = createVariantDto.value
        option.sku = createVariantDto.sku
        option.price = createVariantDto.price
        option.stock = createVariantDto.stock

        const product = await this.productsService.findById(productId)
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        option.product = product

        const attribute = await this.attributesService.findById(attributeId)
        if (!attribute) {
            throw new NotFoundException('Attribute not found!')
        }
        option.attribute = attribute

        return await this.variantRepository.save(option)
    }

    async findAll(productId: string, attributeId: string): Promise<Variant[]> {
        return await this.variantRepository.find({
            where: {
                attribute: { id: attributeId, product: { id: productId } },
            },
        })
    }

    async findById(
        productId: string,
        attributeId: string,
        id: string,
    ): Promise<Variant> {
        return await this.variantRepository.findOne({
            where: {
                id,
                attribute: { id: attributeId, product: { id: productId } },
            },
        })
    }
}
