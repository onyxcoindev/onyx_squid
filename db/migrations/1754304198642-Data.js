module.exports = class Data1754304198642 {
    name = 'Data1754304198642'

    async up(db) {
        await db.query(`ALTER TABLE "user" ALTER COLUMN "balance" DROP NOT NULL`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "user" ALTER COLUMN "balance" SET NOT NULL`)
    }
}
