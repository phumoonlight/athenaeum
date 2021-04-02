import { MigrationInterface, QueryRunner } from 'typeorm'

export class User1617343148447 implements MigrationInterface {
  name = 'User1617343148447'

  async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "training_users" (
        "id" uniqueidentifier NOT NULL CONSTRAINT "DF_99ad5c36f7ff4873d51ff4a5e41" DEFAULT NEWSEQUENTIALID(),
        "first_name" nvarchar(255) NOT NULL, 
        "last_name" nvarchar(255) NOT NULL,
        "age" tinyint NOT NULL, 
        CONSTRAINT "PK_99ad5c36f7ff4873d51ff4a5e41" PRIMARY KEY ("id")
      )`
    )
  }

  async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "training_users"`)
  }
}
