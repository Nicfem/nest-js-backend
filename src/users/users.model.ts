import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { ApiProperty } from '@nestjs/swagger'
import { HydratedDocument, Types } from 'mongoose'

export type UserDocument = HydratedDocument<User>

@Schema({ timestamps: true })
export class User {
	@ApiProperty({
		example: '614b5db0cc97a35cde91f91d',
		description: 'Унікальний ідентифікатор'
	})
	_id: Types.ObjectId

	@ApiProperty({
		example: 'Дмитро',
		description: 'Ім`я користувача'
	})
	@Prop({ required: true })
	firstName: string

	@ApiProperty({
		example: 'Київський',
		description: 'Прізвисько користувача'
	})
	@Prop({ required: true })
	lastName: string

	@ApiProperty({
		example: '123456',
		description: 'Пароль користувача'
	})
	@Prop({ required: true })
	password: string

	@ApiProperty({
		example: 'exampel@gmail.com',
		description: 'Email користувача'
	})
	@Prop({ unique: true, required: true })
	email: string

	@ApiProperty({
		example: 'http://localhost:5000',
		description: 'Фото користувача'
	})
	@Prop()
	photo?: string
}

export const UserSchema = SchemaFactory.createForClass(User)
