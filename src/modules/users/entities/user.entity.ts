import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
} from 'typeorm'
import { AccountType } from '../enums/account-type.enum'
import { Role } from '../enums/role.enum'

@Entity('users')
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string

    @Column()
    full_name: string

    @Column({ nullable: true })
    user_name: string

    @Column()
    password: string

    @Column()
    email: string

    @Column()
    phone_number: string

    @Column({ default: false })
    is_active: boolean

    @Column({ type: 'enum', enum: AccountType, default: AccountType.local })
    account_type: string

    @Column({ nullable: true })
    avatar: string

    @Column({ type: 'int', default: 0 })
    bonus_points: number

    @Column({ type: 'enum', enum: Role, default: Role.customer })
    role: string

    @CreateDateColumn()
    created_at: Date

    @UpdateDateColumn()
    updated_at: Date
}
