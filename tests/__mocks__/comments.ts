import { Comment } from '@/modules/comments/domain/Comment';

export const comments: Comment[] = [
    { id: 1, postId: 1, body: 'Comment 1', name: 'Comment 1', email: 'user1@mail.com' },
    { id: 2, postId: 1, body: 'Comment 2', name: 'Comment 2', email: 'user2@mail.com' },
    { id: 3, postId: 2, body: 'Comment 3', name: 'Comment 3', email: 'user3@mail.com' },
];
