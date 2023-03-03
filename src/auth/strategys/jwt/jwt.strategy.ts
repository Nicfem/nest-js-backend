import { Injectable, UnauthorizedException } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'
import { UsersService } from 'src/users/users.service'

interface JwtPayload {
	email: string
	exp: number
	iat: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
	constructor(private userService: UsersService) {
		super({
			jwtFromRequest: ExtractJwt.fromExtractors([
				(request) => request?.cookies?.accessToken
			]),
			ignoreExpiration: false,
			secretOrKey: process.env.JWT_SECRET_KEY
		})
	}

	async validate(payload: JwtPayload) {
		const user = await this.userService.validateUser(payload.email)
		if (!user) {
			throw new UnauthorizedException()
		}
		return user
	}
}
