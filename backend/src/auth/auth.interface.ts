import Joi from 'joi';

export default interface IAuth {
	email: string;
	name: string;
	password: string;
}

export default interface ISignIn {
	email: string;
	password: string;
}

export const authValidationSchema = Joi.object({
	email: Joi.string().email().required(),
	name: Joi.string().required(),
	password: Joi.string().min(6).required(),
});
