import {MigrationInterface, QueryRunner} from "typeorm";

export class RoleToInteger1657742147354 implements MigrationInterface {
    name = 'RoleToInteger1657742147354'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" integer`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

}
