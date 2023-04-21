import { Comment } from '../../domain/Comment';
import { CommentRepository } from '../../domain/CommentRepository';

export function getAllComments(commentRepository: CommentRepository) {
	return async (): Promise<Comment[]> => {
		return await commentRepository.getAll();
	};
}
