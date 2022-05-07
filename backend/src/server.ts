require('dotenv').config();
import http from 'http';

import app from './app';
import DbConnection from './config/config';
import logger from './logger';

const server: http.Server = http.createServer(app);
const port: string | number = process.env.PORT || 5000;

const startServer = async (): Promise<void> => {
	server.listen(port, () => {
		logger.info(`Server Started on ${port}`);
	});
	//connect to database
	await DbConnection.dbConnect();
};

startServer();
