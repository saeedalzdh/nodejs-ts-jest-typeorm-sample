import type { IGetPostInsightsByUser, Post } from '../types';

export const getPostInsightsByUser: IGetPostInsightsByUser = (
  posts: Post[],
) => {
  const userMap = new Map<
    string,
    {
      postCount: number;
      medianCharPerPost: number;
      postCountByMonth: { [month: string]: number };
      longestPost: string;
    }
  >();

  const postByUser = new Map();
  const characterByUser = new Map();
  const postsByMonthByUser = new Map();
  const longestPostByUser = new Map();

  posts.forEach((post) => {
    const userId = post.from_id;
    const message = post.message;

    // a. The number of posts each person made in total
    postByUser.set(userId, (postByUser.get(userId) || 0) + 1);

    // b. The median number of characters of their posts
    const characters = characterByUser.get(userId) || [];
    characters.push(message.length);
    characterByUser.set(userId, characters);

    // c. The number of posts each person made every month
    const month = post.created_time.substring(0, 7); // YYYY-MM
    const currentMonthPosts = postsByMonthByUser.get(userId) || new Map();
    currentMonthPosts.set(month, (currentMonthPosts.get(month) || 0) + 1);
    postsByMonthByUser.set(userId, currentMonthPosts);

    // d. Each person’s longest post.
    if (
      !longestPostByUser.has(userId) ||
      message.length > longestPostByUser.get(userId).length
    ) {
      longestPostByUser.set(userId, message);
    }
  });

  for (const [key, value] of postByUser.entries()) {
    userMap.set(key, {
      postCount: value,
      medianCharPerPost: getMedianLength(characterByUser.get(key)),
      postCountByMonth: Object.fromEntries(postsByMonthByUser.get(key)),
      longestPost: longestPostByUser.get(key),
    });
  }

  return Object.fromEntries(userMap);
};

const getMedianLength = (lengths: number[]): number => {
  lengths.sort((a: number, b: number) => a - b);
  const medianIndex: number = Math.floor(lengths.length / 2);

  const lengthsMedianIndex = lengths[medianIndex] || 0;
  const lengthsMedianIndexMinusOne = lengths[medianIndex - 1] || 0;

  return lengths.length % 2 === 0
    ? (lengthsMedianIndex + lengthsMedianIndexMinusOne) / 2
    : lengthsMedianIndex;
};
