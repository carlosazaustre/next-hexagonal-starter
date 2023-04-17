import { useUsersContext } from "./UsersContext";

export function UsersList() {
  const { users } = useUsersContext();

  return (
    <>
      {users.map((user) => (
        <div key={user.id} className="card w-96 bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">{user.name}</h2>
            <div className="card-actions justify-end">
              <div className="badge badge-primary">{user.website}</div>
              <div className="badge badge-secondary">{user.email}</div>
              <div className="badge badge-secondary">{user.phone}</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
}