import { Router } from 'express';
import { startOfHour, parseISO, isEqual } from 'date-fns';

// Models
import Appointment from '../models/appointment';

// Router
const AppointmentRouter = Router();

const appointments: Appointment[] = [];

AppointmentRouter.post('/', (req, res) => {
  const { provider, date } = req.body;

  const parsedData = startOfHour(parseISO(date));

  const findEqualHourAppoint = appointments.find(appointment =>
    isEqual(appointment.date, parsedData),
  );

  if (findEqualHourAppoint) {
    return res
      .status(400)
      .json({ message: 'This appointment is already booked!' });
  }

  const appointment = new Appointment(provider, parsedData);

  appointments.push(appointment);

  return res.json(appointment);
});

export default AppointmentRouter;
