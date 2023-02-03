// Types
export type Config = {
  env: string;
  app: {
    name: string;
    port: number;
  };
  db: {
    user: string;
    pass: string;
    name: string;
    port: number;
    host: string;
  };
  registration: {
    clientId: string;
    clientName: string;
    clientEmail: string;
  };
};

export type Post = {
  from_name: string;
  from_id: string;
  message: string;
  type: string;
  created_time: string;
};

// Services
export interface ISocialMediaService {
  register(clientId: string, email: string, name: string): Promise<string>;
  retrievePostsByPage(slToken: string, page: number): Promise<Post[]>;
  retrieveAllPosts(slToken: string): Promise<Post[]>;
}

// Repositories
export interface PostRepository {
  getPostsCount(): Promise<number>;
  addPosts(posts: Post[]): Promise<void>;
  getPostByPage(page: number): Promise<Post[]>;
  getAllPosts(): Promise<Post[]>;
}

// Domains
export type PostInsights = {
  postCount: number;
  medianCharPerPost: number;
  postCountByMonth: { [month: string]: number };
  longestPost: string;
};

export type PostInsightsByUser = {
  [userId: string]: Insights;
};

export interface IGetPostInsightsByUser {
  (posts: Post[]): PostInsightsByUser;
}
