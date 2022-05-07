import express, { Router, Request, Response } from 'express';
import AuthController from './auth/auth.controller';
import { authValidationSchema } from './auth/auth.interface';
import { createEmployeeValidationSchema } from './employees/employee.interface';
import EmployeesController from './employees/employees.controller';
import ValidationMiddleware from './middlewares/validation.meddleware';

// const router: Router = express.Router();

// export const authRoutes = () => {
// 	router.get('', new AuthController().create);

// 	router.post('/register', new AuthController().create);

// 	return router;
// };

export default class AppRouter {
	private router: Router;

	constructor() {
		this.router = express.Router();
	}

	notFound() {
		this.router.get('/');
	}

	employeesRoutes(): express.Router {
		this.router.post('', new EmployeesController().create);
		this.router.get('', new EmployeesController().list);
		this.router.get('/:id', new EmployeesController().getOne);

		return this.router;
	}

	authRoutes(): express.Router {
		this.router.post(
			'/register',
			ValidationMiddleware(authValidationSchema),
			new AuthController().create,
		);
		this.router.post(
			'/login',
			ValidationMiddleware(createEmployeeValidationSchema),
			new AuthController().signIn,
		);

		return this.router;
	}
}
