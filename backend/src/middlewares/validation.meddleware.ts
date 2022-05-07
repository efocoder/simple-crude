import { Request, Response, NextFunction } from 'express';
import { StatusCodes } from 'http-status-codes';

const ValidationMiddleware = (schema: any) => {
	return (req: Request, res: Response, next: NextFunction) => {
		const { error } = schema.validate(req.body);
		console.log(error);

		if (error == null) next();
		else {
			const { details } = error;
			res.status(StatusCodes.BAD_REQUEST).send(details);
		}
	};
};

export default ValidationMiddleware;
