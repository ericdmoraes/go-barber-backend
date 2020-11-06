import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/app.error';

// Services
import CreateSessionService from './CreateSession.service';
import CreateUserService from './CreateUser.service';

describe('Create session Service', () => {
  it('should be able to authenticate', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    const session = await createSession.run({
      email: 'eric@mail.com',
      password: '123123',
    });

    expect(session).toHaveProperty('token');
    expect(session.user).toEqual(user);
  });

  it('should not be able to authenticate because wrong email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    expect(
      createSession.run({
        email: 'unkown@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to authenticate because wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createSession = new CreateSessionService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUser.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    expect(
      createSession.run({
        email: 'eric@mail.com',
        password: '1111111',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
