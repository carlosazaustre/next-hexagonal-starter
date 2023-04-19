import Link from "next/link";
import { usePostsContext } from "./PostsContext";
import { PostCard } from "./PostCard";

export function PostsList(): JSX.Element {
  const { posts } = usePostsContext();

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <Link href={`/post/${post.id}`} key={post.id}>
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
}
