import { Schema, model } from 'mongoose';
import IAuth from './auth.interface';

const AuthSchema = new Schema<IAuth>(
	{
		email: { type: String, required: true, unique: true },
		name: { type: String, required: false },
		password: { type: String, required: true, minLength: 6 },
	},
	{ timestamps: true },
);

export default model<IAuth>('User', AuthSchema);
