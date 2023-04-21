import { Post } from '@/src/modules/posts/domain/Post';
import { Comment } from '@/src/modules/comments/domain/Comment';

import { PostMapper } from '@/src/modules/posts/application/mappers/PostMapper';
import { getAllPosts } from '@/src/modules/posts/application/get-all/getAllPosts';
import { getPostById } from '@/src/modules/posts/application/get/getPostById';
import { getAllCommentsByPost } from '@/src/modules/comments/application/get-all/getAllCommentsByPost';

import { createApiPostRepository } from '@/src/modules/posts/infra/ApiPostRepository';
import { createApiUserRepository } from '@/src/modules/users/infra/ApiUserRepository';
import { createApiCommentRepository } from '@/src/modules/comments/infra/ApiCommentRepository';

import { PostCard } from '@/src/sections/posts/PostCard';
import { CommentsList } from '@/src/sections/comments/CommentsList';

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();
const commentRepository = createApiCommentRepository();

type PostPageProps = {
  post: Post;
  comments: Comment[];
}

export default function PostPage({ post, comments }: PostPageProps): JSX.Element {
	return (
		<div>
			<PostCard post={post} />
			<CommentsList comments={comments} />
		</div>
	);
}

export async function getStaticPaths() {
	const posts = (await getAllPosts(
		postRepository,
		userRepository,
		commentRepository,
		PostMapper
	)()) as Post[];

	const paths = posts.map((post: Post) => ({
		params: {
			postId: post.id.toString(),
		},
	}));

	return {
		paths,
		fallback: false,
	};
}

export async function getStaticProps({
	params,
}: {
  params: {
    postId: string;
  };
}) {
	const { postId } = params;
	const post = (await getPostById(postRepository,userRepository, commentRepository)(parseInt(postId))) as Post;
	const comments = (await getAllCommentsByPost(commentRepository)(parseInt(postId))) as Comment[];

	return {
		props: {
			post,
			comments,
		},
	};
}
