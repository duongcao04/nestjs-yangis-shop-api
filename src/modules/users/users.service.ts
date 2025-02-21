import {
    BadRequestException,
    ConflictException,
    HttpException,
    HttpStatus,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { UpdateUserDto } from './dto/update-user.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from './entities/user.entity'
import { FindOptionsWhere, Repository } from 'typeorm'
import { hashPasswordHelper } from '@/helpers/utils'
import { generateFromEmail } from 'unique-username-generator'
import { CreateUserDto } from './dto/create-user-dto'
import { plainToInstance } from 'class-transformer'
import { UserResponseDto } from './dto/user-response.dto'

export const USERNAME_RANDOM_DIGITS = 5

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        // Check if user already exists
        if (await this.isExistUser(createUserDto.email)) {
            throw new ConflictException('User already exist')
        }

        // Create new user instance
        const user = new User()
        // Assign user data
        user.email = createUserDto.email
        // Hash password
        user.password = hashPasswordHelper(createUserDto.password)
        // Generate username if null
        user.user_name =
            createUserDto.user_name ??
            generateFromEmail(createUserDto.email, USERNAME_RANDOM_DIGITS)
        user.first_name = createUserDto.first_name
        user.last_name = createUserDto.last_name
        user.phone_number = createUserDto.phone_number
        user.avatar = `https://avatar.iran.liara.run/username?username=${createUserDto.first_name}+${createUserDto.last_name}`

        // Save user into database
        return this.userRepository.save(user)
    }

    async getUser(query: FindOptionsWhere<User>): Promise<User> {
        /**
         * Retrieves a user based on the provided query options.
         *
         * @param query - The options to find a user.
         * @returns A promise that resolves to an instance of UserResponseDto.
         */
        const user = await this.userRepository.findOneBy(query)

        if (!user) throw new NotFoundException('User not found')

        return user
    }

    async isExistUser(email: string): Promise<boolean> {
        return Boolean(await this.userRepository.findOneBy({ email }))
    }

    async findAll(): Promise<User[]> {
        return this.userRepository.find()
    }

    async findById(id: string): Promise<User> {
        return await this.userRepository.findOne({ where: { id } })
    }

    updateUser(id: string, updateUserDto: UpdateUserDto) {
        return this.userRepository.update(id, updateUserDto)
    }

    deleteUser(id: string) {
        return this.userRepository.softDelete(id)
    }
}
