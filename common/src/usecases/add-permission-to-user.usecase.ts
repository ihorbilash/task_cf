import { userRepository, UserRepository } from '#entities/user/user.repository.js';

export type ExecutionOptions = {
  username: string;
};
class ChangePermissionToUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute({ username }: ExecutionOptions) {
    const result = await this.userRepository.updateOne({ username }, [
      {
        $set: {
          allowed: { $not: '$allowed' },
        },
      },
    ]);
    return !!result.modifiedCount;
  }
}

export const changePermissionToUserUseCase = new ChangePermissionToUserUseCase(userRepository);
