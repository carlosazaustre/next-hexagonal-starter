import { Comment } from '../domain/Comment';
import { CommentRepository } from '../domain/CommentRepository';

const JSONPLACEHOLDER_URL = 'https://jsonplaceholder.typicode.com';

export function createApiCommentRepository(): CommentRepository {
	return {
		get,
		getAll,
		getAllByPost,
		getAllByUser,
	};
}

async function get(commentId: number): Promise<Comment> {
	const response = await fetch(`${JSONPLACEHOLDER_URL}/comments/${commentId}`);
	const comment = (await response.json()) as Promise<Comment>;

	return comment;
}

async function getAll(): Promise<Comment[]> {
	const response = await fetch(`${JSONPLACEHOLDER_URL}/comments`);
	const comments = await response.json();

	return comments;
}

async function getAllByPost(postId: number) {
	const response = await fetch(
		`${JSONPLACEHOLDER_URL}/posts/${postId}/comments`,
	);
	const comments = await response.json();

	return comments;
}

async function getAllByUser(userId: number) {
	const response = await fetch(
		`${JSONPLACEHOLDER_URL}/users/${userId}/comments`,
	);
	const comments = await response.json();

	return comments;
}
