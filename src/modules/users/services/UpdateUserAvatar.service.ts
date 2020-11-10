// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

// Errors
import AppError from '@shared/errors/app.error';

// interfaces
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatar {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
  ) {}

  public async run({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    if (user.avatar) {
      this.storageProvider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvider.saveFile(avatarFilename);

    user.avatar = fileName;

    this.userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatar;
