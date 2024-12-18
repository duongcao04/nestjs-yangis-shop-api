import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsPhoneNumber()
    phone_number: string

    @IsNotEmpty()
    @IsString()
    full_name: string

    @IsNotEmpty()
    @IsString()
    password: string
}
