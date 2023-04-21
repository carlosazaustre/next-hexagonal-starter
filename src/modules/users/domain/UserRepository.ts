import { User } from './User';

export interface UserRepository {
	get: (id: number) => Promise<User | undefined>;
	getAll: () => Promise<User[]>;
}
