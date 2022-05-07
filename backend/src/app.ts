import cors from 'cors';
import express, { Application } from 'express';
import { authValidationSchema } from './auth/auth.interface';
import AuthMiddleware from './middlewares/auth.middleware';
import ValidationMiddleware from './middlewares/validation.meddleware';
import AppRouter from './router';

const appRouter = new AppRouter();

const app: Application = express();

app.use(cors());
app.use(AuthMiddleware);

app.use(express.json());

app.use('/auth', appRouter.authRoutes());
app.use('/employees', appRouter.employeesRoutes());

export default app;
