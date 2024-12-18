import {
    Get,
    HttpException,
    HttpStatus,
    Injectable,
    Post,
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

    @Post()
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User()

        const isExistUser = await this.userRepository.findOneBy({
            email: createUserDto.email,
        })

        if (isExistUser)
            throw new HttpException('Conflict', HttpStatus.CONFLICT)

        const hashPassword = await hashPasswordHelper(createUserDto.password)
        user.full_name = createUserDto.full_name
        user.email = createUserDto.email
        user.password = hashPassword
        user.phone_number = createUserDto.phone_number
        return this.userRepository.save(user)
    }

    @Get()
    findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    findOne(id: string): Promise<User> {
        return this.userRepository.findOneBy({ id })
    }

    update(id: number, updateUserDto: UpdateUserDto) {
        return `This action updates a #${id} user`
    }

    remove(id: number) {
        return `This action removes a #${id} user`
    }
}
