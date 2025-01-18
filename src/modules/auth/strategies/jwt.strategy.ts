import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { TokenPayload } from '../interfaces/token-payload.interface'
import { UsersService } from '../../users/users.service'
import { Injectable } from '@nestjs/common'
import { Request } from 'express'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: configService.get<string>('jwt.secret'), // Use your secret key for validation
        })
    }

    async validate(payload: TokenPayload) {
        console.log('Decoded Payload:', payload) // For debugging
        return this.usersService.getUser({ id: payload.user_id })
    }
}
