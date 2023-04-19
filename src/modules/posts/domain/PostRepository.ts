import { Post } from "./Post";

export interface PostRepository {
  get: (postId: number) => Promise<Post | null>;
  getAll: () => Promise<Post[]>;
  getByUser: (userId: number) => Promise<Post[]>;
}
