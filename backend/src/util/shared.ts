import createHttpError from 'http-errors';
import { StatusCodes } from 'http-status-codes';

export const dbUrl = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;

export interface ApiResponseType {
	message: string;
	data?: any[] | Object;
}

export function apiResponse(
	message: string,
	data?: any[] | Object,
): ApiResponseType {
	const resp: ApiResponseType = {
		message: message,
	};

	if (data) resp.data = data;

	return resp;
}

export function getStatusCode(resp: any, create = false) {
	let statusCode = StatusCodes.OK;

	if (createHttpError.isHttpError(resp)) statusCode = resp.status;
	else if (create) statusCode = StatusCodes.CREATED;

	return statusCode;
}

// export const apiResponse: ApiResponseType = (
// 	message: string,
// 	data?: any[] | Object,
// ) => {
// 	return {
// 		message: message,
// 		data: data,
// 	};
// };
