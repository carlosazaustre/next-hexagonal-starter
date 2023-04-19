import { Post } from '@/modules/posts/domain/Post';
import { PostRepository } from '@/modules/posts/domain/PostRepository';
import { UserRepository } from '@/modules/users/domain/UserRepository';
import { createApiPostRepository} from '@/modules/posts/infra/ApiPostRepository';
import { createApiUserRepository } from '@/modules/users/infra/ApiUserRepository';
import { getAllPosts } from '@/modules/posts/application/get-all/getAllPosts';
import { getPost } from '@/modules/posts/application/get/getPost';

import { PostCard } from '@/sections/posts/PostCard';

const postRepository = createApiPostRepository() as PostRepository;
const userRepository = createApiUserRepository() as UserRepository;

export async function getStaticPaths() {
  const posts = await getAllPosts(postRepository, userRepository)() as Post[];
  const paths = posts.map((post: Post) => ({
    params: {
      postId: post.id.toString()
    },
  }));

  return {
    paths,
    fallback: false
  };
}

export async function getStaticProps({
  params
}: {
  params: { postId: string };
}) {
  const { postId } = params;
  const post = await getPost(postRepository, userRepository)(parseInt(postId)) as Post;

  return {
    props: {
      post,
    }
  };
}

export default function PostPage({ post }: { post: Post }) {
  return (
    <div>
      <PostCard post={post} />
    </div>
  )
}