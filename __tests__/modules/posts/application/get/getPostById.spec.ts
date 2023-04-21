import { getPostById } from '@/src/modules/posts/application/get/getPostById';
import { createApiPostRepository } from '@/src/modules/posts/infra/ApiPostRepository';
import { createApiUserRepository } from '@/src/modules/users/infra/ApiUserRepository';
import { createApiCommentRepository } from '@/src/modules/comments/infra/ApiCommentRepository';
import { posts, users, comments } from '@/tests/fixtures/mockData.json';

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();
const commentRepository = createApiCommentRepository();

describe('[useCase] getPostById', () => {
	afterEach(() => {
		jest.restoreAllMocks();
	});

	test('should throw an error if post not found', async () => {
		jest
			.spyOn(postRepository, 'get')
			.mockImplementation(() => Promise.resolve(undefined));
		jest
			.spyOn(userRepository, 'get')
			.mockImplementation(() => Promise.resolve(undefined));
		jest
			.spyOn(commentRepository, 'getAllByPost')
			.mockImplementation(() => Promise.resolve([]));

		const postId = 999;
		const getPost = getPostById(
			postRepository,
			userRepository,
			commentRepository,
		);

		await expect(getPost(postId)).rejects.toThrow(
			`Post with id ${postId} not found`,
		);
	});

	test('should return a post with author and comment count when post and author exist', async () => {
		jest
			.spyOn(postRepository, 'get')
			.mockImplementation(() => Promise.resolve(posts[0]));
		jest
			.spyOn(userRepository, 'get')
			.mockImplementation(() => Promise.resolve(users[0]));
		jest
			.spyOn(commentRepository, 'getAllByPost')
			.mockImplementation(() =>
				Promise.resolve(
					comments.filter(comment => comment.postId === posts[0].id),
				),
			);

		const postId = 1;
		const getPost = getPostById(
			postRepository,
			userRepository,
			commentRepository,
		);
		const result = await getPost(postId);

		expect(result).toEqual({
			...posts[0],
			author: {
				id: users[0].id,
				name: users[0].name,
			},
			commentCount: comments.filter(comment => comment.postId === postId)
				.length,
		});
	});

	test('should return a post with undefined author and comment count when post exists but author does not', async () => {
		jest
			.spyOn(postRepository, 'get')
			.mockImplementation(() => Promise.resolve(posts[0]));
		jest
			.spyOn(userRepository, 'get')
			.mockImplementation(() => Promise.resolve(undefined));
		jest
			.spyOn(commentRepository, 'getAllByPost')
			.mockImplementation(() =>
				Promise.resolve(
					comments.filter(comment => comment.postId === posts[0].id),
				),
			);

		const postId = 1;
		const getPost = getPostById(
			postRepository,
			userRepository,
			commentRepository,
		);
		const result = await getPost(postId);

		expect(result).toEqual({
			...posts[0],
			author: {
				id: undefined,
				name: undefined,
			},
			commentCount: comments.filter(comment => comment.postId === postId)
				.length,
		});
	});
});
