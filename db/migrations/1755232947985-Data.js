module.exports = class Data1755232947985 {
    name = 'Data1755232947985'

    async up(db) {
        await db.query(`ALTER TABLE "user" ADD "eth_points" numeric DEFAULT '0'`)
        await db.query(`ALTER TABLE "user" ADD "onyx_points" numeric DEFAULT '0'`)
    }

    async down(db) {
        await db.query(`ALTER TABLE "user" DROP COLUMN "eth_points"`)
        await db.query(`ALTER TABLE "user" DROP COLUMN "onyx_points"`)
    }
}
