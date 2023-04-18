import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";
import { UserRepository } from "../../../users/domain/UserRepository";

export function getAllPosts(postRepository: PostRepository, userRepository: UserRepository) {
  return async (): Promise<Post[]> => {
    const posts = await postRepository.getAll();

    const postsWithAuthorName = await Promise.all(
      posts.map(async (post) => {
        const user = await userRepository.get(post.userId);
        return {
          ...post,
          author: user?.name,
        }
      })
    );

    return postsWithAuthorName;
  };
}