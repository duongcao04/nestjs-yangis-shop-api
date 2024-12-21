import { Type } from 'class-transformer'
import { BaseDto } from '@/modules/base/base.dto'
import { CreateUserDto } from './create-user.dto'

export class UserResponseDto {
    @Type(() => BaseDto)
    baseDto: BaseDto

    @Type(() => CreateUserDto)
    createUserDto: CreateUserDto
}
