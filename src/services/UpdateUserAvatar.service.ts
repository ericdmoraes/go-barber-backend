// modules
import path from 'path';
import fs from 'fs';
import { getRepository } from 'typeorm';

// Models
import User from '../models/user.model';

// Configs
import uploadConfig from '../config/upload.config';
import AppError from '../errors/app.error';

interface Request {
  user_id: string;
  avatar_filename: string;
}

class UpdateUserAvatar {
  public async run({ user_id, avatar_filename }: Request): Promise<User> {
    const userRepository = await getRepository(User);

    const user = await userRepository.findOne({
      where: {
        id: user_id,
      },
    });

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

    user.avatar = avatar_filename;

    userRepository.save(user);

    delete user.password;

    return user;
  }
}

export default UpdateUserAvatar;
