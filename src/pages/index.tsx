import { Inter } from "next/font/google";
import { Post } from "@/modules/posts/domain/Post";
import { getAllPosts } from "@/modules/posts/application/get-all/getAllPosts";
import { createApiPostRepository } from "@/modules/posts/infra/ApiPostRepository";
import { createApiUserRepository } from "@/modules/users/infra/ApiUserRepository";
import { createApiCommentRepository } from "@/modules/comments/infra/ApiCommentRepository";
import { usePagination } from "@/hooks/usePagination";
import { PostsList } from "@/sections/posts/PostsList";

const inter = Inter({ subsets: ["latin"] });
const ITEMS_PER_PAGE = 5;
const INITIAL_PAGE = 1;

const postRepository = createApiPostRepository();
const userRepository = createApiUserRepository();
const commentRepository = createApiCommentRepository();

interface HomePageProps {
  posts: Post[];
  page?: number;
  limit?: number;
}

export default function HomePage({ posts, page = INITIAL_PAGE, limit = ITEMS_PER_PAGE }: HomePageProps): JSX.Element {
  const [currentPosts, currentPage, setCurrentPage] = usePagination(
    postRepository,
    userRepository,
    commentRepository,
    posts,
    page,
    limit,
  )

  return (
    <main className={inter.className}>
      <PostsList posts={currentPosts}/>
      <div className="mx-auto text-center">
        <div className="btn-group">
          <button
            className="btn btn-primary"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
            >
            Anterior
          </button>
          <button className="btn btn-primary btn-outline">{currentPage}</button>
          <button
            className="btn btn-primary"
            onClick={() => setCurrentPage(currentPage + 1)}
            >
            Siguiente
          </button>
        </div>
      </div>
    </main>
  );
}

export async function getStaticProps() {
  const page = INITIAL_PAGE;
  const limit = ITEMS_PER_PAGE;
  const posts = (await getAllPosts(
    postRepository,
    userRepository,
    commentRepository,
    limit,
    page,
  )()) as Post[];

  return {
    props: {
      posts,
      page,
      limit,
    },
  };
}
