import type { MigrationInterface, QueryRunner } from 'typeorm';

export class posts1674647605333 implements MigrationInterface {
  name = 'posts1674647605333';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "posts" (
        "id" uuid NOT NULL DEFAULT uuid_generate_v4(),
        "from_name" varchar NOT NULL,
        "from_id" varchar NOT NULL,
        "message" varchar NOT NULL,
        "type" varchar NOT NULL,
        "created_time" varchar NOT NULL,
        PRIMARY KEY ("id")
      )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "posts"`);
  }
}
