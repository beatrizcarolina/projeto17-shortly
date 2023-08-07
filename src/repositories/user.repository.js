import { db } from "../database/database.connection.js";

export async function getUser(id) {
    const user = await db.query(`
        SELECT 
            users.id, 
            users.name,
            SUM(urls."visitscount") AS "visitCount",
            array_agg(
                    json_build_object(
                    'id', urls.id, 
                    'shortUrl', urls."shorturl", 
                    'url', urls.url, 
                    'visitCount', urls."visitscount")
                    ORDER BY urls.id
                ) AS "shortenedUrls"
        FROM users
        LEFT JOIN urls ON users.id = urls.userid
        WHERE users.id = $1
        GROUP BY users.id
    `, [id]);

    return user.rows[0];
};

export async function getVisits() {
    const visits = await db.query(`
        SELECT 
            users.id, users.name,
            COUNT(urls) AS "linksCount",
            SUM(urls."visitscount") AS "visitCount"
        FROM users
        LEFT JOIN urls ON users.id = urls.userid
        GROUP BY users.id, users.name
        ORDER BY "visitCount" DESC
        LIMIT 10;
    `);

    return visits.rows;
};