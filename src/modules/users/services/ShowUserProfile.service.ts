// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

// Errors
import AppError from '@shared/errors/app.error';

// interfaces
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
class ShowUserProfileService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async run({ userId }: Request): Promise<User> {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new AppError('This user does not exist.');
    }

    return user;
  }
}

export default ShowUserProfileService;
