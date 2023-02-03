import axios from 'axios';
import type { ISocialMediaService, Post } from '../types';

export const socialMediaService: ISocialMediaService = {
  register: async (clientId, name, email) => {
    try {
      const data = {
        client_id: clientId,
        email,
        name,
      };

      const response = await axios.post(
        'https://api.supermetrics.com/assignment/register',
        data,
      );

      return response.data.data.sl_token;
    } catch (error) {
      throw new Error(
        'Unable to register the user on the social media platform.',
      );
    }
  },

  retrievePostsByPage: async (slToken: string, page: number) => {
    try {
      const response = await axios.get(
        `https://api.supermetrics.com/assignment/posts?sl_token=${slToken}&page=${page}`,
      );

      return response.data.data.posts;
    } catch (error) {
      throw new Error(
        'Unable to retrieve post by page from the social media platform.',
      );
    }
  },

  retrieveAllPosts: async (slToken: string) => {
    try {
      let allPosts: Post[] = [];

      const pages = Array.from({ length: 10 }, (_v, k) => k + 1);
      const promises = pages.map((page) =>
        socialMediaService.retrievePostsByPage(slToken, page),
      );

      const posts = await Promise.all(promises);
      allPosts = allPosts.concat(...posts);

      return allPosts;
    } catch (error) {
      throw new Error(
        'Unable to retrieve posts from the social media platform.',
      );
    }
  },
};
