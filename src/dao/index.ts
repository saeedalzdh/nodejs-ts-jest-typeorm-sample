import { join } from 'path';
import { DataSource } from 'typeorm';
import { config } from '../config';
import { PostEntity } from './entities/posts-entity';

export const db = new DataSource({
  type: 'postgres',
  host: config.db.host,
  port: config.db.port,
  username: config.db.user,
  password: config.db.pass,
  database: config.db.name,
  synchronize: config.env === 'test',
  logging: false,
  entities: [PostEntity],
  subscribers: [],
  migrations: [join(__dirname, 'migrations/**')],
});

export const connect = async (): Promise<void> => {
  await db.initialize();
  console.log('Database initialized');
};

export const disconnect = async (): Promise<void> => {
  await db.destroy();
  console.log('Database connection destroyed');
};
