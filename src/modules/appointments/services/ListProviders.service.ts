// Dependency Injection
import { inject, injectable } from 'tsyringe';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

// interfaces
import IUserRepository from '@modules/users/repositories/IUsersRepository';

interface Request {
  userId: string;
}

@injectable()
class ListProvidersService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,
  ) {}

  public async run({ userId }: Request): Promise<User[]> {
    const user = await this.userRepository.findAllProviders({
      exceptUserId: userId,
    });

    return user;
  }
}

export default ListProvidersService;
