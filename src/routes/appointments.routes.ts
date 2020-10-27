import { Router } from 'express';
import { startOfHour, parseISO } from 'date-fns';

// Repositories
import AppointmentRepository from '../repositories/appointments.repository';
import Appointment from '../models/appointment';

// Router
const AppointmentRouter = Router();

// Repositories
const appointmentRepository = new AppointmentRepository();

AppointmentRouter.get('/', (req, res) => {
  return res.json(appointmentRepository.All());
});

AppointmentRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedData = startOfHour(parseISO(date));
  const verifyDate = appointmentRepository.findByDate(parsedData);

  if (verifyDate) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }

  const appointment = appointmentRepository.create(provider, parsedData);
  return res.json(appointment);
});

export default AppointmentRouter;
