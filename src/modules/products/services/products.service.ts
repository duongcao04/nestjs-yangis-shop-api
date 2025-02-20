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
import { BrandsService } from '../../brands/brands.service'
import { CategoriesService } from '../../categories/categories.service'

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        private readonly brandsService: BrandsService,
        private readonly categoriesService: CategoriesService,
    ) {}

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
        product.is_publish = createProductDto.is_publish
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
        const metadata = this.productRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        return await this.productRepository.findOne({
            where: { id },
            relations: relations,
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

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`
    }

    remove(id: number) {
        return `This action removes a #${id} product`
    }
}
