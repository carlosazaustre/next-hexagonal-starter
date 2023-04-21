import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiUserRepository(): UserRepository {
	const cache: Map<number, User> = new Map();

	async function get(id: number): Promise<User | undefined> {
		if (cache.has(id)) {
			return cache.get(id) as User;
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/users/${id}`);
		const user = await response.json();
		cache.set(id, user);

		return user;
	}

	async function getAll(): Promise<User[]> {
		if (cache.size > 0) {
			return Array.from(cache.values());
		}

		const response = await fetch(`${JSONPLACEHOLDER_URL}/users`);
		const users = await response.json();

		users.forEach((user: User) => cache.set(user.id, user));

		return users;
	}

	return {
		get,
		getAll,
	};
}
