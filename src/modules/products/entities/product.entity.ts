import {
    Entity,
    Column,
    JoinColumn,
    ManyToMany,
    JoinTable,
    ManyToOne,
    OneToMany,
} from 'typeorm'
import { Brand } from '@/modules/brands/entities/brand.entity'
import { Category } from '@/modules/categories/entities/category.entity'
import { Base } from '@/modules/base/base.entity'
import { Variant } from './variant.entity'
import { Attribute } from './attribute.entity'

@Entity('products')
export class Product extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    slug: string

    @Column({ type: 'int', nullable: true })
    price: number

    @Column({ type: 'int', nullable: true })
    discount_percentage?: number

    @Column({ type: 'varchar', length: 500 })
    description: string

    @Column({ type: 'varchar' })
    thumbnail: string

    @Column({ type: 'boolean', default: false })
    is_publish: boolean

    @Column({ type: 'int', default: 0 })
    view_count: number

    @ManyToOne(() => Brand, (brand) => brand.id, { nullable: false })
    @JoinColumn({ name: 'brand_id' })
    brand: Brand

    @ManyToMany(() => Category, (category) => category.products)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    })
    categories: Category[]

    @OneToMany(() => Attribute, (attribute) => attribute.product)
    attributes: Attribute[]

    @OneToMany(() => Variant, (variant) => variant.product)
    variants: Variant[]
}
