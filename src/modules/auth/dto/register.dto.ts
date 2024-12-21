import { Expose } from 'class-transformer'
import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsPhoneNumber,
    Length,
    MaxLength,
} from 'class-validator'
import { generateFromEmail } from 'unique-username-generator'

export const USERNAME_RANDOM_DIGITS = 5

export class RegisterDto {
    @IsNotEmpty()
    @MaxLength(50)
    full_name: string

    @Expose({ name: 'user_name' })
    @IsOptional()
    getUserName(): string {
        return generateFromEmail(this.email, USERNAME_RANDOM_DIGITS)
    }

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
