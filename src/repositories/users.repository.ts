// typeorm
import { EntityRepository, Repository } from 'typeorm';

// Model
import User from '../models/user.model';

@EntityRepository(User)
class UsersRepository extends Repository<User> {
  public async findByDate(date: Date): Promise<User | null> {
    const findUser = await this.findOne({
      where: {
        date,
      },
    });

    return findUser || null;
  }
}

export default UsersRepository;
