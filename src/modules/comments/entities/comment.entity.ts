import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm'
import { Base } from '../../base/base.entity'
import { User } from '../../users/entities/user.entity'
import { Product } from '../../products/entities/product.entity'

@Entity('comments')
export class Comment extends Base {
    @ManyToOne(() => User, (user) => user.comments)
    @JoinColumn({ name: 'user_id' })
    user: User

    @Column({ type: 'int' })
    rating: number

    @Column({ type: 'varchar', length: 255 })
    comment: string

    @ManyToOne(() => Product, (product) => product.comments)
	@JoinColumn({ name: 'product_id' })
    product: Product
}
