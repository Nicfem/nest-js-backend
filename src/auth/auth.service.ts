import { HttpStatus, Injectable } from '@nestjs/common'
import { UsersService } from 'src/users/users.service'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { v4 as uuidv4 } from 'uuid'
import { Model, Types } from 'mongoose'
import { InjectModel } from '@nestjs/mongoose'
import { RefreshToken, RefreshTokenDocument } from './refreshToken.model'
import { HttpException, UnauthorizedException } from '@nestjs/common/exceptions'
import { singInCredentialsDto } from './dto/singInCredentialsDto'
import { User } from 'src/users/users.model'
import { CreateUserDto } from 'src/users/dto/createUserDto'

@Injectable()
export class AuthService {
	constructor(
		@InjectModel(RefreshToken.name)
		private readonly RefreshTokenModel: Model<RefreshTokenDocument>,
		private readonly userService: UsersService,
		private readonly jwtService: JwtService
	) {}

	async signIn(
		singInCredentialsDto: singInCredentialsDto
	): Promise<{ user: User; accessToken: string; refreshToken: string }> {
		const { email, password } = singInCredentialsDto

		const user = await this.userService.validateUser(email)

		if (!user) {
			throw new HttpException(
				'Пользователь не найден',
				HttpStatus.UNAUTHORIZED
			)
		}

		const passwordIsMatch = await bcrypt.compare(password, user.password)

		if (!user || !passwordIsMatch) {
			throw new UnauthorizedException()
		} else {
			const newRefreshToken = await this.updateRefreshToken(user._id)
			return {
				user,
				accessToken: this.generateAccessToken(email),
				refreshToken: this.generateRefreshToken(newRefreshToken)
			}
		}
	}

	async refreshToken(refreshToken: string): Promise<{
		accessToken: string
	}> {
		const refreshTokenInDb = await this.RefreshTokenModel.findOne({
			refreshToken
		}).populate('userId')

		if (!refreshTokenInDb) {
			throw new UnauthorizedException()
		}

		const email = refreshTokenInDb.userId.email

		return {
			accessToken: this.generateAccessToken(email)
		}
	}

	async signUp(
		authCredentialsDto: CreateUserDto
	): Promise<{ accessToken: string; refreshToken: string }> {
		const { email, password, firstName, lastName } = authCredentialsDto

		const user = await this.userService.validateUser(email)
		if (user) {
			throw new HttpException(
				'Пользователь зарегестрирован',
				HttpStatus.BAD_REQUEST
			)
		}

		const salt = await bcrypt.genSalt()

		const newUser = await this.userService.createUser({
			firstName,
			lastName,
			email,
			password: await bcrypt.hash(password, salt)
		})

		const newRefrestToken = this.createRefreshToken(newUser._id)
		const refreshToken = this.generateRefreshToken(newRefrestToken)
		const accessToken = this.generateAccessToken(email)

		return {
			accessToken,
			refreshToken
		}
	}

	async getProfile(accessToken: string) {
		try {
			const { email } = this.jwtService.verify(accessToken, {
				secret: process.env.JWT_SECRET_KEY
			})

			const user = this.userService.validateUser(email)

			if (!user) {
				throw new UnauthorizedException()
			}

			return user
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.FORBIDDEN)
		}
	}

	private generateAccessToken(email: string) {
		return this.jwtService.sign(
			{ email },
			{ secret: process.env.JWT_SECRET_KEY, expiresIn: '60s' }
		)
	}

	private generateRefreshToken(refreshToken: string) {
		return this.jwtService.sign(
			{ refreshToken },
			{ secret: process.env.JWT_SECRET_KEY, expiresIn: '120s' }
		)
	}

	private async updateRefreshToken(userId: Types.ObjectId) {
		const refreshToken = uuidv4()
		await this.RefreshTokenModel.findOneAndUpdate(
			{ userId: userId },
			{
				refreshToken
			}
		)

		return refreshToken
	}

	private createRefreshToken(userId: Types.ObjectId): string {
		const refreshToken = uuidv4()
		this.RefreshTokenModel.create({
			userId,
			refreshToken
		})
		return refreshToken
	}
}
