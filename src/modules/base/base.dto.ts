import { Exclude, Expose } from 'class-transformer'
import { IsBoolean, IsDate, IsNotEmpty, IsString } from 'class-validator'

@Exclude()
export abstract class BaseDto {
    @IsNotEmpty()
    @IsString()
    id: string

    @IsNotEmpty()
    @IsBoolean()
    is_deleted: boolean

    @Expose()
    @IsNotEmpty()
    @IsDate()
    created_at: Date

    @Expose()
    @IsNotEmpty()
    @IsDate()
    updated_at: Date

    @IsNotEmpty()
    @IsDate()
    deleted_at: Date
}
