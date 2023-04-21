import Link from 'next/link';
import { Post } from '@/src/modules/posts/domain/Post';
import { PostCard } from './PostCard';

interface PostListProps {
  posts: Post[];
}

export function PostsList({ posts }: PostListProps): JSX.Element {

	return (
		<div className="container mx-auto">
			{posts.map((post) => (
				<Link href={`/post/${post.id}`} key={post.id}>
					<PostCard post={post} />
				</Link>
			))}
		</div>
	);
}
