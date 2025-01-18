import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'

import { User } from '@/modules/users/entities/user.entity'
import { UsersModule } from '@/modules/users/users.module'
import { MailModule } from '@/modules/mail/mail.module'
import { JwtService } from '@nestjs/jwt'
import { TokenService } from './token.service'
import { LocalStrategy } from './strategies/local.strategy'
import { JwtStrategy } from './strategies/jwt.strategy'
import { BcryptService } from './bcrypt.service'

@Module({
    imports: [TypeOrmModule.forFeature([User]), UsersModule, MailModule],
    controllers: [AuthController],
    providers: [
        AuthService,
        TokenService,
        LocalStrategy,
        JwtStrategy,
        JwtService,
        BcryptService,
    ],
    exports: [AuthService],
})
export class AuthModule {}
