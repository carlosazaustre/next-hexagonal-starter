import React, { createContext, useContext, useEffect, useState } from "react";

import { Post } from "../../modules/posts/domain/Post";
import { PostRepository } from "../../modules/posts/domain/PostRepository";
import { UserRepository } from "../../modules/users/domain/UserRepository";
import { getPost } from "../../modules/posts/application/get/getPost";
import { getAllPosts } from "../../modules/posts/application/get-all/getAllPosts";
import { getAllPostsByUser } from "../../modules/posts/application/get-all/getAllPostsByUser";

interface ContextState {
  posts: Post[];
  currentPost: Post | null;
  getPostById: (id: number) => Promise<void>;
  getPostsByUser: (userId: number) => Promise<void>;
}

export const PostsContext = createContext({} as ContextState);

interface PostsContextProps {
  children: React.ReactNode;
  postRepository: PostRepository;
  userRepository: UserRepository;
}

export const PostsContextProvider = ({
  children,
  postRepository,
  userRepository
}: PostsContextProps): JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentPost, setCurrentPost] = useState<Post | null>(null);

  async function getPostById(id: number) {
    const post = await getPost(postRepository, userRepository)(id);
    setCurrentPost(post);
  }

  async function getPosts() {
    const posts = await getAllPosts(postRepository, userRepository)();
    setPosts(posts);
  }

  async function getPostsByUser(userId: number) {
    const posts = await getAllPostsByUser(postRepository)(userId);
    setPosts(posts);
  }

  useEffect(() => {
    getPosts();
  },[]);

  return (
    <PostsContext.Provider value={{ posts, currentPost, getPostById, getPostsByUser }}>
      {children}
    </PostsContext.Provider>
  );
};

export const usePostsContext = () => useContext(PostsContext);