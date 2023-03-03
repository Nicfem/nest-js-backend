import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'
import { CreateUserDto } from './dto/createUserDto'
import { User, UserDocument } from './users.model'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User.name) private readonly UserModel: Model<UserDocument>
	) {}

	async createUser(dto: CreateUserDto): Promise<User> {
		return await this.UserModel.create(dto)
	}

	async validateUser(email: string) {
		return await this.UserModel.findOne({ email })
	}

	async getAll(): Promise<User[]> {
		return await this.UserModel.find({}, { __v: 0 }).exec()
	}

	async getOne(id: Types.ObjectId): Promise<User> {
		return await this.UserModel.findById(id)
	}
}
