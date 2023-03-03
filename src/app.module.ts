import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { MongooseModule } from '@nestjs/mongoose'
import { UsersModule } from './users/users.module'
import { AuthModule } from './auth/auth.module'
import { EmailModule } from './email/email.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: '.env',
			isGlobal: true
		}),
		MongooseModule.forRootAsync({
			useFactory: async () => ({
				uri: process.env.MONGODB_URI
			})
		}),
		UsersModule,
		AuthModule,
		EmailModule
	],
	controllers: [],
	providers: []
})
export class AppModule {}
