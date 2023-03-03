import { Module } from '@nestjs/common'
import { MailerModule } from '@nestjs-modules/mailer'
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter'
import { EmailService } from './email.service'

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: () => ({
				transport: {
					host: 'smtp.gmail.com',
					port: 465,
					secure: true,
					auth: {
						user: 'localhosttest2004@gmail.com',
						pass: 'vtrraogwhmngojkl'
					}
				},
				defaults: {
					from: '"My App" <noreply@example.com>'
				},
				template: {
					dir: process.cwd() + '/templates/',
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true
					}
				}
			})
		})
	],
	providers: [EmailService],
	exports: [EmailService]
})
export class EmailModule {}
