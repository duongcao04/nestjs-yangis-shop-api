import {
    Entity,
    Column,
    JoinColumn,
    OneToOne,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { Brand } from '@/modules/brands/entities/brand.entity'
import { Category } from '@/modules/categories/entities/category.entity'
import { Base } from '@/modules/base/base.entity'

@Entity('products') // Declares the class as an entity
export class Product extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    slug: string

    @Column({ type: 'int' })
    price: number

    @Column({ type: 'int' })
    discount: number

    @Column({ type: 'int' })
    total_in_stock: number

    @Column({ type: 'varchar', length: 500 })
    description: string

    @Column({ type: 'varchar', length: 100 })
    thumbnail: string

    @Column({ type: 'boolean', default: false })
    is_published: boolean

    @Column({ type: 'int', default: 0 })
    view_count: number

    @OneToOne(() => Brand)
    @JoinColumn({ name: 'brand_id', referencedColumnName: 'id' })
    brand: Brand

    @ManyToMany(() => Category)
    @JoinTable({
        name: 'product_categories',
        joinColumn: { name: 'product_id', referencedColumnName: 'id' },
        inverseJoinColumn: { name: 'category_id', referencedColumnName: 'id' },
    })
    category: Category
}
