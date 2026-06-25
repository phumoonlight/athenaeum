import { MigrationInterface, QueryRunner } from 'typeorm'

export class M1751630244177 implements MigrationInterface {
  name = 'M1751630244177'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "logs" ADD "test_name" text NOT NULL DEFAULT \'xxx\'')
    await queryRunner.query('ALTER TABLE "users" ADD "password" text NOT NULL')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "password"')
    await queryRunner.query('ALTER TABLE "logs" DROP COLUMN "test_name"')
  }

}
