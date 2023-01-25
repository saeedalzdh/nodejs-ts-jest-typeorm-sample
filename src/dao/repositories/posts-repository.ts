import { db } from '..';
import type { Post, PostRepository } from '../../types';
import { PostEntity } from '../entities/posts-entity';

export const postRepositoryImp: PostRepository = {
  getPostsCount: async () => {
    return await db.manager.count(PostEntity);
  },

  addPosts: async (posts: Post[]) => {
    const postEntities: PostEntity[] = posts.map((post) => {
      const postEntity = new PostEntity();
      postEntity.from_name = post.from_name;
      postEntity.from_id = post.from_id;
      postEntity.message = post.message;
      postEntity.type = post.type;
      postEntity.created_time = post.created_time;
      return postEntity;
    });

    await db.manager.save(postEntities);
  },
};
