import {
    ConflictException,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Product } from './entities/product.entity'
import { Repository } from 'typeorm'
import { BrandsService } from '../brands/brands.service'
import { CategoriesService } from '../categories/categories.service'

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
        product.price = createProductDto.price
        product.discount_percentage = createProductDto.discount_percentage
        product.description = createProductDto.description
        product.thumbnail = createProductDto.thumbnail
        product.is_published = createProductDto.is_published
        product.view_count = createProductDto.view_count

        const brand = await this.brandsService.findOne(
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

    async findAll(): Promise<Product[]> {
        return this.productRepository.find({
            relations: ['brand', 'categories'],
        })
    }

    async isExist(slug: string): Promise<boolean> {
        return Boolean(
            await this.productRepository.findOne({ where: { slug } }),
        )
    }

    findOne(id: string): Promise<Product> {
        return this.productRepository.findOne({
            where: { id },
            relations: ['brand', 'categories'],
        })
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        return `This action updates a #${id} product`
    }

    remove(id: number) {
        return `This action removes a #${id} product`
    }
}
