// import AppError from '@shared/errors/app.error';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/app.error';
import UpdateUserProfileService from './UpdateUserProfile.service';

// Globals
// Providers
let fakeHashProvider: FakeHashProvider;

// Repositories
let fakeUserRepository: FakeUserRepository;

// services
let updateUserProfileService: UpdateUserProfileService;

describe('Update user profile service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    updateUserProfileService = new UpdateUserProfileService(
      fakeUserRepository,
      fakeHashProvider,
    );
  });

  it('should be able to update user profile', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const updatedUser = await updateUserProfileService.run({
      userId: user.id,
      name: 'eric moraes',
      email: 'eric@mail.com',
    });

    expect(updatedUser.name).toBe('eric moraes');
  });

  it('should not be able to update email with existent one', async () => {
    await fakeUserRepository.create({
      name: 'joao',
      email: 'joao@mail.com',
      password: '123123',
    });

    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    await expect(
      updateUserProfileService.run({
        userId: user.id,
        name: 'eric moraes',
        email: 'joao@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to update the password', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123456',
    });

    const updatedUser = await updateUserProfileService.run({
      userId: user.id,
      name: 'eric moraes',
      email: 'eric@mail.com',
      password: '123123',
      oldPassword: '123456',
    });

    expect(updatedUser.password).toBe('123123');
  });

  it('should not be able to update the password without old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.run({
        userId: user.id,
        name: 'eric moraes',
        email: 'eric@mail.com',
        password: '123123',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update the password with wrong old password', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123456',
    });

    await expect(
      updateUserProfileService.run({
        userId: user.id,
        name: 'eric moraes',
        email: 'eric@mail.com',
        password: '123123',
        oldPassword: 'wrong',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to update profile without a valid user', async () => {
    await expect(
      updateUserProfileService.run({
        userId: 'unknown',
        name: 'eric moraes',
        email: 'joao@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
