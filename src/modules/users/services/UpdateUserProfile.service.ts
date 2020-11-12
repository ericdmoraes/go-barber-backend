// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

// // Errors
// import AppError from '@shared/errors/app.error';

// interfaces
import AppError from '@shared/errors/app.error';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
  name: string;
  email: string;
  password?: string;
  oldPassword?: string;
}

@injectable()
class UpdateUSerProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({
    name,
    email,
    userId,
    password,
    oldPassword,
  }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('User not found');
    }

    const userEmail = await this.userRepository.findByEmail(email);

    if (userEmail && userEmail.id !== userId) {
      throw new AppError('Email already in use.');
    }

    Object.assign(user, {
      name,
      email,
    });

    if (password && !oldPassword) {
      throw new AppError(
        'You should inform your old password to set a new password.',
      );
    }

    if (password && oldPassword) {
      const verifyOldPass = await this.hashProvider.compareHash(
        oldPassword,
        user.password,
      );

      if (!verifyOldPass) {
        throw new AppError('Old password does not match.');
      }

      Object.assign(user, {
        password: await this.hashProvider.generateHash(password),
      });
    }

    return this.userRepository.save(user);
  }
}

export default UpdateUSerProfileService;
