import { User } from '@/src/modules/users/domain/User';

interface UserCardProps {
    user: User;
};

export function UserCard({ user }: UserCardProps): JSX.Element {
	return (
		<div className="card card-bordered w-96 bg-base-100 shadow-xl m-4">
			<div className="card-body">
				<h2 className="card-title">{user.name}</h2>
				<div className="card-actions justify-end">
					<div className="badge badge-primary">{user.website}</div>
					<div className="badge badge-secondary">{user.email}</div>
					<div className="badge badge-secondary">{user.phone}</div>
				</div>
			</div>
		</div>
	);
}
