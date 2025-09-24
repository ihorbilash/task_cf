import { userRepository, UserRepository } from '#entities/user/user.repository.js';
import { UserData } from '#entities/user/model.js';

export type AllowedUserDto = Pick<UserData, 'username' | 'telegramId' | 'allowed'>;

class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(): Promise<AllowedUserDto[]> {
    const users = await this.userRepository.findAll({});
    return users.map((u: any) => ({
      username: u.username,
      telegramId: u.telegramId,
      allowed: Boolean(u.allowed),
    }));
  }
}

export const getUsersUseCase = new GetUserUseCase(userRepository);
