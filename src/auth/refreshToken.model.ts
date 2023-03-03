import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import mongoose, { HydratedDocument } from 'mongoose'
import { User } from 'src/users/users.model'

export type RefreshTokenDocument = HydratedDocument<RefreshToken>

@Schema({ timestamps: true })
export class RefreshToken {
	@Prop({
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User'
	})
	userId: User

	@Prop({ required: true })
	refreshToken: string
}

export const RefreshTokenSchema = SchemaFactory.createForClass(RefreshToken)
