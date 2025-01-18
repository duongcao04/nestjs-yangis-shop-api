import { Exclude, Expose } from 'class-transformer'
import { BaseDto } from '@/modules/base/base.dto'

@Exclude()
export class UserResponseDto extends BaseDto {
    @Expose()
    first_name: string

    @Expose()
    last_name: string

    @Expose()
    user_name: string

    password: string

    @Expose()
    email: string

    @Expose()
    birthday_date: Date

    @Expose()
    phone_number: string

    @Expose()
    account_type: string

    @Expose()
    role: string

    @Expose()
    is_active: boolean

    @Expose()
    avatar: string

    @Expose()
    bonus_points: number

    refresh_token: string
}
