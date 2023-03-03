import { IsString, Length, IsNotEmpty, IsEmail } from 'class-validator'

export class singInCredentialsDto {
	@IsNotEmpty()
	@IsString()
	@IsEmail()
	email: string

	@IsNotEmpty()
	@IsString()
	@Length(4, 16)
	password: string
}
