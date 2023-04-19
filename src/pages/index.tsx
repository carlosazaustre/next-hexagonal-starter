// import Image from 'next/image'
import { Inter } from "next/font/google";
import { PostRepository } from "@/modules/posts/domain/PostRepository";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";
import { getAllPosts } from "@/modules/posts/application/get-all/getAllPosts";
import { createApiPostRepository } from "@/modules/posts/infra/ApiPostRepository";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { createApiCommentRepository } from "@/modules/comments/infra/ApiCommentRepository";
import { Post } from "@/modules/posts/domain/Post";
import { PostsList } from "@/sections/posts/PostsList";

const inter = Inter({ subsets: ["latin"] });

const postRepository = createApiPostRepository() as PostRepository;
const userRepository = createApiUserRepository() as UserRepository;
const commentRepository = createApiCommentRepository() as CommentRepository;

interface HomePageProps {
  posts: Post[];
}

export default function HomePage({ posts }: HomePageProps): JSX.Element {
  return (
    <main className={inter.className}>
      <PostsList posts={posts}/>
    </main>
  );
}

export async function getStaticProps() {
  const posts = (await getAllPosts(postRepository, userRepository, commentRepository)()) as Post[];

  return {
    props: {
      posts,
    },
  };
}
