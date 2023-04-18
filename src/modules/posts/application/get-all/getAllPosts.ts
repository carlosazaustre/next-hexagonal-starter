import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";
import { UserRepository } from "../../../users/domain/UserRepository";

export function getAllPosts(
  postRepository: PostRepository, 
  userRepository: UserRepository
) {
  return async (): Promise<Post[]> => {
    const posts = await postRepository.getAll();

    const postsWithAuthor = await Promise.all(
      posts.map(async (post) => {
        const user = await userRepository.get(post.userId);
        return {
          ...post,
          author: {
            id: user?.id,
            name: user?.name,
          },
        }
      })
    );

    return postsWithAuthor;
  };
}