import {
    Entity,
    Column,
    JoinColumn,
    OneToMany,
    ManyToOne,
    PrimaryGeneratedColumn,
} from 'typeorm'
import { Product } from './product.entity'
import { Variant } from './variant.entity'

@Entity('attributes')
export class Attribute {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column({ type: 'varchar', length: 50 })
    name: string

    @ManyToOne(() => Product, (product) => product.variants, {
        nullable: false,
    })
    @JoinColumn({ name: 'product_id' })
    product: Product

    @OneToMany(() => Variant, (variants) => variants.attribute)
    variants: Variant[]
}
