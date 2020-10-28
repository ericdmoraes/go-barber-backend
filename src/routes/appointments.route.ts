import { Router } from 'express';
import { parseISO } from 'date-fns';

// Services
import CreateAppointmentService from '../services/CreateAppointment.service';

// Repositories
import AppointmentRepository from '../repositories/appointments.repository';
// Create Repository instance
const appointmentRepository = new AppointmentRepository();

// Router
const AppointmentRouter = Router();

AppointmentRouter.get('/', (req, res) => {
  return res.json(appointmentRepository.All());
});

AppointmentRouter.post('/', (req, res) => {
  try {
    const { provider, date } = req.body;

    const parsedDate = parseISO(date);

    const createAppointment = new CreateAppointmentService(
      appointmentRepository,
    );

    const appointment = createAppointment.run({ date: parsedDate, provider });

    return res.json(appointment);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
});

export default AppointmentRouter;
