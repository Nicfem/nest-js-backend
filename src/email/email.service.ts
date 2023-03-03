import { MailerService } from '@nestjs-modules/mailer/dist'
import { Injectable } from '@nestjs/common'

@Injectable()
export class EmailService {
	constructor(private readonly mailerService: MailerService) {}

	sendMesage(subject: string, message: string) {
		this.mailerService.sendMail({
			to: 'sosiska2004dota2@gmail.com',
			from: 'localhosttest2004@gmail.com',
			subject: 'Testing nest',
			template: 'email',
			context: {
				subject,
				message
			}
		})
	}
}
