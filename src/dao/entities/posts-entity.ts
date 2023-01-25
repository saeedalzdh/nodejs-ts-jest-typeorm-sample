import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { tableNames } from '.';

@Entity({ name: tableNames.posts })
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  from_name: string;

  @Column()
  from_id: string;

  @Column()
  message: string;

  @Column()
  type: string;

  @Column()
  created_time: string;
}
