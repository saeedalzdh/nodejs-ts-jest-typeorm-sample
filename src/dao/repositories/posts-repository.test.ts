import { db, connect, disconnect } from '../index';
import { tableNames } from '../entities';
import { PostEntity } from '../entities/posts-entity';
import { postRepositoryImp } from './posts-repository';
import type { Post } from '../../types';

describe('postRepositoryImp', () => {
  beforeAll(() => connect());
  afterAll(() => disconnect());
  beforeEach(() => db.query(`delete from ${tableNames.posts}`));

  describe('#getPostsCount', () => {
    it('should return count of posts', async () => {
      const posts = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: new Date().toString(),
        },
      ];

      const postEntities = posts.map((post) => {
        const entity = new PostEntity();

        entity.from_name = post.from_name;
        entity.from_id = post.from_id;
        entity.message = post.message;
        entity.type = post.type;
        entity.created_time = post.created_time;

        return entity;
      });

      await db.manager.save(postEntities);

      const count = await postRepositoryImp.getPostsCount();
      expect(count).toBe(2);
    });
  });

  describe('#addPosts', () => {
    it('should add posts', async () => {
      const posts: Post[] = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: new Date().toString(),
        },
      ];

      await postRepositoryImp.addPosts(posts);

      const postEntities = await db.manager.find(PostEntity);
      expect(postEntities).toHaveLength(2);
    });
  });

  describe('#getPostByPage', () => {
    it('should return the post', async () => {
      const page = 1;
      const posts = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: new Date().toString(),
        },
      ];

      const postEntities = posts.map((post) => {
        const entity = new PostEntity();

        entity.from_name = post.from_name;
        entity.from_id = post.from_id;
        entity.message = post.message;
        entity.type = post.type;
        entity.created_time = post.created_time;

        return entity;
      });

      await db.manager.save(postEntities);

      const result = await postRepositoryImp.getPostByPage(page);

      expect(result).toEqual(postEntities);
      expect(result.length).toEqual(2);
    });
  });

  describe('#getAllPosts', () => {
    it('should return all posts from the database', async () => {
      const posts = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: new Date().toString(),
        },
      ];

      const postEntities = posts.map((post) => {
        const entity = new PostEntity();

        entity.from_name = post.from_name;
        entity.from_id = post.from_id;
        entity.message = post.message;
        entity.type = post.type;
        entity.created_time = post.created_time;

        return entity;
      });

      await db.manager.save(postEntities);

      const result = await postRepositoryImp.getAllPosts();
      expect(result).toEqual(postEntities);
      expect(result.length).toEqual(2);
    });
  });
});
