import { OmitType } from '@nestjs/mapped-types'
import { CommentDto } from './comment.dto'

export class CreateCommentDto extends OmitType(CommentDto, [
    'id',
    'created_at',
    'updated_at',
    'deleted_at',
] as const) {}
