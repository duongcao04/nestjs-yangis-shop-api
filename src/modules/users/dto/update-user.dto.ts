import { PartialType } from '@nestjs/mapped-types'
import { UserResponseDto } from './user-response.dto'

export class UpdateUserDto extends PartialType(UserResponseDto) {}
