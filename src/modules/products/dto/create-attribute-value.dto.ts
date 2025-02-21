import { IsNotEmpty, IsString } from 'class-validator'

export class CreateAttributeValueDto {
	@IsNotEmpty()
	@IsString()
	product_id: string

	@IsNotEmpty()
	@IsString()
	value: string
}
