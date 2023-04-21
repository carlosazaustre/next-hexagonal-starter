import { Comment } from '../../domain/Comment';
import { CommentRepository } from '../../domain/CommentRepository';

export function getCommentById(commentRepository: CommentRepository) {
	return async (id: number): Promise<Comment | undefined> => {
		return await commentRepository.get(id);
	};
}
