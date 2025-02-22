import { Column, Entity, OneToMany } from 'typeorm'
import { Base } from '@/modules/base/base.entity'
import { Product } from '../../products/entities/product.entity'

@Entity('brands')
export class Brand extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100, unique: true })
    slug: string

    @Column({ type: 'varchar' })
    logo: string

    @OneToMany(() => Product, (product) => product.brand)
    products: Product
}
