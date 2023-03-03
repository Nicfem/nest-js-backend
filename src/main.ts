import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import * as cookieParser from 'cookie-parser'
import { AppModule } from './app.module'

async function bootstrap() {
	const PORT = process.env.PORT || 5000
	const app = await NestFactory.create(AppModule)
	app.use(cookieParser())
	app.useGlobalPipes(new ValidationPipe())
	const config = new DocumentBuilder()
		.setTitle('Портфоліо')
		.setDescription('Документація REST API')
		.setVersion('1.0.0')
		.addTag('Мой проект')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('api/docs', app, document)

	await app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))
}

bootstrap()
