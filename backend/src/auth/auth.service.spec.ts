import request, { Response } from 'supertest';
import { Application } from 'express';
import { StatusCodes } from 'http-status-codes';

import App from '../app';
import User from './auth.model';

let app: Application;
jest.useFakeTimers();

beforeAll(async () => {
	jest.setTimeout(10 * 2000);
	app = App;
});

describe('Registration', () => {
	it('returns 400 for required field', async () => {
		jest.setTimeout(10 * 2000);
		const resp: Response = await request(app).post('/auth/register').send({});

		expect(resp.status).toBe(StatusCodes.BAD_REQUEST);
	});

	//TODO: comple the unit testing before moving to employees
});
