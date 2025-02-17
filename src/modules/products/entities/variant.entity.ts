import { Entity, Column, JoinColumn, ManyToOne, OneToOne } from 'typeorm'
import { Base } from '@/modules/base/base.entity'
import { Product } from './product.entity'
import { Attribute } from './attribute.entity'

@Entity('variants')
export class Variant extends Base {
    @Column({ type: 'varchar', length: 50 })
    value: string

    @ManyToOne(() => Product, (product) => product.variants)
    @JoinColumn({ name: 'product_id' })
    product: Product

    @ManyToOne(() => Attribute, (attribute) => attribute.variants, {
        nullable: false,
    })
    @JoinColumn({ name: 'attribute_id' })
    attribute: Attribute

    @Column({ type: 'varchar', length: 50 })
    sku: string

    @Column({ type: 'int', nullable: false })
    price: number

    @Column({ type: 'int', nullable: false })
    stock: number
}
