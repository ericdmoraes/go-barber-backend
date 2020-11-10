import AppError from '@shared/errors/app.error';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageprovider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateavatarUserService from './UpdateUserAvatar.service';

describe('Update user avatar service', () => {
  it('should update user avatar', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageprovider();

    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const updateAvatar = new UpdateavatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await updateAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from non existent user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageprovider();

    const updateAvatar = new UpdateavatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await expect(
      updateAvatar.run({
        userId: 'unknow',
        avatarFilename: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageprovider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const updateAvatar = new UpdateavatarUserService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    await updateAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateAvatar.run({
      userId: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
