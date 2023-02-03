import request from 'supertest';
import type { Express } from 'express';
import { connect, db, disconnect } from '../src/dao';
import { createHttpServer } from '../src/server';
import { tableNames } from '../src/dao/entities';
import { PostEntity } from '../src/dao/entities/posts-entity';

describe('api', () => {
  let app: Express;

  beforeAll(async () => {
    await connect();

    await db.query(
      Object.entries(tableNames)
        .map(([, tableName]) => `delete from ${tableName};`)
        .join(''),
    );

    app = createHttpServer();
  });

  afterAll(() => disconnect());

  beforeEach(() => db.query(`delete from ${tableNames.posts}`));

  describe('GET /posts', () => {
    it('should return 200 with posts if succeeded', async () => {
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

      const response = await request(app).get(`/posts?page=${page}`);

      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveProperty('posts');
      expect(response.body.data.posts.length).toEqual(2);
      expect(response.body.data.posts).toEqual(
        expect.arrayContaining([
          expect.objectContaining(posts[0]),
          expect.objectContaining(posts[1]),
        ]),
      );
    });

    it('should return 400 error when query validation fails', async () => {
      const response = await request(app).get(`/posts`);

      expect(response.status).toEqual(400);
    });
  });

  describe('GET /insights', () => {
    it('should return 200 with insights if succeeded', async () => {
      const posts = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: '2022-08-13T18:54:41+00:00',
        },
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: '2022-07-13T18:54:41+00:00',
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

      const response = await request(app).get(`/insights`);

      const expectedResult = {
        '123': {
          postCount: 1,
          medianCharPerPost: 17,
          postCountByMonth: {
            '2022-08': 1,
          },
          longestPost: 'This is a message',
        },
        '456': {
          postCount: 1,
          medianCharPerPost: 23,
          postCountByMonth: {
            '2022-07': 1,
          },
          longestPost: 'This is another message',
        },
      };

      expect(response.status).toEqual(200);
      expect(response.body.data).toHaveProperty('insights');
      expect(response.body.data.insights).toEqual(expectedResult);
    });
  });
});
