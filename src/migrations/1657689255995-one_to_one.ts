import {MigrationInterface, QueryRunner} from "typeorm";

export class oneToOne1657689255995 implements MigrationInterface {
    name = 'oneToOne1657689255995'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" ADD "pin" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "address" DROP COLUMN "pin"`);
    }

}
