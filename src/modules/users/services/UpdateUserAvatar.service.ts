// modules
import path from 'path';
import fs from 'fs';

// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

// Configs
import uploadConfig from '@config/upload.config';
import AppError from '@shared/errors/app.error';

// interfaces
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
  ) {}

  public async run({ userId, avatarFilename }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }

    const { directory } = uploadConfig;

    if (user.avatar) {
      const avatarFilePath = path.join(directory, user.avatar);
      const userAvarFileExists = await fs.promises.stat(avatarFilePath);

      if (userAvarFileExists) {
        await fs.promises.unlink(avatarFilePath);
      }
    }

    user.avatar = avatarFilename;

    this.userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatar;
