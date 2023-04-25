import { User } from '@/src/modules/users/domain/User';
import { UserCard } from './UserCard';

interface UserListProps {
  users: User[];
}

export function UsersList({ users }: UserListProps) {
	return (
		<>
			{users.map((user) => (
				<UserCard key={user.id} user={user} />
			))};
		</>
	);
}
