import bcrypt from 'bcrypt';
import createError from 'http-errors';
import { HydratedDocument } from 'mongoose';
import jwt from 'jsonwebtoken';

import logger from '../logger';
import IAuth from './auth.interface';
import User from './auth.model';
import { StatusCodes } from 'http-status-codes';
import ISignIn from './auth.interface';

export default class AuthService {
	async create(iAuth: IAuth): Promise<Object | createError.HttpError> {
		const { email, name, password } = iAuth;

		const userExist = await User.exists({ email: email });

		if (userExist)
			return createError(
				StatusCodes.BAD_REQUEST,
				`User with ${email} already exists.`,
			);

		const user: HydratedDocument<IAuth> = new User({
			email: email,
			name: name,
			password: await this.hashPassword(password),
		});

		try {
			await user.save();
			return await this.signIn(iAuth);
		} catch (error: any) {
			logger.error(user._id, error);
			return createError(
				StatusCodes.INTERNAL_SERVER_ERROR,
				'Sorry something went wroing, try again later',
			);
		}
	}

	async signIn(iSignIn: ISignIn): Promise<Object | createError.HttpError> {
		const { email, password } = iSignIn;
		const user = await this.findUserByEmail(email);
		if (!user)
			return createError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');
		else if (!(await this.verifyPassword(user, password)))
			return createError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');

		// const verifyPassword = await this.verifyPassword(user, password);

		// if (!verifyPassword)
		// 	return createError(StatusCodes.UNAUTHORIZED, 'Invalid email or password');

		// sign token
		const resp = {
			accessToken: jwt.sign({ email: email }, process.env.JWT_SECRET),
		};

		return resp;
	}

	async findUserByEmail(email: string): Promise<IAuth> {
		return await User.findOne({ email: email }).exec();
	}

	async verifyPassword(user: IAuth, password: string): Promise<boolean> {
		return await bcrypt.compare(password, user.password);
	}

	private async hashPassword(password: string): Promise<string> {
		return await bcrypt.hash(password, 10);
	}
}
