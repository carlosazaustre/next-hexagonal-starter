import { Comment } from '../../domain/Comment';
import { CommentRepository } from '../../domain/CommentRepository';

export function getAllCommentsByUser(commentRepository: CommentRepository) {
	return async (userId: number): Promise<Comment[]> => {
		return await commentRepository.getAllByUser(userId);
	};
}
