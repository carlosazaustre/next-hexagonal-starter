import { Post } from './Post';

export interface PostRepository {
	get: (postId: number) => Promise<Post | undefined>;
	getAllWithPagination: (limit: number, page: number) => Promise<Post[]>;
	getAll: () => Promise<Post[]>;
	getByUser: (userId: number) => Promise<Post[]>;
}
