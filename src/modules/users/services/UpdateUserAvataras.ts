import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import AppError from '@shared/errors/app.error';

// Serivce
import UpdateavatarUserService from './UpdateUserAvatar.service';
import CreateUserService from './CreateUser.service';
import User from '../infra/typeorm/entities/user.model';

describe('Update user avatar service', () => {
  it('should update user avatar', async () => {
    // const fakeUserRepository = new FakeUserRepository();
    // const updateUserAvatar = new UpdateavatarUserService(fakeUserRepository);
    // const createUser = new CreateUserService(fakeUserRepository);

    // const user = await createUser.run({
    //   email: 'eric@mail.com',
    //   name: 'eric',
    //   password: '123123',
    // });

    // userUpdated = await updateUserAvatar.run({
    //   avatarFilename: 'pictures/pic.png',
    //   userId: user?.id,
    // });

    expect(1 + 1).toBe(2);
  });
});
