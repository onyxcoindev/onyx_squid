module.exports = class Data1755235333101 {
    name = 'Data1755235333101'

    async up(db) {
        await db.query(`CREATE TABLE "point_setting" ("id" character varying NOT NULL, "points_per_day" numeric DEFAULT '0', "eth_weight" numeric DEFAULT '0', "onyx_weight" numeric DEFAULT '0', "eth_start_block" integer, "onyx_start_block" integer, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT ('now'::text)::timestamp(6) with time zone, CONSTRAINT "PK_ae08b4f38f60a443b1105fcca1f" PRIMARY KEY ("id"))`)
    }

    async down(db) {
        await db.query(`DROP TABLE "point_setting"`)
    }
}
