import { Comment } from '@/src/modules/comments/domain/Comment';
import { CommentCard } from '@/src/sections/comments/CommentCard';

interface CommentsListProps {
    comments: Comment[];
}

export function CommentsList({ comments }: CommentsListProps): JSX.Element {
	return (
		<div className="container mx-auto">
			<h2 className="text-2xl font-bold mx-8 mt-8">Comments</h2>
			{comments.map((comment) => (
				<CommentCard key={comment.id} comment={comment} />
			))}
		</div>
	);
}
