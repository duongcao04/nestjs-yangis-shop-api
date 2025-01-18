const crypto = require('crypto')
import { Injectable, UnauthorizedException, UseGuards } from '@nestjs/common'

import { UsersService } from '@/modules/users/users.service'
import { comparePasswordHelper } from '@/helpers/utils'
import { JwtService } from '@nestjs/jwt'

import { SignInDto } from './dtos/sign-in.dto'
import { ConfigService } from '@nestjs/config'
import { User } from '../users/entities/user.entity'
import { TokenPayload } from './interfaces/token-payload.interface'
import { verifyEmailTemplate } from './resources/verify-email-template'
import { MailService } from '../mail/mail.service'
import { Response } from 'express'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import { LoginResponse } from './interfaces/login-response.interface'
import { TokenService } from './token.service'

@Injectable()
export class AuthService {
    constructor(
        private readonly useService: UsersService,
        private readonly configService: ConfigService,
        private readonly mailService: MailService,
        private readonly tokenService: TokenService,
    ) {}

    async verifyUser(signInDto: SignInDto): Promise<User> {
        try {
            const user = await this.useService.getUser({
                email: signInDto.email,
            })

            const authenticated = comparePasswordHelper(
                signInDto.password,
                user.password,
            )
            if (!authenticated)
                throw new UnauthorizedException('Password is incorrect')

            return user
        } catch (error) {
            throw new UnauthorizedException('Credentials are not valid.')
        }
    }

    async login(user: User): Promise<LoginResponse> {
        const payload: TokenPayload = {
            user_id: user.id,
        }
        const accessToken = await this.tokenService.generateAccessToken(payload)
        const refreshToken =
            await this.tokenService.generateAndSaveRefreshToken(user.id)

        const loginResponse: LoginResponse = {
            access_token: accessToken,
            refresh_token: refreshToken,
        }

        return loginResponse
    }

    async sendMailVerify(email: string) {
        /**
         * Send email verify
         */
        const verifyToken = crypto.randomBytes(64).toString('hex')
        const urlVerify =
            this.configService.get('app_url') +
            `/auth/verify-email?token=${verifyToken}`

        return await this.mailService.sendMail({
            to: email,
            subject: 'Sign up account successfully !',
            html: verifyEmailTemplate(urlVerify),
        })
    }
}
