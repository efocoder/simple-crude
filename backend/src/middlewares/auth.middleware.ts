import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';
import jwt from 'jsonwebtoken';
import { apiResponse } from '../util/shared';
import logger from '../logger';

interface CustomRequest extends Request {
	user?: any;
}

const AuthMiddleware = (
	req: CustomRequest,
	res: Response,
	next: NextFunction,
) => {
	try {
		if (req.path === '/auth/register' || req.path === '/auth/login')
			return next();
		const userToken: string = req.headers.authorization.split(' ')[1];
		const user = jwt.verify(userToken, process.env.JWT_SECRET);
		req.user = user;
		next();
	} catch (err: any) {
		logger.error(err);
		res
			.status(StatusCodes.UNAUTHORIZED)
			.send(apiResponse('Invalid or expired token'));
	}
};

export default AuthMiddleware;
