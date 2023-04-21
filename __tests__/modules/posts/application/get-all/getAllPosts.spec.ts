import { getAllPosts } from '@/src/modules/posts/application/get-all/getAllPosts';
import { createApiPostRepository } from '@/src/modules/posts/infra/ApiPostRepository';
import { createApiUserRepository } from '@/src/modules/users/infra/ApiUserRepository';
import { createApiCommentRepository } from '@/src/modules/comments/infra/ApiCommentRepository';
import { PostMapper } from '@/src/modules/posts/application/mappers/PostMapper';
import { posts, users, comments } from '@/tests/fixtures/mockData.json';

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();
const commentRepository = createApiCommentRepository();

describe('[useCase] getAllPosts', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('should return all posts with author and comment count', async () => {
		jest
			.spyOn(postRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(posts));
		jest
			.spyOn(userRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(users));
		jest
			.spyOn(commentRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(comments));

		const getPosts = getAllPosts(
			postRepository,
			userRepository,
			commentRepository,
			PostMapper,
		);
		const result = await getPosts();

		expect(result.length).toEqual(posts.length);
	});

	test('should return all posts with undefined authors and zero comment count if users and comments are empty', async () => {
		jest
			.spyOn(postRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(posts));
		jest
			.spyOn(userRepository, 'getAll')
			.mockImplementation(() => Promise.resolve([]));
		jest
			.spyOn(commentRepository, 'getAll')
			.mockImplementation(() => Promise.resolve([]));

		const getPosts = getAllPosts(
			postRepository,
			userRepository,
			commentRepository,
			PostMapper,
		);
		const result = await getPosts();

		expect(result.length).toEqual(posts.length);

		result.forEach((postWithDetails, index) => {
			const originalPost = posts[index];

			expect(postWithDetails).toEqual({
				...originalPost,
				author: undefined,
				commentCount: 0,
			});
		});
	});

	test('should return an empty array if there are no posts', async () => {
		jest
			.spyOn(postRepository, 'getAll')
			.mockImplementation(() => Promise.resolve([]));
		jest
			.spyOn(userRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(users));
		jest
			.spyOn(commentRepository, 'getAll')
			.mockImplementation(() => Promise.resolve(comments));

		const getPosts = getAllPosts(
			postRepository,
			userRepository,
			commentRepository,
			PostMapper,
		);
		const result = await getPosts();

		expect(result.length).toEqual(0);
	});
});
