import { config } from './config';
import { postRepositoryImp } from './dao/repositories/posts-repository';
import { socialMediaService } from './services';
import type { Post } from './types';

// this logic does not support retry strategy and a job to retrieve new posts.

export const init = async (): Promise<void> => {
  // check db if the posts exists
  console.log('Sync posts with social media platform ...');
  const postsCounts = await postRepositoryImp.getPostsCount();

  if (postsCounts < 1000) {
    console.log(
      'Posts are not available locally, try to retrieve sl token ...',
    );
    // get sl_token
    const slToken = await socialMediaService.register(
      config.registration.clientId,
      config.registration.clientName,
      config.registration.clientEmail,
    );

    console.log('Try to retrieve posts by sl token ...');
    // retrieve all posts
    const posts: Post[] = await socialMediaService.retrieveAllPosts(slToken);

    if (posts.length) {
      console.log('Persist posts in storage ...');
      // persist in db
      await postRepositoryImp.addPosts(posts);
    }
  }
};
