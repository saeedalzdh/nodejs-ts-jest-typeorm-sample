import { config } from './config';
import { postRepositoryImp } from './dao/repositories/posts-repository';
import { init } from './module';
import { socialMediaService } from './services';

describe('module', () => {
  describe('init', () => {
    it('should register and retrieve posts from social media service', async () => {
      const postsCounts = 3;
      const slToken = 'sl_token_123';
      const posts = [
        {
          from_name: 'John K',
          from_id: '123',
          message: 'This is a message K',
          type: 'message K',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane F',
          from_id: '456',
          message: 'This is another message F',
          type: 'message F',
          created_time: new Date().toString(),
        },
        {
          from_name: 'Jane B',
          from_id: '789',
          message: 'This is another message B',
          type: 'message B',
          created_time: new Date().toString(),
        },
      ];

      jest
        .spyOn(postRepositoryImp, 'getPostsCount')
        .mockResolvedValueOnce(postsCounts);
      jest.spyOn(socialMediaService, 'register').mockResolvedValueOnce(slToken);
      jest
        .spyOn(socialMediaService, 'retrieveAllPosts')
        .mockResolvedValueOnce(posts);
      jest.spyOn(postRepositoryImp, 'addPosts').mockResolvedValueOnce();

      await init();

      expect(postRepositoryImp.getPostsCount).toHaveBeenCalled();
      expect(socialMediaService.register).toHaveBeenCalledWith(
        config.registration.clientId,
        config.registration.clientName,
        config.registration.clientEmail,
      );
      expect(socialMediaService.retrieveAllPosts).toHaveBeenCalledWith(slToken);
      expect(postRepositoryImp.addPosts).toHaveBeenCalledWith(posts);
    });

    it('should not retrieve posts when the count is more than 1000', async () => {
      const postsCounts = 1001;

      jest
        .spyOn(postRepositoryImp, 'getPostsCount')
        .mockResolvedValueOnce(postsCounts);
      jest.spyOn(socialMediaService, 'register').mockResolvedValueOnce('');
      jest
        .spyOn(socialMediaService, 'retrieveAllPosts')
        .mockResolvedValueOnce([]);
      jest.spyOn(postRepositoryImp, 'addPosts').mockResolvedValueOnce();

      await init();

      expect(postRepositoryImp.getPostsCount).toHaveBeenCalled();
      expect(socialMediaService.register).not.toHaveBeenCalled();
      expect(socialMediaService.retrieveAllPosts).not.toHaveBeenCalled();
      expect(postRepositoryImp.addPosts).not.toHaveBeenCalled();
    });
  });
});
