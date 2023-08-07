import { db } from "../database/database.connection.js";
import bcrypt from "bcrypt";

export async function searchUser(email) {
    const foundUser = await db.query(`SELECT * FROM users WHERE "email"=$1`, [email]);
    return foundUser.rows[0];
};

export async function newUser(name, email, password) {
    await db.query(`
        INSERT INTO users ("name", "email" ,"password") VALUES ( $1, $2, $3 )`, 
        [name, email, password]);
};

export async function checkPassword(email, password) {
    const foundUser = await searchUser(email);
    if (!foundUser) {
        return false;
    }

    if (bcrypt.compareSync(password, foundUser.password)) {
        return foundUser;
    }
    return false;
};

export async function newSession(userId, token) {
    await db.query(`
        INSERT INTO sessions ("userid","token") VALUES ($1,$2)`, 
        [userId, token]);
};