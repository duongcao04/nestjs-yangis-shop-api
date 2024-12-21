import {
    IsDate,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    MaxLength,
} from 'class-validator'
import { Expose, Transform, Type } from 'class-transformer'
import { RegisterDto } from '@/modules/auth/dto/register.dto'

export class CreateUserDto extends RegisterDto {
    @IsOptional()
    @IsDate()
    birthday_date: Date

    is_active: boolean

    account_type: string

    @Expose({ name: 'avatar' })
    getAvatar(full_name: string): string {
        return `https://avatar.iran.liara.run/username?username=${full_name}`
    }

    bonus_points: number

    role: string
}
