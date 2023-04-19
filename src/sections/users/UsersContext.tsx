import React, { createContext, useContext, useEffect, useState } from "react";

import { User } from "../../modules/users/domain/User";
import { UserRepository } from "../../modules/users/domain/UserRepository";
import { getAllUsers } from "../../modules/users/application/get-all/getAllUsers";
import { getUser } from "../../modules/users/application/get/getUser";

interface ContextState {
  users: User[];
  currentUser: User | null;
  getUserById: (id: number) => Promise<void>;
}

export const UsersContext = createContext({} as ContextState);

interface UsersContextProps {
  children: React.ReactNode;
  repository: UserRepository;
}

export const UsersContextProvider = ({
  children,
  repository,
}: UsersContextProps): JSX.Element => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  async function getUserById(id: number) {
    const user = await getUser(repository)(id);
    debugger;
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
    <UsersContext.Provider value={{ users, currentUser, getUserById }}>
      {children}
    </UsersContext.Provider>
  );
};

export const useUsersContext = () => useContext(UsersContext);
