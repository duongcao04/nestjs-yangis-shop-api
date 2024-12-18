import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('categories')
export class Category {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    name: string

    @Column()
    thumbnail: string

    @Column()
    icon: string

    @Column({ type: 'varchar', length: 500, nullable: true })
    description: string
}
