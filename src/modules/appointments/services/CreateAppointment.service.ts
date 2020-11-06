// Modules
import { startOfHour } from 'date-fns';

// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Errors
import AppError from '@shared/errors/app.error';

// interfaces
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';

// Model
import Appointment from '../infra/typeorm/entities/appointment.model';

interface Request {
  date: Date;
  providerId: string;
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async run({ date, providerId }: Request): Promise<Appointment> {
    const appointmentDate = startOfHour(date);

    const verifyDate = await this.appointmentRepository.findByDate(
      appointmentDate,
    );

    if (verifyDate) {
      throw new AppError('This appointment is already booked!');
    }

    const appointment = await this.appointmentRepository.create({
      providerId,
      date: appointmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
