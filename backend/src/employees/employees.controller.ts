import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { apiResponse, ApiResponseType, getStatusCode } from '../util/shared';
import EmployeeService from './employee.service';

export default class EmployeesController {
	private employeeService: EmployeeService;

	constructor() {
		this.employeeService = new EmployeeService();
	}
	create = async (
		req: Request,
		res: Response,
	): Promise<Response<ApiResponseType>> => {
		const resp = await this.employeeService.create(req.body);

		const code = getStatusCode(resp, true);

		return res
			.status(code)
			.send(
				code == StatusCodes.CREATED
					? apiResponse('Employee created successfully', resp)
					: resp,
			);
	};

	list = async (
		_req: Request,
		res: Response,
	): Promise<Response<ApiResponseType>> => {
		const resp = await this.employeeService.list();
		return res
			.status(getStatusCode(resp))
			.send(apiResponse('Request successful', resp));
	};

	getOne = async (
		req: Request,
		res: Response,
	): Promise<Response<ApiResponseType>> => {
		const resp = await this.employeeService.getOne(req.params.id);
		return res
			.status(getStatusCode(resp))
			.send(apiResponse('Request successful', resp));
	};
}
