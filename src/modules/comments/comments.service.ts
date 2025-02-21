import {
    forwardRef,
    Inject,
    Injectable,
    NotFoundException,
} from '@nestjs/common'
import { CreateCommentDto } from './dto/create-comment.dto'
import { UpdateCommentDto } from './dto/update-comment.dto'
import { InjectRepository } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { Repository } from 'typeorm'
import { UsersService } from '../users/users.service'
import { ProductsService } from '../products/services/products.service'

@Injectable()
export class CommentsService {
    constructor(
        @InjectRepository(Comment)
        private readonly commentRepository: Repository<Comment>,
        private readonly usersService: UsersService,
        @Inject(forwardRef(() => ProductsService))
        private readonly productsService: ProductsService,
    ) {}
    async create(createCommentDto: CreateCommentDto) {
        const comment = new Comment()

        comment.comment = createCommentDto.comment
        comment.rating = createCommentDto.rating

        // Get user
        const user = await this.usersService.findById(createCommentDto.user_id)
        if (!user) {
            throw new NotFoundException('User not found!')
        }
        comment.user = user

        // Get product
        const product = await this.productsService.findById(
            createCommentDto.product_id,
        )
        if (!product) {
            throw new NotFoundException('Product not found!')
        }
        comment.product = product

        return await this.commentRepository.save(comment)
    }

    async findAll(): Promise<Comment[]> {
        const metadata = this.commentRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        return await this.commentRepository.find({ relations: relations })
    }

    async findById(id: string): Promise<Comment> {
        const metadata = this.commentRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        return await this.commentRepository.findOne({
            where: { id },
            relations: relations,
        })
    }

    async findAllByProductId(productId: string): Promise<Comment[]> {
        return await this.commentRepository.find({
            where: { product: { id: productId } },
        })
    }

    async findByProductId(productId: string): Promise<Comment[]> {
        const metadata = this.commentRepository.metadata
        const relations = metadata.relations.map((rel) => rel.propertyName)

        return await this.commentRepository.find({
            where: { product: { id: productId } },
            relations: relations,
        })
    }

    update(id: number, updateCommentDto: UpdateCommentDto) {
        return `This action updates a #${id} comment`
    }

    remove(id: number) {
        return `This action removes a #${id} comment`
    }
}
