import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { AttributeValue } from '../entities/attribute-value.entity'
import { CreateAttributeValueDto } from '../dto/create-attribute-value.dto'
import { AttributesService } from './attributes.service'
import { ProductsService } from './products.service'

@Injectable()
export class AttributeValuesService {
    private relations: string[]

    constructor(
        @InjectRepository(AttributeValue)
        private readonly attributeValueRepository: Repository<AttributeValue>,
        @Inject(forwardRef(() => ProductsService))
        private readonly productsService: ProductsService,
        private readonly attributesService: AttributesService,
    ) {
        this.relations = this.attributeValueRepository.metadata.relations.map(
            (rel) => rel.propertyName,
        )
    }

    async createAttributeValue(
        attributeId: string,
        createAttributeValueDto: CreateAttributeValueDto,
    ): Promise<AttributeValue> {
        const attributeValue = new AttributeValue()

        attributeValue.value = createAttributeValueDto.value

        const product = await this.productsService.findById(
            createAttributeValueDto.product_id,
        )
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        attributeValue.product = product

        const attribute = await this.attributesService.findById(attributeId)
        if (!attribute) {
            throw new NotFoundException('Attribute not found!')
        }
        attributeValue.attribute = attribute

        return this.attributeValueRepository.save(attributeValue)
    }

    async findAll(attributeId: string): Promise<AttributeValue[]> {
        return this.attributeValueRepository.find({
            where: { attribute: { id: attributeId } },
            relations: this.relations,
        })
    }

    async findById(id: string): Promise<AttributeValue> {
        return this.attributeValueRepository.findOne({
            where: { id },
            relations: this.relations,
        })
    }

    async findAllByProductId(productId: string): Promise<AttributeValue[]> {
        // Lấy tất cả attribute values của sản phẩm
        return await this.attributeValueRepository.find({
            where: { product: { id: productId } },
            relations: ['attribute'],
        })
    }

    async findByIds(ids: string[]) {
        return await this.attributeValueRepository.findBy({ id: In(ids) })
    }
}
