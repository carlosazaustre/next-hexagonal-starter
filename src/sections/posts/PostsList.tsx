import { usePostsContext } from "./PostsContext";

export function PostsList(): JSX.Element {
  const { posts } = usePostsContext();

  return (
    <>
      {posts.map((post) => (
        <div key={post.id} className="card w-96 bg-base-100 shadow-xl m-4">
          <div className="card-body">
            <h2 className="card-title">{post.title}</h2>
            <p className="card-subtitle">{post.body}</p>
          </div>
        </div>
      ))}
    </>
  );
}