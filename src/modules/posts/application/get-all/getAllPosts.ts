import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";
import { Comment } from "@/modules/comments/domain/Comment";
import { User } from "@/modules/users/domain/User";
import { PostRepository } from "../../domain/PostRepository";
import { Post } from "../../domain/Post";

export function getAllPosts(
  postRepository: PostRepository,
  userRepository: UserRepository,
  commentRepository: CommentRepository,
) {
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

function createUserMap(users: User[]): Map<number, User> {
  const userMap = new Map<number, User>();

  for (const user of users) {
    userMap.set(user.id, user);
  }

  return userMap;
}

function createCommentCountMap(comments: Comment[]): Map<number, number> {
  const commentCountMap = new Map<number, number>();

  for (const comment of comments) {
    const count = commentCountMap.get(comment.postId) || 0;
    commentCountMap.set(comment.postId, count + 1);
  }

  return commentCountMap;
}


async function addAuthorAndCommentCountToPosts(
  posts: Post[],
  userMap: Map<number, User>,
  commentCountByPostId: Map<number, number>,
): Promise<Post[]> {
  const postsWithDetails = posts.map((post) => {
    const author = userMap.get(post.userId);

    return {
      ...post,
      author,
      commentCount: commentCountByPostId.get(post.id) || 0,
    }
  });

  return postsWithDetails;
};