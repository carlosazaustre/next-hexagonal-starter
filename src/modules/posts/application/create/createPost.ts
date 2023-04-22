import { UserRepository } from "@/src/modules/users/domain/UserRepository";
import { PostRepository } from "../../domain/PostRepository";
import { Post } from "../../domain/Post";
import { PostDataCreate } from "../../domain/PostDataCreate";
import { PostDataResponse } from "../../domain/PostDataResponse";

export function createPost(
	postRepository: PostRepository,
	userRepository: UserRepository,
): (post: PostDataCreate) => Promise<Post> {
	return async (post: PostDataCreate): Promise<Post> => {
		const createdPost = await postRepository.create(post) as PostDataResponse;
		const commentCount = 0;
		const author = await userRepository.get(post.userId);

		//TODO: ensurePostIsValid

		return {
			...createdPost,
			author,
			commentCount,
		};
	};
}

