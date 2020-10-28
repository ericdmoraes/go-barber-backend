import { startOfHour } from 'date-fns';

// Model
import Appointment from '../models/appointment.model';

// Repository
import AppointmentRepository from '../repositories/appointments.repository';

interface Request {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentRepository: AppointmentRepository;

  constructor(appointmentReporisoty: AppointmentRepository) {
    this.appointmentRepository = appointmentReporisoty;
  }

  public run({ date, provider }: Request): Appointment {
    const appointmentDate = startOfHour(date);

    const verifyDate = this.appointmentRepository.findByDate(appointmentDate);

    if (verifyDate) {
      throw Error('This appointment is already booked!');
    }

    const appointment = this.appointmentRepository.create({
      provider,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
