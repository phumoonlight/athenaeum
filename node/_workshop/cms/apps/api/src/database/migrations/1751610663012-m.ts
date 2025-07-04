import { MigrationInterface, QueryRunner } from 'typeorm'

export class M1751610663012 implements MigrationInterface {
  name = 'M1751610663012'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('CREATE TABLE "users" ("id" SERIAL NOT NULL, "username" text NOT NULL, CONSTRAINT "UQ_fe0bb3f6520ee0469504521e710" UNIQUE ("username"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))')
    await queryRunner.query('CREATE TABLE "logs" ("id" SERIAL NOT NULL, "api" text NOT NULL, CONSTRAINT "PK_fb1b805f2f7795de79fa69340ba" PRIMARY KEY ("id"))')
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP TABLE "logs"')
    await queryRunner.query('DROP TABLE "users"')
  }

}
