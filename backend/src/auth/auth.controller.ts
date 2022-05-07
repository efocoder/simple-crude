import { Request, Response } from 'express';

import AuthService from './auth.service';
import { apiResponse, ApiResponseType, getStatusCode } from '../util/shared';
import { StatusCodes } from 'http-status-codes';

export default class AuthController {
	private authService: AuthService;

	constructor() {
		this.authService = new AuthService();
	}

	create = async (
		req: Request,
		res: Response,
	): Promise<Response<ApiResponseType>> => {
		const resp = await this.authService.create(req.body);

		const code = getStatusCode(resp, true);

		return res
			.status(code)
			.send(
				code == StatusCodes.CREATED
					? apiResponse('Registration Successful', resp)
					: resp,
			);
	};

	signIn = async (req: Request, res: Response) => {
		const resp = await this.authService.signIn(req.body);

		return res
			.status(getStatusCode(resp))
			.send(apiResponse('Login successful', resp));
	};
}
