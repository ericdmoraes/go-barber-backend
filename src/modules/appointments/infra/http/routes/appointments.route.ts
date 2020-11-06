import { Router } from 'express';

// Middlewares
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth.middleware';

import AppointmentController from '../controllers/appointments.controller';

// Router
const AppointmentRouter = Router();

const appointmentController = new AppointmentController();

AppointmentRouter.use(ensureAuth);

// AppointmentRouter.get('/', async (req, res) => {
//   return res.json(await appointmentRepository.find());
// });

AppointmentRouter.post('/', appointmentController.create);

export default AppointmentRouter;
