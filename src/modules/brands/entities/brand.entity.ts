import { Column, Entity } from 'typeorm'
import { Base } from '@/modules/base/base.entity'

@Entity('brands')
export class Brand extends Base {
    @Column({ type: 'varchar', length: 50 })
    name: string

    @Column({ type: 'varchar', length: 100 })
    logo: string
}
