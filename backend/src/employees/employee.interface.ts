import Joi from 'joi';

export interface IEmployee {
	name: string;
	position: string;
	age: number;
}

export const createEmployeeValidationSchema = Joi.object({
	name: Joi.string().required(),
	position: Joi.string().required(),
	age: Joi.number().required().min(18),
});
