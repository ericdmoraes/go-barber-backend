import { Router } from 'express';

// Routes
import AppointmentRouter from './appointments.route';

const routes = Router();

routes.use('/appointments', AppointmentRouter);

export default routes;
