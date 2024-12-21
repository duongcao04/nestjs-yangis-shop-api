import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'

export abstract class Base {
    @PrimaryGeneratedColumn('uuid') // Auto-incremented primary key
    id: string

    @Column({ type: 'boolean', default: false })
    is_deleted: boolean

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date

    @DeleteDateColumn()
    deleted_at: Date
}
