import { UserRepository } from '@/src/modules/users/domain/UserRepository';
import { CommentRepository } from '@/src/modules/comments/domain/CommentRepository';
import { PostRepository } from '../../domain/PostRepository';
import { Post } from '../../domain/Post';

export function getPostById(
	postRepository: PostRepository,
	userRepository: UserRepository,
	commentRepository: CommentRepository,
): (postId: number) => Promise<Post | undefined> {
	return async (postId: number): Promise<Post | undefined> => {
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
