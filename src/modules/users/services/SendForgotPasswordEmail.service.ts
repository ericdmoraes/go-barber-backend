// Dependency Injection
import { inject, injectable } from 'tsyringe';
import path from 'path';

// Errors
import AppError from '@shared/errors/app.error';

// interfaces
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProviders';

// Repositories
import ITokenRepository from '../repositories/ITokenRepository';
import IUserRepository from '../repositories/IUsersRepository';

interface Request {
  email: string;
}

@injectable()
class SendForgotPasswordEmailService {
  constructor(
    @inject('UsersRepository')
    private userRepository: IUserRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,

    @inject('TokenRepository')
    private userTokenRepository: ITokenRepository,
  ) {}

  public async run({ email }: Request): Promise<void> {
    const user = await this.userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('This email does not exists.');
    }

    const { token } = await this.userTokenRepository.generate(user.id);

    const templateFile = path.resolve(
      __dirname,
      '..',
      'views',
      'ForgotPasswordTemplate.hbs',
    );

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        file: templateFile,
        variables: {
          name: user.name,
          link: `https://localhost:3000/?token=${token}`,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
