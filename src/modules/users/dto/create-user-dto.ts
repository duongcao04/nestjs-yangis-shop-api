import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    Length,
    MaxLength,
} from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    @MaxLength(30)
    first_name: string

    @IsNotEmpty()
    @MaxLength(30)
    last_name: string

    @IsOptional()
    @MaxLength(50)
    user_name: string

    @IsNotEmpty()
    @Length(8, 100)
    password: string

    @IsNotEmpty()
    @MaxLength(50)
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsPhoneNumber()
    @MaxLength(12)
    phone_number: string
}
