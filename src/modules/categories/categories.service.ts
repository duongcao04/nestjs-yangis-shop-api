import { Injectable } from '@nestjs/common'
import { CreateCategoryDto } from './dto/create-category.dto'
import { UpdateCategoryDto } from './dto/update-category.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Category } from './entities/category.entity'
import { In, Repository } from 'typeorm'

@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category)
        private readonly categoryRepository: Repository<Category>,
    ) {}

    create(createCategoryDto: CreateCategoryDto) {
        const category = new Category()
        category.name = createCategoryDto.name
        category.slug = createCategoryDto.slug
        category.thumbnail = createCategoryDto.thumbnail
        category.icon = createCategoryDto.icon
        category.description = createCategoryDto.description

        return this.categoryRepository.save(category)
    }

    findAll() {
        return this.categoryRepository.find({
            relations: ['products'],
        })
    }

    findById(id: string) {
        return this.categoryRepository.findOne({ where: { id } })
    }

    findByIds(ids: string[]) {
        return this.categoryRepository.findBy({ id: In(ids) })
    }
}
