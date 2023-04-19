import { Post } from "../../domain/Post";
import { PostRepository } from "../../domain/PostRepository";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";

export function getPost(
  postRepository: PostRepository,
  userRepository: UserRepository,
  commentRepository: CommentRepository,
) {
  return async (postId: number): Promise<Post> => {
    const post = await postRepository.get(postId);

    if (!post) {
      throw new Error(`Post with id ${postId} not found`);
    }

    const [author, comments] = await Promise.all([
      userRepository.get(post.userId),
      commentRepository.getAllByPost(postId),
    ]);

    const postWithAuthorAndCommentCount = {
      ...post,
      author: {
        id: author?.id,
        name: author?.name,
      },
      commentCount: comments.length,
    };

    return postWithAuthorAndCommentCount;
  };
}
