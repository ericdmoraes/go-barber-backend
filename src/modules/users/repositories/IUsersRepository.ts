import User from '@modules/users/infra/typeorm/entities/user.model';

// interfaces
import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';

export default interface IUsersRepository {
  findById(id: string): Promise<User | undefined>;
  findByEmail(email: string): Promise<User | undefined>;
  create(data: ICreateUserDTO): Promise<User | undefined>;
  save(data: User): Promise<User | undefined>;
}
