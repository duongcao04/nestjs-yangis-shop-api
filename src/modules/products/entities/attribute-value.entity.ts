import {
    Entity,
    Column,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Attribute } from './attribute.entity'
import { Product } from './product.entity'

@Entity('attribute_values')
export class AttributeValue {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @ManyToOne(() => Product, (product) => product.attribute_values)
    product: Product

    @ManyToOne(() => Attribute, (attribute) => attribute.values)
    attribute: Attribute

    @Column({ type: 'varchar', length: 50 })
    value: string
}
