import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Get,
    UseGuards,
} from '@nestjs/common'
import { Response } from 'express'

import { AuthService } from './auth.service'

import { CreateUserDto } from '@/modules/users/dto/create-user-dto'
import { UsersService } from '@/modules/users/users.service'
import { BaseResponseDto } from '@/common/interceptors/base-response.interface'
import { LocalAuthGuard } from './guards/local-auth.guard'
import { CurrentUser } from './decorators/current-user.decorator'
import { User } from '../users/entities/user.entity'
import { JwtAuthGuard } from './guards/jwt-auth.guard'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from '../users/dto/user-response.dto'
import { LoginResponse } from './interfaces/login-response.interface'
import { TokenService } from './token.service'
import { JwtToken } from './interfaces/jwt-token.interface'

@Controller('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly userService: UsersService,
        private readonly tokenService: TokenService,
    ) {}

    @Post('login')
    @UseGuards(JwtAuthGuard)
    async login(
        @CurrentUser() user: User,
        @Res()
        res: Response<BaseResponseDto<LoginResponse>>,
    ) {
        const loginResponseData = await this.authService.login(user)

        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Login successfully.',
            data: loginResponseData,
        })
    }

    @Post('register')
    async register(
        @Body() createUserDto: CreateUserDto,
        @Res() res: Response<BaseResponseDto<LoginResponse>>,
    ) {
        const user = await this.userService.create(createUserDto)

        // Send email verify to user email
        await this.authService.sendMailVerify(user.email)

        /**
         * Auto login after register
         */
        const loginResponseData = await this.authService.login(user)

        return res.status(HttpStatus.CREATED).json({
            statusCode: HttpStatus.CREATED,
            message:
                'User has been created successfully. Please check email to verify your account.',
            data: loginResponseData,
        })
    }

    @Get('refresh-token')
    async refreshTokenFromAccessToken(
        @Body() { refresh_token }: { refresh_token: string },
    ): Promise<JwtToken> {
        return this.tokenService.getAccessTokenFromRefreshToken(refresh_token)
    }

    @Post('resend-verify-mail')
    async verifyEmail(
        @Body() { email }: { email: string },
        @Res() res: Response,
    ) {
        await this.authService.sendMailVerify(email)

        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Send verify mail successfully.',
        })
    }

    @Get('profile')
    @UseGuards(JwtAuthGuard)
    async getProfile(@CurrentUser() user: User, @Res() res: Response) {
        const transformUser = plainToInstance(UserResponseDto, user)
        return res.status(HttpStatus.OK).json({
            statusCode: HttpStatus.OK,
            message: 'Get user profile successfully !',
            data: transformUser,
        })
    }
}
