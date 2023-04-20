import { describe, it, expect } from 'vitest';

import { PostMapper } from "@/modules/posts/application/mappers/PostMapper";
import { comments } from "../../../../__mocks__/comments";
import { posts } from "../../../../__mocks__/posts";
import { users } from "../../../../__mocks__/users";

describe('PostMapper', () => {
  describe('createUserMap', () => {
    it('should create a user map from users', () => {
      const userMap = PostMapper.createUserMap(users);
      expect(userMap.size).toEqual(users.length);
      expect(userMap.get(1)).toEqual(users[0]);
      expect(userMap.get(2)).toEqual(users[1]);
    });

    it('should handle an empty user list', () => {
      const userMap = PostMapper.createUserMap([]);
      expect(userMap.size).toEqual(0);
    });
  });

  describe('createCommentCountMap', () => {
    it('should create a comment count map from comments', () => {
      const commentCountMap = PostMapper.createCommentCountMap(comments);
      expect(commentCountMap.size).toEqual(2);
      expect(commentCountMap.get(1)).toEqual(2);
      expect(commentCountMap.get(2)).toEqual(1);
    });

    it('should handle an empty comment list', () => {
      const commentCountMap = PostMapper.createCommentCountMap([]);
      expect(commentCountMap.size).toEqual(0);
    });
  });

  describe('addAuthorAndCommentCountToPosts', () => {
    it('should add author and comment count to posts', async () => {
      const userMap = PostMapper.createUserMap(users);
      const commentCountMap = PostMapper.createCommentCountMap(comments);
      const postsWithDetails = await PostMapper.addAuthorAndCommentCountToPosts(posts, userMap, commentCountMap);

      expect(postsWithDetails.length).toEqual(posts.length);
      expect(postsWithDetails[0]).toEqual({ ...posts[0], author: users[0], commentCount: 2 });
      expect(postsWithDetails[1]).toEqual({ ...posts[1], author: users[1], commentCount: 1 });
    });

    it('should handle an empty post list', async () => {
      const userMap = PostMapper.createUserMap(users);
      const commentCountMap = PostMapper.createCommentCountMap(comments);
      const postsWithDetails = await PostMapper.addAuthorAndCommentCountToPosts([], userMap, commentCountMap);
      expect(postsWithDetails.length).toEqual(0);
    });

    it('should handle posts with missing authors', async () => {
      const userMap = PostMapper.createUserMap(users.slice(1)); // Excluye al primer usuario
      const commentCountMap = PostMapper.createCommentCountMap(comments);
      const postsWithDetails = await PostMapper.addAuthorAndCommentCountToPosts(posts, userMap, commentCountMap);
      expect(postsWithDetails.length).toEqual(posts.length);
      expect(postsWithDetails[0]).toEqual({ ...posts[0], author: undefined, commentCount: 2 });
      expect(postsWithDetails[1]).toEqual({ ...posts[1], author: users[1], commentCount: 1 });
    });

    it('should handle posts with no associated comments', async () => {
      const userMap = PostMapper.createUserMap(users);
      const commentCountMap = PostMapper.createCommentCountMap([]);
      const postsWithDetails = await PostMapper.addAuthorAndCommentCountToPosts(posts, userMap, commentCountMap);
      expect(postsWithDetails.length).toEqual(posts.length);
      expect(postsWithDetails[0]).toEqual({ ...posts[0], author: users[0], commentCount: 0 });
      expect(postsWithDetails[1]).toEqual({ ...posts[1], author: users[1], commentCount: 0 });
    });
  });
});
