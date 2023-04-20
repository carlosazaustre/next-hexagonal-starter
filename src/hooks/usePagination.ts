import { useState, useEffect } from 'react';
import { Post } from "@/modules/posts/domain/Post";
import { PostRepository } from "@/modules/posts/domain/PostRepository";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";
import { getAllPostsWithPagination } from "@/modules/posts/application/get-all/getAllPostsWithPagination";
import { useLocalStorage } from "@/hooks/useLocalStorage";

export function usePagination(
  postRepository: PostRepository,
  userRepository: UserRepository,
  commentRepository: CommentRepository,
  initialPosts: Post[],
  initialPage: number,
  itemsPerPage: number,
): [Post[], number, (page: number) => void] {
  const [currentPosts, setCurrentPosts] = useState<Post[]>(initialPosts);
  const [currentPage, setCurrentPage] = useLocalStorage<number>('currentPage', initialPage);

  const fetchMorePosts = async () => {
    const fetchedPosts: Post[] = await getAllPostsWithPagination(
      postRepository,
      userRepository,
      commentRepository,
      itemsPerPage,
      currentPage,
    )();
    setCurrentPosts(fetchedPosts);
  };

  useEffect(() => {
    fetchMorePosts();
  }, [currentPage]);

  return [currentPosts, currentPage, setCurrentPage];
}

export default usePagination;
