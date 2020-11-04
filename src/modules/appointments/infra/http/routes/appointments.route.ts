import { Router } from 'express';
import { parseISO } from 'date-fns';

import { getCustomRepository } from 'typeorm';

// Services
import CreateAppointmentService from '@modules/appointments/services/CreateAppointment.service';

// Repositories
import AppointmentRepository from '@modules/appointments/repositories/appointments.repository';

// Middlewares
import ensureAuth from '@modules/users/infra/http/middlewares/ensureAuth.middleware';

// Router
const AppointmentRouter = Router();

AppointmentRouter.use(ensureAuth);

AppointmentRouter.get('/', async (req, res) => {
  const appointmentRepository = getCustomRepository(AppointmentRepository);
  return res.json(await appointmentRepository.find());
});

AppointmentRouter.post('/', async (req, res) => {
  const { provider_id, date } = req.body;

  const parsedDate = parseISO(date);

  const createAppointment = new CreateAppointmentService();

  const appointment = await createAppointment.run({
    date: parsedDate,
    provider_id,
  });

  return res.json(appointment);
});

export default AppointmentRouter;
