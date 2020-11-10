import Token from '@modules/users/infra/typeorm/entities/token.model';

export default interface IUsersRepository {
  generate(id: string): Promise<Token>;
  findByToken(token: string): Promise<Token | undefined>;
}
