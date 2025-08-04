module.exports = class Data1754302955550 {
    name = 'Data1754302955550'

    async up(db) {
        await db.query(`ALTER TABLE "user" ADD "balance" numeric NOT NULL`)
        await db.query(`ALTER TABLE "user" ADD "balance_updated_at_block" integer`)
        await db.query(`ALTER TABLE "asset" ALTER COLUMN "created_at" DROP NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "user" DROP COLUMN "balance"`)
        await db.query(`ALTER TABLE "user" DROP COLUMN "balance_updated_at_block"`)
        await db.query(`ALTER TABLE "asset" ALTER COLUMN "created_at" SET NOT NULL`)
    }
}
