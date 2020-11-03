import { startOfHour } from 'date-fns';

// typeorm
import { getCustomRepository } from 'typeorm';

// Errors
import AppError from '../errors/app.error';

// Model
import Appointment from '../models/appointment.model';

// Repository
import AppointmentRepository from '../repositories/appointments.repository';

interface Request {
  date: Date;
  provider_id: string;
}

class CreateAppointmentService {
  public async run({ date, provider_id }: Request): Promise<Appointment> {
    const appointmentRepository = getCustomRepository(AppointmentRepository);

    const appointmentDate = startOfHour(date);

    const verifyDate = await appointmentRepository.findByDate(appointmentDate);

    if (verifyDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = appointmentRepository.create({
      provider_id,
      date: appointmentDate,
    });

    await appointmentRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
