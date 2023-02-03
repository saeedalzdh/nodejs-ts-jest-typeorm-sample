import { getPostInsightsByUser } from './insights';

describe('insights', () => {
  describe('#getPostInsightsByUser', () => {
    it('should return posts insights per user', () => {
      const posts = [
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: '2022-08-13T18:54:41+00:00',
        },
        {
          from_name: 'John Doe',
          from_id: '123',
          message: 'This is a message',
          type: 'message',
          created_time: '2022-09-13T18:54:41+00:00',
        },
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
        {
          from_name: 'Jane Doe',
          from_id: '456',
          message: 'This is another message',
          type: 'message',
          created_time: '2022-07-13T18:54:41+00:00',
        },
      ];

      const expectedResult = {
        '123': {
          postCount: 3,
          medianCharPerPost: 17,
          postCountByMonth: {
            '2022-08': 2,
            '2022-09': 1,
          },
          longestPost: 'This is a message',
        },
        '456': {
          postCount: 2,
          medianCharPerPost: 23,
          postCountByMonth: {
            '2022-07': 2,
          },
          longestPost: 'This is another message',
        },
      };

      expect(getPostInsightsByUser(posts)).toEqual(expectedResult);
    });
  });
});
