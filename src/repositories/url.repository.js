import { db } from "../database/database.connection.js";

export async function newUrl(url, hash, userId) {
    await db.query(`
        INSERT INTO urls (userid, "shorturl", url) VALUES($1, $2, $3)`,
        [userId, hash, url]);
};

export async function getUrlByHash(hash) {
    const url = await db.query(`SELECT * FROM urls WHERE "shorturl" = $1`, [hash]);
    return url.rows[0];
};

export async function getUrlById(id) {
    const url = await db.query(`SELECT * FROM urls WHERE "id" = $1`, [id]);
    return url.rows[0];
};

export async function sumVisitCount(hash) {
    await db.query(`UPDATE urls SET "visitscount" = "visitscount" + 1 WHERE "shorturl" = $1`, [hash]);
};

export async function deleteUrlById(id) {
    await db.query(`DELETE FROM urls WHERE id = $1`, [id]);
};