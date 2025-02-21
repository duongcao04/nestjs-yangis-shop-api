import { Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Variant } from '../entities/variant.entity'
import { CreateVariantDto } from '../dto/create-variant.dto'
import { ProductsService } from './products.service'
import { AttributeValuesService } from './attribute-values.service'

@Injectable()
export class VariantsService {
    private relations: string[]
    constructor(
        @InjectRepository(Variant)
        private readonly variantRepository: Repository<Variant>,
        private readonly productsService: ProductsService,
        private readonly attributeValuesService: AttributeValuesService,
    ) {
        this.relations = this.variantRepository.metadata.relations.map(
            (rel) => rel.propertyName,
        )
    }

    async createVariant(
        productId: string,
        createVariantDto: CreateVariantDto,
    ): Promise<Variant> {
        const variant = new Variant()

        variant.SKU = createVariantDto.SKU
        variant.price = createVariantDto.price
        variant.stock_quantity = createVariantDto.stock_quantity

        const product = await this.productsService.findById(productId)
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        variant.product = product

        if (
            createVariantDto.attribute_value_ids &&
            createVariantDto.attribute_value_ids.length > 0
        ) {
            const attributeValues = await this.attributeValuesService.findByIds(
                createVariantDto.attribute_value_ids,
            )

            if (
                attributeValues.length !==
                createVariantDto.attribute_value_ids.length
            ) {
                throw new NotFoundException(
                    'One or more attribute values not found!',
                )
            }

            variant.attribute_values = attributeValues
        }

        return await this.variantRepository.save(variant)
    }

    async findAll(): Promise<Variant[]> {
        return this.variantRepository.find({
            relations: this.relations,
        })
    }

    async findAllByProductId(productId: string): Promise<Variant[]> {
        return this.variantRepository.find({
            where: { product: { id: productId } },
            relations: this.relations,
        })
    }
}
