import { container } from 'tsyringe';

// providers
import './providers';
import '@modules/users/providers/HashProvider/index';

// repositories interface
import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import ITokenRepository from '@modules/users/repositories/ITokenRepository';

// repositories
import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/appointments.repository';
import UsersRepository from '@modules/users/infra/typeorm/repositories/users.repostiory';
import TokenRepository from '@modules/users/infra/typeorm/repositories/token.repository';

container.registerSingleton<IAppointmentsRepository>(
  'AppointmentsRepository',
  AppointmentsRepository,
);

container.registerSingleton<IUsersRepository>(
  'UsersRepository',
  UsersRepository,
);

container.registerSingleton<ITokenRepository>(
  'TokenRepository',
  TokenRepository,
);
