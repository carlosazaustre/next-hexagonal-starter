import { Comment } from '@/src/modules/comments/domain/Comment';

interface CommentCardProps {
    comment: Comment;
}

export function CommentCard({ comment }: CommentCardProps): JSX.Element {
	return (
		<div
			key={comment.id}
			className="card w-100 bg-base-100 m-4"
		>
			<div className="card-body">
				<h2 className="card-title">{comment.name}</h2>
				<div className="card-actions justify-start">
					<div className="badge badge-ghost">Write by {comment.email}</div>
				</div>
				<p className="card-subtitle">{comment.body}</p>
			</div>
		</div>

	);
}
