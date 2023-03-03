import { Controller, Get, HttpStatus, Param } from '@nestjs/common'
import {
	ApiOperation,
	ApiParam,
	ApiResponse,
	ApiTags
} from '@nestjs/swagger/dist'
import { Types } from 'mongoose'
import { MognoIdValidationPipe } from './pipes/mongoIdValidation.pipe'
import { User } from './users.model'
import { UsersService } from './users.service'

@ApiTags('Користувачі')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Отримання всіх користувачів' })
	@ApiResponse({ status: HttpStatus.OK, type: [User] })
	@Get()
	getAll() {
		return this.usersService.getAll()
	}

	@Get(':id')
	@ApiOperation({
		summary: 'Отримання користувача за унікальним ідентифікатором'
	})
	@ApiParam({
		name: 'id',
		type: 'string',
		description: 'Ідентифікатор користувача',
		example: '614b5db0cc97a35cde91f91d'
	})
	@ApiResponse({
		status: HttpStatus.OK,
		description: 'Успашно отримано користувача',
		type: User
	})
	getOne(@Param('id', MognoIdValidationPipe) id: Types.ObjectId) {
		return this.usersService.getOne(id)
	}
}
