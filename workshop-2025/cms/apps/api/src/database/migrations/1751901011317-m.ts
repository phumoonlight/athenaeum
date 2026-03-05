import { MigrationInterface, QueryRunner } from 'typeorm'

export class M1751901011317 implements MigrationInterface {
  name = 'M1751901011317'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "articles" ADD "desc" text')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "articles" DROP COLUMN "desc"')
  }

}
