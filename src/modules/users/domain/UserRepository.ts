import { User } from "./User";

export interface UserRepository {
  get: (id: number) => Promise<User | null>;
  getAll: () => Promise<User[]>;
}
