import { IsEmail, IsNotEmpty, Length } from 'class-validator'

export class SignInDto {
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @Length(6, 24)
    password: string
}
