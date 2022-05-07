import { Schema, model } from 'mongoose';
import { IEmployee } from './employee.interface';

const EmployeeSchema = new Schema<IEmployee>(
	{
		name: { type: String, required: true },
		age: { type: Number, required: true },
		position: { type: String, required: true },
	},
	{ timestamps: true },
);

export default model<IEmployee>('Employee', EmployeeSchema);
