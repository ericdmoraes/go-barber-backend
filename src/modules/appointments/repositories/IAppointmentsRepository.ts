import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.model';

// Interfaces
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

export default interface AppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date): Promise<Appointment | undefined>;
}
