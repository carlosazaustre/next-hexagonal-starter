import { Comment } from '../../domain/Comment';
import { CommentRepository } from '../../domain/CommentRepository';

export function getComment(commentRepository: CommentRepository) {
  return async (id: number): Promise<Comment> => {
    return await commentRepository.get(id);
  };
}