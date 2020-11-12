// Repositories
import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

// Services
import ListProvidersService from './ListProviders.service';

// Globals
// Repositories
let fakeUserRepository: FakeUserRepository;

// services
let listProviders: ListProvidersService;

describe('List providers profile serivice', () => {
  beforeEach(() => {
    fakeUserRepository = new FakeUserRepository();
    listProviders = new ListProvidersService(fakeUserRepository);
  });

  it('should be able to list all providers', async () => {
    const user1 = await fakeUserRepository.create({
      email: 'eric@mail.com',
      name: 'eric',
      password: '123123',
    });

    const user2 = await fakeUserRepository.create({
      email: 'eric2@mail.com',
      name: 'eric',
      password: '123123',
    });

    const loggedUser = await fakeUserRepository.create({
      email: 'eric3@mail.com',
      name: 'eric',
      password: '123123',
    });

    const providers = await listProviders.run({
      userId: loggedUser.id,
    });

    expect(providers).toEqual([user1, user2]);
  });
});
