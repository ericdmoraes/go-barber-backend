// Dependency Injection
import { inject, injectable } from 'tsyringe';

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

    await this.mailProvider.sendMail({
      to: {
        name: user.name,
        email: user.email,
      },
      subject: 'Recuperação de senha',
      templateData: {
        template: 'Olá {{ name }}, {{ token }}',
        variables: {
          name: user.name,
          token,
        },
      },
    });
  }
}
export default SendForgotPasswordEmailService;
