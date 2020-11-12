import { Router } from 'express';

// Routes
import AppointmentsRouter from '@modules/appointments/infra/http/routes/appointments.route';
import PasswordRouter from '@modules/users/infra/http/routes/password.route';
import SessionsRouter from '@modules/users/infra/http/routes/sessions.route';
import ProfileRouter from '@modules/users/infra/http/routes/profile.route';
import UsersRouter from '@modules/users/infra/http/routes/users.route';

const routes = Router();

routes.use('/appointments', AppointmentsRouter);
routes.use('/sessions', SessionsRouter);
routes.use('/password', PasswordRouter);
routes.use('/profile', ProfileRouter);
routes.use('/users', UsersRouter);

export default routes;
