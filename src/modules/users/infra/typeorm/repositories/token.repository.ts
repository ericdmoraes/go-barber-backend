// typeorm
import { getRepository, Repository } from 'typeorm';

// Interfaces
import ITokenRepository from '@modules/users/repositories/ITokenRepository';

// Model
import Token from '../entities/token.model';

class TokenRepository implements ITokenRepository {
  private ormRepository: Repository<Token>;

  constructor() {
    this.ormRepository = getRepository(Token);
  }

  async generate(id: string): Promise<Token> {
    const userToken = this.ormRepository.create({
      user_id: id,
    });

    await this.ormRepository.save(userToken);

    return userToken;
  }

  async findByToken(token: string): Promise<Token | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: { token },
    });

    return userToken;
  }
}

export default TokenRepository;
