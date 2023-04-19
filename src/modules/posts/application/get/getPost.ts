import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";
import { UserRepository } from "../../../users/domain/UserRepository";

export function getPost(
  postRepository: PostRepository,
  userRepository: UserRepository,
) {
  return async (postId: number): Promise<Post> => {
    const post = await postRepository.get(postId);

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const author = await userRepository.get(post?.userId);

    const postWithAuthor = {
      ...post,
      author: {
        id: author?.id,
        name: author?.name,
      },
    };

    return postWithAuthor;
  };
}
