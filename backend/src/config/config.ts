import mongoose from 'mongoose';

import { dbUrl } from '../util/shared';
import logger from '../logger';

class DbConnection {
	private static mongooseOptions: Object = {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		autoIndex: true,
		maxPoolSize: 10,
		serverSelectionTimeoutMS: 5000,
		socketTimeoutMS: 45000,
		family: 4,
	};

	static async dbConnect(): Promise<void> {
		try {
			await mongoose.connect(dbUrl, DbConnection.mongooseOptions);
			logger.info('db connected successfully');
		} catch (error) {
			logger.error(`Error connecting to db ${error}`);
		}
	}
}

export default DbConnection;
