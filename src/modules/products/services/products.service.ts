import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from '../dto/create-product.dto'
import { UpdateProductDto } from '../dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from '../entities/product.entity'
import { Repository } from 'typeorm'
import { BrandsService } from '@/modules/brands/brands.service'
import { CategoriesService } from '@/modules/categories/categories.service'
import { AttributesService } from './attributes.service'
import { AttributeValuesService } from './attribute-values.service'
import { AttributeValue } from '../entities/attribute-value.entity'

@Injectable()
export class ProductsService {
    private relations: string[]
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly brandsService: BrandsService,
        private readonly categoriesService: CategoriesService,
        private readonly attributesService: AttributesService,
        private readonly attributeValuesService: AttributeValuesService,
    ) {
        this.relations = this.productRepository.metadata.relations.map(
            (rel) => rel.propertyName,
        )
    }

    async create(createProductDto: CreateProductDto): Promise<Product> {
        const product = new Product()

        if (await this.isExist(createProductDto.slug)) {
            throw new ConflictException('Product is exist in inventory!')
        }

        product.name = createProductDto.name
        product.slug = createProductDto.slug
        product.description = createProductDto.description
        product.price = createProductDto.price
        product.discount_percentage = createProductDto.discount_percentage
        product.thumbnail = createProductDto.thumbnail
        product.is_published = createProductDto.is_published
        product.view_count = createProductDto.view_count

        const brand = await this.brandsService.findById(
            createProductDto.brand_id,
        )
        if (!brand) {
            throw new NotFoundException('Brand not found!')
        }
        product.brand = brand

        if (
            createProductDto.category_ids &&
            createProductDto.category_ids.length > 0
        ) {
            const categories = await this.categoriesService.findByIds(
                createProductDto.category_ids,
            )

            if (categories.length !== createProductDto.category_ids.length) {
                throw new NotFoundException('One or more categories not found!')
            }

            product.categories = categories
        }

        if (
            createProductDto.attribute_ids &&
            createProductDto.attribute_ids.length > 0
        ) {
            const attributes = await this.attributesService.findByIds(
                createProductDto.attribute_ids,
            )

            if (attributes.length !== createProductDto.attribute_ids.length) {
                throw new NotFoundException('One or more attributes not found!')
            }

            product.attributes = attributes
        }

        return await this.productRepository.save(product)
    }

    async findAll(fields?: string, sort?: string): Promise<Partial<Product[]>> {
        const metadata = this.productRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        // Non query
        if (!fields && !sort) {
            return this.productRepository.find({
                relations: relations,
            })
        }

        const query = this.productRepository.createQueryBuilder('p')

        if (fields) {
            const filedsArr = fields.split(',')
            filedsArr.forEach((field, index) => {
                if (relations.includes(field)) {
                    query.leftJoinAndSelect(`p.${field}`, field)
                    return
                } else {
                    if (index === 0) {
                        query.select(`p.${field}`)
                    } else {
                        query.addSelect(`p.${field}`)
                    }
                }
            })
        }

        if (sort) {
            const sortArr = sort.split(',')
            sortArr.forEach((sort, index) => {
                const sortSpliter = sort.trim().split('')
                const orderBy =
                    (sortSpliter[0] === '+' || sortSpliter[0] === '-') &&
                    sort.trim().slice(0, sort.length - 1)
                const isAsc = sort.slice(0, 1) !== '-'
                if (index === 0) {
                    query.orderBy(orderBy, isAsc ? 'ASC' : 'DESC')
                } else {
                    query.addOrderBy(orderBy, isAsc ? 'ASC' : 'DESC')
                }
            })
        }

        return await query.getMany()
    }

    async isExist(slug: string): Promise<boolean> {
        return Boolean(
            await this.productRepository.findOne({ where: { slug } }),
        )
    }

    async findById(id: string): Promise<Product> {
        return await this.productRepository.findOne({
            where: { id },
            relations: this.relations,
        })
    }

    async findBySlug(slug: string): Promise<Product> {
        const metadata = this.productRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        return await this.productRepository.findOne({
            where: { slug },
            relations: relations,
        })
    }

    async getProductAttributeValues(productId: string) {
        // Kiểm tra sản phẩm tồn tại
        const product = await this.productRepository.findOne({
            where: { id: productId },
        })

        if (!product) {
            throw new NotFoundException(
                `Product with ID ${productId} not found`,
            )
        }

        const attributeValues =
            await this.attributeValuesService.findAllByProductId(productId)
        // Nhóm các giá trị theo attribute
        const groupedAttributes = {}

        attributeValues.forEach((av) => {
            if (!groupedAttributes[av.attribute.id]) {
                groupedAttributes[av.attribute.id] = {
                    id: av.attribute.id,
                    name: av.attribute.name,
                    values: [],
                }
            }

            groupedAttributes[av.attribute.id].values.push({
                id: av.id,
                value: av.value,
            })
        })

        return Object.values(groupedAttributes)
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`
    }

    remove(id: number) {
        return `This action removes a #${id} product`
    }
}
