// Interfaces
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IFindAllProvidersDTO from '@modules/users/dtos/IFindAllProvidersDTO';

import { uuid } from 'uuidv4';

// Model
import User from '@modules/users/infra/typeorm/entities/user.model';

class FakeUsersRepository implements IUserRepository {
  private users: User[] = [];

  async findAllProviders({
    exceptUserId,
  }: IFindAllProvidersDTO): Promise<User[]> {
    let providers = this.users;

    if (exceptUserId) {
      providers = this.users.filter(user => user.id !== exceptUserId);
    }

    return providers;
  }

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create({ name, email, password }: ICreateUserDTO): Promise<User> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }

  async save(data: User): Promise<User> {
    const find = this.users.findIndex(findUser => findUser.id === data.id);
    this.users[find] = data;
    return data;
  }
}

export default FakeUsersRepository;
