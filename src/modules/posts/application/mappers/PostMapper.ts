import { Post } from '@/modules/posts/domain/Post';
import { User } from '@/modules/users/domain/User';
import { Comment } from '@/modules/comments/domain/Comment';

export const PostMapper = {
    createUserMap,
    createCommentCountMap,
    addAuthorAndCommentCountToPosts,
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