// fakes repository
import FakeTokenRepository from '@modules/users/repositories/fakes/FakeTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

// fakes provider
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

// error
import AppError from '@shared/errors/app.error';

// Services
import SendForgotPasswordEmailService from './SendForgotPasswordEmail.service';

// Lets
// Repositories
let fakeTokenRepository: FakeTokenRepository;
let fakeUserRepository: FakeUserRepository;

// Providers
let fakeMailProvider: FakeMailProvider;

// Services
let sendForgotPasswordEmail: SendForgotPasswordEmailService;

describe('Send forgot password service', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeMailProvider = new FakeMailProvider();
    fakeTokenRepository = new FakeTokenRepository();

    sendForgotPasswordEmail = new SendForgotPasswordEmailService(
      fakeUserRepository,
      fakeMailProvider,
      fakeTokenRepository,
    );
  });

  it('should be able to recover password by email', async () => {
    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.run({
      email: 'eric@mail.com',
    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover without a valid user', async () => {
    await expect(
      sendForgotPasswordEmail.run({
        email: 'eric@mail.com',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const generate = jest.spyOn(fakeTokenRepository, 'generate');

    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    await sendForgotPasswordEmail.run({
      email: 'eric@mail.com',
    });

    expect(generate).toHaveBeenCalledWith(user.id);
  });
});
