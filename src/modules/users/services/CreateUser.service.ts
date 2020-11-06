// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Errors
import AppError from '@shared/errors/app.error';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

// interfaces
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  name: string;
  email: string;
  password: string;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async run({
    name,
    email,
    password,
  }: Request): Promise<User | undefined> {
    const findUser = await this.userRepository.findByEmail(email);

    if (findUser) {
      throw new AppError('Email already exists!');
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const createdUser = this.userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    return createdUser;
  }
}

export default CreateUserService;
