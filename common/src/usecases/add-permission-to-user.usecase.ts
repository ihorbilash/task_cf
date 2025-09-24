import { userRepository, UserRepository } from '#entities/user/user.repository.js';

export type ExecutionOptions = {
  username: string;
};
class AddPermissionToUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ username }: ExecutionOptions) {
    const user = await this.userRepository.updateOne({ username }, { allowed: true });
    return !!user.modifiedCount;
  }
}

export const addPermissionToUserUseCase = new AddPermissionToUserUseCase(userRepository);
