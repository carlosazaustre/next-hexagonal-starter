import { Post } from '@/src/modules/posts/domain/Post';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps): JSX.Element {
	return (
		<div
			key={post.id}
			className="card card-bordered w-100 bg-base-100 shadow-xl m-4"
		>
			<div className="card-body">
				<h2 className="card-title">{post.title}</h2>
				<p className="card-subtitle">{post.body}</p>
				<div className="card-actions justify-end">
					<div className="badge badge-primary">{post.author?.name}</div>
					<div className="badge badge-outline">{post.commentCount} comments</div>
				</div>
			</div>
		</div>
	);
}
