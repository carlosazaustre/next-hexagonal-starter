import { User } from '../domain/User';
import { UserRepository } from '../domain/UserRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiUserRepository(): UserRepository {
  return {
    get,
    getAll,
  }
}

async function get(id: number): Promise<User | null> {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/users/${id}`);
  const user = await response.json() as Promise<User>;

  return user;
}

async function getAll(): Promise<User[]> {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/users`);
  const users = await response.json() as Promise<User[]>;

  return users;
}