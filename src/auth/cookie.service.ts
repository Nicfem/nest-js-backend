import { Injectable } from '@nestjs/common'
import { CookieOptions, Response } from 'express'
interface SetCookieOptions {
	[key: string]: string
}

@Injectable()
export class CookieService {
	constructor() {}

	setCookie(
		res: Response,
		options: SetCookieOptions,
		additionalOptions?: CookieOptions
	): void {
		Object.keys(options).forEach((key) => {
			res.cookie(key, options[key], additionalOptions)
		})
	}
}
