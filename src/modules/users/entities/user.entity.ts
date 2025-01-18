import { Column, Entity } from 'typeorm'
import { AccountType } from '../enums/account-type.enum'
import { Role } from '../enums/role.enum'
import { Base } from '@/modules/base/base.entity'

@Entity('users')
export class User extends Base {
    @Column({ type: 'varchar', length: 30 })
    first_name: string

    @Column({ type: 'varchar', length: 30 })
    last_name: string

    @Column({ type: 'varchar', length: 50 })
    user_name: string

    @Column({ type: 'varchar', length: 100 })
    password: string

    @Column({ type: 'varchar', length: 50 })
    email: string

    @Column({ type: 'varchar', length: 12 })
    phone_number: string

    @Column({ type: 'date', nullable: true })
    birthday_date: Date

    @Column({ type: 'boolean', default: false })
    is_active: boolean

    @Column({ type: 'enum', enum: AccountType, default: AccountType.local })
    account_type: string

    @Column({ type: 'varchar', length: 100, nullable: true })
    avatar: string

    @Column({ type: 'int', default: 0 })
    bonus_points: number

    @Column({ type: 'enum', enum: Role, default: Role.customer })
    role: string

    @Column({ type: 'varchar', nullable: true })
    refresh_token: string
}
