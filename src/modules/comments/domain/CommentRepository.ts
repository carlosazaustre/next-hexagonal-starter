import { Comment } from './Comment';

export interface CommentRepository {
	getAllByPost: (postId: number) => Promise<Comment[]>;
	getAllByUser: (userId: number) => Promise<Comment[]>;
	getAll: () => Promise<Comment[]>;
	get: (commentId: number) => Promise<Comment | undefined>;
}
