import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/app.error';

// Services
import CreateSessionService from './CreateSession.service';
import CreateUserService from './CreateUser.service';

// globals
// repositories
let fakeUserRepository: FakeUserRepository;

// providers
let fakeHashProvider: FakeHashProvider;

// services
let createSessionService: CreateSessionService;
let createUserService: CreateUserService;

describe('Create session Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();

    fakeHashProvider = new FakeHashProvider();

    createSessionService = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUserService.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    const session = await createSessionService.run({
      email: 'eric@mail.com',
      password: '123123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to authenticate because wrong email', async () => {
    await createUserService.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    await expect(
      createSessionService.run({
        email: 'unkown@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate because wrong password', async () => {
    await createUserService.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    await expect(
      createSessionService.run({
        email: 'eric@mail.com',
        password: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
