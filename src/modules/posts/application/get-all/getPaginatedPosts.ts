import { PostRepository } from "../../domain/PostRepository";
import { UserRepository } from "@/modules/users/domain/UserRepository";
import { CommentRepository } from "@/modules/comments/domain/CommentRepository";
import { Post } from "../../domain/Post";
import {
    createUserMap,
    createCommentCountMap,
    addAuthorAndCommentCountToPosts,
} from "./utils";

export function getPaginatedPosts(
    postRepository: PostRepository,
    userRepository: UserRepository,
    commentRepository: CommentRepository,
    limit: number,
    page: number,
): () => Promise<Post[]> {
    return async (): Promise<Post[]> => {
        const [posts, users, comments] = await Promise.all([
            postRepository.getAllWithPagination(limit, page),
            userRepository.getAll(),
            commentRepository.getAll(),
        ]);

        const userMap = createUserMap(users);
        const commentCountByPostId = createCommentCountMap(comments);

        return await addAuthorAndCommentCountToPosts(posts, userMap, commentCountByPostId);
    };
}