import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { AuthService } from '../auth.service'
import { Strategy } from 'passport-local'
import { User } from '../../users/entities/user.entity'

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        // Call the constructor of the parent class with the configuration object
        super({
            usernameField: 'email',
        })
        // Additional initialization code can go here
    }

    async validate(email: string, password: string): Promise<User> {
        return this.authService.verifyUser({ email, password })
    }
}
