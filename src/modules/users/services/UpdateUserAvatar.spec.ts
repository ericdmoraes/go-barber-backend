import AppError from '@shared/errors/app.error';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateavatarUserService from './UpdateUserAvatar.service';

// Globals
// Providers
let fakeStorageProvider: FakeStorageProvider;

// Repositories
let fakeUserRepository: FakeUserRepository;

// services
let updateavatarUserService: UpdateavatarUserService;

describe('Update user avatar service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeStorageProvider = new FakeStorageProvider();

    updateavatarUserService = new UpdateavatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    );
  });

  it('should update user avatar', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    await updateavatarUserService.run({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existent user', async () => {
    await expect(
      updateavatarUserService.run({
        userId: 'unknow',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update', async () => {
    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    await updateavatarUserService.run({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateavatarUserService.run({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
