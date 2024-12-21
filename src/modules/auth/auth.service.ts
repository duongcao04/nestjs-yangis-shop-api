import { Injectable } from '@nestjs/common'
import { LoginDto } from './dto/login.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from '../users/entities/user.entity'
import { Repository } from 'typeorm'
import { RegisterDto } from './dto/register.dto'
import { UsersService } from '../users/users.service'

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly useService: UsersService,
    ) {}

    async register(registerDto: RegisterDto) {
        const user = new User()

        const isExistUser = this.useService.isExistUser(user.email)

        if (isExistUser) {

        }
        return registerDto
    }

    login(loginDto: LoginDto) {
        return loginDto
    }
}
