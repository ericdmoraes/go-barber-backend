import AppError from '@shared/errors/app.error';

// Repositories
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

// Services
import ShowUserProfileService from '@modules/users/services/ShowUserProfile.service';

// Globals
// Repositories
let fakeUserRepository: FakeUserRepository;

// services
let showUserProfileService: ShowUserProfileService;

describe('Show user profile serivice', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    showUserProfileService = new ShowUserProfileService(fakeUserRepository);
  });

  it('should not be able to show user profile by wrong id', async () => {
    await expect(
      showUserProfileService.run({
        userId: 'unknow',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to show user profile by id', async () => {
    const user = await fakeUserRepository.create({
      name: 'eric',
      email: 'eric@mail.com',
      password: '123123',
    });

    const userProfile = await showUserProfileService.run({
      userId: user.id,
    });

    expect(userProfile.email).toBe('eric@mail.com');
  });
});
