import { UserRepository } from '@/src/modules/users/domain/UserRepository';
import { CommentRepository } from '@/src/modules/comments/domain/CommentRepository';
import { PostRepository } from '../../domain/PostRepository';
import { Post } from '../../domain/Post';
import { PostMapper } from '../mappers/PostMapper';

export function getPaginatedPosts(
	postRepository: PostRepository,
	userRepository: UserRepository,
	commentRepository: CommentRepository,
	postMapper: typeof PostMapper,
	limit: number,
	page: number,
): () => Promise<Post[]> {
	return async (): Promise<Post[]> => {
		const [posts, users, comments] = await Promise.all([
			postRepository.getAllWithPagination(limit, page),
			userRepository.getAll(),
			commentRepository.getAll(),
		]);

		const userMap = postMapper.createUserMap(users);
		const commentCountByPostId = postMapper.createCommentCountMap(comments);

		return await postMapper.addAuthorAndCommentCountToPosts(
			posts,
			userMap,
			commentCountByPostId,
		);
	};
}
