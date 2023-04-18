import { Post } from '../domain/Post';
import { PostRepository } from '../domain/PostRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiPostRepository(): PostRepository {
  return {
    get,
    getAll,
    getByUser,
  }
}

async function get(postId: number) {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/posts/${postId}`);
  const post = await response.json() as Promise<Post>;

  return post;
}

async function getAll(): Promise<Post[]> {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/posts`);
  const posts = await response.json() as Promise<Post[]>;

  return posts;
}

async function getByUser(userId: number): Promise<Post[]> {
  const response = await fetch(`${JSONPLACEHOLDER_URL}/users/${userId}/posts`);
  const posts = await response.json() as Promise<Post[]>;

  return posts;
}