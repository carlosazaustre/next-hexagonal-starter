import { usePostsContext } from "./PostsContext";
import { PostCard } from "./PostCard";

export function PostsList(): JSX.Element {
  const { posts } = usePostsContext();

  return (
    <div className="container mx-auto">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}