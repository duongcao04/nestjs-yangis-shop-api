const crypto = require('crypto')
import { ForbiddenException, Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { TokenPayload } from './interfaces/token-payload.interface'
import { JwtToken } from './interfaces/jwt-token.interface'
import { UsersService } from '../users/users.service'

@Injectable()
export class TokenService {
    private jwtSignOptions: JwtSignOptions

    constructor(
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService,
        private readonly usersService: UsersService,
    ) {
        this.jwtSignOptions = {
            secret: this.configService.get('jwt.secret'),
            expiresIn: this.configService.get('jwt.signOptions.expiresIn'),
        }
    }

    async generateAccessToken(payload: TokenPayload): Promise<JwtToken> {
        const exprires = new Date()
        exprires.setMilliseconds(
            exprires.getTime() +
            parseInt(this.jwtSignOptions.expiresIn.toString()),
        )
        const signedPayload = await this.jwtService.signAsync(
            payload,
            this.jwtSignOptions,
        )
        return {
            value: signedPayload,
            expires_at: exprires.toString(),
        }
    }

    async generateAndSaveRefreshToken(user_id: string): Promise<string> {
        const refreshToken = crypto.randomBytes(64).toString('hex')

        await this.usersService.updateUser(user_id, {
            refresh_token: refreshToken,
        })
        return refreshToken
    }

    async getAccessTokenFromRefreshToken(
        refreshToken: string,
    ): Promise<JwtToken> {
        try {
            const isValidRefreshToken = await this.usersService.getUser({
                refresh_token: refreshToken,
            })
            if (!isValidRefreshToken) {
                throw new ForbiddenException()
            }
            // Refresh token is still valid
            // Generate new access token
            const payload: TokenPayload = {
                user_id: isValidRefreshToken.id,
            }
            const newAccessToken = await this.generateAccessToken(payload)

            return newAccessToken
        } catch (error) {
            throw error
        }
    }

    validateToken(access_token: string) {
        return this.jwtService.verifyAsync(access_token, this.jwtSignOptions)
    }
}
