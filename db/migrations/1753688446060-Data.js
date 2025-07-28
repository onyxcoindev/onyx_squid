module.exports = class Data1753688446060 {
    name = 'Data1753688446060'

    async up(db) {
        await db.query(`CREATE TABLE "user" ("id" character varying NOT NULL, "points" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "stake" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" integer NOT NULL, "tx_hash" text NOT NULL, "amount" numeric NOT NULL, "user_id" character varying, CONSTRAINT "PK_8cfd82a65916af9d517d25a894e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_0b45b45ad3f63c22a6016183b7" ON "stake" ("user_id") `)
        await db.query(`CREATE TABLE "withdraw" ("id" character varying NOT NULL, "block_number" integer NOT NULL, "timestamp" integer NOT NULL, "tx_hash" text NOT NULL, "amount" numeric NOT NULL, "user_id" character varying, CONSTRAINT "PK_5c172f81689173f75bf5906ef22" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_05d6371b1cb3202d1ae180f16b" ON "withdraw" ("user_id") `)
        await db.query(`CREATE TABLE "asset" ("id" character varying NOT NULL, "symbol" text NOT NULL, "decimals" integer NOT NULL, "total_supply" numeric NOT NULL, "last_updated_block" integer NOT NULL, "points_per_token" numeric NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_1209d107fe21482beaea51b745e" PRIMARY KEY ("id"))`)
        await db.query(`CREATE TABLE "user_balance" ("id" character varying NOT NULL, "user_id" character varying, "asset_address" text, "balance" numeric NOT NULL, "points" numeric NOT NULL, "user_points_paid" numeric NOT NULL, "last_updated_block" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_f3edf5a1907e7b430421b9c2ddd" PRIMARY KEY ("id"))`)
        await db.query(`CREATE INDEX "IDX_8fdba3bca96f8af1a318a6e25d" ON "user_balance" ("user_id") `)
        await db.query(`CREATE INDEX "IDX_00c35a593ca8e25ebc6442a4be" ON "user_balance" ("asset_address") `)
        await db.query(`ALTER TABLE "stake" ADD CONSTRAINT "FK_0b45b45ad3f63c22a6016183b7b" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "withdraw" ADD CONSTRAINT "FK_05d6371b1cb3202d1ae180f16b6" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
        await db.query(`ALTER TABLE "user_balance" ADD CONSTRAINT "FK_8fdba3bca96f8af1a318a6e25db" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
    }

    async down(db) {
        await db.query(`DROP TABLE "user"`)
        await db.query(`DROP TABLE "stake"`)
        await db.query(`DROP INDEX "public"."IDX_0b45b45ad3f63c22a6016183b7"`)
        await db.query(`DROP TABLE "withdraw"`)
        await db.query(`DROP INDEX "public"."IDX_05d6371b1cb3202d1ae180f16b"`)
        await db.query(`DROP TABLE "asset"`)
        await db.query(`DROP TABLE "user_balance"`)
        await db.query(`DROP INDEX "public"."IDX_8fdba3bca96f8af1a318a6e25d"`)
        await db.query(`DROP INDEX "public"."IDX_00c35a593ca8e25ebc6442a4be"`)
        await db.query(`ALTER TABLE "stake" DROP CONSTRAINT "FK_0b45b45ad3f63c22a6016183b7b"`)
        await db.query(`ALTER TABLE "withdraw" DROP CONSTRAINT "FK_05d6371b1cb3202d1ae180f16b6"`)
        await db.query(`ALTER TABLE "user_balance" DROP CONSTRAINT "FK_8fdba3bca96f8af1a318a6e25db"`)
    }
}
