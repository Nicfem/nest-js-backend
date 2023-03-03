import { Module } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { MongooseModule } from '@nestjs/mongoose'
import { PassportModule } from '@nestjs/passport'
import { EmailModule } from 'src/email/email.module'
import { EmailService } from 'src/email/email.service'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { CookieService } from './cookie.service'
import { RefreshToken, RefreshTokenSchema } from './refreshToken.model'
import { JwtStrategy } from './strategys/jwt/jwt.strategy'

@Module({
	imports: [
		PassportModule.register({
			defaultStrategy: 'jwt'
		}),
		MongooseModule.forFeature([
			{ name: RefreshToken.name, schema: RefreshTokenSchema }
		]),
		UsersModule,
		EmailModule
	],
	controllers: [AuthController],
	providers: [
		AuthService,
		CookieService,
		JwtStrategy,
		JwtService,
		EmailService
	]
})
export class AuthModule {}
