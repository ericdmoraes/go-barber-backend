// Interfaces
import IUserRepository from '@modules/users/repositories/IUsersRepository';
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

import { uuid } from 'uuidv4';

// Model
import User from '@modules/users/infra/typeorm/entities/user.model';

class UsersRepository implements IUserRepository {
  private users: User[] = [];

  async findById(id: string): Promise<User | undefined> {
    return this.users.find(user => user.id === id);
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.users.find(user => user.email === email);
  }

  async create({
    name,
    email,
    password,
  }: ICreateUserDTO): Promise<User | undefined> {
    const user = new User();
    Object.assign(user, { id: uuid(), name, email, password });
    this.users.push(user);
    return user;
  }

  async save(data: User): Promise<User | undefined> {
    const find = this.users.findIndex(findUser => findUser.id === data.id);
    this.users[find] = data;
    return data;
  }
}

export default UsersRepository;
