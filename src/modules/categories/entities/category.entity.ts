import { Column, Entity, ManyToMany } from 'typeorm'
import { Base } from '@/modules/base/base.entity'
import { Product } from '@/modules/products/entities/product.entity'

@Entity('categories')
export class Category extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100, unique: true })
    slug: string

    @Column({ type: 'varchar' })
    thumbnail: string

    @Column({ type: 'varchar' })
    icon: string

    @Column({ type: 'varchar', length: 500, nullable: true })
    description?: string

    @ManyToMany(() => Product, (product) => product.categories)
    products: Product[]
}
