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

    @CreateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    created_at: Date

    @UpdateDateColumn({ default: () => 'CURRENT_TIMESTAMP' })
    updated_at: Date

    @DeleteDateColumn({ nullable: true })
    deleted_at: Date
}
