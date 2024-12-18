import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    JoinColumn,
    OneToOne,
    OneToMany,
    ManyToMany,
    JoinTable,
} from 'typeorm'
import { Brand } from '../../brands/entities/brand.entity'
import { Category } from '../../categories/entities/category.entity'

@Entity('products') // Declares the class as an entity
export class Product {
    @PrimaryGeneratedColumn('uuid') // Auto-incremented primary key
    id: string

    @Column({ type: 'varchar', length: 255 })
    name: string

    @Column({ type: 'varchar', length: 255 })
    slug: string

    @Column('int')
    price: number

    @Column()
    discount: number

    @Column()
    total_in_stock: number

    @Column({ type: 'varchar', length: 500, nullable: true })
    description: string

    @Column()
    thumbnail: string

    @Column()
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

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
