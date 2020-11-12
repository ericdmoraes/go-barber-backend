// fakes repository
import FakeTokenRepository from '@modules/users/repositories/fakes/FakeTokenRepository';
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/app.error';

// fakes provider
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

// error
// import AppError from '@shared/errors/app.error';

// Services
import ResetPasswordService from './ResetPassword.service';

// Globals
// Providers
let fakeHashProvider: FakeHashProvider;

// Repositories
let fakeTokenRepository: FakeTokenRepository;
let fakeUserRepository: FakeUserRepository;

// Services
let resetPasswordService: ResetPasswordService;

describe('Reset password serivice', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    fakeTokenRepository = new FakeTokenRepository();
    fakeHashProvider = new FakeHashProvider();

    resetPasswordService = new ResetPasswordService(
      fakeUserRepository,
      fakeTokenRepository,
      fakeHashProvider,
    );
  });

  it('should be able to reset password', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const { token } = await fakeTokenRepository.generate(user.id);

    const generateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPasswordService.run({
      password: '123123',
      token,
    });

    const updatedUser = await fakeUserRepository.findById(user.id);

    expect(generateHash).toHaveBeenCalledWith('123123');
    expect(updatedUser?.password).toBe('123123');
  });

  it('should not be able to reset the password with non-existing token', async () => {
    await expect(
      resetPasswordService.run({
        token: 'unkown',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password with non-existing user', async () => {
    const { token } = await fakeTokenRepository.generate('unkown');

    await expect(
      resetPasswordService.run({
        token,
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to reset the password if passed more than two hours', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const { token } = await fakeTokenRepository.generate(user.id);

    jest.spyOn(Date, 'now').mockImplementation(() => {
      const customDate = new Date();

      return customDate.setHours(customDate.getHours() + 3);
    });

    await expect(
      resetPasswordService.run({
        password: '123123',
        token,
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});

// hash - ok
// user token inexistente - ok

// 2 hours expiration time
// user inexistente
