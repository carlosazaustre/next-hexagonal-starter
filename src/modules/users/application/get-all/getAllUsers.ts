import { User } from '../../domain/User';
import { UserRepository } from '../../domain/UserRepository';

export function getAllUsers(userRepository: UserRepository) {
	return async (): Promise<User[]> => {
		return await userRepository.getAll();
	};
}
