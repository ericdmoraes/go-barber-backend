// typeorm
import { getRepository, Repository } from 'typeorm';

// Interfaces
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';

// Model
import Appointment from '@modules/appointments/infra/typeorm/entities/appointment.model';

class AppointmentsRepository implements IAppointmentsRepository {
  private ormRepository: Repository<Appointment>;

  constructor() {
    this.ormRepository = getRepository(Appointment);
  }

  public async create({
    providerId,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const createdAppointment = this.ormRepository.create({
      provider_id: providerId,
      date,
    });

    await this.ormRepository.save(createdAppointment);

    return createdAppointment;
  }

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findAppointment = await this.ormRepository.findOne({
      where: {
        date,
      },
    });

    return findAppointment;
  }
}

export default AppointmentsRepository;
