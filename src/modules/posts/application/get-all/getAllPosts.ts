import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";

export function getAllPosts(postRepository: PostRepository) {
  return async (): Promise<Post[]> => {
    return await postRepository.getAll();
  };
}