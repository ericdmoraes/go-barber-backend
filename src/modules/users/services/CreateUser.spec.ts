import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/app.error';
import CreateUserService from './CreateUser.service';

// Globals
// Providers
let fakeHashProvider: FakeHashProvider;

// Repositories
let fakeUserRepository: FakeUserRepository;

// services
let createUserService: CreateUserService;

describe('Create user Service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUserService = new CreateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to create an user', async () => {
    const user = await createUserService.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    expect(user).toHaveProperty('id');
  });

  it('should not be able to create an user with the same email', async () => {
    await createUserService.run({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    await expect(
      createUserService.run({
        email: 'eric@mail.com',
        name: 'eridasdc',
        password: '123asdasda123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
