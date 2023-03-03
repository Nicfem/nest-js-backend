import {
	Controller,
	Get,
	HttpException,
	HttpStatus,
	Post,
	Req,
	Res
} from '@nestjs/common'
import { Body } from '@nestjs/common/decorators'
import { AuthService } from './auth.service'
import { Response, Request } from 'express'
import { singInCredentialsDto } from './dto/singInCredentialsDto'
import { CookieService } from './cookie.service'
import { JwtService } from '@nestjs/jwt'
import { EmailService } from 'src/email/email.service'
import { CreateUserDto } from 'src/users/dto/createUserDto'
import { UseGuards } from '@nestjs/common/decorators/core/use-guards.decorator'
import { JwtAuthGuard } from './strategys/jwt/jwt.guard'

@Controller('auth')
export class AuthController {
	constructor(
		private authService: AuthService,
		private cookieService: CookieService,
		private jwtService: JwtService,
		private emailService: EmailService
	) {}
	@Post('/signup')
	async singUp(@Res() res: Response, @Body() body: CreateUserDto) {
		const { accessToken, refreshToken } = await this.authService.signUp(
			body
		)

		this.cookieService.setCookie(
			res,
			{ accessToken, refreshToken },
			{
				httpOnly: true,
				sameSite: 'strict'
			}
		)

		return res.send({ ok: true })
	}

	@Post('/signin')
	async singIn(@Res() res: Response, @Body() body: singInCredentialsDto) {
		console.log(body)
		const { accessToken, refreshToken, user } =
			await this.authService.signIn(body)

		this.cookieService.setCookie(
			res,
			{ accessToken, refreshToken },
			{
				httpOnly: true,
				sameSite: 'strict'
			}
		)

		return res.send(user)
	}

	@Get('/refresh')
	async refreshTokens(@Req() req: Request, @Res() res: Response) {
		try {
			const { refreshToken } = this.jwtService.verify(
				req.cookies.refreshToken,
				{ secret: process.env.JWT_SECRET_KEY }
			)

			const { accessToken } = await this.authService.refreshToken(
				refreshToken
			)

			this.cookieService.setCookie(
				res,
				{ accessToken },
				{
					httpOnly: true,
					sameSite: 'strict'
				}
			)

			return res.send({ ok: true })
		} catch (e) {
			throw new HttpException(e.message, HttpStatus.FORBIDDEN)
		}
	}

	@Get('/profile')
	async getProfile(@Req() req: Request) {
		const { accessToken } = req.cookies
		return this.authService.getProfile(accessToken)
	}

	@UseGuards(JwtAuthGuard)
	@Post('/email')
	async email(@Body() body: { subject: string; message: string }) {
		return this.emailService.sendMesage(body.subject, body.message)
	}
}
