import { container } from 'tsyringe';

// providers
import '@modules/users/providers/HashProvider/index';

// repositories interface
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';

// repositories
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users.repostiory';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);
