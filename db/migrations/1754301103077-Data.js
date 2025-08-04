module.exports = class Data1754301103077 {
    name = 'Data1754301103077'

    async up(db) {
        await db.query(`CREATE TABLE "stats" ("id" character varying NOT NULL, "total_staked" numeric NOT NULL, "last_updated_block" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_c76e93dfef28ba9b6942f578ab1" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "stats"`)
    }
}
