// Modules
import { hash } from 'bcryptjs';

// TypeORM
import { getRepository } from 'typeorm';

// Errors
import AppError from '@shared/errors/app.error';

// Models
import User from '@modules/users/infra/typeorm/entities/user.model';

interface Request {
  name: string;
  email: string;
  password: string;
}

class CreateUserService {
  public async run({ name, email, password }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const findUser = await userRepository.findOne({
      where: { email },
    });

    if (findUser) {
      throw new AppError('Email already exists!');
    }

    const hashedPassword = await hash(password, 8);

    const createdUser = userRepository.create({
      name,
      email,
      password: hashedPassword,
    });

    await userRepository.save(createdUser);

    return createdUser;
  }
}

export default CreateUserService;
