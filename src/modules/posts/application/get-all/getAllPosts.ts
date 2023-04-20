import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";
import { PostRepository } from "../../domain/PostRepository";
import { Post } from "../../domain/Post";

import {
  createUserMap,
  createCommentCountMap,
  addAuthorAndCommentCountToPosts
} from "./utils";

export function getAllPosts(
  postRepository: PostRepository,
  userRepository: UserRepository,
  commentRepository: CommentRepository,
): () => Promise<Post[]> {
  return async (): Promise<Post[]> => {
    const [posts, users, comments] = await Promise.all([
      postRepository.getAll(),
      userRepository.getAll(),
      commentRepository.getAll(),
    ]);

    const userMap = createUserMap(users);
    const commentCountByPostId = createCommentCountMap(comments);

    return await addAuthorAndCommentCountToPosts(posts, userMap, commentCountByPostId);
  };
}