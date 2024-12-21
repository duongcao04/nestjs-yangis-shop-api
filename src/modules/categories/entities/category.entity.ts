import { Column, Entity } from 'typeorm'
import { Base } from '@/modules/base/base.entity'

@Entity('categories')
export class Category extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    thumbnail: string

    @Column({ type: 'varchar', length: 100 })
    icon: string

    @Column({ type: 'varchar', length: 500, nullable: true })
    description: string
}
