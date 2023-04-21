import { useState, useEffect } from 'react';
import { Post } from '@/modules/posts/domain/Post';
import { PostRepository } from '@/modules/posts/domain/PostRepository';
import { UserRepository } from '@/modules/users/domain/UserRepository';
import { CommentRepository } from '@/modules/comments/domain/CommentRepository';
import { getPaginatedPosts } from '@/modules/posts/application/get-all/getPaginatedPosts';
import { PostMapper } from '@/modules/posts/application/mappers/PostMapper';
import { useLocalStorage } from '@/hooks/useLocalStorage';

export function usePagination(
	postRepository: PostRepository,
	userRepository: UserRepository,
	commentRepository: CommentRepository,
	initialPosts: Post[],
	initialPage: number,
	itemsPerPage: number,
): [Post[], number, (page: number) => void] {
	const [currentPosts, setCurrentPosts] = useState<Post[]>(initialPosts);
	const [currentPage, setCurrentPage] = useLocalStorage<number>(
		'currentPage',
		initialPage,
	);

	const fetchMorePosts = async () => {
		const fetchedPosts: Post[] = await getPaginatedPosts(
			postRepository,
			userRepository,
			commentRepository,
			PostMapper,
			itemsPerPage,
			currentPage,
		)();
		setCurrentPosts(fetchedPosts);
	};

	useEffect(() => {
		fetchMorePosts();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [currentPage]);

	return [currentPosts, currentPage, setCurrentPage];
}

export default usePagination;
