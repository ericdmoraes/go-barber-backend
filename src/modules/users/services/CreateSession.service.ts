// Modules
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getRepository } from 'typeorm';

// Errors
import AppError from '@shared/errors/app.error';

// configs
import auth from '@config/auth.config';

// Models
import User from '../infra/typeorm/entities/user.model';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSession {
  public async run({ email, password }: Request): Promise<Response> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Wrong email or password', 401);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError('Wrong email or password', 401);
    }

    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });

    return { user, token };
  }
}

export default CreateSession;
