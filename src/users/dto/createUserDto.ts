import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEmail, IsNotEmpty, Length } from 'class-validator'

export class CreateUserDto {
	@ApiProperty({
		example: 'Дмитро',
		description: 'Ім`я користувача'
	})
	@IsNotEmpty()
	@IsString()
	firstName: string

	@ApiProperty({
		example: 'Київський',
		description: 'Прізвисько користувача'
	})
	@IsNotEmpty()
	@IsString()
	lastName: string

	@ApiProperty({
		example: '123456',
		description: 'Пароль користувача'
	})
	@IsNotEmpty()
	@IsString()
	@Length(4, 16)
	password: string

	@ApiProperty({
		example: 'exampel@gmail.com',
		description: 'Email користувача'
	})
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string
}
