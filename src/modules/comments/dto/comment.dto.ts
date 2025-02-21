import { IsNotEmpty, IsNumber, IsString, IsUUID, Length, Max, Min } from 'class-validator'
import { BaseDto } from '../../base/base.dto'

export class CommentDto extends BaseDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsUUID()
    user_id: string

    @IsNotEmpty()
    @IsString()
    comment: string

    @IsNotEmpty()
    @IsNumber()
    @Min(1)
    @Max(5)
    rating: number

    @IsNotEmpty()
    @IsUUID()
    product_id: string
}
