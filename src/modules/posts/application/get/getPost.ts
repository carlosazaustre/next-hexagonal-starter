import { Post } from '../../domain/Post';
import { PostRepository } from '../../domain/PostRepository';

export function getPost(postRepository: PostRepository) {
  return async (postId: number): Promise<Post | null> => {
    return await postRepository.get(postId);
  };
}