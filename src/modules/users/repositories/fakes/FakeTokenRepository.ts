// Interfaces
import ITokenRepository from '@modules/users/repositories/ITokenRepository';

import { uuid } from 'uuidv4';

// Model
import UserToken from '@modules/users/infra/typeorm/entities/token.model';

class FakeTokenRepository implements ITokenRepository {
  private tokens: UserToken[] = [];

  async findByToken(token: string): Promise<UserToken | undefined> {
    const user = this.tokens.find(findToken => findToken.token === token);

    return user;
  }

  async generate(id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(userToken, {
      id: uuid(),
      token: uuid(),
      user_id: id,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.tokens.push(userToken);

    return userToken;
  }
}

export default FakeTokenRepository;
