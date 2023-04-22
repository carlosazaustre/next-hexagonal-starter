import { Post } from "@/src/modules/posts/domain/Post";
import { PostDataResponse } from "@/src/modules/posts/domain/PostDataResponse";
import { PostDataCreate } from "@/src/modules/posts/domain/PostDataCreate";
import { createPost } from "@/src/modules/posts/application/create/createPost";
import { createApiPostRepository } from "@/src/modules/posts/infra/ApiPostRepository";
import { createApiUserRepository } from "@/src/modules/users/infra/ApiUserRepository";
import { posts, users } from "@/tests/fixtures/mockData.json";

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();

describe('[useCase] createPost', () => {
	test('should create a post and return it with author and comment count', async () => {
		const postData: PostDataCreate = {
			title: 'title',
			body: 'body',
			userId: 1,
		};
		const createdPost: PostDataResponse = {
			id: posts.length + 1,
			...postData,
		};

		jest.spyOn(postRepository, 'create').mockImplementation(() => Promise.resolve(createdPost));
		jest.spyOn(userRepository, 'get').mockImplementation(() => Promise.resolve(users[0]));

		const createNewPost = createPost(postRepository, userRepository);
		const result: Post = await createNewPost(postData);

		expect(result).toEqual({
			...createdPost,
			commentCount: 0,
			author: users[0],
		});
	});
});
