import {MigrationInterface, QueryRunner} from "typeorm";

export class addRole1657715971782 implements MigrationInterface {
    name = 'addRole1657715971782'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" ADD "role" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "employee" DROP COLUMN "role"`);
    }

}
