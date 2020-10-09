import {MigrationInterface, QueryRunner} from "typeorm";

export class Initial1602186879748 implements MigrationInterface {
    name = 'Initial1602186879748'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "question" ("id" SERIAL NOT NULL, "question" character varying NOT NULL, "answer" character varying, CONSTRAINT "PK_21e5786aa0ea704ae185a79b2d5" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "question"`);
    }

}
