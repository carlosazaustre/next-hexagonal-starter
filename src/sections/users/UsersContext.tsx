import React, { createContext, useContext, useEffect, useState } from 'react';

import { User } from '../../modules/users/domain/User';
import { UserRepository } from '../../modules/users/domain/UserRepository';
import { getAllUsers } from '../../modules/users/application/get-all/getAllUsers';
import { getUser } from '../../modules/users/application/get/getUser';

interface ContextState {
  users: User[];
  getUserById: (id: number) => Promise<void>;
}

export const UsersContext = createContext({} as ContextState);

export const UsersContextProvider = ({
  children,
  repository,
}: React.PropsWithChildren<{ repository: UserRepository }>) => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function getUserById(id: number) {
    const user = await getUser(repository)(id);
    setCurrentUser(user);
  }

  async function getUsers() {
    const users = await getAllUsers(repository)();
    setUsers(users);
  }

  useEffect(() => {
    getUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <UsersContext.Provider value={{ users, getUserById }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);