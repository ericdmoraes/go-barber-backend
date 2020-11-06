// Modules
import { sign } from 'jsonwebtoken';

// dependency injection
import { injectable, inject } from 'tsyringe';

// HashProvider

// Errors
import AppError from '@shared/errors/app.error';

// configs
import auth from '@config/auth.config';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// interfaces
import IUserRepository from '../repositories/IUsersRepository';

// Models
import User from '../infra/typeorm/entities/user.model';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

@injectable()
class CreateSession {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({ email, password }: Request): Promise<Response> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Wrong email or password', 401);
    }

    const passwordMatch = await this.hashProvider.compareHash(
      password,
      user.password,
    );

    if (!passwordMatch) {
      throw new AppError('Wrong email or password', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSession;
