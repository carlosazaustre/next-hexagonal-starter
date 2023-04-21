import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export function getUser(userRepository: UserRepository) {
	return async (userId: number): Promise<User | undefined> => {
		return await userRepository.get(userId);
	};
}
