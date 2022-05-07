import { StatusCodes } from 'http-status-codes';
import createError from 'http-errors';
import logger from '../logger';
import { IEmployee } from './employee.interface';
import Employee from './employee.model';

export default class EmployeeService {
	async create(
		iEmployee: IEmployee,
	): Promise<IEmployee | createError.HttpError> {
		const { name, age, position } = iEmployee;

		const employee = new Employee({ name: name, age: age, position: position });

		try {
			const created = await employee.save();
			return created;
		} catch (error: any) {
			logger.error(employee._id, error);
			return createError(
				StatusCodes.INTERNAL_SERVER_ERROR,
				'Sorry something went wroing, try again later',
			);
		}
	}

	async list(): Promise<IEmployee[]> {
		return await Employee.find({})
			.select('_id name age position createdAt')
			.exec();
	}

	async getOne(id: string): Promise<IEmployee> {
		return await Employee.findById(id)
			.select('_id name age position createdAt')
			.exec();
	}
}
