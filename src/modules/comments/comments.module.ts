import { forwardRef, Module } from '@nestjs/common'
import { CommentsService } from './comments.service'
import { CommentsController } from './comments.controller'
import { TypeOrmModule } from '@nestjs/typeorm'
import { Comment } from './entities/comment.entity'
import { UsersModule } from '@/modules/users/users.module'
import { ProductsModule } from '@/modules/products/products.module'

@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        forwardRef(() => UsersModule),
        forwardRef(() => ProductsModule),
    ],
    controllers: [CommentsController],
    providers: [CommentsService],
    exports: [CommentsService],
})
export class CommentsModule {}
