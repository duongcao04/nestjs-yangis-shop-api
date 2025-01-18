import {
    CanActivate,
    ExecutionContext,
    Inject,
    Injectable,
    UnauthorizedException,
} from '@nestjs/common'
import { ConfigService, ConfigType } from '@nestjs/config'
import { Reflector } from '@nestjs/core'
import { JwtService, JwtSignOptions } from '@nestjs/jwt'
import { Request } from 'express'
import { TokenPayload } from '../interfaces/token-payload.interface'
import { TokenService } from '../token.service'

@Injectable()
export class JwtAuthGuard implements CanActivate {
    constructor(
        private readonly tokenService: TokenService,
        private reflector: Reflector,
    ) {}

    async canActivate(context: ExecutionContext): Promise<boolean> {
        const isPublic = this.reflector.getAllAndOverride<boolean>('isPublic', [
            context.getHandler(),
            context.getClass(),
        ])
        if (isPublic) {
            return true
        }

        const request = context.switchToHttp().getRequest()
        const token = this.getToken(request)

        if (!token) {
            throw new UnauthorizedException('Authorization token is required')
        }

        try {
            const payload = this.tokenService.validateToken(token)
			console.log(payload);
			

            request['user'] = payload
        } catch (error) {
            throw new UnauthorizedException(error.message)
        }

        return true
    }

    private getToken(request: Request) {
        const [_, token] = request.headers.authorization?.split(' ') ?? []
        return token
    }
}
