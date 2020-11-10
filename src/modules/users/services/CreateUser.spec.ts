import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/app.error';
import CreateUserService from './CreateUser.service';

describe('Create user Service', () => {
  it('should be able to create an user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUser.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with the same email', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const email = 'eric@mail.com';

    await createUser.run({
      email,
      name: 'eric',
      password: '123123',
    });

    await expect(
      createUser.run({
        email,
        name: 'eric',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
