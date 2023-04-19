import { Post } from "@/modules/posts/domain/Post";
import { Comment } from "@/modules/comments/domain/Comment";
import { PostRepository } from "@/modules/posts/domain/PostRepository";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";

import { getAllPosts } from "@/modules/posts/application/get-all/getAllPosts";
import { getPost } from "@/modules/posts/application/get/getPost";
import { getAllCommentsByPost } from "@/modules/comments/application/get-all/getAllCommentsByPost";

import { createApiPostRepository } from "@/modules/posts/infra/ApiPostRepository";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { createApiCommentRepository } from "@/modules/comments/infra/ApiCommentRepository";

import { PostCard } from "@/sections/posts/PostCard";
import { CommentsList } from "@/sections/comments/CommentsList";

const postRepository = createApiPostRepository() as PostRepository;
const userRepository = createApiUserRepository() as UserRepository;
const commentRepository = createApiCommentRepository() as CommentRepository;

interface PostPageProps {
  post: Post;
  comments: Comment[];
}

export default function PostPage({ post, comments }: PostPageProps): JSX.Element {
  return (
    <div>
      <PostCard post={post} />
      <CommentsList comments={comments} />
    </div>
  );
}

export async function getStaticPaths() {
  const posts = (await getAllPosts(postRepository, userRepository)()) as Post[];
  const paths = posts.map((post: Post) => ({
    params: {
      postId: post.id.toString(),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
}: {
  params: {
    postId: string;
  };
}) {
  const { postId } = params;
  const post = (await getPost(postRepository,userRepository)(parseInt(postId))) as Post;
  const comments = (await getAllCommentsByPost(commentRepository)(parseInt(postId))) as Comment[];

  return {
    props: {
      post,
      comments,
    },
  };
}
