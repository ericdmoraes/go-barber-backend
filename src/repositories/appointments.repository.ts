import { isEqual } from 'date-fns';

// Model
import Appointment from '../models/appointment';

class AppointmentsRepository {
  private appointments: Appointment[];

  constructor() {
    this.appointments = [];
  }

  public findByDate(date: Date): Appointment | null {
    const findAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    );

    return findAppointment || null;
  }

  public create(provider: string, date: Date): Appointment {
    const appointment = new Appointment(provider, date);
    this.appointments.push(appointment);
    return appointment;
  }

  public All(): Appointment[] {
    return this.appointments;
  }
}

export default AppointmentsRepository;
