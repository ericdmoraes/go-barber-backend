import { Router } from 'express';

// Routes
import AppointmentsRouter from './appointments.route';
import UsersRouter from './users.route';
import SessionsRouter from './sessions.route';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
