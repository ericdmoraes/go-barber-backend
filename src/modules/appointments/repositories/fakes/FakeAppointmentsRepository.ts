import { uuid } from 'uuidv4';

// Interfaces
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

// Model
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.model';

// Date
import { isEqual } from 'date-fns';

class AppointmentsRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = [];

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment();

    Object.assign(appointment, { id: uuid(), date, provider_id: providerId });

    this.appointments.push(appointment);

    return appointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    return this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );
  }
}

export default AppointmentsRepository;
