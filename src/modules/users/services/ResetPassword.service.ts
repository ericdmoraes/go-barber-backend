// Dependency Injection
import { inject, injectable } from 'tsyringe';

import { differenceInHours } from 'date-fns';

// Errors
import AppError from '@shared/errors/app.error';

// Providers

// Repositories
import ITokenRepository from '../repositories/ITokenRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  password: string;
  token: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('TokenRepository')
    private userTokenRepository: ITokenRepository,

    @inject('HashProvider')
    private HashProvider: IHashProvider,
  ) {}

  public async run({ password, token }: Request): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists.');
    }

    const user = await this.userRepository.findById(userToken?.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    if (differenceInHours(Date.now(), userToken.created_at) > 2) {
      throw new AppError('Token exipired.');
    }

    user.password = await this.HashProvider.generateHash(password);

    await this.userRepository.save(user);
  }
}
export default ResetPasswordService;
