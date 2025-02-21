import {
    Entity,
    Column,
    ManyToOne,
    JoinTable,
    ManyToMany,
} from 'typeorm'
import { Base } from '@/modules/base/base.entity'
import { Product } from './product.entity'
import { AttributeValue } from './attribute-value.entity'

@Entity('variants')
export class Variant extends Base {
    @ManyToOne(() => Product, (product) => product.variants)
    product: Product

    @ManyToMany(() => AttributeValue)
    @JoinTable({
        name: 'variant_attribute_values',
        joinColumn: { name: 'variant_id', referencedColumnName: 'id' },
        inverseJoinColumn: {
            name: 'attribute_value_id',
            referencedColumnName: 'id',
        },
    })
    attribute_values: AttributeValue[]

    @Column('boolean', { default: true })
    is_active: boolean

    @Column({ unique: true })
    SKU: string

    @Column({ type: 'int', nullable: false })
    price: number

    @Column({ type: 'int', default: 0 })
    stock_quantity: number
}
