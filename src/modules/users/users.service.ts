import {
    HttpException,
    HttpStatus,
    Injectable,
} from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { Repository } from 'typeorm'
import { hashPasswordHelper } from '@/helpers/utils'

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()

        if (this.isExistUser)
            throw new HttpException('Conflict', HttpStatus.CONFLICT)

        const hashedPassword = await hashPasswordHelper(user.password)
        user.full_name = createUserDto.full_name
        user.user_name = createUserDto.getUserName()
        user.email = createUserDto.email
        user.password = hashedPassword()
        user.phone_number = createUserDto.phone_number

        return user

        // return this.userRepository.save(user)
    }

    async isExistUser(email: string): Promise<boolean> {
        return Boolean(await this.userRepository.findOneBy({ email }))
    }

    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }

    findOneByEmail(email: string): Promise<User> {
        return this.userRepository.findOneBy({ email })
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
