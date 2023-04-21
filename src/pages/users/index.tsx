import { User } from '@/src/modules/users/domain/User';
import { UserRepository } from '@/src/modules/users/domain/UserRepository';
import { createApiUserRepository } from '@/src/modules/users/infra/ApiUserRepository';
import { getAllUsers } from '@/src/modules/users/application/get-all/getAllUsers';
import { UsersList } from '@/src/sections/users/UsersList';

interface UsersPageProps {
  users: User[];
}

export default function UsersPage({ users }: UsersPageProps): JSX.Element {
	return (
		<main>
			<UsersList users={users} />
		</main>
	);
}

export async function getStaticProps() {
	const userRepository = createApiUserRepository() as UserRepository;
	const users = await getAllUsers(userRepository)();

	return {
		props: {
			users,
		},
	};
}
