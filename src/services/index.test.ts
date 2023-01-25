import axios from 'axios';
import { socialMediaService } from '.';
import type { Post } from '../types';

jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe('socialMediaService', () => {
  const slToken = 'some_token';
  let page: number;
  let posts: Post[];

  describe('#register', () => {
    beforeEach(() => {
      mockedAxios.post.mockClear();
    });

    it('should make a POST request to the Supermetrics API', async () => {
      const expectedData = {
        client_id: 'Some client id',
        email: 'Saeed@example.com',
        name: 'Saeed',
      };

      const mockResponse = {
        data: {
          data: {
            sl_token: slToken,
            email: 'Saeed@example.com',
          },
        },
      };

      mockedAxios.post.mockResolvedValue(mockResponse);

      const result = await socialMediaService.register(
        'Some client id',
        'Saeed',
        'Saeed@example.com',
      );

      expect(mockedAxios.post).toHaveBeenCalledTimes(1);
      expect(mockedAxios.post).toHaveBeenCalledWith(
        'https://api.supermetrics.com/assignment/register',
        expectedData,
      );
      expect(result).toEqual('some_token');
    });

    it('should throw an error when the request fails', async () => {
      mockedAxios.post.mockRejectedValue('Request failed');

      await expect(
        socialMediaService.register(
          'some client id',
          'Saeed Alizadeh',
          'email@example.com',
        ),
      ).rejects.toThrow(
        'Unable to register the user on the social media platform.',
      );
    });
  });

  describe('#retrievePostsByPage', () => {
    beforeEach(() => {
      mockedAxios.post.mockClear();
      page = 1;
      posts = [
        {
          from_name: 'Ethelene Maggi',
          from_id: 'user_18',
          message:
            'disability division safety bottom final cheese beautiful view conservative wake full tenant resident correspond murder rare body respectable bathroom sacrifice ballot date noble museum computer surround find excavation room arch beautiful environmental attention danger due seem pioneer cage loud slab discrimination',
          type: 'status',
          created_time: '2023-01-23T07:51:53+00:00',
        },
        {
          from_name: 'Gigi Richter',
          from_id: 'user_7',
          message:
            'reconcile wisecrack trend rise gravel try constellation dream unaware museum knock pavement scholar debut desert church fund sanctuary landowner celebration prestige vessel stereotype abundant treasurer mirror berry invisible team still berry home dignity treaty hike loose sight civilian brick bow permission psychology plagiarize route flawed crude invisible interface flavor nuclear shop ethics jewel jealous veil rehabilitation grand definition fan embark major fly agreement bow speculate night chief product night rehabilitation television velvet expression definition biology company loud empire complication rank grow letter heavy sweet trick charm retiree belly food location tumour platform grimace habitat',
          type: 'status',
          created_time: '2023-01-23T03:33:21+00:00',
        },
      ];
    });

    it('should retrieve posts by page from the social media platform', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          meta: {
            request_id: 'QMNTiUk_a2M5eTNDXCNyztJKCgn8fG8u',
          },
          data: {
            page: 1,
            posts: posts,
          },
        },
      });

      const retrievedPosts = await socialMediaService.retrievePostsByPage(
        slToken,
        page,
      );

      expect(mockedAxios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(
        `https://api.supermetrics.com/assignment/posts?sl_token=${slToken}&page=${page}`,
      );
      expect(retrievedPosts).toEqual(posts);
    });

    it('should throw an error if posts could not be retrieved', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error(
          'Unable to retrieve post by page from the social media platform.',
        ),
      );

      await expect(
        socialMediaService.retrievePostsByPage(slToken, page),
      ).rejects.toThrow(
        'Unable to retrieve post by page from the social media platform.',
      );
    });
  });

  describe('#retrieveAllPosts', () => {
    beforeEach(() => {
      page = 1;
      posts = [
        {
          from_name: 'Ethelene Maggi',
          from_id: 'user_18',
          message:
            'disability division safety bottom final cheese beautiful view conservative wake full tenant resident correspond murder rare body respectable bathroom sacrifice ballot date noble museum computer surround find excavation room arch beautiful environmental attention danger due seem pioneer cage loud slab discrimination',
          type: 'status',
          created_time: '2023-01-23T07:51:53+00:00',
        },
        {
          from_name: 'Gigi Richter',
          from_id: 'user_7',
          message:
            'reconcile wisecrack trend rise gravel try constellation dream unaware museum knock pavement scholar debut desert church fund sanctuary landowner celebration prestige vessel stereotype abundant treasurer mirror berry invisible team still berry home dignity treaty hike loose sight civilian brick bow permission psychology plagiarize route flawed crude invisible interface flavor nuclear shop ethics jewel jealous veil rehabilitation grand definition fan embark major fly agreement bow speculate night chief product night rehabilitation television velvet expression definition biology company loud empire complication rank grow letter heavy sweet trick charm retiree belly food location tumour platform grimace habitat',
          type: 'status',
          created_time: '2023-01-23T03:33:21+00:00',
        },
      ];
    });

    it('should retrieve all posts from the social media platform', async () => {
      mockedAxios.get.mockResolvedValue({
        data: {
          meta: {
            request_id: 'QMNTiUk_a2M5eTNDXCNyztJKCgn8fG8u',
          },
          data: {
            page: 1,
            posts: posts,
          },
        },
      });

      const retrievedPosts = await socialMediaService.retrieveAllPosts(slToken);
      expect(retrievedPosts.length).toBe(20);
      expect(axios.get).toHaveBeenCalledTimes(10);
    });

    it('should throw an error if posts could not be retrieved', async () => {
      mockedAxios.get.mockRejectedValue(
        new Error('Unable to retrieve posts from the social media platform.'),
      );

      await expect(
        socialMediaService.retrieveAllPosts(slToken),
      ).rejects.toThrow(
        'Unable to retrieve posts from the social media platform.',
      );
    });
  });
});
