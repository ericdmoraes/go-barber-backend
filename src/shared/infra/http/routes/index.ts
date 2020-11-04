import { Router } from 'express';

// Routes
import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import UsersRouter from '@modules/users/infra/http/routes/users.route';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.route';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/users', UsersRouter);
routes.use('/sessions', SessionsRouter);

export default routes;
