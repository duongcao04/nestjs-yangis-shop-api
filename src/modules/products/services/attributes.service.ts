import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Repository } from 'typeorm'
import { Attribute } from '../entities/attribute.entity'
import { CreateAttributeDto } from '../dto/create-attribute.dto'

@Injectable()
export class AttributesService {
    private relations: string[]
    constructor(
        @InjectRepository(Attribute)
        private readonly attributesRepository: Repository<Attribute>,
    ) {
        this.relations = this.attributesRepository.metadata.relations.map(
            (rel) => rel.propertyName,
        )
    }

    async createAttribute(
        createAttributeDto: CreateAttributeDto,
    ): Promise<Attribute> {
        const attribute = new Attribute()

        attribute.name = createAttributeDto.name

        return await this.attributesRepository.save(attribute)
    }

    async findAll(): Promise<Attribute[]> {
        return await this.attributesRepository.find({
            relations: ['values'],
        })
    }

    async findById(id: string): Promise<Attribute> {
        return await this.attributesRepository.findOne({
            where: { id },
            relations: this.relations,
        })
    }

    async findByIds(ids: string[]) {
        return await this.attributesRepository.findBy({ id: In(ids) })
    }
}
