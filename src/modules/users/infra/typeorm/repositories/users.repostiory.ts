// typeorm
import { getRepository, Repository, Not } from 'typeorm';

// Interfaces
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

// Model
import User from '@modules/users/infra/typeorm/entities/user.model';

class UsersRepository implements IUserRepository {
  private ormRepository: Repository<User>;

  constructor() {
    this.ormRepository = getRepository(User);
  }

  async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let providers: User[];

    if (exceptUserId) {
      providers = await this.ormRepository.find({
        where: {
          id: Not(exceptUserId),
        },
      });
    } else {
      providers = await this.ormRepository.find();
    }

    return providers;
  }

  async findById(id: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne(id);

    return user;
  }

  async findByEmail(email: string): Promise<User | undefined> {
    const user = await this.ormRepository.findOne({
      where: {
        email,
      },
    });

    return user;
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const createdUser = this.ormRepository.create({
      email,
      name,
      password,
    });
    await this.ormRepository.save(createdUser);
    return createdUser;
  }

  async save(data: User): Promise<User> {
    const savedUser = await this.ormRepository.save(data);
    return savedUser;
  }
}

export default UsersRepository;
