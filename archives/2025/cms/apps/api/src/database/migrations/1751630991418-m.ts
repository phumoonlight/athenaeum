import { MigrationInterface, QueryRunner } from 'typeorm'

export class M1751630991418 implements MigrationInterface {
  name = 'M1751630991418'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "articles" ("id" SERIAL NOT NULL, "title" text NOT NULL, "content" text NOT NULL, CONSTRAINT "PK_0a6e2c450d83e0b6052c2793334" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "articles"')
  }

}
