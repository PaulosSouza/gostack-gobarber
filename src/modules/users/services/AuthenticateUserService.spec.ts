import FakeUserRepository from '@modules/users/repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';

import AppError from '@shared/errors/AppError';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

let fakeUsersRepository: FakeUserRepository;
let fakeHashProvider: FakeHashProvider;
let createUser: CreateUserService;
let authenticateUser: AuthenticateUserService;

describe('AuthenticateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUserRepository();
    fakeHashProvider = new FakeHashProvider();

    createUser = new CreateUserService(fakeUsersRepository, fakeHashProvider);
    authenticateUser = new AuthenticateUserService(
      fakeUsersRepository,
      fakeHashProvider,
    );
  });

  it('should be able to authenticate', async () => {
    const user = await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    const response = await authenticateUser.execute({
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to authenticate with non existing user', async () => {
    await expect(
      authenticateUser.execute({
        email: 'johndoe@gmail.com',
        password: '1234',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should be able to authenticate with wrong password', async () => {
    await createUser.execute({
      name: 'John Doe',
      email: 'johndoe@gmail.com',
      password: '1234',
    });

    await expect(
      authenticateUser.execute({
        email: 'johndoe@gmail.com',
        password: 'test132',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
