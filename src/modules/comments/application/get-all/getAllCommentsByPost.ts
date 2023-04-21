import { Comment } from '../../domain/Comment';
import { CommentRepository } from '../../domain/CommentRepository';

export function getAllCommentsByPost(commentRepository: CommentRepository) {
	return async (postId: number): Promise<Comment[]> => {
		return await commentRepository.getAllByPost(postId);
	};
}
