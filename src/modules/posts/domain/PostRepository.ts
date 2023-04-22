import { Post } from './Post';
import { PostDataCreate } from './PostDataCreate';
import { PostDataResponse } from './PostDataResponse';

export interface PostRepository {
	create: (post: PostDataCreate) => Promise<PostDataResponse>;
	get: (postId: number) => Promise<Post | undefined>;
	getAllWithPagination: (limit: number, page: number) => Promise<Post[]>;
	getAll: () => Promise<Post[]>;
	getByUser: (userId: number) => Promise<Post[]>;
}
